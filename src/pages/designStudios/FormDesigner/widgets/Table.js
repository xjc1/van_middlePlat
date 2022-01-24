import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { Table, Button, Modal, Space, Row, Col } from 'antd';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import InputHoc from '@/pages/designStudios/FormDesigner/widgets/Input';
import SelectHoc from '@/pages/designStudios/FormDesigner/widgets/Select';
import DatePickerHoc from '@/pages/designStudios/FormDesigner/widgets/DatePicker';
import InputNumberHoc from '@/pages/designStudios/FormDesigner/widgets/InputNumber';
import SliderStep from '@/pages/designStudios/widgetWrapperView/sliderStep';

const TableHoc = React.memo(({ widgetConfig = {}, displayName }) => {
  const [formVisible, setFormVisible] = useState(false);
  const { columns = [], canPagination = false } = widgetConfig;
  const nextColumns = useMemo(() => {
    const userColumns = columns
      .filter(item => item && item.id && item.label && item.canPreview)
      .map(({ id, label }) => {
        return {
          title: label,
          dataIndex: id,
          render() {
            return id;
          },
        };
      });
    userColumns.push({
      render: () => {
        return (
          <Space>
            <Button type="text" icon={<MinusOutlined />} danger />
            <Button type="text" icon={<EditOutlined />} />
          </Space>
        );
      },
    });

    return userColumns;
  }, [columns, canPagination]);

  return (
    <div
      style={{
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          padding: '10px',
        }}
      >
        <Space>
          <span>{displayName}</span>
          <Button
            style={{ cursor: 'pointer', zIndex: 3 }}
            icon={<PlusOutlined />}
            onClick={() => {
              setFormVisible(true);
            }}
          >
            添加
          </Button>
        </Space>
      </div>
      <Table
        sticky
        columns={nextColumns}
        rowKey="id"
        pagination={canPagination ? undefined : false}
        dataSource={[{ id: 1 }]}
      />
      <Modal
        title={displayName}
        visible={formVisible}
        maskClosable={false}
        getContainer={false}
        width={600}
        onOk={() => {
          setFormVisible(false);
        }}
        onCancel={() => {
          setFormVisible(false);
        }}
      >
        <Row>
          {_.map(columns, column => {
            const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
            if (column) {
              switch (column.field) {
                case 'input':
                  return (
                    <Col key={column.id} span={SliderStep[column.colspan]}>
                      <InputHoc innerSpan={layout} {...column} />
                    </Col>
                  );
                case 'select':
                  return (
                    <Col key={column.id} span={SliderStep[column.colspan]}>
                      <SelectHoc innerSpan={layout} {...column} style={{ width: '100%' }} />
                    </Col>
                  );
                case 'datePicker':
                  return (
                    <Col key={column.id} span={SliderStep[column.colspan]}>
                      <DatePickerHoc innerSpan={layout} {...column} style={{ width: '100%' }} />
                    </Col>
                  );
                case 'inputNumber':
                  return (
                    <Col key={column.id} span={SliderStep[column.colspan]}>
                      <InputNumberHoc innerSpan={layout} {...column} />
                    </Col>
                  );
                default:
                  return (
                    <Col key={column.id} span={SliderStep[column.colspan]}>
                      <span key={column.id}>不支持组件</span>
                    </Col>
                  );
              }
            }
            return null;
          })}
        </Row>
      </Modal>
    </div>
  );
});

export default TableHoc;
