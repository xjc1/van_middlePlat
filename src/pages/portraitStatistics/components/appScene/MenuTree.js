import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import MenuTreeQueryBar from './MenuTreeQueryBar';

function MenuTree({ userType }) {
  const dispatch = useDispatch();
  const { menuTreeData } = useSelector(({ portraitStatistics }) => portraitStatistics);

  const [queryCondition, setQueryCondition] = useState({});

  let [formRef] = Form.useForm();
  useEffect(() => {
    const { rootMenuId } = queryCondition;
    if (rootMenuId) {
      dispatch({
        type: 'portraitStatistics/fetchTagMenuTreeData',
        payload: {
          object: userType,
          ...queryCondition,
        },
      });
    }
  }, [userType, queryCondition]);

  const tableColumns = [
    { title: '统计项', dataIndex: 'name' },
    {
      title: '配置画像标签',
      render: (text, record) => {
        const { portraitTagStatisticsDetail = {} } = record;
        const { name = '' } = portraitTagStatisticsDetail;
        return name.replace(/,/g, ' | ');
      },
    },
    {
      title: '覆盖用户数',
      dataIndex: 'userNumCovered',
      render: (text, record) => {
        const { portraitTagStatisticsDetail = {} } = record;
        const { userNumCovered } = portraitTagStatisticsDetail;
        return userNumCovered;
      },
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <MenuTreeQueryBar
          userType={userType}
          onForm={form => {
            formRef = form;
          }}
          footer={
            <Button
              onClick={() => {
                formRef.validateFields().then(vals => {
                  setQueryCondition(vals);
                });
              }}
            >
              查询
            </Button>
          }
        />
      </Col>
      <Col span={24}>
        <Table dataSource={menuTreeData} pagination={false} columns={tableColumns} rowKey="id" />
      </Col>
    </Row>
  );
}

export default MenuTree;
