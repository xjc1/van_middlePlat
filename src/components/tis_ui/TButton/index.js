/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Modal } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  CheckOutlined,
  UnorderedListOutlined,
  ControlOutlined,
  FileImageOutlined,
  EditOutlined,
  VerticalAlignTopOutlined,
  DownloadOutlined,
  VerticalAlignBottomOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

function confirmAble({
  okText = '确定',
  cancelText = '取消',
  confirmText: title,
  confirmContent: content = '',
  onClick: onOk,
  onCancel,
  okType,
  ...others
}) {
  return title
    ? () => {
        Modal.confirm({
          title,
          content,
          okText,
          okType,
          cancelText,
          onOk,
          onCancel,
          ...others,
        });
      }
    : onOk;
}

function EXButton({ children, confirmText, confirmContent, okType, onClick, onCancel, ...others }) {
  return (
    <Button
      onClick={confirmAble({ confirmText, confirmContent, okType, onClick, onCancel })}
      {...others}
    >
      {children}
    </Button>
  );
}

EXButton.defaultProps = {
  children: undefined,
  confirmText: undefined,
  confirmContent: undefined,
  onClick: undefined,
  onCancel: undefined,
  okType: 'danger',
  style: {},
};

EXButton.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  confirmText: PropTypes.string,
  confirmContent: PropTypes.string,
  okType: PropTypes.string,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
};

class Index {
  static Search = function(props) {
    return <EXButton type="primary" style={{ width: 100 }} {...props} />;
  };

  static Create = function(props) {
    return <EXButton type="primary" icon={<PlusOutlined />} {...props} />;
  };

  static Save = function(props) {
    return <EXButton type="primary" icon={<SaveOutlined />} {...props} />;
  };

  static Edit = function(props) {
    return <EXButton type="primary" icon={<EditOutlined />} ghost {...props} />;
  };

  static Delete = function(props) {
    return <EXButton type="danger" icon={<MinusOutlined />} ghost {...props} />;
  };

  static Reset = function(others) {
    return <EXButton type="primary" style={{ width: 100 }} ghost {...others} />;
  };

  static Commit = function(props) {
    return <EXButton type="primary" icon={<CheckOutlined />} {...props} />;
  };

  static Input = function(props) {
    return <EXButton type="primary" icon={<VerticalAlignTopOutlined />} ghost {...props} />;
  };

  static Output = function(props) {
    return <EXButton type="primary" icon={<VerticalAlignBottomOutlined />} ghost {...props} />;
  };

  static Download = function(props) {
    return <EXButton type="primary" icon={<DownloadOutlined />} ghost {...props} />;
  };

  static List = function(props) {
    return <EXButton type="primary" icon={<UnorderedListOutlined />} {...props} />;
  };

  static Config = function(props) {
    return <EXButton type="primary" icon={<ControlOutlined />} ghost {...props} />;
  };

  static Preview = function(props) {
    return <EXButton type="primary" icon={<FileImageOutlined />} ghost {...props} />;
  };

  static Button = function(props) {
    return <EXButton {...props} />;
  };
}

export default Index;
export { confirmAble, EXButton };
