/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Input, AutoComplete } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import baseStyles from './index.less';

const { Option, OptGroup } = AutoComplete;

const defaultStyles = {
  width: 250,
};

class AsySelector extends PureComponent {
  static createGroupOption(data) {
    return _.chain(data)
      .groupBy('group')
      .map((items, groupName) => (
        // eslint-disable-next-line react/no-array-index-key
        <OptGroup key={groupName} label={groupName}>
          {items.map(opt => (
            <Option key={opt.value} value={`${opt.value}`}>
              {`${opt.text}`}
            </Option>
          ))}
        </OptGroup>
      ))
      .value();
  }

  static createOptions(data) {
    return _.map(data, item => (
      // eslint-disable-next-line react/no-array-index-key
      <Option key={item.value} value={`${item.value}`}>
        {`${item.text}`}
      </Option>
    ));
  }

  static defaultProps = {
    placeholder: '',
    size: 'default',
    dropdownMatchSelectWidth: false,
    searchDelay: 500,
    group: false,
  };

  constructor() {
    super();
    this.$$onSearch = undefined;
  }

  state = {
    items: null,
  };

  componentDidMount() {
    const { onSearch, searchDelay } = this.props;
    this.setState({
      $$onSearch: _.debounce(text => {
        onSearch(text).then(data => {
          this.setState({ items: data });
        });
      }, searchDelay),
    });
  }

  setDataSource(dataSource) {
    this.setState({ items: dataSource });
  }

  render() {
    const {
      defaultItem,
      initDataSource,
      searchDelay,
      group,
      // eslint-disable-next-line no-unused-vars
      onSearch,
      placeholder,
      onDropdown,
      styles,
      className,
      ...others
    } = this.props;
    const { items, $$onSearch } = this.state;
    return (
      <div className={classnames(baseStyles.tong_category_search_wrapper, className)}>
        <AutoComplete
          className={baseStyles.tong_category_search}
          dropdownClassName={baseStyles.tong_category_search_dropdown}
          style={{ ...defaultStyles, ...styles }}
          dataSource={
            group
              ? AsySelector.createGroupOption(items || initDataSource)
              : AsySelector.createOptions(items || initDataSource)
          }
          placeholder={placeholder}
          defaultValue={defaultItem.value}
          // optionLabelProp="text"
          onSearch={$$onSearch}
          {...others}
        >
          <Input suffix={<DownOutlined className={baseStyles.tong_category_icon} />} />
        </AutoComplete>
      </div>
    );
  }
}

export default AsySelector;
