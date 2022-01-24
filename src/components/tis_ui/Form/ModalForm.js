/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { Modal, Form } from 'antd';
import PropTypes from 'prop-types';

class ModalForm extends PureComponent {
  static propTypes = {
    /**
     * Form绑定
     * @type {Function}
     */
    onForm: PropTypes.func.isRequired,

    /**
     * 宽度
     * @type {String}
     */
    width: PropTypes.oneOfType(PropTypes.string, PropTypes.number),

    /**
     * 是否可见
     * @type {Boolean}
     */
    visible: PropTypes.bool,

    /**
     * 对话框取消操作
     * @type {Function}
     */
    handleCancel: PropTypes.func,

    /**
     * 确定按钮文字
     * @type {String}
     */
    okText: PropTypes.string,

    /**
     * 取消按钮文字
     * @type {String}
     */
    cancelText: PropTypes.string,

    /**
     * 初始化值
     * @type {Object}
     */
    initialValues: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    width: '65%',
    visible: false,
    handleCancel: () => {},
    okText: '确定',
    cancelText: '取消',
    initialValues: {},
  };

  formRef = React.createRef();

  render() {
    const {
      visible,
      footer,
      width,
      handleCancel,
      render,
      okText,
      cancelText,
      onForm,
      children,
      initialValues,
      hideRequiredMark = false,
      preserve = true,
      ...others
    } = this.props;
    onForm(this.formRef);
    return (
      <Modal
        closable
        maskClosable
        onCancel={handleCancel}
        visible={visible}
        footer={footer}
        okText={okText}
        cancelText={cancelText}
        width={width}
        {...others}
      >
        <Form
          ref={this.formRef}
          initialValues={initialValues}
          hideRequiredMark={hideRequiredMark}
          preserve={preserve}
        >
          {children}
        </Form>
      </Modal>
    );
  }
}

export default ModalForm;
