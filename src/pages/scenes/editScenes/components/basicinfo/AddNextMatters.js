import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Row, Table, message, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import { TSearchSelector } from '@/components/bussinessComponents';
import EmptyFn from '@/utils/EmptyFn';

const defaultPageSize = 4;

function AddNextMatters({ value = [], onChange = EmptyFn, disabled }) {
  const [selectedNextMatters, setSelectedNextMatters] = useState([]);

  function handleNextMatterSelect(nextMatters) {
    setSelectedNextMatters(nextMatters);
  }

  function handleAdd() {
    if (selectedNextMatters && selectedNextMatters.some(item => value.some(({ key }) => key === item.key))) {
      message.error('请勿重复添加');
      return;
    }
    onChange([...value, ...selectedNextMatters]);
    setSelectedNextMatters();
  }

  return (
    <Row>
      {
        !disabled &&
          <>
          <Col span={10} style={{marginRight: '20px'}}>
            <TSearchSelector type="matter" value={selectedNextMatters} labelInValue onChange={handleNextMatterSelect} />
          </Col>
          <Col>
            <Button type="primary" onClick={handleAdd}>
              添加
            </Button>
          </Col>
          </>
      }
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '后续事项名',
              dataIndex: 'label',
              render: label => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={label}>
                    { label }
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <a
                  style={{display: disabled ? 'none' : 'block'}}
                  onClick={() => {
                    onChange(_.filter(value, ({ key }) => key !== record.key));
                  }}
                >
                  删除
                </a>
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

export default connect(({ scenes }) => ({ ...scenes }))(AddNextMatters);
