import React from 'react';
import { Button } from 'antd';
import _ from 'lodash';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import EditDisplayPosition from './EditDisplayPosition';
import styles from '../tabs.less';

const defaultPageSize = 4;

function Index({ value = [], onChange = EmptyFn, editVisible = true }) {
  const handledValue = _.map(value, (val, index) => ({ ...val, id_key: index }));

  function handleAdd(newVal) {
    onChange([...handledValue, newVal]);
  }

  function handleUpdate(nextVal = {}) {
    const index = handledValue.findIndex(({ id_key }) => id_key === nextVal.id_key);
    handledValue.splice(index, 1, nextVal);
    onChange(handledValue);
  }

  return (
    <>
      <div id="displayPosition" style={{ marginBottom: '10px' }}>
        <EditDisplayPosition onFinish={handleAdd}>
          {editVisible && <Button type="primary">添加</Button>}
        </EditDisplayPosition>
      </div>
      <TTable
        disabled={!editVisible}
        bordered
        pagination={{
          defaultPageSize,
        }}
        columns={[
          {
            title: '输出模块',
            dataIndex: 'positionName',
            className: styles.addTable,
          },
          {
            title: '输出名称',
            dataIndex: 'displayName',
            className: styles.addTable,
          },
          {
            title: '操作',
            align: 'center',
            width: 100,
            render: (text, record) =>
              editVisible && (
                <>
                  <EditDisplayPosition record={record} onFinish={handleUpdate}>
                    <a style={{ marginRight: '10px' }}>编辑</a>
                  </EditDisplayPosition>
                  <a
                    onClick={() => {
                      onChange(_.filter(handledValue, ({ id_key }) => id_key !== record.id_key));
                    }}
                  >
                    删除
                  </a>
                </>
              ),
          },
        ]}
        rowKey="id_key"
        dataSource={handledValue}
        size="small"
      />
    </>
  );
}

export default Index;
