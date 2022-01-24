import React, { useEffect, useState } from 'react';
import { Input, Button, Alert, Switch, Space, message } from 'antd';
import _ from 'lodash';
import { EmptyFn, EditCellAbleTable, utils, TButton, DataImport } from '@/components/tis_ui';
import { useUpdateEffect } from 'ahooks';
import commonDownload from '@/services/commonDownload';
import Styles from './index.less';
import { DictSelect } from '@/components/bussinessComponents';
import { matterFormTemplateUrl, matterFormImportUrl, matterFormExportUrl } from '@/constants';
import ShareFormConfigModal from './ShareFormConfigModal';

const { IDGenerator } = utils;

const fieldIDGenerator = new IDGenerator('field');

function Index({
  formInstance = {},
  isChanged = false,
  setIsChanged = EmptyFn,
  onSave = EmptyFn,
  onRefresh = EmptyFn,
}) {
  const [queryStr, setQueryStr] = useState();
  const [fieldToShare, setFieldToShare] = useState(null);

  const [cleanFields, setCleanFields] = useState(() => {
    const { fields = [] } = formInstance;
    return _.map(fields, (item, index) => {
      return {
        id: fieldIDGenerator.next(),
        index: index + 1,
        ...item,
      };
    });
  });

  useEffect(() => {
    setIsChanged(false);
  }, []);

  useUpdateEffect(() => {
    setIsChanged(true);
  }, [cleanFields]);

  const renderFields = queryStr
    ? _.filter(cleanFields, ({ fieldName }) => _.includes(fieldName, queryStr))
    : cleanFields;

  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中', 0);
    await commonDownload({ url: matterFormTemplateUrl, name: '事项表单导入模板.xlsx' });
    onClose();
  };

  const formExport = query => {
    const onClose = message.loading('表单导出中', 0);
    commonDownload({
      url: matterFormExportUrl,
      name: '表单.xls',
      method: 'POST',
      condition: { ...query },
    }).then(() => {
      onClose();
      message.success('导出成功！');
    });
  };

  const renderOperations = ({ record = {}, initialOperation }) => {
    return (
      <>
        {record.share && (
          <Button
            type="link"
            onClick={() => {
              const { id, useField } = record;
              setFieldToShare({ id, useField });
            }}
          >
            共享源
          </Button>
        )}
        {initialOperation}
      </>
    );
  };

  return (
    <div className={Styles.formConfig}>
      <Alert
        style={{ textAlign: 'center', marginBottom: 10 }}
        message={
          <div className={Styles.formSplitHeader}>
            <span className={Styles.formSplitWarring}>
              注意：编辑完不要忘了保存! 可以重复保存，防止丢失配置。
            </span>
            <div>
              <Button
                type="primary"
                disabled={!isChanged}
                onClick={() => {
                  onSave(
                    _.map(
                      cleanFields,
                      ({ index, id, standardFieldName, classification, ...others }) => {
                        return others;
                      },
                    ),
                  );
                }}
              >
                保存表单配置
              </Button>
            </div>
          </div>
        }
        type="warning"
      />
      <EditCellAbleTable
        title={() => {
          return (
            <div className={Styles.formConfigHeader}>
              <span className={Styles.formConfigHeaderTitle}>{formInstance.name}</span>
              <Space>
                <DataImport
                  btnText="导入表单"
                  action={matterFormImportUrl}
                  refresh={() => {
                    onRefresh(formInstance);
                  }}
                  data={{ formId: formInstance.id }}
                  type="link"
                  ghost={false}
                  icon={null}
                />
                <TButton.Output
                  onClick={() => {
                    formExport({ formId: formInstance.id });
                  }}
                >
                  导出表单
                </TButton.Output>
                <TButton.Download onClick={downloadTemplate}>模版下载</TButton.Download>
                <Input.Search
                  placeholder="输入表单项名称查询"
                  style={{ width: 250 }}
                  onSearch={setQueryStr}
                />
              </Space>
            </div>
          );
        }}
        columns={[
          {
            title: '序号',
            dataIndex: 'index',
            width: '8%',
          },
          {
            title: '角色',
            dataIndex: 'role',
            width: '16%',
            render: (role, record) => {
              return (
                <DictSelect
                  dict="CYZT"
                  allowClear
                  placeholder="角色"
                  value={role}
                  onChange={nextVal => {
                    setCleanFields(
                      _.map(cleanFields, field => {
                        if (field.id === record.id) {
                          return {
                            ...field,
                            role: nextVal,
                          };
                        }
                        return field;
                      }),
                    );
                  }}
                />
              );
            },
          },
          {
            title: '表单项名称',
            dataIndex: 'fieldName',
            width: '20%',
            editable: true,
          },
          {
            title: '标准字段名称',
            dataIndex: 'standardFieldName',
            width: '18%',
          },
          {
            title: '标准字段分类',
            dataIndex: 'classification',
            width: '18%',
          },
          {
            title: '是否共享',
            dataIndex: 'share',
            width: '12%',
            render: (isShare, record) => {
              return (
                <Switch
                  checked={isShare}
                  onChange={nextVal => {
                    setCleanFields(
                      _.map(cleanFields, field => {
                        if (field.id === record.id) {
                          return {
                            ...field,
                            share: nextVal,
                          };
                        }
                        return field;
                      }),
                    );
                  }}
                />
              );
            },
          },
        ]}
        renderOperations={renderOperations}
        bordered
        size="small"
        scroll={{ y: 500 }}
        dataSource={renderFields}
        pagination={false}
        changeDataSource={setCleanFields}
        rowKey="id"
      />

      {fieldToShare && (
        <ShareFormConfigModal
          initialValues={fieldToShare}
          onOk={fieldValue => {
            setCleanFields(
              _.map(cleanFields, field => {
                if (field.id === fieldToShare.id) {
                  return {
                    ...field,
                    ...fieldValue,
                  };
                }
                return field;
              }),
            );
            setFieldToShare(null);
          }}
          onCancel={() => setFieldToShare(null)}
        />
      )}
    </div>
  );
}

export default Index;
