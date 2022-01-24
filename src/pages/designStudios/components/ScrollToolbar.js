import React from 'react';
import _ from 'lodash';
import { Anchor } from 'antd';

function ScrollToolbar({ anchors = [], ...others }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '0px',
        zIndex: '5',
      }}
    >
      <Anchor {...others}>
        {_.map(anchors, ({ icon, anchorId }) => {
          return <Anchor.Link href={`#${anchorId}`}>{icon}</Anchor.Link>;
        })}
      </Anchor>
    </div>
  );
}

export default ScrollToolbar;
