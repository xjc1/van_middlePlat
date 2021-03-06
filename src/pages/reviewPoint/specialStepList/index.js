import React, { useEffect, useState } from 'react';
import { TTable, TButton, utils, OperateBar, EventCenter, DataImport } from '@/components/tis_ui';
import { SPECIALSTEP } from '@/services/api';
import { Card, Space, message } from 'antd';
import SpecialStepEditor from '@/pages/reviewPoint/specialStepList/SpecialStepEditor';
import { Code2Name } from '@/utils/DictTools';
import commonDownload from '@/services/commonDownload';
import { specialStepExportUrl, specialStepImportUrl, specialStepTemplateUrl } from '@/constants';

const { IDGenerator } = utils;

const specialIdGenerator = new IDGenerator('special');

function Index({ className, match }) {
  const [list, setList] = useState([]);
  const [matterId] = useState(match.params.matterId);
  const [selectedItem, setSelectedItem] = useState();

  const updateList = async () => {
    const { content, dictNames } = await Code2Name(
      SPECIALSTEP.getSpecialStepListUsingGET(matterId),
      ['SYTBCX', 'type'],
    );
    setList(
      content.map(item => {
        return {
          ...item,
          id: specialIdGenerator.next(),
          typeCn: dictNames.SYTBCX[item.type],
        };
      }),
    );
  };

  const handleAdd = vals => {
    SPECIALSTEP.updateOrAddSpecialStepUsingPOST({
      body: {
        matterId,
        specialSteps: [...list, vals].map(({ id, ...others }) => {
          return others;
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleEdit = (nextId, vals) => {
    SPECIALSTEP.updateOrAddSpecialStepUsingPOST({
      body: {
        matterId,
        specialSteps: list.map(({ id, ...others }) => {
          if (id === nextId) {
            return vals;
          }
          return others;
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleDelete = ({ id }) => {
    SPECIALSTEP.updateOrAddSpecialStepUsingPOST({
      body: {
        matterId,
        specialSteps: list
          .filter(item => item.id !== id)
          .map(({ _id, ...others }) => {
            return others;
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
      url: `${specialStepExportUrl}/${matterId}`,
      name: '????????????.xlsx',
    });
    onClose();
  };

  // ????????????
  const downloadTemplate = async () => {
    const onClose = message.loading('?????????');
    await commonDownload({ url: specialStepTemplateUrl, name: '????????????????????????.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="????????????">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <TButton.Create
              onClick={() => {
                setSelectedItem({ readonly: false });
              }}
            >
              ??????????????????
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>????????????</TButton.Download>
            <DataImport
              btnText="??????????????????"
              action={specialStepImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>??????????????????</TButton.Output>
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
            dataIndex: 'typeCn',
          },
          {
            title: '????????????????????????',
            dataIndex: 'checkPoint',
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
        <SpecialStepEditor
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
