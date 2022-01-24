/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import PropTypes from 'prop-types';

class TagSelect extends PureComponent {
  state = {
    words: null,
  };

  isFirst = true;

  static defaultProps = {
    delay: 500,
  };

  static propTypes = {
    onTextSearch: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

 

  handleWordsSearch = _.debounce(async value => {
    const { onTextSearch } = this.props;
    if (value !== '' && value !== undefined) {
      const nextWords = await onTextSearch(value);
      this.setState({ words: nextWords });
    } else {
        this.getData();
    }
  }, this.props.delay);

  

  componentDidMount() {
    this.isFirst = false;
    this.getData()
  }

  async getData(val){
    const { onTextSearch } = this.props;
    const nextWords = await onTextSearch(val);
    this.setState({ words: nextWords });
}

  render() {
    const { delay, onTextSearch, value, ...others } = this.props;
    const { words } = this.state;
    return (
      <TSelect
        mode="multiple"
        showSearch
        allowClear
        value={this.isFirst ? [] : value}
        optionFilterProp="children"
        labelInValue
        onSearch={this.handleWordsSearch}
        {...others}
      >
        {_.map(words, ({ key, label }) => (
          <TSelect.Option key={key} title={label}>
            {label}
          </TSelect.Option>
        ))}
      </TSelect>
    );
  }
}

export default TagSelect;
