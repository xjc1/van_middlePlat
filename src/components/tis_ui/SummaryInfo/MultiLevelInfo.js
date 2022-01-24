/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

function SummaryInfoMulti({ title, children, extra, col, bordered = true, ...others }) {
  return (
    <Col span={col} {...others} className={classNames(styles.infoContainer,bordered && styles.borderRight)}>
      <Row>
        <Col span={24}>
          <div className={styles.infoMutilTitle}>{title}</div>
        </Col>
        <Col span={24}>
          <Row>{children}</Row>
        </Col>
      </Row>
    </Col>
  );
}

function SummaryInfoMultiChild({ children, col = 4, title, suffix }) {
  return (
    <Col span={col}>
      <div className={styles.infoMutilTitle}>{title}</div>
      <div className={styles.infoMultiContent}>
        {children}
        <span className={styles.suffix}>{suffix}</span>
      </div>
    </Col>
  );
}

SummaryInfoMultiChild.defaultProps = {
  col: 6,
  suffix: null,
};

SummaryInfoMultiChild.prototype = {
  children: PropTypes.any.isRequired,
  suffix: PropTypes.string,
  col: PropTypes.number,
};

SummaryInfoMulti.propTypes = {
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

SummaryInfoMulti.Item = SummaryInfoMultiChild;

export default SummaryInfoMulti;
