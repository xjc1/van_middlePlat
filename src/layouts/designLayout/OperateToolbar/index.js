import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Styles from '../index.less';

function Index({ children, className }) {
  return <div className={classNames(Styles.designLayoutMainToolbar, className)}>{children}</div>;
}

function Command({ icon, primary, className, tip, onCommand }) {
  return (
    <Tooltip title={tip}>
      <div
        className={classNames(
          Styles.designLayoutCommand,
          primary && Styles.designLayoutCommandPrimary,
          className,
        )}
        onClick={onCommand}
      >
        {icon}
      </div>
    </Tooltip>
  );
}

function Text({ text, className }) {
  return <div className={classNames(Styles.designLayoutText, className)}>{text}</div>;
}

Command.propTypes = {
  icon: PropTypes.object.isRequired,
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
};

Index.Command = Command;
Index.Text = Text;

export default Index;
