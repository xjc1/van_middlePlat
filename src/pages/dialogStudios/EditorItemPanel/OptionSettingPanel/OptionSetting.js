import React from 'react';
import classNames from 'classnames';
import { TButton, TItem } from '@/components/tis_ui';
import { Button, Form, Input } from 'antd';
import {
  LineOutlined,
  PlusOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from '@ant-design/icons';
import Styles from '../optionsFormListSetting.less';

function ConditionBranch({ name }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove, move }) => (
        <div className={Styles.optionSetting}>
          <div className={Styles.optionSettingHeader}>
            <div>选项配置</div>
            <Button type="link" onClick={() => add()} icon={<PlusOutlined />}>
              添加选项
            </Button>
          </div>
          <div className={Styles.optionSettingBody}>
            {fields.map(({ key, fieldKey, name: fieldName, ...others }, index) => {
              return (
                <div key={key} className={Styles.optionSettingCard}>
                  <TItem
                    name={[fieldName, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    label="选项"
                    {...others}
                  >
                    <Input />
                  </TItem>
                  <TItem
                    name={[fieldName, 'alias']}
                    fieldKey={[fieldKey, 'alias']}
                    label="友好名称"
                    {...others}
                  >
                    <Input />
                  </TItem>
                  <UpCircleOutlined
                    className={classNames(
                      Styles.optionSettingMiddleBtn,
                      Styles.optionSettingUp,
                      index === 0 && Styles.optionSettingMiddleBtnDisabled,
                    )}
                    onClick={() => {
                      move(index, index - 1);
                    }}
                  />
                  <DownCircleOutlined
                    className={classNames(
                      Styles.optionSettingMiddleBtn,
                      Styles.optionSettingDown,
                      index === fields.length - 1 && Styles.optionSettingMiddleBtnDisabled,
                    )}
                    onClick={() => {
                      move(index, index + 1);
                    }}
                  />
                  <div className={Styles.optionSettingFooter}>
                    <TButton.Button
                      shape="round"
                      className={Styles.optionSettingRemoveBtn}
                      icon={<LineOutlined />}
                      size="small"
                      onClick={() => {
                        remove(fieldName);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Form.List>
  );
}

export default ConditionBranch;
