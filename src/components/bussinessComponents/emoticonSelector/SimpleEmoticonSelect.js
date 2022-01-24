import React, { useEffect, useState } from 'react';
import { EXPRESSIONS } from '@/services/api';
import { Popover } from 'antd';
import { EmptyFn, TButton } from '@/components/tis_ui';
import classnames from 'classnames';
import { CloseCircleFilled } from '@ant-design/icons';
import EmoticonList from './EmoticonList';
import styles from './index.less';

function SimpleEmoticonSelect({ value = '', onChange = EmptyFn, disabled = false }) {
  const [initValue, setInitValue] = useState({});
  const [nextValue, setNextValue] = useState({});
  const [isShowSelect, setIsShowSelect] = useState(false);

  useEffect(() => {
    if (value) {
      EXPRESSIONS.getExpressionDetailUsingGET(value).then(res => {
        setInitValue(res);
        setNextValue(res);
      });
    } else {
      setInitValue({});
      setNextValue({});
    }
  }, [value]);

  useEffect(() => {
    setNextValue(initValue);
  }, [isShowSelect]);

  const { name, icon = {} } = initValue;

  function handleDelete(e) {
    setInitValue({});
    setNextValue({});
    onChange();
    e.stopPropagation();
  }

  return (
    <>
      <div
        className={classnames([styles.emoticonPreview, { [styles.previewDisabled]: disabled }])}
        title="选择表情"
        onClick={() => !disabled && setIsShowSelect(!isShowSelect)}
      >
        {icon.url ? <img src={icon.url} title={name} alt="" /> : <span>请选择</span>}
        {!disabled && icon.url && (
          <CloseCircleFilled
            title="删除图片"
            className={styles.emoticonDeleteBtn}
            onClick={handleDelete}
          />
        )}
      </div>
      <Popover
        visible={isShowSelect}
        content={
          <>
            <EmoticonList value={nextValue} onChange={setNextValue} multiple={false} />
            <TButton.Button
              type="primary"
              onClick={() => {
                onChange(nextValue.id);
                setIsShowSelect(false);
              }}
              style={{ marginRight: '10px' }}
            >
              确认
            </TButton.Button>
            <TButton.Button onClick={() => setIsShowSelect(false)}>关闭</TButton.Button>
          </>
        }
        trigger="click"
        placement="bottomLeft"
        overlayStyle={{ width: '45%' }}
      />
    </>
  );
}

export default SimpleEmoticonSelect;
