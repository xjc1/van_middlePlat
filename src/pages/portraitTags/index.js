import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { Dropdown, Menu, message } from 'antd';
import { TButton } from '@/components/tis_ui';
import authEnum, { Auth } from '@/utils/auth';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import commonDownload from '@/services/commonDownload';
import { portraitTagExcelUrl } from '@/constants';
import PortraitTagsQueryBar from './PortraitTagsQueryBar';
import PortraitTagsList from './PortraitTagsList';
import styles from './portraitTags.less';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import TagTheme from './TagTheme';
import TrackTool from '@/utils/TrackTool';

@connect(({ portraitTags }) => ({ ...portraitTags }))
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;

    dispatch({
      type: 'portraitTags/fetchList',
      params: { page, size },
      body: query,
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: portraitTagExcelUrl, name: '画像标签导入模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      KERNEL.asyncExportPortraitTagUsingPOST({
        body: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const { query: queryCondition } = this.state;
    const { dispatch } = this.props;
    return (
      <div className={layoutStyles.twoGridPage}>
        <div className={layoutStyles.leftGrid} style={{ width: 350 }}>
          <TagTheme />
        </div>
        <div className={layoutStyles.rightGrid}>
          <PortraitTagsQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            initialValues={TrackTool.getQueryParamsCache()}
            actions={
              <>
                <Auth auth={authEnum.tagManage_edit_alias}>
                  <TButton.Create onClick={() => router.push('tags_create')}>
                    新增标签
                  </TButton.Create>
                </Auth>
                <AsyncExportFile
                  applyDerive={this.exportListWithQuery}
                  type={asyncExportArguments.portraitTag}
                  btnText="标签导出"
                  placement="bottom"
                />
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <TButton.Edit
                          onClick={() => {
                            router.push({
                              name: 'tags_bulk',
                              query: queryCondition,
                            });
                          }}
                        >
                          批量编辑和删除
                        </TButton.Edit>
                      </Menu.Item>
                      <Menu.Item>
                        <TButton.Edit
                          onClick={() => {
                            router.push({ name: 'tags_bulkAdd' });
                          }}
                        >
                          批量新增
                        </TButton.Edit>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                >
                  <TButton.Edit>批量操作</TButton.Edit>
                </Dropdown>
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(query => {
                      this.setState({ query }, () => this.fetchList({}));
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={() => {
                    // 重置数据
                    dispatch({ type: 'portraitTags/setQuery', query: {} });
                    this.queryForm.resetFields();
                    this.setState({ query: {} }, () => this.fetchList({}));
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />
          <PortraitTagsList className={styles.portraitTagsList} fetchList={this.fetchList} />
        </div>
      </div>
    );
  }
}

export default Index;
