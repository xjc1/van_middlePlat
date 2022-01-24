import React from 'react';
import classNames from 'classnames';
import { EmptyFn, TButton, TLink } from '@/components/tis_ui';
import { Button, Form } from 'antd';
import {
  LineOutlined,
  PlusOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from '@ant-design/icons';
import PropTypes from "prop-types";
import Styles from './optionsFormListSetting.less';

function OptionsFormListSetting({
                                  name,
                                  title,
                                  addBtnTitle,
                                  children,
                                  endSlot = EmptyFn,
                                }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove, move }) => (
        <div className={Styles.optionSetting}>
          <div className={Styles.optionSettingHeader}>
            <div>{title}</div>
            <Button type="link" onClick={() => add()} icon={<PlusOutlined />}>
              {addBtnTitle}
            </Button>
          </div>
          <div className={Styles.optionSettingBody}>
            {fields.map(({ key, fieldKey, name: fieldName, ...others }, index) => {
              return (
                <div key={key} className={Styles.optionSettingCard}>
                  {
                    children({ fieldName, fieldKey, others })
                  }
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
                    <TButton.Button shape="round"
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
            {
              endSlot()
            }
          </div>
        </div>
      )}
    </Form.List>
  );
}

OptionsFormListSetting.propTypes = {
  title: PropTypes.string.isRequired,
  addBtnTitle: PropTypes.string,
};

OptionsFormListSetting.defaultProps = {
  addBtnTitle: '添加选项',
};

export default OptionsFormListSetting;
