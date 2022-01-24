import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar } from '@/components/tis_ui';
import _ from 'lodash';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { CORE, COMMONQUESTIONS } from '@/services/api';
import { pageStatus as pageEnum, terminalType, commonQuestionObject } from '@/utils/constantEnum';
import { message, Tag } from 'antd';
import globalStyles from '@/global.less';
import FormModal from './components/QuestionFormModal';
import CommonQuestionQueryBar from './CommonQuestionQueryBar';
import CommonQuestionList from './CommonQuestionList';
import styles from './commonQuestion.less';
import HotPages from '../hotWords/HotWordsPages';

@connect(({ commonQuestion, user }) => ({
  ...commonQuestion,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class Index extends PureComponent {
  queryForm = null;

  queryBarMethod = null;

  state = {
    query: {},
    modalVisible: false,
    editVisible: false,
    currentRecord: {},
  };

  columns = [
    {
      title: '对象类型',
      dataIndex: 'objectType',
      width: '10%',
      className: globalStyles.primaryColmn,
      render: object => commonQuestionObject.$v_names[object],
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      width: '20%',
      render: text => {
        return _.map(text, item => terminalType.$v_names[item]).join('；');
      },
    },
    {
      title: '常见问句',
      dataIndex: 'questions',
      render: (text, record) => {
        const { questions = [] } = record;
        return questions.map(it => (
          <Tag style={{ margin: 4 }} color="blue">
            {it}
          </Tag>
        ));
      },
    },
    {
      title: '归属部门',
      dataIndex: 'attributionDepartment',
      width: '20%',
      render: text => {
        const { dictNames } = this.props;
        return _.map(text, code => {
          const [val] = _.at(dictNames, `SHGSBMSH.${code}`);
          // 不正确的也显示
          return val || code;
        }).join(' | ');
      },
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
                onClick={() => this.onEdit(record, pageEnum.edit)}
              >
                编辑
              </OperateBar.Button>

              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除热词将不可能再恢复,确定删除吗?"
                onClick={() => this.onDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.onEdit(record, pageEnum.view)}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  componentDidMount() {
    this.fetchCommonQuestion({});
  }

  fetchCommonQuestionWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonQuestion/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchCommonQuestion = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'commonQuestion/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onEdit = async (record, type) => {
    // 查看
    if (type === pageEnum.view) {
      this.setState({
        currentRecord: record,
        editVisible: false,
        title: '查看常用问句',
        modalVisible: true,
      });
    }
    // 编辑
    if (type === pageEnum.edit) {
      this.setState({
        currentRecord: record,
        editVisible: true,
        title: '编辑常用问句',
        modalVisible: true,
      });
    }
  };

  onCancel = () => {
    this.setState({ currentRecord: {}, modalVisible: false, editVisible: false });
  };

  handelSubmit = async (vals, id) => {
    if (id) {
      await COMMONQUESTIONS.updateCommonQuestionUsingPOST({ body: { ...vals, id } });
      message.success('更新成功');
      this.onCancel();
      this.fetchCommonQuestion({});
    } else {
      await CORE.createCommonQuestionUsingPOST({ body: vals });
      message.success('新建成功');
      this.onCancel();
      this.fetchCommonQuestion({});
    }
  };

  onDelete = async id => {
    await COMMONQUESTIONS.deleteCommonQuestionUsingPOST(id);
    message.success('操作成功');
    this.fetchCommonQuestion({});
  };

  render() {
    const { modalVisible, editVisible, title, currentRecord } = this.state;
    return (
      <HotPages value="commonQuestion">
        <CommonQuestionQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          onQuery={method => {
            this.queryBarMethod = method;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() =>
                  this.setState({
                    modalVisible: true,
                    currentRecord: { attributionDepartment: [this.props.deptCode] },
                    title: '新增常用问句',
                    editVisible: true,
                  })
                }
              >
                新增常用问句
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.info(query);
                    this.fetchCommonQuestionWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchCommonQuestionWithQuery({});
                  this.queryBarMethod.clear();
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        {modalVisible && (
          <FormModal
            initData={currentRecord}
            editVisible={editVisible}
            title={title}
            handleCancel={this.onCancel}
            handelSubmit={this.handelSubmit}
          />
        )}
        <CommonQuestionList
          columns={this.columns}
          className={styles.commonQuestionList}
          onPageSizeChange={this.fetchCommonQuestion}
        />
      </HotPages>
    );
  }
}

export default Index;
