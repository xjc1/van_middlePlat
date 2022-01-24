import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Row, Col, Card, Skeleton, Avatar } from 'antd';
import AppRegisterQueryBar from './AppRegisterQueryBar';
import { TButton, ModalForm, TCheckbox } from '@/components/tis_ui';
import _ from 'lodash';
import styles from './appRegister.less';
import App from '@/pages/appRegister/App';
import EditApplication from './editApplication';

let checkList = [];

@connect(({ appRegister }) => appRegister)
class Index extends PureComponent {
  queryForm = null;

  componentDidMount = () => {
    this.fetchApplication({});
  };

  onCheckAll = checked => {
    console.log(checked);
  };

  /**
   * 请求应用列表
   * @param {Object} {} 请求的页码以及数据量
   */
  fetchApplication({ page = 0, size = 10 }) {
    const { dispatch } = this.props;
    dispatch({
      type: 'appRegister/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  /**
   * 新增应用
   */
  createApplication = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appRegister/resetVisible',
      payload: { view: true, addOrEdit: 0 },
    });
  };

  render() {
    const { view, list } = this.props;

    return (
      <>
        <Card style={{ margin: '0 10px' }}>
          <TButton.Create ghost={false} onClick={this.createApplication}>
            新增应用
          </TButton.Create>
        </Card>

        <Row>
          {_.map(list, item => (
            <Col span={8} key={item.id}>
              <App data={item} />
            </Col>
          ))}
        </Row>

        {view && <EditApplication />}
      </>
    );
  }
}

export default Index;
