/* eslint-disable import/no-extraneous-dependencies  */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Select } from 'antd';
import DictLazyTreeSelect from './DictLazyTreeSelect';
import { DICT } from '@/services/api';
import selStype from './DictLazyCascader.less';
import { cascaderDropdownRender } from '@/components/bussinessComponents/Dict/DictLabel';
import { EmptyFn } from '@/components/tis_ui';

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
    dictId: PropTypes.string.isRequired,
    /** 下拉框样式 */
    style: PropTypes.object,
    /** 提示文本 */
    placeholder: PropTypes.string,

    /** 是否显示code */
    showCode: PropTypes.bool,
  };

  dictCascaderRef = React.createRef();
  lazyCasRef = React.createRef();

  state = {
    nowValue: [],
    // 多级联动的弹出层
    popupVisible: false,
    popupRunning: false,
    init: false,
    actived: [],
  };

  componentDidMount() {
    const { dictId, value } = this.props;
    const formatValue = Array.isArray(value) ? value : _.compact([value]);
    if (formatValue.length) {
      DICT.translateDictPathByIdsUsingPOST({
        body: { rootId: dictId, childIds: formatValue },
      }).then(dictPath => {
        const tags = formatValue
          .map(idItem => {
            return { itemId: idItem, item: dictPath[idItem].slice() };
          })
          .map(({ itemId, item }) => {
            const tag = _.cloneDeep(item);
            const lastItem = tag.pop();
            return {
              value: itemId,
              label: lastItem.name,
              parents: tag.map(({ id, name }) => ({ value: id, label: name })),
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
  onBlur = e => {
    if (!this.state.popupRunning) {
      this.setState({
        popupVisible: false,
      });
    }
  };

  /**
   * 级联选择值改变时，更新新值到 value 中
   * @param value
   * @param selectedOptions
   */
  onChangeCascader = async (selectedValue, selectedOptions) => {
    const { multiple } = this.props;
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
            const newData = multiple ? [...value, newSeleted] : [newSeleted];
            this.onChangeValue(newData);
          } else {
            return;
          }
        } else {
          const { nowValue } = this.state;
          // 校验是否是重复添加
          if (nowValue.findIndex(item => item.value === lastItem.value) < 0) {
            const newData = multiple ? [...nowValue, newSeleted] : [newSeleted];
            this.onChangeValue(newData);
          } else {
            return;
          }
        }
        // this.onBlur();
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
    const {
      style,
      placeholder,
      dictId,
      multiple,
      fetchDict,
      onLoadData,
      disabled,
      showCode,
    } = this.props;
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
        <div
          ref={this.lazyCasRef}
          className={selStype.multiCascader}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          <span
            className={selStype.clearBtn}
            style={{ visibility: !!multiple, display: disabled ? 'none' : 'block' }}
            onClick={() => this.onChangeValue([])}
          >
            x{!disabled}
          </span>
          <Select
            disabled={disabled}
            value={selectValue}
            mode={multiple ? 'tags' : undefined}
            // allowClear
            style={{ width: '100%', ...style }}
            dropdownStyle={{ display: 'none' }}
            placeholder={placeholder}
            tokenSeparators={[',']}
            onDeselect={this.onDeselect}
          >
            {selectChildren}
          </Select>
          <div
            onFocus={EmptyFn}
            onMouseOver={() => {
              this.setState({
                popupRunning: true,
              });
            }}
            onMouseLeave={() => {
              this.setState({
                popupRunning: false,
              });
            }}
          >
            <DictLazyTreeSelect
              className={selStype.speCascader}
              ref={this.dictCascaderRef}
              dictId={dictId}
              popupVisible={popupVisible}
              fetchDict={fetchDict}
              dropdownRender={
                showCode &&
                cascaderDropdownRender({
                  onClose: () => {
                    this.setState({
                      popupVisible: false,
                    });
                  },
                })
              }
              onLoadData={onLoadData}
              onChange={this.onChangeCascader}
            />
          </div>
        </div>
      )
    );
  }
}

export default DictLazyCascader;
