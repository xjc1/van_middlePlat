/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MutilLevel from './MultiLevelInfo';
import styles from './index.less';

class SummaryInfoText extends PureComponent {
  static defaultProps = {
    col: 6,
    bordered: true,
    suffix: null,
    title: null,
  };

  static prototypes = {
    children: PropTypes.any.isRequired,
    suffix: PropTypes.string,
    col: PropTypes.number,
    title: PropTypes.any,
    bordered: PropTypes.bool,
  };

  render() {
    const { children, col = 6, title, suffix, bordered, ...others } = this.props;
    return (
      <Col
        span={col}
        className={classNames(styles.infoContainer, bordered && styles.borderRight)}
        {...others}
      >
        <div className={styles.infoTitle}>{title}</div>
        <div className={styles.infoContent}>
          {children}
          <span className={styles.suffix}>{suffix}</span>
        </div>
      </Col>
    );
  }
}

class SummaryInfoCard extends PureComponent {
  static defaultProps = {
    title: null,
    extra: null,
  };

  static Text = SummaryInfoText;

  static MutilLevel = MutilLevel;

  static propTypes = {
    title: PropTypes.any,
    children: PropTypes.any.isRequired,
    extra: PropTypes.any,
  };

  render() {
    const { title: cardTitle, children, extra, ...others } = this.props;
    return (
      <Card bordered={false} title={cardTitle} extra={extra} {...others}>
        <Row>{children}</Row>
      </Card>
    );
  }
}

export default SummaryInfoCard;
