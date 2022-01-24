import React from 'react';
import classNames from 'classnames';
import { oneFormType } from '@/utils/constantEnum';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import {
  SlidersOutlined,
  EditOutlined,
  RollbackOutlined,
  ProfileTwoTone,
  CopyOutlined,
} from '@ant-design/icons';
import Styles from './formDefinition.less';

function FormDefinition({
  className,
  dataSource,
  pagination,
  isEditing,
  onDesign = EmptyFn,
  onEditor = EmptyFn,
  onDelete = EmptyFn,
  onCopy = EmptyFn,
}) {
  return (
    <div className={classNames(Styles.formDefinitionList, className)}>
      <TTable
        pagination={pagination}
        rowKey="id"
        columns={[
          {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '200px',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render(text) {
              return oneFormType.$v_names[text];
            },
          },
          {
            title: '表单设计',
            dataIndex: 'design',
            key: 'design',
            align: 'center',
            render(text, { schema }) {
              return schema && <ProfileTwoTone />;
            },
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: '200px',
            render: (text, record) => (
              <OperateBar
                more={
                  <>
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        onEditor(record);
                      }}
                    >
                      编辑
                    </OperateBar.Button>
                    <OperateBar.Button
                      icon={<CopyOutlined />}
                      onClick={() => {
                        onCopy(record);
                      }}
                    >
                      复制
                    </OperateBar.Button>
                    <OperateBar.Button
                      danger
                      icon={<RollbackOutlined />}
                      confirmText="警告"
                      confirmContent="确定删除此表单吗?"
                      onClick={() => {
                        onDelete(record);
                      }}
                    >
                      删除
                    </OperateBar.Button>
                  </>
                }
              >
                <OperateBar.Button
                  okType="primary"
                  confirmText={
                    isEditing ? '发现有正在设计的表单, 继续会重置表单设计器, 确定要继续吗?' : ''
                  }
                  onClick={() => onDesign(record)}
                  icon={<SlidersOutlined />}
                >
                  表单设计
                </OperateBar.Button>
              </OperateBar>
            ),
          },
        ]}
        bordered
        size="small"
        dataSource={dataSource}
      />
    </div>
  );
}

export default FormDefinition;
