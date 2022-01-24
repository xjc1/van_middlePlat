import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import {
  EditOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  ColumnHeightOutlined,
} from '@ant-design/icons';
import { UNION } from '@/services/api';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { commonShelf, policyUpDownStatus, appUserType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';
import EditOneMatter from './editOneMatter';
import globalStyle from '@/global.less';
import authEnum, { authCheck } from '@/utils/auth';

@connect(({ oneMatter }) => oneMatter)
class OneMatterList extends PureComponent {
  state = {
    info: null,
    readOnly: false,
  };

  columns = [
    {
      title: '联办名称',
      dataIndex: 'name',
      width: '25%',
      className: globalStyle.primaryColmn,
    },
    {
      title: '申报对象',
      dataIndex: 'objectType',
      width: 100,
      render: text => appUserType.$v_names[text],
    },
    {
      title: '所属分类',
      dataIndex: 'category',
      render: (text, record) => {
        const { category = [] } = record;
        const { dictNames } = this.props;
        return category.map(({ id }) => dictNames[id]).join('|');
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: time => time && time.split(' ').shift(),
    },
    {
      title: '最后编辑时间',
      dataIndex: 'updateTime',
      render: time => time && time.split(' ').shift(),
    },
    // {
    //   title: '行政区划',
    //   dataIndex: 'regions',
    //   width: '15%',
    //   ellipsis: 'true',
    //   render: regions => regions.join(' | '),
    // },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: status => policyUpDownStatus.$v_names[status],
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: record => {
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.oneMatter_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => router.push({ name: 'oneMatter_edit', params: { oneMatterId: record.id } })}
                  >
                    编辑
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.oneMatter_edit_alias,
                  <OperateBar.Button
                    icon={<ColumnHeightOutlined />}
                    onClick={() => this.handleTop(record.id, record.onTop)}
                    disabled={!record.status}
                  >
                    {record.onTop ? '取消置顶' : '置顶'}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.oneMatter_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    onClick={() => this.handleSelf(record.id, record.status)}
                    disabled={!record.canPublish}
                  >
                    联办{commonShelf.$v_names[record.status]}
                  </OperateBar.Button>,
                )}
                <OperateBar.Divider />

                {authCheck(
                  authEnum.oneMatter_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.handleDisplayScenes(record.id)}
                    disabled={!record.canDisplay}
                  >
                    主题显示
                  </OperateBar.Button>,
                )}
                <OperateBar.Divider />
                {authCheck(
                  authEnum.oneMatter_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除该联办事项将无法再恢复,确定删除吗?"
                    onClick={() => this.handleDelete(record.id)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({ name: 'oneMatter_view', params: { oneMatterId: record.id } })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  handleTop = async (id, onTop) => {
    if (onTop) {
      await UNION.cancelOnTopUsingPOST(id);
    } else {
      await UNION.setOnTopUsingPOST(id);
    }
    notification.success({
      message: `成功${onTop ? '取消置顶' : '置顶'}`,
    });
    this.props.fetchList({});
  };

  handleSelf = async (id, status) => {
    if (status) {
      await UNION.withdrawUnionProcessUsingPOST(id);
    } else {
      await UNION.publishUnionProcessUsingPOST(id);
    }
    notification.success({
      message: `成功${commonShelf.$v_names[status]}`,
    });
    this.props.fetchList({});
  };

  handleDelete = async id => {
    await UNION.removeUnionProcessUsingPOST(id);
    notification.success({
      message: '成功删除',
    });
    this.props.fetchList({});
  };

  handleDisplayScenes = async id => {
    await UNION.sceneDisplayUsingPOST(id);
    notification.success({
      message: '成功显示所有可显示的主题',
    });
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;

    const { info, readOnly } = this.state;

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

        {info && (
          <EditOneMatter
            oneMatterInfo={info}
            readOnly={readOnly}
            fetchList={fetchList}
            complete={() => {
              this.setState({ info: null });
            }}
          />
        )}
      </div>
    );
  }
}

export default OneMatterList;
