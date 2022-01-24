import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Row, Input, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TButton, TItem, FormRules, DataImport } from '@/components/tis_ui';
import classNames from 'classnames';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import { STANDARDFIELDS } from '@/services/api';
import commonDownload from '@/services/commonDownload';
import router from '@/utils/tRouter';
import _ from 'lodash';
import StandardFieldStoreList from './StandardFieldStoreList';
import CategoryList from './categoryList';
import Styles from './standardFieldStore.less';
import StandardFieldStoreQueryBar from './StandardFieldStoreQueryBar';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import TrackTool from '@/utils/TrackTool';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ standardFieldStore }) => standardFieldStore)
class Index extends PureComponent {
  queryForm = null;

  state = {
    selectedID: null,
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchCategory();
    this.fetchFields();
  }

  fetchCategory = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'standardFieldStore/fetchCategory',
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/standardFields/export', name: '模板.xlsx' });
    onClose();
  };

  fetchFields(page = 0, size = 10) {
    const { dispatch } = this.props;
    const { query } = this.state;
    dispatch({
      type: 'standardFieldStore/fetchFields',
      page,
      size,
      query,
    });
  }

  addCategory() {
    const { dispatch } = this.props;
    const formRef = React.createRef();
    Modal.confirm({
      title: '请填写您要添加的分类名称.',
      icon: <InfoCircleOutlined />,
      content: (
        <Form ref={formRef}>
          <Row>
            <TItem label="分类名称" name="name" rules={[FormRules.required('节点名称必填')]}>
              <Input />
            </TItem>
          </Row>
        </Form>
      ),
      onOk(close) {
        formRef.current.validateFields().then(vals => {
          dispatch({
            type: 'standardFieldStore/addCategory',
            payload: vals,
          });
          close();
        });
      },
    });
  }

  // 异步提交导出请求
  exportListWithQuery() {
    return new Promise((resolve, reject) => {
      STANDARDFIELDS.asyncExportStandardFieldUsingPOST({
        body: this.queryForm.getFieldsValue(),
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  render() {
    const { categorys = [] } = this.props;
    const { selectedID } = this.state;
    return (
      <div className={classNames(layoutSytles.twoGridPage, Styles.standardFieldStore)}>
        <div className={classNames(layoutSytles.leftGrid, Styles.standardFieldStoreLeft)}>
          <CategoryList
            items={categorys}
            refresh={this.fetchCategory}
            selectedID={selectedID}
            onAddCategory={() => this.addCategory()}
            onSelected={item => {
              const selectedItem = _.find(categorys, { id: item.id });
              const classification = _.get(selectedItem, 'name');
              this.setState(
                {
                  selectedID: item.id,
                  query: {
                    name: undefined,
                    code: undefined,
                    classification,
                  },
                },
                () => {
                  this.queryForm.setFieldsValue({ ...this.state.query });
                  this.fetchFields();
                },
              );
            }}
          />
        </div>
        <div className={classNames(layoutSytles.rightGrid)}>
          <StandardFieldStoreQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            initialValues={TrackTool.getQueryParamsCache()}
            actions={
              <>
                <Auth auth={authEnum.standardFieldStore_edit_alias}>
                  <TButton.Create
                    onClick={() =>
                      router.push('standardFieldStore_create')
                    }
                  >
                    新建字段
                  </TButton.Create>
                </Auth>
                <Auth auth={authEnum.standardFieldStore_edit_alias}>
                  <DataImport
                    action="/standardFields/import"
                    refresh={this.fetchFields}
                    btnText="导入"
                  />
                </Auth>
                <Auth auth={authEnum.standardFieldStore_edit_alias}>
                  <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>
                </Auth>
                <AsyncExportFile
                  applyDerive={() => this.exportListWithQuery()}
                  type={asyncExportArguments.standardField}
                  btnText="导出"
                  placement="bottom"
                />
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(vals => {
                      this.setState(
                        {
                          selectedID: null,
                          query: vals,
                        },
                        () => {
                          this.fetchFields();
                        },
                      );
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={() => {
                    this.queryForm.resetFields();
                    this.setState(
                      {
                        query: {},
                      },
                      () => {
                        this.fetchFields();
                      },
                    );
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />
          <StandardFieldStoreList
            className={Styles.standardFieldStoreList}
            onPageSizeChange={({ page, size }) => {
              this.fetchFields(page, size);
            }}
            onEdit={({ id }) =>
              router.push({ name: 'standardFieldStore_edit', params: { fieldId: id } })
            }
            onCheck={({ id }) =>
              router.push({ name: 'standardFieldStore_view', params: { fieldId: id } })
            }
            onDelete={({ id }) => {
              const { dispatch } = this.props;
              dispatch({
                type: 'standardFieldStore/deleteFieldDetail',
                id,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Index;
