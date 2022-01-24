import React, { useEffect, useState } from 'react';
import { TTable, TButton, utils, OperateBar, EventCenter, DataImport } from '@/components/tis_ui';
import { CORE, FORMCHECKPOINT } from '@/services/api';
import { Card, Space, message } from 'antd';
import FormCheckPointEditor from './formCheckPointEditor';
import { Code2Name } from '@/utils/DictTools';
import FormCheckChild from './formCheckChild';
import FormCheckChildEditor from './formCheckChildEditor';
import Styles from './index.less';
import commonDownload from '@/services/commonDownload';
import {
  formCheckPointExportUrl,
  formCheckPointImportUrl,
  formCheckPointTemplateUrl,
} from '@/constants';

const { IDGenerator } = utils;

const fcpIdGenerator = new IDGenerator('FCP_l1');
const fcp2IdGenerator = new IDGenerator('FCP_l2');

function transformChildrenRecord2Local({ example = [], ...others }) {
  const currentExample = example.filter(item => item);
  return {
    ...others,
    example:
      currentExample.length > 0
        ? currentExample.map(file => {
            const { url, name } = file;
            return [url, name];
          })
        : [undefined], // 至少展示一个
  };
}

function transformChildrenRecord2Server({ example = [], ...others }) {
  return {
    ...others,
    example: example
      .filter(item => item)
      .map(item => {
        const [url, name] = item;
        return {
          name,
          url,
        };
      }),
  };
}

function transformRecord2Server({ items = [], ...others }) {
  return {
    ...others,
    items: items.map(transformChildrenRecord2Server),
  };
}

