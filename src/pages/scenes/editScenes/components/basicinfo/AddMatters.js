import React, { useState } from 'react';
import {
  Button,
  Col,
  Row,
  Table,
  Select,
  Modal,
  Input,
  Divider,
  message,
  Typography,
  Tooltip,
  List,
} from 'antd';
import _ from 'lodash';
import { TItem, QueryBarCard, TButton, SelectTable } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import EmptyFn from '@/utils/EmptyFn';
import { MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import EditMatter from './EditMatter';

const { Option } = Select;

const defaultPageSize = 4;

function AddMatters({ value = [], onChange = EmptyFn, disabled }) {
  const [visible, setVisible] = useState(false);
  const [dictNames, setDictNames] = useState([]);
  const [query, setQuery] = useState({});
  const [loadMattersStatus, setLoadMattersStatus] = useState(false);
  const [matterList, setMatterList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [selectedMatters, setSelectedMatters] = useState([]);

  const [safeExecute] = useUnmount();

  let queryForm = null;

  function handleSearchMatter() {
    queryForm.validateFields().then(vals => {
      fetchList({ body: vals });
      setQuery(vals);
    });
  }

  function fetchList({ page = 0, size = 5, body = {} }) {
    setLoadMattersStatus(true);
    Code2Name(
      MATTER.getMatterListForLinkedUsingPOST({
        body,
        params: { page, size },
      }),
      ['SHSSBMSH', 'matterDepartment'],
    ).then(
      safeExecute(res => {
        const { dictNames: dicts, content = [], totalElements } = res;
        setDictNames(dicts);
        setMatterList(content.map(item => ({ ...item, key: item.id })));
        setTotal(totalElements);
        setLoadMattersStatus(false);
      }),
    );
  }

  function handleCancel() {
    queryForm.resetFields();
    setSelectedMatters([]);
    setMatterList([]);
    setVisible(false);
    setPageNum(0);
  }

  function handleSelectChange(keys, records) {
    const vals = records.map((record, index) => {
      const { id } = record;
      return {
        ...record,
        category: null,
        no: value.length + index + 1,
        mid: id,
      };
    });
    const handledVals = vals.map(item => ({
      ...item,
      label: item.name,
      matterDepartmentLabel: dictNames.SHSSBMSH[item.matterDepartment],
    }));
    setSelectedMatters(handledVals);
  }

  function handleSubmit() {
    if (selectedMatters.length === 0) {
      message.error('不允许添加空值');
      return;
    }
    const inter = _.intersectionBy(selectedMatters, value, 'key');
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

    onChange([...value, ...selectedMatters].sort((a, b) => a.no - b.no));
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
              <TItem col={12} name="matterCode" label="事项编码">
                <Input />
              </TItem>
            </QueryBarCard>

            <div style={{ margin: '20px 0', color: 'red' }}>2. 选择要添加的事项：</div>

            <SelectTable
              loading={loadMattersStatus}
              dataSource={matterList}
              columns={[
                {
                  title: '事项名称',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '行政区划',
                  dataIndex: 'regions',
                  key: 'regions',
                  width: 200,
                  align: 'center',
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
              title: '事项名称',
              dataIndex: 'label',
              width: '30%',
              render: label => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={label}>{label}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '分类',
              dataIndex: 'category',
              width: '30%',
              render: category => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={category}>{category}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '序号',
              dataIndex: 'no',
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <EditMatter record={record} list={value} setList={onChange} />
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      onChange(_.filter(value, ({ key }) => key !== record.key));
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
