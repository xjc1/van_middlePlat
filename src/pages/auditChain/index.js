import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Spin, notification } from 'antd';
import { EXButton } from '@/components/tis_ui';
import classNames from 'classnames';
import _ from 'lodash';
import { commonAuditType } from '@/utils/constantEnum';
import { ControlOutlined } from '@ant-design/icons';
import EditFinalDepartmentModal from '@/pages/auditChain/EditFinalDepartmentModal';
import { KERNEL } from '@/services/api';
import styles from './auditChain.less';

@connect(({ auditChain, loading, department }) => ({
  ...auditChain,
  loading: loading.effects['auditChain/fetchList'],
  departments: department.flatDeparts,
}))
class Index extends PureComponent {
  queryForm = null;

  state = {
    formData: null,
    editVisible: false,
    editTitle: null,
    editType: null,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'auditChain/fetchList',
      params: {
        page,
        size,
      },
      body: query,
    });
  };

  fetchItem = async (id, title) => {
    const { departments = {} } = this.props;
    const res = await KERNEL.getChainDetailUsingGET(id);
    const { chain = [] } = res;
    const chainInfo = {
      ...res,
      depts: chain.map(({ order, role }) => ({
        order: order + 1,
        key: role,
        label: departments[role],
        value: role,
      })),
    };

    this.setState({
      formData: chainInfo,
      editVisible: true,
      editTitle: title,
    });
  };

  handleSubmit = async vals => {
    const { formData } = this.state;
    if (formData) {
      await KERNEL.updateChainUsingPOST({ body: { ...formData, ...vals } });
      this.setState({
        editVisible: false,
        editType: null,
      });
      this.fetchList({});
      notification.success({
        message: '成功更新',
      });
    } else {
      const { editType: type } = this.state;
      await KERNEL.addNewChainUsingPOST({ body: { ...vals, type } });
      this.setState({
        editVisible: false,
        editType: null,
      });
      this.fetchList({});
      notification.success({
        message: '成功配置',
      });
    }
  };

  handleClearConfig = async id => {
    try {
      await KERNEL.removeChainUsingPOST(id);
      this.fetchList({});
      notification.success({
        message: '成功清除配置',
      });
    } catch (e) {
      notification.error({
        message: `清除失败，${e.msg}`,
      });
    }
  };

  renderDesc = (isConfig, setting) => {
    if (!isConfig) {
      return '暂不支持配置';
    }
    return setting
      ? `最后修改时间: ${setting.updateTime || setting.createTime}`
      : '未配置,点击右侧配置审核链';
  };

  render() {
    const { list, loading } = this.props;
    const { formData, editVisible, editTitle } = this.state;
    const auditObj = _.reduce(
      list,
      (result, v) => {
        const { type } = v;
        return { ...result, [type]: v };
      },
      {},
    );

    return (
      <div>
        <Spin spinning={loading}>
          <div className={styles.auditChainPanel}>
            <List
              itemLayout="horizontal"
              dataSource={_.map(commonAuditType, (v, k) => ({
                title: commonAuditType.$names[k],
                type: `${commonAuditType[k]}`,
                isConfig: !!auditObj[commonAuditType[k]],
              }))}
              renderItem={({ isConfig, title, type }) => {
                const configClass = !isConfig && styles.unConfig;
                return (
                  <List.Item
                    actions={
                      isConfig && [
                        <EXButton
                          type="link"
                          onClick={() => {
                            if (isConfig) {
                              this.fetchItem(auditObj[type].id, title);
                            } else {
                              this.setState({
                                formData: null,
                                editVisible: true,
                                editTitle: title,
                                editType: type,
                              });
                            }
                          }}
                        >
                          配置审核链
                        </EXButton>,
                        <EXButton
                          type="link"
                          disabled={!isConfig}
                          danger
                          confirmText="警告"
                          confirmContent="删除配置将无法再恢复，确定删除吗？"
                          onClick={() => this.handleClearConfig(auditObj[type].id)}
                        >
                          清除配置
                        </EXButton>,
                      ]
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <span style={{ fontSize: 40 }} className={classNames(configClass)}>
                          <ControlOutlined />
                        </span>
                      }
                      title={<strong className={classNames(configClass)}>{title}</strong>}
                      description={this.renderDesc(isConfig, auditObj[type])}
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        </Spin>
        {editVisible && (
          <EditFinalDepartmentModal
            title={editTitle}
            readOnly={false}
            formData={formData}
            handleCancel={() => {
              this.setState({
                formData: null,
                editVisible: false,
              });
            }}
            onOk={vals => this.handleSubmit(vals)}
          />
        )}
      </div>
    );
  }
}

export default Index;
