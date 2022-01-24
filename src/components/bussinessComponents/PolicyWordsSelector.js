/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { TSelect } from '../tis_ui';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';

class PolicyWordsSelector extends PureComponent {
  state = {
    policyWords: [],
    initSelectedWords: [],
  };

  static defaultProps = {
    delay: 500,
  };

  componentDidMount() {
    const { initPolicyWords } = this.props;
    this.handleInitPolicyWords(initPolicyWords);
  }

  handlePolicyWordsSearch = _.debounce(async value => {
    if (value !== '' && value !== undefined) {
      const nextPolicyWords = await DictAssistant.queryPolicyWordsWithMemo(value);
      const { initSelectedWords } = this.state;
      if (initSelectedWords) {
        this.setState({
          policyWords: _.uniqBy([...nextPolicyWords], ({ key }) => key),
        });
      } else {
        this.setState({ policyWords: nextPolicyWords });
      }
    }
  }, this.props.delay);

  handleInitPolicyWords = words => {
    Promise.all(_.map(words, ({ id }) => DictAssistant.getPolicyWordWithMemo(id))).then(datas => {
      const policyWords = _.map(datas, ([data]) => data);
      this.setState({
        policyWords,
        initSelectedWords: policyWords,
      });
    });
  };

  render() {
    const { delay, onRef, initPolicyWords, value, ...others } = this.props;
    const { policyWords } = this.state;
    return (
      <TSelect
        mode="multiple"
        showSearch
        allowClear
        labelInValue
        // value={value || initSelectedWords}
        placeholder="请选择要添加的百科词条"
        optionFilterProp="children"
        onSearch={this.handlePolicyWordsSearch}
        {...others}
      >
        {_.map(policyWords, ({ key, label }) => (
          <TSelect.Option key={key} title={label}>
            {label}
          </TSelect.Option>
        ))}
      </TSelect>
    );
  }
}

export default PolicyWordsSelector;
