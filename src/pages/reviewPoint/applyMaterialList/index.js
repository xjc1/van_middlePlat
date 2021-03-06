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
    const onClose = message.loading('?????????', 0);
    await commonDownload({
      url: `${applyMaterialExportUrl}/${matterId}`,
      name: '????????????.xlsx',
    });
    onClose();
  };

  // ????????????
  const downloadTemplate = async () => {
    const onClose = message.loading('?????????');
    await commonDownload({ url: applyMaterialTemplateUrl, name: '????????????????????????.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="????????????">
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
              ????????????
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>????????????</TButton.Download>
            <DataImport
              btnText="????????????"
              action={applyMaterialImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>????????????</TButton.Output>
          </Space>
          <TButton.Button
            onClick={() => {
              EventCenter.emit('goBack');
            }}
          >
            ???????????????????????????
          </TButton.Button>
        </div>
      </Card>
      <TTable
        columns={[
          {
            title: '??????',
            width: 100,
            render(_, record, index) {
              return index + 1;
            },
          },
          {
            title: '??????????????????',
            dataIndex: 'stdName',
          },
          {
            title: '?????????????????????',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '????????????',
            dataIndex: 'typeCn',
            ellipsis: true,
          },
          {
            title: '??????????????????',
            dataIndex: 'point',
            ellipsis: true,
          },
          {
            title: '????????????????????????',
            dataIndex: 'rule',
            ellipsis: true,
          },
          {
            title: '??????',
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
                    ??????
                  </OperateBar.Button>
                  <OperateBar.Button
                    onClick={() => {
                      setSelectedItem({
                        record,
                        readonly: false,
                      });
                    }}
                  >
                    ??????
                  </OperateBar.Button>
                  <OperateBar.Button
                    danger
                    confirmText="??????"
                    confirmContent="???????????????????????????????????????,????????????????"
                    onClick={() => {
                      handleDelete(record);
                    }}
                  >
                    ??????
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
