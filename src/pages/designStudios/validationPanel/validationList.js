import React from 'react';
import { Table, Button, message } from 'antd';
import Styles from './index.less';
import { EditOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { EmptyFn, OperateBar } from '@/components/tis_ui';
import { oneFormValidateType } from '@/utils/constantEnum';
import CheckPopover from './CheckPopover';
import { VALIDATIONS } from '@/services/api';

function ValidationList({ fetchList = EmptyFn, data = [], onCreate = EmptyFn }) {
  function handleDeleteRule(id) {
    VALIDATIONS.deleteValidationRulesUsingPOST(id)
      .then(() => {
        message.success('删除成功');
        fetchList({});
      })
      .catch(e => {
        message.error(`删除失败，${e.msg}`);
      });
  }

  return (
    <div className={Styles.validationList}>
      <div className={Styles.validationAdd}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate} />
      </div>
      <Table
        columns={[
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
              return oneFormValidateType.$v_names[text];
            },
          },
          {
            title: '规则',
            dataIndex: 'rule',
            key: 'rule',
            width: '40%',
            align: 'center',
            render(text, record) {
              switch (record.type) {
                case oneFormValidateType.default:
                  return '------';
                default:
                  return text;
              }
            },
          },
          {
            title: '提示',
            dataIndex: 'msg',
            key: 'msg',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <OperateBar
                more={
                  <>
                    <OperateBar.Button icon={<EditOutlined />} onClick={() => {}}>
                      编辑
                    </OperateBar.Button>
                    <OperateBar.Button
                      danger
                      icon={<RollbackOutlined />}
                      confirmText="警告"
                      confirmContent="确定删除此校验规则吗?"
                      onClick={() => handleDeleteRule(record.id)}
                    >
                      删除
                    </OperateBar.Button>
                  </>
                }
              >
                <CheckPopover record={record} />
              </OperateBar>
            ),
          },
        ]}
        bordered
        size="small"
        dataSource={data}
      />
    </div>
  );
}

export default ValidationList;
