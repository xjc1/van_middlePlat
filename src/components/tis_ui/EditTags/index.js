/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/no-extraneous-dependencies */
import { Tag, Input, Tooltip } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import styles from './tags.less';
import emptyFn from '../utils/EmptyFn';

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  componentDidMount() {
    const { value = [] } = this.props;
    this.setState({ tags: value });
  }

  handleClose = removedTag => {
    const { onChange = emptyFn } = this.props;
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    onChange(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { onChange = emptyFn } = this.props;
    const { inputValue } = this.state;
    let newTags = this.state.tags;
    if (inputValue && newTags.indexOf(inputValue) === -1) {
      newTags = [...newTags, inputValue];
    }

    onChange(newTags);

    this.setState({
      tags: newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    const { onChange = emptyFn } = this.props;
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      const tagsResult = _.compact(newTags);
      onChange(tagsResult);
      return {
        tags: tagsResult,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className={styles.tagInput}
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className={styles.editTag}
              key={tag}
              closable
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                    this.editInput.focus();
                  });
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className={styles.tagInput}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className={styles.siteTagPlus} onClick={this.showInput}>
            <PlusOutlined /> 添加
          </Tag>
        )}
      </>
    );
  }
}

export default EditableTagGroup;
