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
    const onClose = message.loading('导出中', 0);
    await commonDownload({
      url: `${specialStepExportUrl}/${matterId}`,
      name: '特别程序.xlsx',
    });
    onClose();
  };

  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: specialStepTemplateUrl, name: '特别程序导入模板.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="特别程序">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <TButton.Create
              onClick={() => {
                setSelectedItem({ readonly: false });
              }}
            >
              添加特别程序
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>模版下载</TButton.Download>
            <DataImport
              btnText="导入特别程序"
              action={specialStepImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>导出特别程序</TButton.Output>
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
            title: '特别程序类型',
            dataIndex: 'typeCn',
          },
          {
            title: '特别程序审查要点',
            dataIndex: 'checkPoint',
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
                    confirmContent="删除特别程序将不可能再恢复,确定删除吗?"
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
