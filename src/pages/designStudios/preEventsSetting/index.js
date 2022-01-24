import React, { useCallback, useState } from 'react';
import Styles from './index.less';
import _ from 'lodash';
import PreEvent from '@/pages/designStudios/preEventsSetting/PreEvent';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { connect } from 'dva';
import {
  transformCtxField,
  transformReqField,
} from '@/pages/designStudios/components/InterfaceFieldSelect';

function Index({ preEvents = [], dispatch }) {
  const newPreEvent = useCallback(() => {
    dispatch({
      type: 'formDesigner/updateRootItem',
      payload: {
        preEvents: [...preEvents, { id: IDGenerator.nextName('preEvents', 10) }],
      },
    });
  });

  const onEventsChange = useCallback(nextEvent => {
    const events = _.map(preEvents, event => {
      if (event.id === nextEvent.id) {
        return nextEvent;
      }
      return event;
    });
    dispatch({
      type: 'formDesigner/updateRootItem',
      payload: {
        preEvents: events,
      },
    });
  });

  const onCloseEvent = useCallback(eid => {
    const events = _.filter(preEvents, event => {
      return event.id !== eid;
    });
    dispatch({
      type: 'formDesigner/updateRootItem',
      payload: {
        preEvents: events,
      },
    });
  });

  return (
    <div className={Styles.preEventsSetting}>
      {_.map(preEvents, ({ id, ...others }) => {
        const { ctxField = [], reqFields = [] } = others;
        return (
          <PreEvent
            key={id}
            eid={id}
            formData={{
              ...others,
              ctxField: transformCtxField(ctxField),
              reqFields: transformReqField(reqFields),
            }}
            onEventsChange={onEventsChange}
            onCloseEvent={onCloseEvent}
          />
        );
      })}
      <div className={Styles.preEventAddWrapper}>
        <Button type="primary" onClick={newPreEvent} icon={<PlusOutlined />} size="small">
          新建前置事件
        </Button>
      </div>
    </div>
  );
}

export default connect()(Index);
