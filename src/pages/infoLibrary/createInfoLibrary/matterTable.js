import React, { useState } from 'react';
import { Button, Col, Row, Table, Select, Modal, Input, message, List } from 'antd';
import _ from 'lodash';
import { TItem, QueryBarCard, TButton, SelectTable } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import EmptyFn from '@/utils/EmptyFn';
import { MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const { Option } = Select;

const defaultPageSize = 4;

function AddMatters({ value = [], onChange = EmptyFn, disabled, dictNames: initDict = {} }) {
  const [visible, setVisible] = useState(false);
  const [dictNames, setDictNames] = useState(initDict);
  const [query, setQuery] = useState({});
  const [matterList, setMatterList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadMattersStatus, setLoadMattersStatus] = useState(false);
  const [selected, setSelected] = useState([]);

  //   useEffect(async () => {
  //     if (value && value.length) {
  //       const { dictNames: dictObj = {} } = await Code2Name(
  //         Promise.resolve({ content: value }),
  //         ['SHSSBMSH', 'department'],
  //         ['SH00XZQH', 'regions'],
  //       );
  //       setDictNames(dictObj);
  //     }
  //   }, []);

  let queryForm = null;

  function fetchList({ page = 0, size = 5, body = {} }) {
    Code2Name(
      MATTER.listMatterUsingPOST({
        params: { page, size },
        body,
      }),
      ['SHSSBMSH', 'department'],
      ['SH00XZQH', 'regions'],
    ).then(res => {
      const { dictNames: resDictNames, content = [], totalElements } = res;
      setDictNames(resDictNames);
      setMatterList(content.map(item => ({ ...item, key: item.id })));
      setTotal(totalElements);
      setLoadMattersStatus(false);
    });
  }

  function handleSearchMatter() {
    queryForm.validateFields().then(vals => {
      setLoadMattersStatus(true);
      setQuery(vals);
      fetchList({ body: vals });
    });
  }

  function handleCancel() {
    queryForm.resetFields();
    setSelected([]);
    setMatterList([]);
    setPageNum(0);
    setVisible(false);
  }

  function handleSelectChange(keys, records) {
    const handledVals = records.map(
      ({ matterCode, title, name, subItemName, regions, id, department, term }) => ({
        category: null,
        matterCode,
        title,
        name,
        subItemName,
        regions,
        id,
        department,
        term,
      }),
    );
    setSelected(handledVals);
  }

  function handleSubmit() {
    if (selected.length === 0) {
      message.error('不允许添加空值');
      return;
    }
    const inter = _.intersectionBy(selected, value, 'id');
    if (inter.length > 0) {
      const names = inter.map(({ name }) => name);
      Modal.error({
        width: '40%',
        title: '这些已存在，请勿重复添加',
        content: (
          <List
            size="small"
            bordered
            dataSource={names}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        ),
      });
      return;
    }

    onChange([...value, ...selected]);
    handleCancel();
  }

  return (
    <Row>
      <Col>
        {!disabled && (
          <Button type="primary" onClick={() => setVisible(true)}>
            添加
          </Button>
        )}
        {visible && (
          <Modal
            title="筛选事项"
            visible
            trigger="click"
            maskClosable={false}
            onCancel={handleCancel}
            onOk={handleSubmit}
            cancelText="取消"
            okText="确定"
            width="65%"
          >
            <div style={{ marginBottom: '20px', color: 'red' }}>1. 搜索事项：</div>

            <QueryBarCard
              onForm={form => {
                queryForm = form;
              }}
              footer={
                <TButton.Search ghost={false} onClick={handleSearchMatter}>
                  搜索
                </TButton.Search>
              }
            >
              <TItem col={12} name="title" label="事项名称">
                <Input />
              </TItem>
              <TItem col={12} name="name" label="分项名称">
                <Input />
              </TItem>
              <TItem col={12} name="subItemName" label="办理项名称">
                <Input />
              </TItem>
              <TItem col={12} name="regions" label="行政区划">
                <DictSelect dictType="tree" dict="SH00XZQH" />
              </TItem>
              <TItem col={12} name="status" label="上下架">
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={0}>下架</Option>
                  <Option value={1}>上架</Option>
                </Select>
              </TItem>
            </QueryBarCard>

            <div style={{ margin: '20px 0', color: 'red' }}>2. 选择要添加的事项：</div>

            <SelectTable
              rowKey="id"
              dataSource={matterList}
              loading={loadMattersStatus}
              columns={[
                {
                  title: '事项名称',
                  dataIndex: 'title',
                  ellipsis: true,
                },
                {
                  title: '分项名称',
                  dataIndex: 'name',
                  width: '25%',
                  ellipsis: true,
                },
                {
                  title: '行政区划',
                  dataIndex: 'regions',
                  width: '15%',
                  ellipsis: true,
                  render: code => {
                    return dictNames.SH00XZQH[code] || code;
                  },
                },
              ]}
              pagination={{
                total,
                pageSize: 5,
                current: pageNum,
                onChange: page => {
                  setPageNum(page);
                  fetchList({ page, body: query });
                },
              }}
              onChange={handleSelectChange}
            />
          </Modal>
        )}
      </Col>
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '事项编码',
              ellipsis: true,
              dataIndex: 'matterCode',
            },
            {
              title: '事项名称',
              width: '10%',
              ellipsis: true,
              dataIndex: 'title',
            },
            {
              title: '分项名称',
              width: '10%',
              ellipsis: true,
              dataIndex: 'name',
            },
            {
              title: '办理项名称',
              width: '10%',
              ellipsis: true,
              dataIndex: 'subItemName',
            },
            {
              title: '行政区划',
              width: '10%',
              ellipsis: true,
              dataIndex: 'regions',
              render: code => {
                return dictNames.SH00XZQH[code] || code;
              },
            },
            {
              title: '实施主体',
              width: '10%',
              ellipsis: true,
              dataIndex: 'department',
              render: text => {
                return dictNames.SHSSBMSH[text] || text;
              },
            },
            {
              title: '承诺办理时限(工作日)',
              width: '10%',
              ellipsis: true,
              dataIndex: 'term',
              render: text => (
                <span>
                  {text}
                  {text && '天'}
                </span>
              ),
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <a
                    onClick={() => {
                      onChange(_.filter(value, ({ id }) => id !== record.id));
                    }}
                  >
                    删除
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={value}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default AddMatters;
