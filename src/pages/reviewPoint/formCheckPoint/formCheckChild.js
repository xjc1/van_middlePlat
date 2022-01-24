import React from 'react';
import Styles from './index.less';
import { Image } from 'antd';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';

function FormCheckChild({ items = [], onSelected = EmptyFn, onDelete = EmptyFn, parentId }) {
  return (
    <div className={Styles.formCheckChildList}>
      <TTable
        bordered
        size="small"
        columns={[
          {
            title: '序号',
            horizontal: true,
            width: 60,
            render(_, record, index) {
              return index + 1;
            },
          },
          {
            title: '表单项名称',
            dataIndex: 'itemName',
          },
          {
            title: '主体',
            ellipsis: true,
            dataIndex: 'entityCn',
          },
          {
            title: '审查要点图例',
            ellipsis: true,
            dataIndex: 'example',
            render(imags = []) {
              return imags
                .filter(img => img)
                .map((file, index) => {
                  const [url] = file;
                  return (
                    <Image
                      height={40}
                      width={40}
                      src={url}
                      key={index}
                      style={{
                        display: 'inline-block',
                      }}
                    />
                  );
                });
            },
          },
          {
            title: '操作',
            align: 'center',
            horizontal: true,
            width: 200,
            render(record) {
              return (
                <OperateBar>
                  <OperateBar.Button
                    onClick={() => {
                      onSelected({
                        record,
                        parentId,
                        readonly: true,
                      });
                    }}
                  >
                    查看
                  </OperateBar.Button>
                  <OperateBar.Button
                    onClick={() => {
                      onSelected({
                        record,
                        parentId,
                        id: record.id,
                        readonly: false,
                      });
                    }}
                  >
                    编辑
                  </OperateBar.Button>
                  <OperateBar.Button
                    danger
                    confirmText="警告"
                    confirmContent="确定您要删除选中表单项吗?"
                    onClick={() => {
                      onDelete(parentId, record.id);
                    }}
                  >
                    删除
                  </OperateBar.Button>
                </OperateBar>
              );
            },
          },
        ]}
        rowKey="id"
        dataSource={items}
      />
    </div>
  );
}

export default FormCheckChild;
