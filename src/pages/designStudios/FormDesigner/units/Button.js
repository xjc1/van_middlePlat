import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import CenterWrapper from './CenterWrapper';
import Styles from './index.less';

const defaultStyle = {
  width: '100%',
};

const ButtonHoc = React.memo(({ extraData = {}, className, style = defaultStyle }) => {
  const { text = '未指定按钮内容', buttonType = 'default' } = extraData;
  return (
    <CenterWrapper>
      <Button className={classNames(className, Styles.frButton, Styles[buttonType])} style={style}>
        {text}
      </Button>
    </CenterWrapper>
  );
});

export default ButtonHoc;
