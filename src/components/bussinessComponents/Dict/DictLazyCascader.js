/* eslint-disable import/no-extraneous-dependencies  */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Select, message } from 'antd';
import DictLazyTreeSelect from './DictLazyTreeSelect';
import { DICT } from '@/services/api';
import selStype from './DictLazyCascader.less';
import { cascaderDropdownRender } from '@/components/bussinessComponents/Dict/DictLabel';

/**
 * 实现一个 tag 组合多选的级联选择
 *
 * value 结构如下:
 * [
 *  {
 *    value:
 *    label:   string
 *    parents: array   正序的祖先节点
 *  }
 * ]
 */

const Option = Select.Option;

class DictLazyCascader extends Component {
  static defaultProps = {
    style: {},
    placeholder: '请选择',
    showCode: false,
  };

  static propTypes = {
    /** 字典码 */
    dict: PropTypes.string.isRequired,
    /** 下拉框样式 */
    style: PropTypes.object,
    /** 提示文本 */
    placeholder: PropTypes.string,

    showCode: PropTypes.bool,
  };

  dictCascaderRef = React.createRef();

  constructor(props) {
    super(props);

    const value = props.value || [];
    this.state = {
      // 值 -- 当 props 中未传入时使用
      nowValue: [...value],
      // 多级联动的弹出层
      popupVisible: false,
      init: false,
      actived: [],
    };
  }

  componentDidMount() {
    const { dict } = this.props;
    const { nowValue } = this.state;
    if (nowValue.length > 0) {
      DICT.batchTranslateDictPathByCodesUsingPOST({
        body: { rootCode: dict, childCodes: nowValue },
      }).then(dictPath => {
        const tags = nowValue
          .map(item => dictPath[item].slice(1))
          .map(item => {
            const tag = _.cloneDeep(item);
            const lastItem = tag.pop();
            return {
              value: lastItem.code,
              label: lastItem.name,
              parents: tag.map(({ code, name }) => ({ value: code, label: name })),
            };
          });
        this.onChangeValue(tags);
        this.setState({
          init: true,
        });
      });
    } else {
      this.setState({
        init: true,
      });
    }
  }

  /**
   * 受控组件必备
   * @param nextProps
   * @returns {{nowValue: ...*[]}}
   */
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        nowValue: nextProps.value ? [...nextProps.value] : [],
      };
    }
  }

  /**
   * 统一修改 value 入口
   * @param newValue
   */
  onChangeValue = newValue => {
    if (!('value' in this.props)) {
      this.setState({
        nowValue: [...newValue],
      });
    }

    this.triggerChange(newValue);
  };

  /**
   * change 事件触发器
   * @param newValue
   */
  triggerChange = newValue => {
    const { onChange } = this.props;

    if (onChange) {
      onChange([...newValue]);
    }
  };

  // select 获得焦点展示 cascader 弹出层，模拟 option
  onFocus = () => {
    this.setState({
      popupVisible: true,
    });
  };

  /**
   * select 失去焦点
   * 需要判断焦点是否仍旧在容器中(如 cascader 的弹出层上)
   * 在 -- 仍展示 cascader popup
   * 不在 -- 隐藏 cascader popup
   */
  onBlur = () => {
    this.setState({
      popupVisible: false,
    });
  };

  /**
   * 级联选择值改变时，更新新值到 value 中
   * @param value
   * @param selectedOptions
   */
  onChangeCascader = async (selectedValue, selectedOptions) => {
    const { actived } = this.state;

    if (selectedOptions && selectedOptions.length > 0) {
      const path = _.cloneDeep(selectedOptions);
      const lastItem = path.pop();
      const newSeleted = {
        value: lastItem.value,
        label: lastItem.label,
        parents: path.map(item => {
          return {
            value: item.value,
            label: item.label,
          };
        }),
      };

      const intersection = _.intersection(actived, selectedValue);

      if (
        intersection.length > 0 &&
        actived.some(item => item === selectedValue[selectedValue.length - 1])
      ) {
        // 受控组件
        const { value } = this.props;
        if (value) {
          // 校验是否是重复添加
          if (value.findIndex(item => item.value === lastItem.value) < 0) {
            this.onChangeValue([...value, newSeleted]);
          } else {
            message.error('请勿重复添加');
          }
        } else {
          const { nowValue } = this.state;
          // 校验是否是重复添加
          if (nowValue.findIndex(item => item.value === lastItem.value) < 0) {
            this.onChangeValue([...nowValue, newSeleted]);
          } else {
            message.error('请勿重复添加');
          }
        }
        this.onBlur();
      }
      this.setState({ actived: selectedValue });
    }
  };

  /**
   * 取消选择
   * @param deselectValue
   */
  onDeselect = deselectValue => {
    let newValue = [];
    const { value } = this.props;

    if (value) {
      newValue = value.filter(item => item.value !== deselectValue);
    } else {
      const { nowValue } = this.state;
      newValue = nowValue.filter(item => item.value !== deselectValue);
    }

    this.onChangeValue([...newValue]);
  };

  /**
   * 生成 Select 中的 tag 名称
   * @param valueObject
   * @returns {*}
   */
  static groupLabel = valueObject => {
    if (!valueObject.parents) {
      return valueObject.label;
    }

    let result = '';
    valueObject.parents.map(item => {
      result += `${item.label}/`;
      return true;
    });
    return result + valueObject.label;
  };

  render() {
    const { style, placeholder, dict, showCode } = this.props;
    const { popupVisible, nowValue, init } = this.state;

    // 真实的 value 总是优先从 props 中来( 受控组件 )
    const selectChildren = nowValue.map(item => {
      return (
        <Option key={`${Math.ceil(Math.random() * 1000)}_${item.label}`} value={String(item.value)}>
          {DictLazyCascader.groupLabel(item)}
        </Option>
      );
    });
    // 转成 string 的原因是 tag 模式下，value 必须为 string
    const selectValue = nowValue.map(item => {
      return String(item.value);
    });

    return (
      init && (
        <span className={selStype.multiCascader} onFocus={this.onFocus} onBlur={this.onBlur}>
          <span className={selStype.clearBtn} onClick={() => this.onChangeValue([])}>
            x
          </span>
          <Select
            value={selectValue}
            mode="tags"
            // allowClear
            style={{ width: '100%', ...style }}
            dropdownStyle={{ display: 'none' }}
            placeholder={placeholder}
            tokenSeparators={[',']}
            onDeselect={this.onDeselect}
          >
            {selectChildren}
          </Select>
          <DictLazyTreeSelect
            className={selStype.speCascader}
            ref={this.dictCascaderRef}
            dict={dict}
            popupVisible={popupVisible}
            dropdownRender={showCode && cascaderDropdownRender({ root: dict })}
            changeOnSelect
            onChange={this.onChangeCascader}
          />
        </span>
      )
    );
  }
}

export default DictLazyCascader;
