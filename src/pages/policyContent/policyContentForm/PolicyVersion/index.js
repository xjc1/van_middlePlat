import React, { useEffect, useState } from 'react';
import { confirmAble, DateTools, TItem, TTable } from '@/components/tis_ui';
import { Row, Col, Tooltip, message } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import SearchPolicyList from './SearchPolicyList';
import styles from '../index.less';
import globalStyle from '@/global.less';
import { POLICY } from '@/services/api';
import {
  modulesContentType,
  policyCheckDuplicateType,
  policyUpDownStatus,
} from '@/utils/constantEnum';
import { handleEditByTypeAndId, handleViewByTypeAndId } from '@/utils/ToPageByTypeAndId';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const RowItem = ({ className, label = '', labelCol = {}, wrapperCol = {}, children }) => (
  <Row className={classnames(styles.rowItem, className)}>
    {label && (
      <Col className={styles.rowItemLabel} {...labelCol}>
        {label}：
      </Col>
    )}
    <Col {...wrapperCol}>{children}</Col>
  </Row>
);

function PolicyVersion({ flatDeparts, disabled, targetId, dispatch }) {
  const [similarPolicyList, setSimilarPolicyList] = useState([]);
  const [dupPolicyList, setDupPolicyList] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    setIds(similarPolicyList.map(({ id }) => id));
  }, [similarPolicyList]);
  const columns = [
    {
      title: '政策名称',
      dataIndex: 'name',
      width: '15%',
      ellipsis: true,
      render: name => (
        <Tooltip overlayStyle={{ minWidth: 300 }} title={name}>
          <div className={globalStyle.textOverviewEllipsis}>{name}</div>
        </Tooltip>
      ),
    },
    { title: '政策文号', dataIndex: 'code' },
    {
      title: '采录部门',
      dataIndex: 'collectDepartment',
      render: dept => {
        return flatDeparts[dept] || dept;
      },
    },
    {
      title: '录入时间',
      dataIndex: 'createTime',
      render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '查重',
      dataIndex: 'dupCheckType',
      render: text => policyCheckDuplicateType.$v_names[text],
    },
  ];

  const searchColumns = [
    {
      title: '政策名称',
      dataIndex: 'name',
      width: '15%',
      ellipsis: true,
      render: name => (
        <Tooltip overlayStyle={{ minWidth: 300 }} title={name}>
          <div className={globalStyle.textOverviewEllipsis}>{name}</div>
        </Tooltip>
      ),
    },
    { title: '政策文号', dataIndex: 'code' },
    {
      title: '采录部门',
      dataIndex: 'collectDepartment',
      render: dept => {
        return flatDeparts[dept] || dept;
      },
    },
    {
      title: '录入时间',
      dataIndex: 'createTime',
      render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
    },
  ];

  useEffect(() => {
    getSimilarPolicyList();
  }, []);

  function getSimilarPolicyList() {
    POLICY.getDuplicatesUsingGET(targetId).then(res => {
      const { versionInfo = [], dupPolicyList: dupList = [] } = res;
      setSimilarPolicyList(versionInfo);
      setDupPolicyList(dupList);
    });
  }

  function isAbleToUnlinkAll() {
    if (similarPolicyList.length === 1) {
      const [firstPolicy = {}] = similarPolicyList;
      return firstPolicy.id !== targetId;
    }
    return true;
  }

  function handleUnlink(record) {
    if (!isAbleToUnlinkAll()) return;
    POLICY.removeDuplicateUsingPOST(record.id).then(() => {
      message.success('成功取消关联');
      getSimilarPolicyList();
    });
  }

  function changeStatus(record) {
    dispatch({
      type: 'policyContent/changeStatus',
      payload: record.id,
      status: record.status,
    }).then(() => {
      message.success('操作成功');
      getSimilarPolicyList();
    });
  }

  const versionTableColumns = disabled
    ? columns
    : [
        ...columns,
        {
          title: '操作',
          width: '25%',
          render: record => (
            <>
              <span
                className={styles.similarPolicyOperate}
                onClick={() => {
                  handleViewByTypeAndId(modulesContentType.POLICY, record.id);
                }}
              >
                查看
              </span>
              <span
                className={styles.similarPolicyOperate}
                onClick={() => {
                  handleEditByTypeAndId(modulesContentType.POLICY, record.id);
                }}
              >
                编辑
              </span>
              <span
                className={styles.similarPolicyOperate}
                onClick={confirmAble({
                  confirmContent: record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?',
                  confirmText: '警告',
                  onClick: () => changeStatus(record),
                })}
              >
                {record.status === 1 ? '下架' : '上架'}
              </span>
              <span
                className={classnames(
                  styles.similarPolicyOperate,
                  {
                    [styles.disabled]: targetId === record.id && !isAbleToUnlinkAll(),
                  },
                  styles.connect,
                )}
                onClick={() => handleUnlink(record)}
              >
                {targetId === record.id ? '取消所有关联' : '取消关联'}
              </span>
            </>
          ),
        },
      ];

  const similarTableColumns = disabled
    ? columns
    : [
        ...columns,
        {
          title: '操作',
          width: '25%',
          render: record => (
            <>
              <span
                className={styles.similarPolicyOperate}
                onClick={() => {
                  handleViewByTypeAndId(modulesContentType.POLICY, record.id);
                }}
              >
                查看
              </span>
              <span
                className={styles.similarPolicyOperate}
                onClick={() => {
                  handleEditByTypeAndId(modulesContentType.POLICY, record.id);
                }}
              >
                编辑
              </span>
              <span
                className={classnames(
                  styles.similarPolicyOperate,
                  {
                    [styles.disabled]: ids.includes(record.id),
                  },
                  styles.connect,
                )}
                onClick={() => {
                  if (ids.includes(record.id)) return;
                  POLICY.manuallyAddDuplicatesUsingPOST({
                    params: { targetId, sourceId: record.id },
                  }).then(() => {
                    message.success('成功关联');
                    getSimilarPolicyList();
                  });
                }}
              >
                关联
              </span>
            </>
          ),
        },
      ];

  return (
    <>
      {!disabled && (
        <p className={styles.tips}>
          提示：<strong> 取消关联 </strong>和<strong> 关联 </strong>操作都是即时生效，不用点击保存。
        </p>
      )}
      <RowItem label="版本信息" {...layout}>
        <TTable
          columns={versionTableColumns}
          dataSource={similarPolicyList}
          pagination={{ size: 'small' }}
          rowKey="id"
        />
      </RowItem>
      <RowItem label="相似政策" {...layout}>
        <TTable
          columns={similarTableColumns}
          dataSource={dupPolicyList}
          pagination={{ size: 'small' }}
          rowKey="id"
        />
      </RowItem>
      {!disabled && (
        <TItem label=" " colon={false} {...layout}>
          <RowItem wrapperCol={{ span: 24 }}>
            <SearchPolicyList
              columns={searchColumns}
              targetId={targetId}
              filterIds={ids}
              onSuccess={() => getSimilarPolicyList()}
            />
          </RowItem>
        </TItem>
      )}
    </>
  );
}

export default connect(({ department }) => ({ flatDeparts: department.flatDeparts }))(
  PolicyVersion,
);
