import React from 'react';
import classNames from 'classnames';
import { Item } from 'gg-editor';
import { connect } from 'dva';
import Styles from './index.less';

function OptionItem({ label, type, size, shape, color, className, nodeType, Icon }) {
  return (
    <div className={classNames(Styles.optionItem, className)}>
      <Item
        type={type}
        size={size}
        shape={shape}
        model={{
          color,
          label,
          nodeType,
        }}
      >
        <Icon className={Styles.optionIcon} />
        {label}
      </Item>
    </div>
  );
}

export default connect(({ dialogStudios }) => {
  return {
    currentDragType: dialogStudios.currentDragType,
  };
})(OptionItem);
