import React, { useEffect } from 'react';
import { Row, Col, Table, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';
import DetailQueryBar from './DetailQueryBar';

function Detail({ userType }) {
  const dispatch = useDispatch();
  const {
    tagDetail: { columns, dataSource },
  } = useSelector(({ portraitStatistics }) => portraitStatistics);

  let [formRef] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'portraitStatistics/saveTagProportionDetail',
      tagDetail: {
        columns: [],
        dataSource: [],
      },
    });
  }, [userType]);
  const fetchDetail = (object, queryCondition) => {
    dispatch({
      type: 'portraitStatistics/fetchTagProportionDetail',
      payload: {
        object,
        ...queryCondition,
      },
    });
  };
  return (
    <Row>
      <Col span={24}>
        <DetailQueryBar
          userType={userType}
          onForm={form => {
            formRef = form;
          }}
          footer={
            <Button
              onClick={() => {
                formRef.validateFields().then(query => {
                  fetchDetail(userType, query);
                });
              }}
            >
              查询
            </Button>
          }
        />
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey="id"
          bordered
          pagination={{ defaultPageSize: 10 }}
        />
      </Col>
    </Row>
  );
}

export default Detail;
