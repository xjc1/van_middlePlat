import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DateTools } from '@/components/tis_ui';
import {
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { message, Tooltip, Badge } from 'antd';
import { pageStatus as pageEnum, themeStatus, cardingStatus } from '@/utils/constantEnum';
import { statusColor } from '@/constants';
import { THEME } from '@/services/api';
import globalStyles from '@/global.less';
import ThemeAccessQueryBar from './ThemeAccessQueryBar';
import ThemeAccessList from './ThemeAccessList';
import styles from './themeAccess.less';
import CreateTheme from './compontents/createTheme';

@connect(({ themeAccess, department, loading }) => ({
  ...themeAccess,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['themeAccess/fetchList'],
}))
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '主题名称',
      dataIndex: 'name',
      className: globalStyles.primaryColmn,
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      width: '10%',
      ellipsis: true,
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code];
      },
    },
    {
      title: '牵头部门',
      dataIndex: 'headDept',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: '10%',
      ellipsis: true,
      render: (text, record) => {
        // 退回则显示退回理由
        if (text === themeStatus.refuse) {
          return (
            <Tooltip
              title={record.opinion}
              getPopupContainer={triggerNode => triggerNode.parentElement}
            >
              <Badge color={statusColor[text]} text={themeStatus.$v_names[text]} />
            </Tooltip>
          );
        }
        return <Badge color={statusColor[text]} text={themeStatus.$v_names[text]} />;
      },
    },
    {
      title: '梳理状态',
      dataIndex: 'cardingStatus',
      width: '15%',
      ellipsis: true,
      render: text => cardingStatus.$v_names[text],
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      width: '10%',
      ellipsis: true,
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '操作',
      width: 150,
      align: 'left',
      render: (text, record) => {
        // 根据状态展示不同的操作按钮
        const more = this.renderActionButton(record);
        return (
          <OperateBar more={more}>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              style={{ paddingLeft: 0 }}
              onClick={() => this.onEdit(record.id, pageEnum.view)}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  state = {
    query: {},
    modalVisible: false,
    currentRecord: {},
    editVisible: false,
    pageStatus: 'new',
  };

  componentDidMount() {
    this.fetchThemeAccess({});
  }

  fetchThemeAccessWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'themeAccess/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchThemeAccess = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'themeAccess/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  reload = () => {
    const { pageSize, pageNum } = this.props;
    this.fetchThemeAccess({ page: pageNum, size: pageSize });
  };

  onCancel = () => {
    this.setState({ modalVisible: false });
  };

  handelDelete = async id => {
    await THEME.removeThemeUsingPOST(id);
    message.success('操作成功');
    this.reload();
  };

  onEdit = async (id, pageStatus = pageEnum.view) => {
    const detail = await THEME.getOneThemeUsingGET(id);
    const { excelName, excelUrl, wordName, wordUrl, phones = [] } = detail;
    const currentRecord = Object.assign({}, detail, {
      excelUrl: [excelUrl, excelName],
      wordUrl: [wordUrl, wordName],
      phone: phones[0],
    });
    this.setState({
      modalVisible: true,
      currentRecord,
      editVisible: pageStatus !== pageEnum.view,
      pageStatus,
    });
  };

  renderActionButton = record => {
    const { status: markStatus } = record;
    switch (markStatus) {
      // 待提交显示提交,编辑与删除按钮
      case 0:
        return (
          <>
            <OperateBar.Button
              icon={<CheckOutlined />}
              onClick={async () => {
                await THEME.submitThemeUsingPOST(record.id);
                message.success('操作成功');
                this.reload();
              }}
            >
              提交
            </OperateBar.Button>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                this.onEdit(record.id, pageEnum.edit);
              }}
            >
              编辑
            </OperateBar.Button>
            <OperateBar.Divider />
            <OperateBar.Button
              danger
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="删除将不可能再恢复,确定删除吗?"
              onClick={async () => {
                await THEME.removeThemeUsingPOST(record.id);
                this.reload();
              }}
            >
              删除
            </OperateBar.Button>
          </>
        );

      // 2已发布 撤回 编辑
      case 2:
        return (
          <>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                this.onEdit(record.id, pageEnum.edit);
              }}
            >
              编辑
            </OperateBar.Button>
            <OperateBar.Divider />
            <OperateBar.Button
              danger
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="撤回将不可能再恢复,确定撤回吗?"
              onClick={async () => {
                await THEME.withdrawThemeUsingPOST(record.id);
                this.reload();
              }}
            >
              撤回
            </OperateBar.Button>
          </>
        );

      // 3 已退回 编辑|删除
      case 3:
        return (
          <>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                this.onEdit(record.id, pageEnum.edit);
              }}
            >
              编辑
            </OperateBar.Button>
            <OperateBar.Divider />
            <OperateBar.Button
              danger
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="删除将不可能再恢复,确定删除吗?"
              onClick={() => message.success('删除成功')}
            >
              删除
            </OperateBar.Button>
          </>
        );

      default:
        return <></>;
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <ThemeAccessQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() =>
                  this.setState({
                    modalVisible: true,
                    editVisible: true,
                    pageStatus: pageEnum.new,
                    currentRecord: {},
                  })
                }
              >
                新增业务梳理上报
              </TButton.Create>
              <span>主题基本信息导入，内容详见业务梳理模板中的主题基本信息</span>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchThemeAccessWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchThemeAccessWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ThemeAccessList
          loading={loading}
          columns={this.columns}
          className={styles.themeAccessList}
          onPageSizeChange={this.fetchThemeAccess}
        />

        {this.state.modalVisible && (
          <CreateTheme
            onCancel={this.onCancel}
            initData={this.state.currentRecord}
            editVisible={this.state.editVisible}
            pageStatus={this.state.pageStatus}
            reload={this.reload}
          />
        )}
      </div>
    );
  }
}

export default Index;
