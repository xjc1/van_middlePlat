import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Styles from '../EditorItemPanel/settingPanel.less';
import SlotStyles from './index.less';
import { EmptyFn } from '@/components/tis_ui';
import EditSlot from './EditSlot';

function Index({ slot, theme, onClose = EmptyFn, dispatch }) {
  let formRef = null;

  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          {`${slot.id ? '编辑' : '创建'}槽位`}
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <div className={SlotStyles.slotEditPanel}>
          <div className={SlotStyles.slotEditPanelContent}>
            <EditSlot key={slot.id} initialValues={slot} onForm={(form) => {
              formRef = form;
            }} />
          </div>
          <div className={SlotStyles.slotEditPanelFooter}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                formRef.validateFields().then(nextVals => {
                  if (slot.id) {
                    dispatch({
                      type: 'dialogStudios/updateSlot',
                      slot: { ...nextVals, id: slot.id },
                    });
                  } else {
                    dispatch({
                      type: 'dialogStudios/addSlot',
                      slot: nextVals,
                    });
                  }
                  onClose();
                });
              }}
              block
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ dialogStudios }) => dialogStudios)(Index);
