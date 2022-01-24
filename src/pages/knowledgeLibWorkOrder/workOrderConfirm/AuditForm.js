import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { WORKORDER } from '@/services/api';
import EditWorkOrder from '../EditWorkOrder';

const flatBy = (value = [], key) => value.map(item => item[key]);

function AuditForm(props) {
  const {
    match: {
      params: { workOrderId },
    },
    route: { audit },
  } = props;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (workOrderId) {
      getDetail();
    }
    async function getDetail() {
      const res = await WORKORDER.getWorkOrderDetailUsingGET(workOrderId);
      const {
        department = [],

        relationMatchScene = [],
        relationMatchMatter = [],
        relationMatchService = [],
        relationMatchPolicy = [],
        relationMatchProject = [],

        enclosure,
        enclosureName,
      } = res;

      const orderInfo = {
        ...res,
        department: [department],

        relationMatchScene: flatBy(relationMatchScene, 'id'),
        relationMatchMatter: flatBy(relationMatchMatter, 'id'),
        relationMatchService: flatBy(relationMatchService, 'id'),
        relationMatchPolicy: flatBy(relationMatchPolicy, 'id'),
        relationMatchProject: flatBy(relationMatchProject, 'id'),

        file: [enclosure, enclosureName],
      };

      setInfo(orderInfo);
    }
  }, []);

  return (
    <>
      {info && info.id ? (
        <EditWorkOrder
          {...props}
          workOrderInfo={info}
          title="审核工单信息"
          audit={audit}
          readOnly
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default AuditForm;
