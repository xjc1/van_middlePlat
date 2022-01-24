import React, { useEffect, useState } from 'react';
import styles from '@/pages/scenesQA/editPages/ChildScenesEdit.less';
import { Col, Input, Row } from 'antd';
import classNames from 'classnames';
import { OperateBar, TButton, TTable } from '@/components/tis_ui';
import { FundViewOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import router from '@/utils/tRouter';

function ConfigChildScenes(props) {
  const { dispatch, list, total, pageSize, pageNum, onCancel, onSelect } = props;
  const [page, setPage] = useState(0);
  const [txt, setTxt] = useState();
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    dispatch({
      type: 'childScenes/fetchList',
      params: {
        page,
        size: 10,
      },
      body: {
        name: txt,
      },
    });
  }, [page, txt]);

  useEffect(() => {
    dispatch({
      type: 'childScenes/fetchList',
      params: {
        page: 0,
        size: 10,
      },
      body: {
        name: txt || txt === '' ? undefined : txt,
      },
    });
  }, [txt]);

  return (
    <div className={styles.floatPanel}>
      <div className={styles.querybar}>
        <Input.Search
          className={classNames(styles.queryInput)}
          placeholder="查询主题名称"
          onSearch={next => {
            setTxt(next);
          }}
        />
      </div>
      <div>
        <TTable
          scroll={{ y: 320 }}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            showQuickJumper: true,
            onChange: next => {
              setPage(next);
            },
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: selectedItem ? [selectedItem.id] : [],
            columnWidth: 50,
            onSelect: val => {
              setSelectedItem(val);
            },
          }}
          rowKey="id"
          size="small"
          dataSource={list}
          columns={[
            {
              title: '主题名称',
              dataIndex: 'name',
            },
            {
              title: '行政区划',
              dataIndex: 'region',
              width: 100,
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: record => {
                return (
                  <OperateBar>
                    <OperateBar.Button
                      icon={<FundViewOutlined />}
                      onClick={() => {
                        window.open(`#${router.path({ name: 'scenesQA_none', params: { scenesId: record.id } })}`);
                      }}
                    >
                      查看
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          bordered
        />
      </div>
      <Row>
        <Col span={3}>
          <TButton.Button onClick={() => onCancel()}>取消</TButton.Button>
        </Col>
        <Col span={3}>
          <TButton.Button type="primary" onClick={() => onSelect(selectedItem.sid)}>
            选择
          </TButton.Button>
        </Col>
        {selectedItem && (
          <Col span={18}>
            <a
              onClick={() => {
                window.open(`#${router.path({ name: 'scenesQA_none', params: { scenesId: selectedItem.id } })}`);
              }}
            >
              {`${selectedItem.name}_${selectedItem.region}`}
            </a>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default connect(({ childScenes }) => childScenes)(ConfigChildScenes);
