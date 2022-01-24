/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Modal, message } from 'antd';
import _ from 'lodash';
import { TItem, TButton } from '@/components/tis_ui';
import DimensionSign from './dimensionSign';
import EmptyFn from '@/utils/EmptyFn';
import { MARK } from '@/services/api';

const defaultGroupData = {
  label: [
    {
      dimensions: [],
    },
  ],
};

function DimensionSignModal({
  value = [],
  onChange = EmptyFn,
  reload = EmptyFn,
  cid,
  type,
  editVisible = true,
  mark = false,
  handleCancel,
}) {
  const [groupData, setGroupData] = useState(defaultGroupData.label);
  const [markId, setMarkId] = useState('');

  useEffect(() => {
    // 标注则去拉数据
    if (mark) {
      getMarkData(cid);
    }
  }, []);

  async function getMarkData(cid) {
    const { id, label = defaultGroupData.label } = await MARK.getMarkUsingGET(cid);
    if (id) {
      setGroupData(label);
      setMarkId(id);
    }
  }

  function handleDelete(index) {
    const newData = groupData.filter((it, ind) => ind !== index);
    setGroupData(newData);
  }

  const handleValueChange = async (index, newData) => {
    const data = _.cloneDeep(groupData);
    data[index].dimensions = newData;
    setGroupData(data);
  };

  function renderList(value = [{ dimensions: [] }]) {
    return value.map((it, index) => {
      if (index === 0) {
        return (
          <TItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label={`分组${index + 1}`}>
            <DimensionSign
              value={it.dimensions}
              index={index}
              handleValueChange={handleValueChange}
            />
          </TItem>
        );
      }
      return (
        <TItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label={`分组${index + 1}`}>
          <DimensionSign
            value={it.dimensions}
            handleDelete={handleDelete}
            index={index}
            handleValueChange={handleValueChange}
          />
        </TItem>
      );
    });
  }

  function addGroup() {
    const newData = groupData.concat({});
    setGroupData(newData);
  }

  return (
    <Modal
      visible
      title="维度标注"
      width={900}
      maskClosable={false}
      onCancel={handleCancel}
      footer={
        <>
          <Button onClick={handleCancel}>取消</Button>
          {editVisible && (
            <TButton.Button
              type="primary"
              ghost={false}
              onClick={async () => {
                const postData = { label: groupData, cid, type };
                // 如果有标注ID则走更新流程
                if (markId) {
                  await MARK.updateMarkUsingPOST({ body: Object.assign(postData, { id: markId }) });
                  reload();
                } else {
                  await MARK.addMarkUsingPOST({ body: postData });
                  reload();
                }

                handleCancel();
                message.success('操作成功');
              }}
            >
              提交
            </TButton.Button>
          )}
        </>
      }
    >
      <Row>
        {renderList(groupData)}
        <Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>
          {groupData.length < 10 && <Button onClick={addGroup}>添加分组</Button>}
        </Col>
      </Row>
    </Modal>
  );
}

export default DimensionSignModal;
