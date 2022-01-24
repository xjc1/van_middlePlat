import React from 'react';
import classNames from 'classnames';
import CenterWrapper from './CenterWrapper';

const defaultStyle = {
  width: '100%',
  minHeight: '200px',
};

const ButtonHoc = React.memo(({ extraData = {}, className, style = defaultStyle }) => {
  console.log('-> extraData', extraData);
  const { src, alt = '' } = extraData;
  return (
    <CenterWrapper>
      <img src={src} alt={alt} className={classNames(className)} style={style} />
    </CenterWrapper>
  );
});

export default ButtonHoc;
