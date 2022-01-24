import React from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IDGenerator } from '@tong/assistant';
import ConditionCard from './ConditionCard';
import Styles from './index.less';

function ConditionBranch({ name }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div className={Styles.conditionBranch}>
          <div className={Styles.conditionBranchHeader}>
            <div>分支条件设置</div>
            <Button
              type="link"
              onClick={() => {
                const nextId = IDGenerator.next();
                add({ label: `条件${nextId}`, id: nextId });
              }}
              icon={<PlusOutlined />}
            >
              新增加
            </Button>
          </div>
          <div className={Styles.conditionBranchBody}>
            {fields.map(({ key, fieldKey, name: fieldName, ...others }) => {
              return (
                <ConditionCard
                  key={key}
                  name={name}
                  names={[fieldName]}
                  fieldKeys={[fieldKey]}
                  others={others}
                  isSatisfy={fieldName === 0}
                  onRemove={() => {
                    remove(fieldName);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </Form.List>
  );
}

export default ConditionBranch;
