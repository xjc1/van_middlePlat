import React, { useCallback } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import FieldEditor from './FieldEditor';
import Styles from './index.less';

function FieldPanel({ selectedItem, dispatch }) {
  const saveItem = useCallback(() => {
    dispatch({
      type: 'fieldStore/saveItem',
    });
  }, [selectedItem]);

  return (
    <div>
      {selectedItem ? (
        <>
          <div className={Styles.fieldPanel}>
            <FieldEditor key={selectedItem.id} widget={selectedItem} />
          </div>
          <div className={Styles.panelTitle}>
            <span>{selectedItem.name}</span>
            <Button type="link" onClick={saveItem}>
              保存字段
            </Button>
          </div>
        </>
      ) : (
        <div>请从左侧点击编辑字段</div>
      )}
    </div>
  );
}

export default connect(({ fieldStore }) => {
  return {
    selectedItem: fieldStore.selectedItem,
    list: fieldStore.list,
  };
})(FieldPanel);
