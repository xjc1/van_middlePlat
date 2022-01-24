import React from 'react';
import RecommendTest from './recommendTestQueryBar';
import { Form, Spin } from 'antd';
import { TButton } from '@/components/tis_ui';
import { connect } from 'dva';
import TestResult from './testResult';

function Index({ dispatch, loading, data }) {
  let [queryForm] = Form.useForm();
  function onTest() {
    queryForm.validateFields().then(vals => {
      const { dataOrigin = [], contentType = [], regions = [], personInfo, ...others } = vals;
      others.dataOrigin = dataOrigin.join(',');
      others.contentType = contentType.join(',');
      others.regions = regions.join(',');
      let personInfoObj = '';
      try {
        personInfoObj = JSON.parse(personInfo);
      } catch (e) {
        personInfoObj = personInfo;
      }
      dispatch({
        type: 'recommendTest/queryResult',
        params: others,
        body: personInfoObj,
      });
    });
  }

  return (
    <>
      <Spin tip="测试结果加载中，请稍等..." spinning={loading || false}>
        <RecommendTest
          onForm={form => (queryForm = form)}
          footer={
            <>
              <TButton.Commit onClick={() => onTest()}>测试</TButton.Commit>
              <TButton.Reset onClick={() => queryForm.resetFields()}>重置</TButton.Reset>
            </>
          }
        />
        {data && <TestResult data={data} />}
      </Spin>
    </>
  );
}

export default connect(({ loading, recommendTest }) => ({
  ...recommendTest,
  loading: loading.effects['recommendTest/queryResult'],
}))(Index);
