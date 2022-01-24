import React, { useState } from 'react';
import _ from 'lodash';
import { Badge, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { EmptyFn, TButton, TCard } from '@/components/tis_ui';
import { adaptText } from '@/utils/AdaptiveHelper';
import { APPROVALRESULTS, CORE } from '@/services/api';
import ApprovalResultList from './ApprovalResultList';
import SplitMaterialResultList from '../SplitMaterialResultList';
import ApprovalResultAdd from './ApprovalResultAdd';
import Styles from '../index.less';

function Index({ hidden = false, originApprovalResult = [], matter = {}, onRefresh = EmptyFn }) {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const [selectedResult, setSelectedResult] = useState();

  return (
    <div>
      <TCard
        className={classNames(
          Styles.materialSplitContentWrapper,
          hidden && Styles.materialSplitContentHidden,
        )}
        tight
        title={
          <Space className={Styles.materialSplitToolbar}>
            <Badge
              style={{
                backgroundColor: '#1890ff',
                zIndex: 2,
              }}
              count={selectedRecords.length}
            >
              <TButton.Button
                type="primary"
                icon={<CopyOutlined />}
                disabled={selectedRecords.length <= 0}
                onClick={() => {
                  APPROVALRESULTS.copyToApprovalResultUsingGET({
                    params: {
                      matterId: matter.id,
                      originalName: _.map(selectedRecords, ({ name }) => name),
                    },
                  }).then(() => {
                    message.success('复制拆解审批材料成功.');
                    setSelectedRecords([]);
                    onRefresh();
                  });
                }}
                confirmText="警告"
                confirmContent={`确定您要复制选中的${
                  selectedRecords.length
                }个原始审批材料到${adaptText('拆解审批材料')}吗?`}
              >
                复制成拆解审批材料
              </TButton.Button>
            </Badge>
          </Space>
        }
        bodyStyle={{
          padding: '0px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <ApprovalResultList
          materials={originApprovalResult}
          rowKey="oid"
          onCreate={setSelectedResult}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: _.map(selectedRecords, ({ oid }) => oid),
            onChange: (keys, records) => {
              setSelectedRecords(records);
            },
          }}
          expandable={{
            expandedRowRender: ({ approvalResults = [] }) => {
              return (
                <SplitMaterialResultList
                  onEdit={({ standardMaterialId, clienst, clienName, ...others }) => {
                    setSelectedResult({
                      ...others,
                      standardMaterialId: [standardMaterialId],
                      file: [clienst, clienName],
                    });
                  }}
                  onDelete={({ id }) => {
                    APPROVALRESULTS.deleteApprovalResultUsingPOST(id, matter.id).then(() => {
                      message.success('删除审批结果材料成功.');
                      onRefresh();
                    });
                  }}
                  approvalResults={approvalResults}
                />
              );
            },
            rowExpandable: ({ approvalResults = [] }) => approvalResults.length > 0,
          }}
        />
      </TCard>
      {selectedResult && (
        <ApprovalResultAdd
          selectedResult={selectedResult}
          onSave={vals => {
            const pushApprovalResult = selectedResult.id
              ? APPROVALRESULTS.updateApprovalResultUsingPOST
              : CORE.addApprovalResultUsingPOST;
            pushApprovalResult({
              body: {
                ...vals,
                originalName: selectedResult.originalName,
                id: selectedResult.id,
                matterId: matter.id,
              },
            }).then(() => {
              message.success(`${selectedResult.id ? '修改' : '创建'}审批结果材料成功`);
              setSelectedRecords([]);
              setSelectedResult();
              onRefresh();
            });
          }}
          onCancel={() => {
            setSelectedResult();
          }}
        />
      )}
    </div>
  );
}

export default Index;
