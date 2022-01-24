import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { notification } from 'antd';
import { RollbackOutlined, EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { appUserType, portraitIsUse, portraitIsLinkUser } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import globalStyles from '@/global.less';
import authEnum, { authCheck } from '@/utils/auth';

@connect(({ portraitTags, loading }) => ({
  ...portraitTags,
  loading: loading.effects['portraitTags/fetchList'],
}))
class PortraitTagsList extends PureComponent {
  columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      className: globalStyles.primaryColmn,
      width: '25%',
    },
    {
      title: '标签分类',
      dataIndex: 'category',
    },
    {
      title: '标签对象',
      dataIndex: 'object',
      render: text => appUserType.$v_names[text],
    },
    {
      title: '是否应用',
      dataIndex: 'isUse',
      render: isUse => portraitIsUse.$v_names[isUse],
    },
    {
      title: '是否关联至用户',
      dataIndex: 'linkUser',
      render: linkUser => portraitIsLinkUser.$v_names[linkUser],
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text, record) =>
        !record.editable ? (
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.handleView(record.id)}
          >
            查看
          </OperateBar.Button>
        ) : (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.tagManage_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.handleEdit(record.id)}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.tagManage_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除后将不可能再恢复,确定删除吗?"
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
              onClick={() => this.handleView(record.id)}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
    },
  ];

  handleEdit = id => {
    router.push({ name: 'tags_edit', params: { tagId: id } });
  };

  handleView = id => {
    router.push({ name: 'tags_view', params: { tagId: id } });
  };

  handleDelete = async id => {
    try {
      await KERNEL.removePortraitTagUsingPOST(id);
      this.props.fetchList({});
      notification.success({
        message: '成功删除',
      });
    } catch (error) {
      const { msg } = error;
      notification.error({
        message: msg,
      });
    }
  };

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

export default PortraitTagsList;
