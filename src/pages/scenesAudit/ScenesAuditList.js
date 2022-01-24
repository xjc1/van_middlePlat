import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { FileSearchOutlined, EditOutlined, FundViewOutlined } from '@ant-design/icons';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { commonAuditState, commonObjectType, configTheme } from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import { adaptText } from "@/utils/AdaptiveHelper";

@connect(({ scenesAudit, loading, systemParamsConfig }) => {
  const { configValues = {} } = systemParamsConfig;
  return {
    ...scenesAudit,
    loading: loading.effects['scenesAudit/fetchList'],
    themeConfig: configValues.theme,
  };
})
class ScenesAuditList extends PureComponent {
  columns = [
    {
      title: adaptText('主题名称'),
      dataIndex: 'name',
      width: '25%',
      className: globalStyles.primaryColmn,
    },
    {
      title: '行政区划',
      dataIndex: 'region',
    },
    {
      title: '申报对象',
      dataIndex: 'object',
      render: object => commonObjectType.$v_names[object],
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: auditState => commonAuditState.$v_names[auditState],
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => {
        const { name, sid } = record;
        const { themeConfig } = this.props;
        return (
          <OperateBar
            more={
              <>
                {themeConfig && themeConfig[configTheme.can_preview] === '1' && (
                  <OperateBar.Button
                    disabled={!themeConfig[configTheme.preview_address]}
                    icon={<FundViewOutlined />}
                    onClick={() => {
                      window.open(
                        `${
                          themeConfig[configTheme.preview_address]
                        }?sceneName=${name}&sceneId=${sid}`,
                      );
                    }}
                  >
                    预览
                  </OperateBar.Button>
                )}
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => router.push({ name: 'scenesAudit_audit', params: { sceneId: record.id } })}
                  disabled={!record.canReview}
                >
                  审核
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({ name: 'scenesAudit_view', params: { sceneId: record.id } })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemParamsConfig/fetchThemeConfig',
    });
  }

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default ScenesAuditList;
