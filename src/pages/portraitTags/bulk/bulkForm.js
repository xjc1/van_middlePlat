/* eslint-disable no-param-reassign */
import React from 'react';
import { Form, message } from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import { FormBtnGp } from '@/components/tis_ui';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'dva';

import FormItem from './formItem';

const format = 'YYYY-MM-DD HH:mm:ss';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BulkForm({ data, setData, dispatch }) {
  const [form] = Form.useForm();
  const initialValues = _.reduce(
    data,
    (item, collect) => {
      if (collect.expireTime) {
        collect.expireTime = moment(collect.expireTime, format);
        collect.expireTimeType = 2;
      } else {
        collect.expireTimeType = 1;
      }
      item[collect.uuid] = collect;
      return { ...item };
    },
    {},
  );

  function onsubmit() {
    form
      .validateFields()
      .then(val => {
        const formValue = val;
        const uuidList = data.filter(({ disabled }) => !disabled).map(({ uuid }) => uuid);
        const req_body = uuidList.map(id => {
          const { synonymInfos, expireTime } = formValue[id];
          if (expireTime) {
            formValue[id].expireTime = expireTime.format(format);
          }
          if (synonymInfos) {
            formValue[id].synonyms = synonymInfos.map(({ tagId }) => tagId);
          }
          const functionId = _.get(formValue[id], 'relatedFunction.functionId.key');
          const functionValue = _.get(formValue[id], 'relatedFunction.values');
          formValue[id].relatedFunction = functionId
            ? { functionId, values: functionValue || [] }
            : null;
          return formValue[id];
        });
        dispatch({ type: 'portraitTagBulk/bulkAdd', body: req_body });
      })
      .catch(e => {
        console.log(e);
        message.warning('存在必填项为空值，请先把必填项填写完再点提交');
      });
  }

  function onDelete(item, index) {
    data[index]['disabled'] = true;
    setData([...data]);
  }

  function recover(item, index) {
    data[index]['disabled'] = false;
    setData([...data]);
  }

  return (
    <div>
      <Form
        form={form}
        initialValues={initialValues}
        style={{ backgroundColor: '#fff', marginTop: 20 }}
      >
        {data.map((item, index) => (
          <FormItem
            initialValues={initialValues}
            key={`${item.uuid}_formItem`}
            item={item}
            setData={setData}
            data={data}
            layout={layout}
            index={index}
            form={form}
            recover={recover}
            onDelete={onDelete}
          />
        ))}
        <FormBtnGp
          onOk={onsubmit}
          okText="提交"
          okIcon={initialValues ? <SaveOutlined /> : <CheckOutlined />}
        />
      </Form>
    </div>
  );
}
export default connect(({ portraitTagBulk }) => portraitTagBulk)(BulkForm);
