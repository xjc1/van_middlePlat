import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  Input,
  message,
  Typography,
  Tooltip,
  Divider,
  List,
} from 'antd';
import _ from 'lodash';
import { TItem, QueryBarCard, TButton, SelectTable } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import EmptyFn from '@/utils/EmptyFn';
import { UNION } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import { commonDisplay } from '@/utils/constantEnum';
import EditScene from './EditScene';

const defaultPageSize = 4;

function AddScenes({ value = [], onChange = EmptyFn, disabled }) {
  const [visible, setVisible] = useState(false);
  const [sceneList, setSceneList] = useState([]);
  const [loadScenesStatus, setLoadScenesStatus] = useState(false);
  const [selected, setSelected] = useState([]);
  const [modal] = Modal.useModal();

  let queryForm = null;

  useEffect(() => {
    if (value.length > 0) {
      translateRegions();
    }

    async function translateRegions() {
      const { dictNames } = await Code2Name(Promise.resolve({ content: value }), [
        'SH00XZQH',
        'regions',
      ]);
      const list = value.map(item => ({
        ...item,
        key: item.sceneId,
        region: dictNames.SH00XZQH[item.regions],
      }));
      onChange(list);
    }
  }, []);

  function handleSearchMatter() {
    queryForm.validateFields().then(vals => {
      const { regions = {} } = vals;

      if (Object.values(vals).filter(item => item).length > 0) {
        setLoadScenesStatus(true);

        UNION.getSceneNameListUsingPOST({ body: { ...vals, regions: regions.value } }).then(res => {
          Code2Name(Promise.resolve({ content: res }), ['SH00XZQH', 'regions']).then(list => {
            const { dictNames, content = [] } = list;
            setSceneList(
              content.map(item => {
                const region = dictNames.SH00XZQH[item.regions];
                return {
                  ...item,
                  region,
                  key: item.id,
                };
              }),
            );
            setLoadScenesStatus(false);
          });
        });
      } else {
        message.error('名称、区划至少填一项');
      }
    });
  }

  function handleCancel() {
    queryForm.resetFields();
    setSelected([]);
    setSceneList([]);
    setVisible(false);
  }

  function handleSelectChange(keys, records) {
    const handledVals = records.map(item => ({
      ...item,
      sceneId: item.id,
      sceneName: item.name,
      fileAddr: null,
      display: 1,
    }));
    setSelected(handledVals);
  }

  function handleSubmit() {
    if (selected.length === 0) {
      message.error('不允许添加空值');
      return;
    }
    const inter = _.intersectionBy(selected, value, 'key');
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
            title="筛选主题"
            visible
            maskClosable={false}
            onCancel={handleCancel}
            onOk={handleSubmit}
            cancelText="取消"
            okText="确定"
            width="50%"
            modal={modal}
          >
            <div style={{ marginBottom: '20px', color: 'red' }}>
              1. 搜索主题：（名称、区划至少填一项）
            </div>

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
              <TItem col={12} name="name" label="主题名称">
                <Input />
              </TItem>
              <TItem col={12} name="regions" label="行政区划">
                <DictSelect dictType="tree" dict="SH00XZQH" labelInValue />
              </TItem>
            </QueryBarCard>

            <div style={{ margin: '20px 0', color: 'red' }}>2. 选择要添加的主题：</div>

            <SelectTable
              dataSource={sceneList}
              loading={loadScenesStatus}
              pagination={{
                defaultPageSize: 5,
              }}
              columns={[
                {
                  title: '场景名称',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '行政区划',
                  dataIndex: 'region',
                  key: 'region',
                },
              ]}
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
              title: '主题名称',
              dataIndex: 'sceneName',
              width: '25%',
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
              title: '行政区划',
              dataIndex: 'region',
            },
            {
              title: '解读文件地址',
              dataIndex: 'fileAddr',
              width: '30%',
              render: fileAddr => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={fileAddr}>{fileAddr}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '显示状态',
              dataIndex: 'display',
              render: display => commonDisplay.$v_names[display],
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <EditScene record={record} list={value} setList={onChange} modal={modal} />
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      onChange(_.filter(value, ({ key }) => key !== record.key));
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    删除
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={value}
          size="small"
          rowKey="sceneId"
        />
      </Col>
    </Row>
  );
}

export default AddScenes;
