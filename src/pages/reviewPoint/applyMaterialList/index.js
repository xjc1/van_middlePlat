import React, { useEffect, useState } from 'react';
import { TTable, TButton, utils, OperateBar, EventCenter, DataImport } from '@/components/tis_ui';
import { APPLYMATERIAL } from '@/services/api';
import { Card, Space, message } from 'antd';
import ApplyMaterialEditor from './applyMaterialEditor';
import { Code2Name } from '@/utils/DictTools';
import commonDownload from '@/services/commonDownload';
import {
  applyMaterialExportUrl,
  applyMaterialImportUrl,
  applyMaterialTemplateUrl,
} from '@/constants';

const { IDGenerator } = utils;

const specialIdGenerator = new IDGenerator('applicationCondition');

function transformRecord2Local({ example = [], ...others }) {
  const currentExample = example.filter(item => item);
  return {
    ...others,
    example:
      currentExample.length > 0
        ? currentExample.map(file => {
            const { url, name } = file;
            return [url, name];
          })
        : [],
  };
}

function transformRecord2Server({ example = [], ...others }) {
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

function Index({ className, match }) {
  const [list, setList] = useState([]);
  const [matterId] = useState(match.params.matterId);
  const [selectedItem, setSelectedItem] = useState();

  const updateList = async () => {
    const { content, dictNames } = await Code2Name(
      APPLYMATERIAL.getApplyMaterialListUsingGET(matterId),
      ['SYCLLX', 'type'],
      ['SYBYX', 'necessity'],
      ['SYCLXS', 'form'],
    );

    setList(
      content.map(item => {
        return {
          ...transformRecord2Local(item),
          id: specialIdGenerator.next(),
          typeCn: dictNames.SYCLLX[item.type],
          formCn: dictNames.SYCLXS[item.form],
          necessityCn: dictNames.SYBYX[item.necessity],
        };
      }),
    );
  };

  const handleAdd = vals => {
    APPLYMATERIAL.updateOrAddApplyMaterialUsingPOST({
      body: {
        matterId,
        applyMaterials: [...list, vals].map(({ id, ...others }) => {
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleEdit = ({ id: lastId, ...nextVals }) => {
    APPLYMATERIAL.updateOrAddApplyMaterialUsingPOST({
      body: {
        matterId,
        applyMaterials: list.map(({ id, ...others }) => {
          if (id === lastId) {
            return transformRecord2Server(nextVals);
          }
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleDelete = ({ id }) => {
    APPLYMATERIAL.updateOrAddApplyMaterialUsingPOST({
      body: {
        matterId,
        applyMaterials: list
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
      url: `${applyMaterialExportUrl}/${matterId}`,
      name: '申请材料.xlsx',
    });
    onClose();
  };

  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: applyMaterialTemplateUrl, name: '申请材料导入模板.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="申请材料">
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
              添加材料
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>模版下载</TButton.Download>
            <DataImport
              btnText="导入材料"
              action={applyMaterialImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>导出材料</TButton.Output>
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
        columns={[
          {
            title: '序号',
            width: 100,
            render(_, record, index) {
              return index + 1;
            },
          },
          {
            title: '申请材料简称',
            dataIndex: 'stdName',
          },
          {
            title: '具体可证明材料',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '材料类型',
            dataIndex: 'typeCn',
            ellipsis: true,
          },
          {
            title: '每页审查要点',
            dataIndex: 'point',
            ellipsis: true,
          },
          {
            title: '审查要点规则说明',
            dataIndex: 'rule',
            ellipsis: true,
          },
          {
            title: '操作',
            width: 300,
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
                    confirmContent="删除审查要点将不可能再恢复,确定删除吗?"
                    onClick={() => {
                      handleDelete(record);
                    }}
                  >
                    删除
                  </OperateBar.Button>
                </OperateBar>
              );
            },
          },
        ]}
        dataSource={list}
        rowKey="id"
      />
      {selectedItem && (
        <ApplyMaterialEditor
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          setSelectedItem={setSelectedItem}
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default Index;
