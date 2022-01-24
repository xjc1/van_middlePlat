/* eslint-disable import/no-extraneous-dependencies  */
import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TSelect from '../Form/TSelect';
import EmptyFn from '../utils/EmptyFn';

class Index extends PureComponent {
  isUnmount = false;

  isReady = false;

  state = {
    words: null,
  };

  static defaultProps = {
    delay: 500,
    onConvert: words => words,
    mode: 'multiple',
    onCode2Name: undefined,
    isFullInfo: false,
  };

  static propTypes = {
    onTextSearch: PropTypes.func.isRequired,
    onCode2Name: PropTypes.func,
    onConvert: PropTypes.func,
    mode: PropTypes.string,
    delay: PropTypes.number,
    isFullInfo: PropTypes.bool,
  };

  handleWordsSearch = _.debounce(async value => {
    const { onTextSearch } = this.props;
    if (value !== '' && value !== undefined) {
      const nextWords = await onTextSearch(value);
      this.setState({ words: nextWords });
    }
  }, this.props.delay);

  componentDidMount() {
    const { value, prefetch, onTextSearch } = this.props;
    if (value) {
      this.handleInitWords(value);
    } else if (prefetch) {
      const prefetchText = typeof prefetch === 'string' ? prefetch : undefined;
      onTextSearch(prefetchText).then(prefetchWords => this.setState({ words: prefetchWords }));
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  handleInitWords = words => {
    // {code:'x'} to => ['x']
    const { onCode2Name, onChange, onConvert, mode, value } = this.props;
    const wordsArray = onConvert(this.toUnityStringArray(words));
    if (onCode2Name) {
      onCode2Name(wordsArray).then(cnwords => {
        if (this.isUnmount) return;
        const vals = _.map(cnwords, (v, k) => ({
          value: k,
          label: v,
          key: k,
        }));
        if (!mode || mode === 'single') {
          onChange(_.isArray(vals) ? _.last(vals) : vals, { isInit: true });
        } else {
          onChange(vals, { isInit: true });
        }
        this.isReady = true;
        this.setState({
          words: vals,
        });
      });
    } else {
      onChange(value, { inInit: true });
      this.isReady = true;
    }
  };

  toUnityArray = value => {
    if (value && _.isArray(value)) {
      return _.chain(value)
        .filter(val => val)
        .map(item => {
          if (_.isString(item)) {
            return {
              value: item,
              label: item,
              key: item,
            };
          }
          return item;
        })
        .value();
    }
    return value;
  };

  toUnityStringArray = value => {
    if (value && _.isArray(value)) {
      return _.chain(value)
        .filter(val => val)
        .map(item => {
          if (_.isString(item)) {
            return item;
          }
          return item.key;
        });
    }
    return value;
  };

  getFullInfo = (vals = {}) => {
    const { words } = this.state;
    let selectedKeys;
    if (Array.isArray(vals)) {
      selectedKeys = vals.map(({ key }) => key);
    } else {
      selectedKeys = vals.key ? [vals.key] : [];
    }
    return words.filter(({ key }) => selectedKeys.includes(key));
  };

  render() {
    const {
      delay,
      onTextSearch,
      onCode2Name,
      onConvert,
      value,
      mode,
      onChange = EmptyFn,
      prefetch,
      isFullInfo,
      ...others
    } = this.props;
    const { words } = this.state;
    return (
      <TSelect
        mode={mode}
        showSearch
        allowClear
        labelInValue
        value={this.toUnityArray(value)}
        optionFilterProp="children"
        onSearch={this.handleWordsSearch}
        onChange={vals => {
          let selectedInfo = _.clone(vals);
          // 如果需要完整的信息就去words里找
          if (isFullInfo) {
            selectedInfo = this.getFullInfo(vals);
          }
          if (!mode || mode === 'single') {
            onChange(_.isArray(selectedInfo) ? _.last(selectedInfo) : selectedInfo);
          } else {
            onChange(selectedInfo);
          }
        }}
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

export default Index;

/*
 * mode='single' 单选模式
 * 入参： {value:string, key:string, label:string}
 * 返回值同样
 *
 * mode 默认多选模式
 * 入参： [{value:string, key:string, label:string}]
 * 返回值同样
 *
 * isFullInfo value值是否返回所有信息
 * 返回值 [{value: string, key: string, label: string, regions: String, ....otherInfo}]
 *
 * */
