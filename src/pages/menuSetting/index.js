import React, { PureComponent } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { TButton, OperateBar } from '@/components/tis_ui';
import {
  pageStatus as pageEnum,
  terminalType,
  appUserType,
  policyUpDownStatus,
  commonYesNo,
} from '@/utils/constantEnum';
import { message, Modal } from 'antd';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import router from '@/utils/tRouter';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { KERNEL } from '@/services/api';
import MenuTree from './components/MenuTree';
import globalStyles from '@/global.less';
import layoutStyles from '@/layouts/PageLayout/layout.less';

import MenuSettingList from './MenuSettingList';
import styles from './menuSetting.less';
import FormModal from './components/FormModal';
import MenuSettingQueryBar from './MenuSettingQueryBar';

@connect(({ menuSetting, loading }) => ({
  ...menuSetting,
  treeLoading: loading.effects['menuSetting/fetchMenuTree'],
}))
class Index extends PureComponent {
  queryForm = null;

  state = {
    modalVisible: false,
    pageStatus: null,
    initialValues: {},
    query: {},
    isFromTag: false,
  };

  columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      className: globalStyles.primaryColmn,
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      render: object => appUserType.$v_names[object],
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      render: text => {
        return _.map(text, item => terminalType.$v_names[item]).join('；');
      },
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      align: 'center',
      render: (text, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                icon={<EditOutlined />}
                disabled={!authCheck(authEnum.menuSetting_edit_alias, true, false)}
                onClick={() => this.onEdit(record.id, pageEnum.edit)}
              >
                编辑
              </OperateBar.Button>

              <OperateBar.Button
                danger
                disabled={!authCheck(authEnum.menuSetting_publish, true, false)}
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent={`【${record.name}】将被${
                  record.status === 1 ? '下架' : '上架'
                },确定吗?`}
                onClick={() => this.changeStatus(record.id, record.status)}
              >
                {record.status === 1 ? '下架' : '上架'}
              </OperateBar.Button>

              <OperateBar.Button
                danger
                disabled={!authCheck(authEnum.menuSetting_delete, true, false)}
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除菜单将不可能再恢复,确定删除吗?"
                onClick={() => this.onDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.onEdit(record.id, pageEnum.view)}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  componentDidMount() {
    this.loadData();
    this.isOpenModal();
  }

  isOpenModal = () => {
    const { location = {} } = this.props;
    const { id, type } = location.query;
    if (id) {
      // 判断是否有修改菜单的权限
      this.setState({ isFromTag: true });
      const isAuth = authCheck(authEnum.menuSetting_edit_alias, true, false);
      if (type) {
        this.onEdit(id, pageEnum.view);
        return;
      }
      if (!isAuth) {
        Modal.confirm({
          title: '温馨提示',
          content: '您没有编辑此菜单的权限',
          okText: '返回标签',
          cancelText: '取消',
          onOk: () => router.goBack(),
        });
        return;
      }
      this.onEdit(id, pageEnum.edit);
    }
  };

  menuTreeToTreeNode = treeData => {
    return _.map(treeData, ({ name, id, parentId, children = [], ...others }) => ({
      ...others,
      title: name,
      key: id,
      parentId,
      children: this.menuTreeToTreeNode(children),
    }));
  };

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;
    dispatch({
      type: 'menuSetting/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  fetchMenuTree = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuSetting/fetchMenuTree',
    });
  };

  updateTreeSort = body => {
    KERNEL.updateSpaceMenuTreeSortUsingPOST({ body }).then(() => {
      this.fetchMenuTree();
    });
  };

  onCreate = parentId => {
    this.setState({
      modalVisible: true,
      pageStatus: pageEnum.new,
      initialValues: {
        parentId,
        display: commonYesNo.no,
        faceDetect: commonYesNo.no,
        showErrorCorrection: commonYesNo.no,
      },
    });
  };

  onEdit = (id, status) => {
    KERNEL.getSpaceMenuUsingGET(id).then(value => {
      const {
        legalPersonPortraitTag = [],
        personalPortraitTag = [],
        display = commonYesNo.no,
      } = value;
      const formatValue = {
        ...value,
        legalPersonPortraitTag: legalPersonPortraitTag.map(({ tagId }) => tagId),
        personalPortraitTag: personalPortraitTag.map(({ tagId }) => tagId),
        display,
      };
      this.setState({
        modalVisible: true,
        pageStatus: status,
        initialValues: formatValue,
      });
    });
  };

