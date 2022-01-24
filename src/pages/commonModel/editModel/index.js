import React, { Component } from 'react';
import {
  TForm,
  TItem,
  Layout,
  StandardOptions,
  TButton,
  TCheckbox,
  TRadio,
  ModalForm,
} from '@/components/tis_ui';
import { Input, Select, DatePicker, Button } from 'antd';
import { connect } from 'dva';
import { commonYesNo } from '@/utils/constantEnum';
import moment from 'moment';
import _ from 'lodash';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD';

@connect(({ commonModel }) => commonModel)
class EditModel extends Component {
  state = {
    releaseTime: '',
  };
  createForm = React.createRef();

  componentDidMount() {}

  handleSave = () => {
    const { dispatch, info } = this.props;
    const { releaseTime } = this.state;
    this.createForm.current.validateFields().then(vals => {
      vals.releaseTime = releaseTime;
      if (!info.id) {
        dispatch({
          type: 'commonModel/addModel',
          payload: _.assign(vals),
        });
      } else {
        vals.id = info.id;
        dispatch({
          type: 'commonModel/editModel',
          payload: vals,
        });
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetVisible',
      payload: { view: false, addOrEdit: false, info: {}, modelId: null },
    });
  };

  changeTime = (data, dateString) => {
    this.setState({ releaseTime: dateString });
  };

  render() {
    const { view, info } = this.props;

    return (
      <div>
        <ModalForm
          onForm={form => {
            this.createForm = form;
          }}
          initialValues={{
            ...info,
            releaseTime: info.releaseTime ? moment(info.releaseTime, dateFormat) : '',
          }}
          visible={true}
          title="模型信息"
          maskClosable={false}
          handleCancel={this.handleCancel}
          width="50%"
          footer={
            view ? null : (
              <div>
                <Button onClick={this.handleCancel}>取消</Button>
                <Button type="primary" onClick={this.handleSave}>
                  提交
                </Button>
              </div>
            )
          }
        >
          <div>
            <TItem
              name="name"
              label="模型名称"
              rules={[{ required: true, message: '模型名称不能为空!' }]}
              {...layout}
            >
              <Input disabled={view} />
            </TItem>
            <TItem
              name="number"
              label="模型编号"
              rules={[{ required: true, message: '模型编号不能为空!' }]}
              {...layout}
            >
              <Input disabled={view} />
            </TItem>
            <TItem name="describe" label="模型描述" {...layout}>
              <Input disabled={view} />
            </TItem>
            <TItem name="releaseTime" label="发布日期" {...layout}>
              <DatePicker disabled={view} onChange={this.changeTime} format={dateFormat} />
            </TItem>
            <TItem
              name="status"
              label="是否可用"
              rules={[{ required: true, message: '是否可用必填!' }]}
              {...layout}
            >
              <Select disabled={view}>
                {_.map(commonYesNo, (value, key) => (
                  <Select.Option key={key} value={value}>
                    {commonYesNo.$names[key]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </div>
        </ModalForm>
      </div>
    );
  }
}

export default EditModel;
