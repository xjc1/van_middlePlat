import React, { PureComponent } from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import apiv1 from '@/services/apiv1';

class PolicyWordsSelector extends PureComponent {
  state = {
    policyWords: [],
    initSelectedWords: [],
    initPolicyWords: [],
  };

  static defaultProps = {
    delay: 500,
  };

  componentDidMount() {
    const { initPolicyWords } = this.props;
    this.handleInitPolicyWords(initPolicyWords);
  }

  handleCharacterEscape = value => {
    if (value) {
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    } else {
      return '';
    }
  };

  getPolicyWordsSelect = async body => {
    const resp = await apiv1.getPolicyWords(body);
    if (resp.status !== 200) throw new Error(resp.statusText);
    const res_json = await resp.json();
    var policyWords = res_json.data.body.rows;
    return _.map(policyWords, ({ _id, name }) => ({ key: _id, label: name }));
  };

  handlePolicyWordsSearch = _.debounce(async value => {
    if (value !== '' && value !== undefined) {
      var body = {
        condition: {
          name: { $regex: this.handleCharacterEscape(value), $options: 'i' },
        },
        projection: { name: 1, _id: 1 },
      };
      var nextPolicyWords = await this.getPolicyWordsSelect(body);
      const { policyWords } = this.state;
      if (policyWords) {
        this.setState({
          policyWords: _.uniqBy([...policyWords, ...nextPolicyWords], ({ key }) => key),
        });
      } else {
        this.setState({ policyWords: nextPolicyWords });
      }
    }
  }, this.props.delay);

  handleInitPolicyWords = words => {
    Promise.all(
      _.map(words, ({ id }) => {
        var body = {
          condition: { _id: id },
          projection: { name: 1, _id: 1 },
        };
        return this.getPolicyWordsSelect(body);
      }),
    ).then(datas => {
      const policyWords = _.map(datas, ([data]) => data);
      this.setState({
        policyWords: policyWords,
        initSelectedWords: policyWords,
      });
    });
  };

  render() {
    const { delay, onChange, onRef, initPolicyWords, value, ...others } = this.props;
    const { policyWords, initSelectedWords } = this.state;
    return (
      <Select
        mode={'multiple'}
        showSearch
        labelInValue
        allowClear
        value={value ? value : initSelectedWords}
        placeholder={'请选择要添加的百科词条'}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={this.handlePolicyWordsSearch}
        {...others}
      >
        {_.map(policyWords, ({ key, label }) => (
          <Select.Option key={key} title={label}>
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default PolicyWordsSelector;
