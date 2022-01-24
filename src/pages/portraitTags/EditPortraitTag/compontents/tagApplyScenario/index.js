import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import _ from 'lodash';
import { portraitApplyScenario } from '@/utils/constantEnum';
import { EmptyFn, TTable } from '@/components/tis_ui';
import { KERNEL, TAGOUTPUTS } from '@/services/api';
import router from '@/utils/tRouter';
import applyScenarioOperate from './applyScenarioOperate';

const defaultListInfo = {
  list: [],
  total: 0,
  pageNum: 0,
  pageSize: 10,
};

function Index({ tagId }) {
  const [visible, setVisible] = useState(false);
  const [curScenario, setCurScenario] = useState(portraitApplyScenario.MATTER);
  const [loadingList, setLoadingList] = useState(false);
  const [scenarioListInfo, setScenarioListInfo] = useState(defaultListInfo);
  const handleCloseModal = useCallback(() => setVisible(false), []);

  const columns = [
    {
      title: `${portraitApplyScenario.$v_names[curScenario]}名称`,
      dataIndex: 'name',
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => {
        const { view = EmptyFn, edit = EmptyFn, hasPermission = true } = applyScenarioOperate[
          curScenario
        ];
        const viewUrl = view(record.id);
        const editUrl = edit(record.id);
        return (
          <>
            {(viewUrl || curScenario === portraitApplyScenario.OUTPUT) && (
              <a style={{ marginRight: '10px' }} onClick={() => router.push(viewUrl)}>
                查看
              </a>
            )}
            {editUrl && hasPermission && <a onClick={() => router.push(editUrl)}>编辑</a>}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (!visible) {
      setCurScenario(portraitApplyScenario.MATTER);
      return;
    }
    if (curScenario === portraitApplyScenario.OUTPUT) {
      getOutputScenarioList();
      return;
    }
    setScenarioListInfo(defaultListInfo);
    getApplyScenarioList({});
  }, [visible, curScenario]);

  async function getOutputScenarioList() {
    setLoadingList(true);
    const list = await TAGOUTPUTS.getApplyScenarioUsingGET({
      params: { object: '1', portraitTagId: tagId, sourceType: curScenario },
    });
    setScenarioListInfo({ list });
    setLoadingList(false);
  }

  async function getApplyScenarioList({ page = 0, size = defaultListInfo.pageSize }) {
    setLoadingList(true);
    const {
      content: ids = [],
      totalElements: total,
      number: pageNum,
      size: pageSize,
    } = await KERNEL.getTagApplyScenarioUsingGET({
      params: { page, size, tagId, sourceType: curScenario },
    });
    const res = await applyScenarioOperate[curScenario].request(ids);
    setScenarioListInfo({
      list: _.map(res, (v, k) => ({ name: v, id: k })),
      total,
      pageNum,
      pageSize,
    });
    setLoadingList(false);
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        查看场景
      </Button>
      {visible && (
        <Modal
          title="应用场景"
          visible
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          width="45%"
        >
          <Select
            options={_.map(portraitApplyScenario, (v, k) => ({
              label: portraitApplyScenario.$names[k],
              value: v,
            }))}
            onChange={setCurScenario}
            value={curScenario}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <TTable
            columns={columns}
            loading={loadingList}
            dataSource={scenarioListInfo.list}
            pagination={
              curScenario !== portraitApplyScenario.OUTPUT && {
                total: scenarioListInfo.total,
                current: scenarioListInfo.pageNum,
                pageSize: scenarioListInfo.pageSize,
                onChange: page => getApplyScenarioList({ page }),
              }
            }
            rowKey="id"
            size="small"
          />
        </Modal>
      )}
    </>
  );
}

export default Index;
