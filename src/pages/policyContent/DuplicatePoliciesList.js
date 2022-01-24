import React from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { TTable, TButton } from '@/components/tis_ui';
import styles from './policyContent.less';

function DuplicatePoliciesList({ duplicatePolicies, columns = [], dispatch, duplicateId, loading }) {
  const newColumns = columns.map(it => ({ ...it, sorter: null }));
  return (
    <>
      <div
        className={styles.duplicateMask}
        onClick={() => {
          dispatch({
            type: 'policyContent/closeDuplicatePolicies',
          });
        }}
      />
      <div className={styles.duplicateList}>
        <TTable
          loading={loading}
          title={() => (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <strong>重复政策</strong>{' '}
              <TButton.Edit
                style={{ marginLeft: 16 }}
                size='small'
                onClick={() => router.push({ name: 'policyContent_bulk_id', params: { id: duplicateId } })}
              >
                批量操作
              </TButton.Edit>
            </div>
          )}
          columns={newColumns}
          dataSource={duplicatePolicies}
          pagination={null}
          rowKey="id"
        />
      </div>
    </>
  );
}

export default connect(({ policyContent, loading }) => ({
  ...policyContent,
  loading: loading.effects['policyContent/fetchDuplicatePolicies']
}))(DuplicatePoliciesList);
