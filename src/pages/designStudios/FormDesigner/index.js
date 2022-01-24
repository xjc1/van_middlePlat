import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Region from '@/layouts/goldenLayout/Region';
import {
  DesktopOutlined,
  MobileOutlined,
  DeleteOutlined,
  SaveOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from 'antd';
import { connect } from 'dva';
import FormCanvas from './FormCanvas';
import Styles from './index.less';
import ToolbarStyles from '../components/GoldenToolbar.less';
import GoldenToolbar from '../components/GoldenToolbar';
import { TButton } from '@/components/tis_ui';

const FORM_CANVAS_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
};

function FormDesigner({ formData, dispatch, formDetail, children, configList, ...others }) {
  const [formCanvasType, setFormCanvasType] = useState(FORM_CANVAS_TYPE.DESKTOP);
  const formName = _.get(formDetail, 'name');
  const { nextLayer = [] } = _.find(configList, ['code', 'oneForm']) || {};
  const { value: previewUrl } = _.find(nextLayer, ['code', 'previewURL']) || {};

  const resetSelected = useCallback(() => {
    dispatch({
      type: 'formDesigner/resetSelected',
    });
  }, []);

  return (
    <Region {...others}>
      <div className={Styles.formDesignerFull}>
        {children}
        <div className={Styles.formDesignerCanvas}>
          <GoldenToolbar>
            <ul>
              <li
                className={classNames(
                  formCanvasType === FORM_CANVAS_TYPE.DESKTOP && ToolbarStyles.active,
                )}
                onClick={() => setFormCanvasType(FORM_CANVAS_TYPE.DESKTOP)}
              >
                <DesktopOutlined />
              </li>
              <li
                className={classNames(
                  formCanvasType === FORM_CANVAS_TYPE.MOBILE && ToolbarStyles.active,
                )}
                onClick={() => setFormCanvasType(FORM_CANVAS_TYPE.MOBILE)}
              >
                <MobileOutlined />
              </li>
            </ul>
            <GoldenToolbar.Divider />
            <ul>
              <li className={ToolbarStyles.text}>
                <a onClick={resetSelected}>{formName}</a>
              </li>
            </ul>
            <ul className={ToolbarStyles.right}>
              <li onClick={() => setFormCanvasType(FORM_CANVAS_TYPE.DESKTOP)}>
                <DeleteOutlined />
              </li>
              {formData && (
                <>
                  <li onClick={() => setFormCanvasType(FORM_CANVAS_TYPE.DESKTOP)}>
                    <Button
                      icon={<SaveOutlined />}
                      type="primary"
                      onClick={() => {
                        dispatch({
                          type: 'formDesigner/save',
                        });
                      }}
                      size="small"
                    >
                      保存
                    </Button>
                  </li>
                  <li>
                    <TButton.Button
                      confirmText="确定要退出表单编辑吗?"
                      icon={<LogoutOutlined />}
                      onClick={() => {
                        dispatch({
                          type: 'formDesigner/exitEditor',
                        });
                      }}
                      size="small"
                    >
                      退出
                    </TButton.Button>
                  </li>
                  <li>
                    <TButton.Button
                      disabled={!previewUrl}
                      onClick={() => {
                        const { id } = formDetail;
                        window.open(`${previewUrl}?id=${id}`);
                      }}
                      size="small"
                    >
                      预览
                    </TButton.Button>
                  </li>
                </>
              )}
            </ul>
          </GoldenToolbar>
          <FormCanvas formData={formData} />
        </div>
      </div>
    </Region>
  );
}

export default connect(({ formDesigner, systemParamsConfig }) => {
  return { ...formDesigner, ...systemParamsConfig };
})(FormDesigner);
