import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import ModulesManageQueryBar from './ModulesManageQueryBar';
import ModulesManageList from './ModulesManageList';
import styles from './modulesManage.less';
import TrackTool from '@/utils/TrackTool';
import authEnum, { Auth } from '@/utils/auth';

function Index({ dispatch }) {
  const [query, setQuery] = useState(TrackTool.getQueryParamsCache());

  useEffect(() => {
    const { page = 0, size = 10, ...queryCondition } = query;
    dispatch({
      type: 'modulesManage/fetchList',
      payload: {
        query: queryCondition,
        page,
        size,
      },
    });
  }, [query]);

  let queryForm = null;

  return (
    <div>
      <ModulesManageQueryBar
        initialValues={query}
        onForm={form => {
          queryForm = form;
        }}
        actions={
          <>
            <Auth auth={authEnum.modules_edit_alias}>
              <TButton.Create
                onClick={() => router.push('modules_create')}
              >
                新增模块
              </TButton.Create>
            </Auth>
          </>
        }
        footer={
          <>
            <TButton.Search
              onClick={() => {
                queryForm.validateFields().then(nextQuery => {
                  setQuery({ ...query, ...nextQuery, page: 0 });
                });
              }}
            >
              查询
            </TButton.Search>
            <TButton.Reset
              onClick={() => {
                // 重置数据
                queryForm.resetFields();
                setQuery({});
              }}
            >
              重置
            </TButton.Reset>
          </>
        }
      />
      <ModulesManageList
        className={styles.modulesManageList}
        fetchList={nextQuery => {
          setQuery({ ...query, ...nextQuery });
        }}
      />
    </div>
  );
}

export default connect(({ modulesManage }) => modulesManage)(Index);
