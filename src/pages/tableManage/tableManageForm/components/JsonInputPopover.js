import React, { useState } from 'react';
import { Button, Popover, Divider, message, Space } from 'antd';
import { EmptyFn, CodeEditor } from '@/components/tis_ui';
import { useDebounceFn } from 'ahooks';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { InfoCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import styles from './jsonInputPopover.less';

function JsonInputPopover({ value = '', onChange = EmptyFn, btnText, title, example }) {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [codeValue, setCodeValue] = useState(value);
  const [IsJsonCheckPass, setIsJsonCheckPass] = useState(false);
  const { run: setCodeValueDebounce } = useDebounceFn(
    val => {
      setCodeValue(val);
      if (IsJsonCheckPass) {
        setIsJsonCheckPass(false);
      }
    },
    { wait: 500 },
  );
  return (
    <Popover
      title={
        <>
          <div>{title}</div>
          {example && (
            <div className={styles.codeTipText}>
              <Space>
                <span>示例:</span>
                <span>{example}</span>
              </Space>
            </div>
          )}
        </>
      }
      visible={popoverVisible}
      content={
        <>
          <CodeEditor
            mode="json"
            value={codeValue}
            onChange={newVal => {
              setCodeValueDebounce(newVal);
            }}
            height="300px"
          />
          <div className={styles.codeBottom}>
            <div className={styles.codeTipText}>
              <Space>
                <InfoCircleOutlined />
                <span>校验通过后才可点击确定</span>
              </Space>
            </div>
            <div>
              <Button
                onClick={() => {
                  setPopoverVisible(false);
                }}
              >
                取消
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                onClick={() => {
                  try {
                    const jsonData = JSON.parse(codeValue);
                    if (_.isObject(jsonData)) {
                      message.warn('校验通过');
                      setIsJsonCheckPass(true);
                    }
                  } catch (err) {
                    setIsJsonCheckPass(false);
                    message.warn('不是合法JSON字符串');
                  }
                }}
              >
                校验
              </Button>
              <Divider type="vertical" />
              <Button
                disabled={!IsJsonCheckPass}
                type="primary"
                onClick={() => {
                  const jsonData = JSON.parse(codeValue);
                  const valueArray = Array.isArray(jsonData) ? jsonData : [jsonData];
                  const valueArrayAppendKey = _.map(valueArray, item => ({
                    ...item,
                    key: IDGenerator.next('sampleData'),
                  }));
                  onChange(valueArrayAppendKey);
                  setPopoverVisible(false);
                }}
              >
                确定
              </Button>
            </div>
          </div>
        </>
      }
      trigger="click"
      onVisibleChange={visible => setPopoverVisible(visible)}
    >
      <Button type="primary">{btnText}</Button>
    </Popover>
  );
}

export default JsonInputPopover;
