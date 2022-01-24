import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools, OperateBar } from '@/components/tis_ui';
import globalStyles from '@/global.less';
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { commonIsUse } from '@/utils/constantEnum';
import { Badge } from 'antd';
const statusColor = {
  0: 'red',
  1: 'green',
};

@connect(({ commonModel, loading }) => ({
  ...commonModel,
  loading: loading.effects['commonModel/fetchList'],
}))
class CommonModelList extends PureComponent {
  componentDidMount() {
    this.fetchCommonModel();
  }

  fetchCommonModel() {
    const { dispatch, page, size } = this.props;
    dispatch({
      type: 'commonModel/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  changePage(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/fetchList',
      payload: params,
    });
  }

  handleRead = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetVisible',
      payload: { view: true, addOrEdit: true, info: record, modelId: record.id },
    });
  };

  handleSubscribe = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetSubscribeView',
      payload: {
        subscribeView: true,
        modelId: id,
      },
    });
  };

  render() {
    const { list, totalElements, size, page, loading, ...others } = this.props;

    const columns = [
      {
        title: '模型编号',
        dataIndex: 'number',
        className: globalStyles.primaryColmn,
      },
      {
        title: '模型名称',
        dataIndex: 'name',
        className: globalStyles.primaryColmn,
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: review => {
          return <Badge color={statusColor[review]} text={commonIsUse.$v_names[review]} />;
        },
      },
      {
        title: '发布日期',
        dataIndex: 'releaseTime',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '操作',
        dataIndex: 'operator',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.handleRead(record)}
            >
              查看
            </OperateBar.Button>
            <OperateBar.Button icon={<EditOutlined />} onClick={() => this.handleSubscribe(record)}>
              订阅
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];

    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          rowKey={item => item.id}
          loading={loading}
          pagination={{
            total: totalElements,
            hideOnSinglePage: false,
            pageSize: size,
            current: page,
            onChange: page => {
              this.changePage({ page: page, size });
            },
          }}
          {...others}
        />
      </div>
    );
  }
}

export default CommonModelList;
