/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { outerEventEmitter } from '../utils/EventCenter';

const OUTER_PRE = '_OUTER_';

function Index({ title = '', src = '' }) {
  const [innerHeight, setInnerHeight] = useState('100%');

  useEffect(() => {
    // iframe 滚动条
    outerEventEmitter.addListener(`${OUTER_PRE}RESIZE`, height => setInnerHeight(height + 500));

    return () => {
      outerEventEmitter.removeListener(`${OUTER_PRE}RESIZE`, () => {});
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyItems: 'center',
        height: innerHeight,
      }}
    >
      <iframe
        style={{
          width: '100%',
          border: 0,
          height: '100%',
        }}
        title={title || src}
        src={src}
      />
    </div>
  );
}

Index.propTypes = {
  /** iframe 唯一标题 */
  title: PropTypes.string,
  /** iframe 资源内容 */
  src: PropTypes.string.isRequired,
};

export default Index;
