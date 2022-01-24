import _ from 'lodash';
import React, { useState } from 'react';
import { KERNEL } from '@/services/api';
import { TButton, OperateBar, TItem, FormRules } from '@/components/tis_ui';
import { Row, Col, Table, message, Input, Button } from 'antd';
import PortraitTagSort from './portraitTagSort';
import EditPopover from '@/pages/infoLibrary/createInfoLibrary/formPopver';
import { connect } from 'dva';
import { appUserType } from '@/utils/constantEnum';
import { PortraitTagDrawerSelect } from '@/components/bussinessComponents';

function renderItem(objectType) {
  return (
    <>
      <TItem name="tagId" label="画像标签" rules={[FormRules.required('画像标签必填')]}>
        <PortraitTagDrawerSelect mode="single" type={objectType} />
      </TItem>
      <TItem name="outputName" label="输出名称">
        <Input />
      </TItem>
      <TItem name="outputCategory" label="输出分类">
        <Input />
      </TItem>
    </>
  );
}

async function getPortraitTagPageList(id) {
  return KERNEL.getPortraitTagDetailUsingGET(id);
}

function sortPortraitData(sortData, data) {
  const sortCodes = _.reduce(
    sortData,
    (result, { name, sort }) => {
      result[name] = sort;
      return result;
    },
    {},
  );
  return _.sortBy(data, item => sortCodes[item.tagCategory]);
}

function PortraitTagSelect({ object, focusItem, dispatch, value = [], onChange, disabled }) {
  const [visible, setVisible] = useState(false);

  async function addData(vals, form) {
    const { tagId = {}, outputName, outputCategory } = vals;
    const { key } = tagId;
    const tagObj = await getPortraitTagPageList(key);
    const isAdd = _.find(value, { tagId: key });
    if (isAdd) {
      message.info('您已经添加过此标签了，请不要重复添加');
      form.resetFields();
      return;
    }
    const { name: tagName, category: tagCategory } = tagObj;
    const newData = [...value, { tagCategory, tagName, tagId: key, outputName, outputCategory }];
    const sortData = _.map(_.uniqBy(newData, 'tagCategory'), ({ tagCategory: name }, index) => {
      return { name, sort: index + 1 };
    });
    form.resetFields();
    setSortData(sortData);
    onChange(sortPortraitData(sortData, newData));
  }

  async function editData(vals, form, record, index) {
    const { tagId, outputName, outputCategory } = vals;
    const { key } = tagId;
    const tagObj = await getPortraitTagPageList(key);
    const { name: tagName, category: tagCategory } = tagObj;
    const newValue = value.map((item, idx) => {
      if (idx === index) {
        return { tagCategory, tagName, tagId: key, outputName, outputCategory };
      }
      return item;
    });
    onChange(newValue);
  }

  function setSortData(newData) {
    if (object === appUserType.self) {
      dispatch({
        type: 'outputModule/selectedItem',
        item: { ...focusItem, personalSortInfos: newData },
      });
    } else if (object === appUserType.legalPerson) {
      dispatch({
        type: 'outputModule/selectedItem',
        item: { ...focusItem, legalSortInfos: newData },
      });
    }
  }

  function initValue(record) {
    const { tagId } = record;
    return { ...record, tagId: [tagId] };
  }

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'tagName',
    },
    {
      title: '输出名称',
      dataIndex: 'outputName',
    },
    {
      title: '标签分类',
      dataIndex: 'tagCategory',
    },
    {
      title: '输出分类',
      dataIndex: 'outputCategory',
    },
    {
      title: '操作',
      dataIndex: 'tagId',
      render: (delId, record, index) => (
        <OperateBar>
          <EditPopover
            placement="top"
            inputItem={renderItem(object)}
            initialValues={initValue(record)}
            title="编辑画像标签"
            onFinish={(vals, form) => {
              editData(vals, form, record, index);
            }}
          >
            <OperateBar.Button disabled={disabled} type="primary">
              编辑
            </OperateBar.Button>
          </EditPopover>
          <OperateBar.Button
            onClick={() => {
              const listArr = value.filter(({ tagId }) => tagId !== delId);
              onChange(listArr);
            }}
            disabled={disabled}
          >
            删除
          </OperateBar.Button>
        </OperateBar>
      ),
      width: 200,
    },
  ];

  return (
    <div>
      <Row>
        <Col span={3}>
          <EditPopover
            placement="top"
            disabled={disabled}
            inputItem={renderItem(object)}
            title="新增画像标签"
            onFinish={(vals, form) => {
              addData(vals, form);
            }}
          >
            <Button disabled={disabled} type="primary">
              添加
            </Button>
          </EditPopover>
        </Col>

        <Col span={4}>
          <TButton.Button disabled={disabled} type="primary" onClick={() => setVisible(true)}>
            排序
          </TButton.Button>
        </Col>
      </Row>
      <Table dataSource={value} columns={columns} rowKey="tagId" size="small" />
      {visible && (
        <PortraitTagSort
          object={object}
          setVisible={setVisible}
          setData={onChange}
          onSort={categoryList => {
            onChange(sortPortraitData(categoryList, value));
          }}
        />
      )}
    </div>
  );
}

export default connect(({ outputModule }) => outputModule)(PortraitTagSelect);
