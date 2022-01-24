import React from 'react';
import { Row } from 'antd';
import _ from 'lodash';
import wrappers, { names as wrapperNames } from '../../wrappers';
import FrWrapper from './FrWrapper';

function RenderWrapper({ field = wrapperNames.block, content = [], ...wrapOthers }) {
  const WrapperRender = wrappers[field];

  return (
    <WrapperRender {...wrapOthers}>
      {
        <Row>
          {_.map(content, ({ id, ...others }) => (
            <FrWrapper key={id} id={id} {...others} />
          ))}
        </Row>
      }
    </WrapperRender>
  );
}

export default RenderWrapper;
