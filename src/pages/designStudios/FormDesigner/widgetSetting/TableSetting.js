import React, { useCallback, useState } from 'react';
import { EmptyFn, TSelect, TSwitch } from '@/components/tis_ui';
import { Button, Divider, Form, Input, Select, Space, Tag, Modal } from 'antd';
import {
  CloseOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import SettingStyle from '@/pages/designStudios/FormDesigner/widgetSetting/widgetSetting.less';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';
import ValidateSetting from '@/pages/designStudios/validateSetting';

function TableSetting({ onUpdate = EmptyFn, widgetConfig = {}, ctxSchema = [] }) {
  const { columns = [], canPagination = false } = widgetConfig;
  const [rulesTemp, setRulesTemp] = useState();
  const [formRef] = Form.useForm();
  const [childrenWidgets] = useState([
    infoes.input,
    infoes.select,
    infoes.datePicker,
    infoes.inputNumber,
  ]);

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(values => {
      onUpdate({
        widgetConfig: values,
      });
    });
  }, [formRef]);

  return (
    <>
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionDatasource)}>
        <Divider orientation="left">表格配置</Divider>
        <Form
          form={formRef}
          initialValues={{
            columns,
            canPagination,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="canPagination" label="可分页" labelCol={{ span: 6 }}>
            <TSwitch />
          </Form.Item>
          <h2>字段配置</h2>
          <Form.List name="columns">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map(({ key, fieldKey, name: fieldName, ...others }, index) => {
                  return (
                    <div key={key} className={SettingStyle.columnSetting}>
                      <div className={SettingStyle.columnSettingRmBtn}>
                        <Space>
                          <VerticalAlignBottomOutlined
                            style={{ color: '#1890ff' }}
                            onClick={() => {
                              move(index, index + 1);
                            }}
                          />

                          <VerticalAlignTopOutlined
                            style={{ color: '#1890ff' }}
                            onClick={() => {
                              move(index, index - 1);
                            }}
                          />

                          <CloseOutlined
                            style={{ color: '#ff4d4f' }}
                            onClick={() => remove(fieldName)}
                          />
                        </Space>
                      </div>
                      <Form.Item
                        name={[fieldName, 'id']}
                        fieldKey={[fieldKey, 'id']}
                        label="字段id"
                        labelCol={{ span: 6 }}
                        {...others}
                      >
                        <Input allowClear />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'label']}
                        fieldKey={[fieldKey, 'label']}
                        label="列名称"
                        labelCol={{ span: 6 }}
                      >
                        <Input allowClear />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'field']}
                        fieldKey={[fieldKey, 'field']}
                        label="控件类型"
                        labelCol={{ span: 6 }}
                        {...others}
                      >
                        <TSelect allowClear>
                          {_.map(childrenWidgets, ({ id, name, iconfont, element: { field } }) => {
                            return (
                              <Select.Option key={id} value={field}>
                                <i className={classNames(Styles.selectIcon, iconfont)} />
                                {name}
                              </Select.Option>
                            );
                          })}
                        </TSelect>
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'dataSource']}
                        fieldKey={[fieldKey, 'dataSource']}
                        label="数据源"
                        labelCol={{ span: 6 }}
                        {...others}
                      >
                        <TSelect allowClear>
                          {_.map(ctxSchema, ({ pathKey }) => {
                            const ctxKey = pathKey.join('.');
                            return (
                              <TSelect.Option value={ctxKey} key={ctxKey} label={ctxKey}>
                                <Tag color="orange">上下文</Tag>
                                {ctxKey}
                              </TSelect.Option>
                            );
                          })}
                        </TSelect>
                      </Form.Item>

                      <Form.Item
                        label="自定义class"
                        name={[fieldName, 'extraClass']}
                        labelCol={{ span: 6 }}
                        {...others}
                      >
                        <TSelect
                          open={false}
                          mode="tags"
                          placeholder="输入您的自定义的class,用于控制风格"
                        />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'canPreview']}
                        label="可预览"
                        labelCol={{ span: 6 }}
                        {...others}
                      >
                        <TSwitch />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          onClick={() => {
                            const column = columns[key];
                            const { validator = {} } = column;
                            setRulesTemp({ key, rules: validator.rules });
                          }}
                        >
                          添加表单校验
                        </Button>
                      </Form.Item>
                    </div>
                  );
                })}
                <Button onClick={() => add()}>添加</Button>
              </>
            )}
          </Form.List>
        </Form>
        <Modal
          visible={!!rulesTemp}
          title="表单校验配置"
          width={600}
          onOk={() => {
            const nextColumns = _.map(columns, (column, index) => {
              if (index === rulesTemp.key) {
                return {
                  ...column,
                  validator: {
                    rules: rulesTemp.rules,
                  },
                };
              }
              return column;
            });
            onUpdate({
              widgetConfig: {
                ...widgetConfig,
                columns: nextColumns,
              },
            });
            setRulesTemp();
          }}
          onCancel={() => {
            setRulesTemp();
          }}
        >
          <Divider orientation="left">表单校验</Divider>
          <ValidateSetting
            rules={rulesTemp && rulesTemp.rules}
            onUpdate={({ rules: nextRules }) => {
              setRulesTemp({
                ...rulesTemp,
                rules: nextRules,
              });
            }}
          />
        </Modal>
      </div>
    </>
  );
}

TableSetting.validateAble = false;
TableSetting.linkAble = true;

export default TableSetting;