function Index({ className, match }) {
  const [list, setList] = useState([]);
  const [matterId] = useState(match.params.matterId);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedChildrenItem, setSelectedChildrenItem] = useState();

  const updateList = async () => {
    const { content, dictNames } = await Code2Name(
      CORE.listFormCheckPointUsingGET({
        params: {
          matterId,
        },
      }),
      ['SYBDLX', 'type'],
      ['SYBDZT', 'items.entity'],
    );
    setList(
      content.map(({ items = [], ...others }) => {
        return {
          ...others,
          items: items.map(item => {
            return transformChildrenRecord2Local({
              ...item,
              entityCn: dictNames.SYBDZT[item.entity],
              id: fcp2IdGenerator.next(),
            });
          }),
          id: fcpIdGenerator.next(),
          typeCn: dictNames.SYBDLX[others.type],
        };
      }),
    );
  };

  const handleAdd = vals => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: [...list, vals].map(({ id, ...others }) => {
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleEdit = ({ id: lastId, ...nextVals }) => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: list.map(({ id, ...others }) => {
          if (id === lastId) {
            return transformRecord2Server({
              ...others,
              ...nextVals,
            });
          }
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleChildAdd = (vals, parentId) => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: list.map(({ id, items = [], ...others }) => {
          if (id === parentId) {
            return {
              ...others,
              items: [...items, vals].map(transformChildrenRecord2Server),
            };
          }
          return {
            ...others,
            items: items.map(transformChildrenRecord2Server),
          };
        }),
      },
    }).then(() => {
      updateList();
      setSelectedChildrenItem(null);
    });
  };

  const handleChildEdit = (vals, parentId, childId) => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: list.map(({ id, ...others }) => {
          if (id === parentId) {
            const { items = [], ...fields } = others;
            return {
              ...fields,
              items: items.map(({ id: itemId, ...itemFields }) => {
                if (itemId === childId) {
                  return transformChildrenRecord2Server(vals);
                }
                return transformChildrenRecord2Server(itemFields);
              }),
            };
          }
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedChildrenItem(null);
    });
  };

  const handleChildDelete = (parentId, childId) => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: list.map(({ id, ...others }) => {
          if (id === parentId) {
            const { items = [], ...fields } = others;
            return {
              ...fields,
              items: items
                .filter(({ id: itemId }) => itemId !== childId)
                .map(({ id: itemId, ...itemFields }) => {
                  return transformChildrenRecord2Server(itemFields);
                }),
            };
          }
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedChildrenItem(null);
    });
  };

  const handleDelete = ({ id }) => {
    FORMCHECKPOINT.updateFormCheckPointUsingPOST({
      body: {
        matterId,
        formCheckPoints: list
          .filter(item => item.id !== id)
          .map(({ _id, ...others }) => {
            return transformRecord2Server(others);
          }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  useEffect(() => {
    updateList();
  }, []);

  const handleExport = async () => {
    const onClose = message.loading('导出中', 0);
    await commonDownload({
      url: formCheckPointExportUrl,
      name: '填报表单.xlsx',
      method: 'POST',
      condition: { matterId },
    });
    onClose();
  };

  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: formCheckPointTemplateUrl, name: '填报表单导入模板.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="填报表单项">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <TButton.Create
              onClick={() => {
                setSelectedItem({
                  readonly: false,
                  record: {
                    checkExample: [undefined],
                  },
                });
              }}
            >
              添加表单
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>模版下载</TButton.Download>
            <DataImport
              btnText="导入表单及内容"
              action={formCheckPointImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>导出表单</TButton.Output>
          </Space>
          <TButton.Button
            onClick={() => {
              EventCenter.emit('goBack');
            }}
          >
            返回审查要素库列表
          </TButton.Button>
        </div>
      </Card>
      <TTable
        className={Styles.formCheckPointListContentWrapper}
        columns={[
          {
            title: '表单名称',
            dataIndex: 'name',
          },
          {
            title: '表单类型',
            dataIndex: 'typeCn',
            ellipsis: true,
          },
          {
            title: '操作',
            width: 400,
            render(record) {
              return (
                <OperateBar>
                  <OperateBar.Button
                    onClick={() => {
                      setSelectedItem({
                        record,
                        readonly: true,
                      });
                    }}
                  >
                    查看
                  </OperateBar.Button>
                  <OperateBar.Button
                    onClick={() => {
                      setSelectedItem({
                        record,
                        readonly: false,
                      });
                    }}
                  >
                    编辑
                  </OperateBar.Button>
                  <OperateBar.Button
                    danger
                    confirmText="警告"
                    confirmContent="删除审查表单将不可能再恢复,确定删除吗?"
                    onClick={() => {
                      handleDelete(record);
                    }}
                  >
                    删除
                  </OperateBar.Button>
                  <OperateBar.Button
                    onClick={() => {
                      setSelectedChildrenItem({
                        record: { example: [undefined] },
                        parentId: record.id,
                        readonly: false,
                      });
                    }}
                  >
                    添加表单项
                  </OperateBar.Button>
                </OperateBar>
              );
            },
          },
        ]}
        dataSource={list}
        rowKey="id"
        expandable={{
          expandedRowRender: ({ items = [], id }) => (
            <FormCheckChild
              onSelected={setSelectedChildrenItem}
              onDelete={handleChildDelete}
              parentId={id}
              items={items}
            />
          ),
          rowExpandable: ({ items = [] }) => items.length > 0,
        }}
      />
      {selectedItem && (
        <FormCheckPointEditor
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          onCancel={() => {
            setSelectedItem(null);
          }}
          item={selectedItem}
        />
      )}
      {selectedChildrenItem && (
        <FormCheckChildEditor
          item={selectedChildrenItem}
          onCancel={() => {
            setSelectedChildrenItem(null);
          }}
          handleAdd={vals => {
            const { parentId } = selectedChildrenItem;
            handleChildAdd(vals, parentId);
          }}
          handleEdit={vals => {
            const { parentId, id } = selectedChildrenItem;
            handleChildEdit(vals, parentId, id);
          }}
        />
      )}
    </div>
  );
}

export default Index;
