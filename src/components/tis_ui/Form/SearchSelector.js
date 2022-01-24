/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { Select, Col, Row } from 'antd';
import styles from './searchSelector.less';
import multiCardStyle from './multiFormItem.less';
import _ from 'lodash';

class SearchSelector extends PureComponent {
  state = {
    policyWords: [],
    initSelectedWords: [],
    initPolicyWords: [],
  };

  static defaultProps = {
    delay: 500,
  };

  handlePolicyWordsSearch = _.debounce(async value => {
    const { action = value => {} } = this.props;
    if (value !== '' && value !== undefined) {
      const body = { name: value };
      const nextPolicyWords = await action({ body });
      this.setState({
        policyWords: _.uniqBy([...this.state.policyWords, ...nextPolicyWords], 'id'),
      });
    }
  }, this.props.delay);

  render() {
    const { delay, onRef, initPolicyWords, value, label = '', ...others } = this.props;
    const { policyWords, initSelectedWords } = this.state;
    return (
      <>
        <Col span={24}>
          <div style={{ display: 'flex' }}>
            <Col span={6} className={styles.multiLabel}>
              <span className={multiCardStyle.label}>{label}</span>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    // value={value || initSelectedWords}
                    placeholder="请搜索然后添加"
                    optionFilterProp="children"
                    onSearch={this.handlePolicyWordsSearch}
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    {...others}
                  >
                    {_.map(policyWords, ({ id, name }) => (
                      <Select.Option key={id} title={name}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </div>
        </Col>
      </>
    );
  }
}

export default SearchSelector;
