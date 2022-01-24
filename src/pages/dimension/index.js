/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { Tag, message } from 'antd';
import globalStyles from '@/global.less';
import { TButton, OperateBar } from '@/components/tis_ui';
import DimensionSignModal from '@/components/DimensionSign/dimensionSignModal';
import { DIMENSION } from '@/services/api';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import DimensionList from './DimensionList';
import styles from './dimension.less';
import CreateDimension from './components/createDimension';
import DimensionQueryBar from './DimensionQueryBar';

@connect(({ dimension }) => dimension)
class Index extends PureComponent {
  queryForm = null;

  state = {
    columns: [
      {
        title: '维度',
        dataIndex: 'name',
        show: true,
        width: '30%',
        className: globalStyles.primaryColmn,
      },
      {
        title: '标签',
        dataIndex: 'labels',
        show: true,
        width: '30%',
        render: (text, record) =>
          text.map((it, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tag
              key={`${record.id}${index}`}
              color="blue"
              style={{ marginTop: 3, marginBottom: 3 }}
            >
              {it.label}
            </Tag>
          )),
      },
      {
        title: '引导语',
        dataIndex: 'leadingWords',
        show: true,
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
                {authCheck(
                  authEnum.dimensionManage_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      this.setState({
                        currentRecord: record,
                        modalVisible: true,
                        editVisible: true,
                      });
                    }}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.dimensionManage_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除维度将不可能再恢复,确定删除吗?"
                    onClick={() => this.deleteDimension(record.id)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                this.setState({ currentRecord: record, modalVisible: true, editVisible: false });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ],
    modalVisible: false,
    editVisible: false,
    currentRecord: {},
    markVisible: false,
  };

  componentDidMount() {
    this.fetchDimensionContent({});
  }

  // 数据查询
  fetchDimensionContent = ({ page = 0, pageSize = 10, condition }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dimension/fetchList',
      payload: {
        page,
        size: pageSize,
      },
      condition,
    });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  reloadPage = () => {
    const { page, pageSize, condition } = this.props;
    this.fetchDimensionContent({ page, pageSize, condition });
  };

  deleteDimension = async id => {
    await DIMENSION.deleteDimensionUsingPOST(id);
    message.success('操作成功');
    this.reloadPage();
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <div>
        <DimensionQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.dimensionManage_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    this.setState({ currentRecord: {}, modalVisible: true, editVisible: true });
                  }}
                >
                  新增维度
                </TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  const condition = this.queryForm.getFieldsValue();
                  this.fetchDimensionContent({ page: 0, pageSize: 10, condition });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  const condition = this.queryForm.getFieldsValue();
                  this.fetchDimensionContent({ page: 0, pageSize: 10, condition });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <DimensionList className={styles.dimensionList} columns={this.state.columns} />
        {modalVisible && (
          <CreateDimension
            handleCancel={this.handleCancel}
            initData={this.state.currentRecord}
            editVisible={this.state.editVisible}
            reload={this.reloadPage}
          />
        )}

        {this.state.markVisible && (
          <DimensionSignModal handleCancel={() => this.setState({ markVisible: false })} />
        )}
      </div>
    );
  }
}

export default Index;
