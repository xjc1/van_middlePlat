import '@ant-design/compatible/assets/index.css';
import { Divider, Select, DatePicker, Row, Col } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { TItem, FormHint } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

@connect(({ createMessageForm }) => ({ ...createMessageForm, ...createMessageForm.step }))
class BasicInfoSettings extends PureComponent {
  onChange = (value, DataString) => {
    const { formData, dispatch } = this.props;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: {
        ...formData,
        startTime: DataString[0],
        endTime: DataString[1],
      },
    });
  };

  render() {
    const { check } = this.props;
    return (
      <Fragment>
        <div className={styles.desc}>
          <strong>基本信息配置</strong>
        </div>
        <Divider style={{ margin: '10px 0 10px' }} />
        <Row>
          <TItem
            col={20}
            name="clientType"
            label="终端类型"
            {...layout}
            rules={[{ required: true, message: '终端类型不能为空!' }]}
          >
            <DictSelect dict="ZDLX" dictType="tree" multiple disabled={check} />
          </TItem>
          <Col span={4}>
            <FormHint text="标签推送,仅支持PC端" />
          </Col>
          <TItem
            col={20}
            name="messageType"
            label="消息类型"
            {...layout}
            rules={[{ required: true, message: '消息类型不能为空!' }]}
          >
            <DictSelect
              dict="XXLX1000"
              dictType="tree"
              treeNodeFilterProp="title"
              showSearch
              disabled={check}
              allowClear
            />
          </TItem>
          <TItem
            col={20}
            name="rangeTime"
            label="时间期限"
            rules={[{ required: true, message: '时间期限不能为空!' }]}
            {...layout}
          >
            <RangePicker
              showTime
              style={{ width: '100%' }}
              disabled={check}
              format={dateFormat}
              onChange={this.onChange}
            />
          </TItem>
          <TItem col={20} name="level" label="消息优先级" {...layout}>
            <Select disabled>
              <Select.Option value={1}>高</Select.Option>
            </Select>
          </TItem>
        </Row>
      </Fragment>
    );
  }
}

export default BasicInfoSettings;
