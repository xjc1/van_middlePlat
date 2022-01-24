import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { terminalType, userType } from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import authEnum, { authCheck } from '@/utils/auth';
import _ from 'lodash';

@connect(({ hotWords, loading }) => ({
  ...hotWords,
  loading: loading.effects['hotWords/fetchList'],
}))
class HotWordsList extends PureComponent {

  constructor() {
    super();
    this.check = this.check.bind(this);
    this.editHotWord = this.editHotWord.bind(this);
    this.deleteHotWords = this.deleteHotWords.bind(this);
  }

  componentDidMount() {
    this.fetchHotWords({});
  }

  check = data => {
    const info = data;
    const { dispatch } = this.props;
    dispatch({ type: 'hotWords/check', payload: true, info, hotWords: info.words });
  };

  editHotWord = info => {
    const { dispatch } = this.props;
    dispatch({ type: 'hotWords/edit', payload: true, info, hotWords: info.words });
  };

  deleteHotWords = info => {
    const { dispatch } = this.props;
    dispatch({ type: 'hotWords/delete', payload: info.id });
  };

  fetchHotWords({ page = 0, size = 10 }) {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotWords/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  render() {
    const columns = [
      {
        title: '对象类型',
        dataIndex: 'objectType',
        className: globalStyles.primaryColmn,
        width: '10%',
        render: text => {
          return userType.$v_names[text];
        },
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
        title: '归属部门',
        dataIndex: 'attributionDepartment',
        width: '20%',
        render: text => {
          const { dictNames } = this.props;
          return _.map(text, item => dictNames.SHGSBMSH[item]).join('；');
        },
      },
      {
        title: '热词',
        dataIndex: 'words',
        width: '30%',
        render: words =>
          words.map(word => (
            <Tag key={word.id} style={{ marginTop: 3, marginBottom: 3 }} color="blue">
              {word.name}
            </Tag>
          )),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        show: true,
        width: '20%',
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.hotWords_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      this.editHotWord(record);
                    }}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.hotWords_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除热词将不可能再恢复,确定删除吗?"
                    onClick={() => {
                      this.deleteHotWords(record);
                    }}
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
                this.check(record);
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list, total, size, page, loading } = this.props;
    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize: size,
            current: page,
            onChange: page => {
              this.fetchHotWords({ page, size });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default HotWordsList;
