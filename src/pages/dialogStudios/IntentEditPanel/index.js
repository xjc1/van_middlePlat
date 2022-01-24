import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Styles from '../EditorItemPanel/settingPanel.less';
import IntentStyles from './index.less';
import { EmptyFn } from '@/components/tis_ui';
import EditIntent from './EditIntent';

function Index({ intent, theme, onClose = EmptyFn, dispatch }) {
  let formRef = null;

  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          {`${intent.id ? '编辑' : '创建'}意图`}
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <div className={IntentStyles.intentEditPanel}>
          <div className={IntentStyles.intentEditPanelContent}>
            <EditIntent
              key={intent.id}
              initialValues={intent}
              onForm={form => {
                formRef = form;
              }}
            />
          </div>
          <div className={IntentStyles.intentEditPanelFooter}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                formRef.validateFields().then(nextVals => {
                  if (intent.id) {
                    dispatch({
                      type: 'dialogStudios/updateIntent',
                      intent: { ...nextVals, id: intent.id },
                    });
                  } else {
                    dispatch({
                      type: 'dialogStudios/addIntent',
                      intent: nextVals,
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