  onDelete = id => {
    KERNEL.deleteSpaceMenuUsingPOST(id).then(() => {
      this.loadData();
    });
  };

  onSubmit = (vals, id) => {
    const { legalPersonPortraitTag = [], personalPortraitTag = [] } = vals;
    const formatValues = {
      ...vals,
      legalPersonPortraitTag: legalPersonPortraitTag.map(({ value: tagId }) => ({ tagId })),
      personalPortraitTag: personalPortraitTag.map(({ value: tagId }) => ({ tagId })),
    };
    // 有id走更新流程
    if (id) {
      KERNEL.updateSpaceMenuUsingPOST({ body: { ...formatValues, id } }).then(() => {
        message.success('更新成功');
        this.handleCancel();
        this.loadData();
      });
    } else {
      KERNEL.createSpaceMenuUsingPOST({ body: formatValues }).then(() => {
        message.success('提交成功');
        this.handleCancel();
        this.loadData();
      });
    }
  };

  loadData = () => {
    this.fetchList({});
    this.fetchMenuTree();
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      pageStatus: null,
      initialValues: {},
      isFromTag: false,
    });
  };

  changeStatus = (id, status) => {
    // 上架状态走下架流程
    if (status === 1) {
      KERNEL.updateMenuStatusUsingPOST({ body: { id, status: policyUpDownStatus.down } }).then(
        () => {
          message.success('下架成功');
          this.loadData();
        },
      );
    } else {
      KERNEL.updateMenuStatusUsingPOST({ body: { id, status: policyUpDownStatus.up } }).then(() => {
        message.success('上架成功');
        this.loadData();
      });
    }
  };

  render() {
    const { modalVisible, pageStatus, initialValues, isFromTag } = this.state;
    const { menuTree, treeLoading } = this.props;
    const menuTreeNodeData = this.menuTreeToTreeNode(menuTree);

    return (
      <div className={layoutStyles.twoGridPage}>
        <div className={layoutStyles.treeLeftGrid}>
          {menuTree.length !== 0 && (
            <MenuTree
              loading={treeLoading}
              onDoubleClick={item => {
                const { key } = item;
                const lastFormCondition = this.queryForm.getFieldsValue();
                const formKeys = Object.keys(lastFormCondition);
                // 清空之前选中的状态
                const clearCondition = _.reduce(
                  formKeys,
                  (conditionItem, formKey) => {
                    const newItem = { ...conditionItem, [formKey]: undefined };
                    return newItem;
                  },
                  {},
                );
                const newQueryCondition = {
                  ...clearCondition,
                  parentId: key,
                };
                this.queryForm.setFieldsValue(newQueryCondition);
                this.setState({ query: newQueryCondition }, () => this.fetchList({}));
              }}
              sortUpdate={this.updateTreeSort}
              menuTreeNodeData={menuTreeNodeData}
              createChildMenu={this.onCreate}
              editMenu={id => {
                this.onEdit(id, pageEnum.edit);
              }}
              onSelect={([id]) => {
                // eslint-disable-next-line no-console
                console.log('id:', id);
              }}
            />
          )}
        </div>
        <div className={layoutStyles.rightGrid}>
          <MenuSettingQueryBar
            menuTree={menuTree}
            onForm={form => {
              this.queryForm = form;
            }}
            actions={
              <>
                <Auth auth={authEnum.menuSetting_edit_alias}>
                  <TButton.Create onClick={() => this.onCreate()}>新增菜单</TButton.Create>
                </Auth>
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(vals => {
                      this.setState({ query: vals }, () => this.fetchList({}));
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={() => {
                    this.queryForm.resetFields();
                    this.setState({ query: {} }, () => this.fetchList({}));
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />

          <MenuSettingList
            className={styles.menuSettingList}
            columns={this.columns}
            onPageSizeChange={this.fetchList}
          />
        </div>
        {modalVisible && (
          <FormModal
            menuTree={menuTree}
            disabled={pageStatus === pageEnum.view}
            title={`${pageEnum.$v_names[pageStatus]}菜单`}
            handleCancel={this.handleCancel}
            onFinish={this.onSubmit}
            initialValues={initialValues}
            pageStatus={pageStatus}
            isFromTag={isFromTag}
          />
        )}
      </div>
    );
  }
}

export default Index;
