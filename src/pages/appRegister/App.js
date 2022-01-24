import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Card, Row, Col, Typography, notification } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { TButton } from '@/components/tis_ui';
import { commonShelf } from '@/utils/constantEnum';
import styles from './appRegister.less';

@connect(({ appRegister }) => appRegister)
class App extends Component {
  componentDidMount = () => {};

  /**
   * 编辑
   * @param {Object} data 应用信息
   */
  handleEdit = data => {
    const { dispatch } = this.props;

    dispatch({
      type: 'appRegister/resetVisible',
      payload: {
        view: true,
        addOrEdit: 1,
        info: data,
      },
    });
  };

  /**
   * 查看
   * @param {Object} data 应用信息
   */
  handlePreview = data => {
    const { dispatch } = this.props;

    dispatch({
      type: 'appRegister/resetVisible',
      payload: {
        view: true,
        info: data,
        addOrEdit: 1,
        readOnly: true,
      },
    });
  };

  /**
   * 上架或者下架
   * @param {Object} data 应用信息
   */
  shelf = data => {
    const { id, review } = data;
    const { dispatch } = this.props;
    dispatch({
      type: 'appRegister/updateApplicationStatus',
      payload: {
        id,
        review,
        status: data.status == 0 ? 1 : 0,
      },
    });
  };

  /**
   * 移除应用
   * @param {Object} data 应用的信息
   */
  delete = data => {
    const { id } = data;
    const { dispatch } = this.props;

    dispatch({
      type: 'appRegister/deleteApplication',
      payload: {
        id,
      },
    });
  };

  render() {
    const { image, data } = this.props;

    return (
      <Card
        style={{ margin: 10 }}
        actions={
          data.editable
            ? [
                <TButton.Delete
                  type="link"
                  confirmText="警告"
                  confirmContent={`确定需要${commonShelf.$v_names[data.status]}吗?`}
                  onClick={this.shelf.bind(this, data)}
                  style={{ color: data.status ? 'red' : 'blue', marginRight: 0 }}
                >
                  {commonShelf.$v_names[data.status]}
                </TButton.Delete>,
                <TButton.Delete
                  type="link"
                  confirmText="警告"
                  confirmContent="移除应用将不能再恢复, 是否继续移除?"
                  onClick={this.delete.bind(this, data)}
                  style={{ color: 'red' }}
                >
                  移除
                </TButton.Delete>,
              ]
            : [
                <TButton.Preview
                  type="link"
                  ghost={false}
                  onClick={this.handlePreview.bind(this, data)}
                >
                  查看
                </TButton.Preview>,
              ]
        }
      >
        <Row gutter={32}>
          <Col span={5}>
            <Avatar size={56} src={data.icon ? data.icon : image} />
          </Col>
          <Col span={19}>
            <div className={styles.appInfo}>
              <div className={styles.appName}>
                {data.name}
                {data.editable ? (
                  <FormOutlined
                    className={styles.editBtn}
                    style={{ fontSize: '18px', float: 'right' }}
                    onClick={this.handleEdit.bind(this, data)}
                  />
                ) : null}
              </div>
              <Typography.Paragraph
                className={styles.appDesc}
                ellipsis={{
                  rows: 2,
                  expandable: false,
                }}
              >
                {data.simple}
              </Typography.Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default App;
