import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DateTools } from '@/components/tis_ui';
import { FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { message, Tooltip, Badge } from 'antd';
import { pageStatus as pageEnum, themeStatus, cardingStatus } from '@/utils/constantEnum';
import { THEME } from '@/services/api';
import { statusColor } from '@/constants';
import globalStyles from '@/global.less';
import ThemeAuditQueryBar from './ThemeAuditQueryBar';
import ThemeAuditList from './ThemeAuditList';
import styles from './themeAudit.less';
import AuditTheme from './compontents/auditTheme';

@connect(({ themeAudit, department, loading }) => ({
  ...themeAudit,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['themeAudit/fetchList'],
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
      width: '15%',
      ellipsis: true,
      dataIndex: 'headDept',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: '10%',
      ellipsis: true,
      render: (text, record) => {
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
      width: '10%',
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
      width: 200,
      align: 'center',
      render: (text, record) => {
        // 根据状态展示不同的操作按钮
        return (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.onEdit(record.id, pageEnum.view)}
            >
              查看
            </OperateBar.Button>

            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                this.onEdit(record.id, pageEnum.examine);
              }}
            >
              审核
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
    this.fetchThemeAudit({});
  }

  fetchThemeAuditWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'themeAudit/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchThemeAudit = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'themeAudit/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  reload = () => {
    const { pageSize, pageNum } = this.props;
    this.fetchThemeAudit({ page: pageNum, size: pageSize });
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

  render() {
    const { loading, list } = this.props;
    return (
      <div>
        <ThemeAuditQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchThemeAuditWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchThemeAuditWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ThemeAuditList
          loading={loading}
          list={list}
          columns={this.columns}
          className={styles.themeAuditList}
          onPageSizeChange={this.fetchThemeAudit}
        />

        {this.state.modalVisible && (
          <AuditTheme
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
