import React, { useEffect, useState } from 'react';
import { TTable, TButton, utils, OperateBar, EventCenter, DataImport } from '@/components/tis_ui';
import { APPLYCONDITION } from '@/services/api';
import { Card, Image, Space, message } from 'antd';
import ApplyConditionEditor from './applyConditionEditor';
import { Code2Name } from '@/utils/DictTools';
import commonDownload from '@/services/commonDownload';
import {
  applyConditionExportUrl,
  applyConditionImportUrl,
  applyConditionTemplateUrl,
} from '@/constants';

const { IDGenerator } = utils;

const specialIdGenerator = new IDGenerator('applicationCondition');

function transformRecord2Local({ checkExample = [], preMatter = [], ...others }) {
  const currentCheckExample = checkExample.filter(item => item);
  return {
    ...others,
    checkExample:
      currentCheckExample.length > 0
        ? currentCheckExample.map(file => {
            const { url, name } = file;
            return [url, name];
          })
        : [undefined], // 至少展示一个
    preMatter: preMatter.map(({ id }) => id),
  };
}

function transformRecord2Server({ checkExample = [], preMatter = [], ...others }) {
  return {
    ...others,
    checkExample: checkExample
      .filter(item => item)
      .map(item => {
        const [url, name] = item;
        return {
          name,
          url,
        };
      }),
    preMatter: preMatter.map(({ value }) => value),
  };
}

function Index({ className, match }) {
  const [list, setList] = useState([]);
  const [matterId] = useState(match.params.matterId);
  const [selectedItem, setSelectedItem] = useState();

  const updateList = async () => {
    const { content, dictNames } = await Code2Name(
      APPLYCONDITION.getApplyConditionListUsingGET(matterId),
      ['SYSQTJ', 'type'],
    );

    setList(
      content.map(item => {
        return {
          ...transformRecord2Local(item),
          id: specialIdGenerator.next(),
          typeCn: dictNames.SYSQTJ[item.type],
        };
      }),
    );
  };

  const handleAdd = vals => {
    APPLYCONDITION.updateOrAddApplyConditionUsingPOST({
      body: {
        matterId,
        applyConditions: [...list, vals].map(({ id, ...others }) => {
          return transformRecord2Server(others);
        }),
      },
    }).then(() => {
      updateList();
      setSelectedItem(null);
    });
  };

  const handleEdit = ({ id: lastId, ...nextVals }) => {
    APPLYCONDITION.updateOrAddApplyConditionUsingPOST({
      body: {
        matterId,
        applyConditions: list.map(({ id, ...others }) => {
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
    APPLYCONDITION.updateOrAddApplyConditionUsingPOST({
      body: {
        matterId,
        applyConditions: list
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
      url: `${applyConditionExportUrl}/${matterId}`,
      name: '申请条件.xlsx',
    });
    onClose();
  };

  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: applyConditionTemplateUrl, name: '申请条件导入模板.xlsx' });
    onClose();
  };

  return (
    <div className={className}>
      <Card bordered={false} style={{ marginBottom: 10 }} title="申请条件">
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
              添加申请条件
            </TButton.Create>
            <TButton.Download onClick={downloadTemplate}>模版下载</TButton.Download>
            <DataImport
              btnText="导入申请条件"
              action={applyConditionImportUrl}
              refresh={updateList}
              data={{ matterId }}
            />
            <TButton.Output onClick={handleExport}>导出申请条件</TButton.Output>
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
            title: '申请条件类型',
            dataIndex: 'typeCn',
          },
          {
            title: '申请条件审查要点',
            dataIndex: 'checkName',
            ellipsis: true,
          },
          {
            title: '审查要点规则说明',
            dataIndex: 'checkRule',
            ellipsis: true,
          },
          {
            title: '审查要点的材料样例',
            dataIndex: 'checkExample',
            ellipsis: true,
            render(imags = []) {
              return imags
                .filter(img => img)
                .map(file => {
                  const [url] = file;
                  return (
                    <Image
                      height={40}
                      width={40}
                      src={url}
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
        <ApplyConditionEditor
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
