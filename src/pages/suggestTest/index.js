import React from 'react';
import { Form, notification, Spin } from 'antd';
import { TButton } from '@/components/tis_ui';
import { connect } from 'dva';
import TestResult from './testResult';
import RecommendTestQueryBar from './recommendTestQueryBar';

function Index({ dispatch, loading, data, dictNames }) {
  let [queryForm] = Form.useForm();
  function onTest() {
    queryForm.validateFields().then(vals => {
      const { personInfo: stringUserInfo, ...others } = vals;
      try{
        dispatch({
          type: 'recommendTest/queryResult',
          params: others,
          body: stringUserInfo ? JSON.parse(stringUserInfo): undefined,
        });
      }catch(err) {
        notification.error({message:'用户信息不是一个合法的JSON,请重新输入'})
        console.error(err)
      }

    });
  }

  return (
    <>
      <Spin tip="测试结果加载中，请稍等..." spinning={loading || false}>
        <RecommendTestQueryBar
          onForm={form => {
            queryForm = form;
          }}
          footer={
            <>
              <TButton.Commit onClick={() => onTest()}>测试</TButton.Commit>
              <TButton.Reset onClick={() => queryForm.resetFields()}>重置</TButton.Reset>
            </>
          }
        />
        {data && <TestResult data={data} dictNames={dictNames} />}
      </Spin>
    </>
  );
}

export default connect(({ loading, recommendTest }) => ({
  ...recommendTest,
  loading: loading.effects['recommendTest/queryResult'],
}))(Index);
