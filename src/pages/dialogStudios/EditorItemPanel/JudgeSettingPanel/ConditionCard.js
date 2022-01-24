import React from 'react';
import { Divider, Form, Input } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import Styles from './index.less';
import { TItem, TButton } from '@/components/tis_ui';
import ConditionSelect from './ConditionSelect';

function ConditionCard({ name, names, fieldKeys, onRemove, isSatisfy = false, others }) {
  return (
    <div className={Styles.conditionBranchCard}>
      <TItem
        name={[...names, 'label']}
        fieldKey={[...fieldKeys, 'label']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={isSatisfy ? '如果满足条件' : '当不满足以上条件, 但满足'}
        {...others}
      >
        <Input />
      </TItem>
      <TItem name={[...names, 'edgeId']} className={Styles.conditionBranchHideFormItem}>
        <Input disabled />
      </TItem>
      <Form.Item dependencies={[[...names, 'or'].join('.')]} noStyle>
        {({ getFieldValue }) => {
          const conditionWithOr = getFieldValue([name, ...names, 'or']) || [];
          if (conditionWithOr.length === 0) {
            return (
              <>
                <Divider>AND</Divider>
                <TItem
                  name={[...names, 'and']}
                  fieldKey={[...fieldKeys, 'and']}
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  {...others}
                >
                  <ConditionSelect type={ConditionSelect.CONDITION_TYPES.AND} cIndex={name} />
                </TItem>
              </>
            );
          }
          return null;
        }}
      </Form.Item>
      <Form.Item dependencies={[[...names, 'and'].join('.')]} noStyle>
        {({ getFieldValue }) => {
          const conditionWithAdd = getFieldValue([name, ...names, 'and']) || [];
          if (conditionWithAdd.length === 0) {
            return (
              <>
                <Divider>OR</Divider>
                <TItem
                  name={[...names, 'or']}
                  fieldKey={[...fieldKeys, 'or']}
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  {...others}
                >
                  <ConditionSelect type={ConditionSelect.CONDITION_TYPES.OR} />
                </TItem>
              </>
            );
          }
          return null;
        }}
      </Form.Item>
      <Form.Item dependencies={[[...names, 'edgeId'].join('.')]} noStyle>
        {({ getFieldValue }) => {
          const edgeId = getFieldValue([name, ...names, 'edgeId']);
          return (
            <div className={Styles.conditionBranchFooter}>
              <TButton.Button
                shape="round"
                confirmText="警告"
                disabled={edgeId}
                confirmContent="确定是否删除此分支条件设置？"
                className={Styles.conditionBranchRemoveBtn}
                icon={<LineOutlined />}
                size="small"
                onClick={onRemove}
              />
            </div>
          );
        }}
      </Form.Item>
    </div>
  );
}

export default ConditionCard;
