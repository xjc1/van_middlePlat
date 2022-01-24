import React, { useEffect, useState } from 'react';
import GoldenLayout from '@/layouts/goldenLayout';
import Regions from '@/layouts/goldenLayout/Regions';
import Region from '@/layouts/goldenLayout/Region';
import Toolbar from '@/layouts/goldenLayout/Toolbar';
import classNames from 'classnames';
import { ExpandOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from '@/components/react-dnd';
import WidgetWrapperView from '../designStudios/widgetWrapperView';
import ValidationPanel from '../designStudios/validationPanel';
import EventPanel from '../designStudios/eventPanel';
import { CORE } from '@/services/api';
import FormDefinitionQuestionnaire from './questionnaireFormDefinition';
import { connect } from 'dva';
import Assistant from '../designStudios/assistant';
import Styles from '@/layouts/goldenLayout/toolbar.less';
import FormDesigner from '../designStudios/FormDesigner';
import QuestionnaireAssets from './questionnaireAssets';
import FormDesignerStyles from '@/pages/designStudios/FormDesigner/index.less';

function Index({ dispatch }) {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    CORE.getApiInterfacesUsingGET({}).then(({ content: apis }) => {
      dispatch({
        type: 'interfaceManage/saveApis',
        apis,
      });
    });

    return () => {
      dispatch({
        type: 'formDesigner/exitEditor',
      });
    };
  }, []);

  return (
    <GoldenLayout fullScreen={fullScreen}>
      <DndProvider backend={HTML5Backend}>
        <Toolbar>
          <ul className={classNames(Styles.goldenToolbar, Styles.toolbarTop)}>
            <li />
          </ul>
          <ul className={classNames(Styles.goldenToolbar, Styles.toolbarBottom)}>
            <li />
            {fullScreen && (
              <li className={Styles.active}>
                <ExpandOutlined onClick={() => setFullScreen(false)} />
              </li>
            )}
            {!fullScreen && (
              <li>
                <ExpandOutlined onClick={() => setFullScreen(true)} />
              </li>
            )}
            <li />
          </ul>
        </Toolbar>
        <Regions width="70%" divider_r divider_t divider_b>
          <FormDefinitionQuestionnaire id="formDefinition" name="问卷表单" />
          <FormDesigner id="formDesigner" name="表单设计器">
            <QuestionnaireAssets className={FormDesignerStyles.formDesignerAssets} />
          </FormDesigner>
          <Region id="staticValidation" name="静态校验配置">
            <ValidationPanel />
          </Region>
        </Regions>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto',
          }}
        >
          <Regions divider_t divider_b>
            <Region id="1" name="表单详细设置">
              <WidgetWrapperView />
            </Region>
            <Region id="2" name="事件查看">
              <EventPanel />
            </Region>
            <Region id="4" name="助手">
              <Assistant />
            </Region>
          </Regions>
        </div>
      </DndProvider>
    </GoldenLayout>
  );
}

export default connect()(Index);
