import { Form, Button, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { TItem, TTable } from '@/components/tis_ui';
import layoutStyles from './preMode.less';
import { METHODSCHEMAS } from '@/services/api';
import { FuncSchemaInput } from '@/components/bussinessComponents';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const testIDGenerator = new IDGenerator('test');

function PreMode({ id }) {
  const [formRef] = Form.useForm();
  const [schema, setSchema] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    getSchema();
  }, []);

  async function getSchema() {
    if (id) {
      METHODSCHEMAS.findMethodSchemaByIdUsingGET(id).then(res => {
        const { schema: formSchema = [] } = res || {};
        setSchema(formSchema);
      });
    }
  }

  function formatColumns(data) {
    const [obj = {}] = data;
    const { field = {} } = obj;
    return _.reduce(
      field,
      (result, value, key) => {
        return [
          ...result,
          {
            title: key,
            dataIndex: key,
          },
        ];
      },
      [],
    );
  }

  function formatDataSource(data) {
    return _.reduce(
      data,
      (dataSource, item) => {
        const { field = {}, result } = item;
        const res = result ? '是' : '否';
        return [...dataSource, { result: res, ...field, id: testIDGenerator.next() }];
      },
      [],
    );
  }

  function onSubmit() {
    formRef
      .validateFields()
      .then(vals => {
        setLoading(true);
        const { functionItem = {} } = vals;
        const body = { functionItem: { ...functionItem, functionId: id } };
        METHODSCHEMAS.schemaTestUsingPOST({ body }).then(resp => {
          const column = formatColumns(resp);
          setTableData({
            columns: [...column, { title: '是否符合', dataIndex: 'result' }],
            dataSources: formatDataSource(resp),
          });
        });
      })
      .catch(() => {
        message.error('请检查必填项是否填写完毕！！！');
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className={layoutStyles.twoGridPage}>
      <div className={layoutStyles.halfLeftGrid}>
        <Form form={formRef} style={{ marginTop: 20 }}>
          <FuncSchemaInput parentName={['functionItem']} schema={schema} />
          <Row>
            <TItem col={12}>
              <Button style={{ marginLeft: 150 }} onClick={() => onSubmit()} type="primary">
                测试
              </Button>
            </TItem>
            <TItem col={12}>
              <Button onClick={() => formRef.resetFields()} type="primary">
                重置
              </Button>
            </TItem>
          </Row>
        </Form>
      </div>
      <div className={layoutStyles.rightGrid}>
        {_.get(tableData, 'columns', []).length > 0 && (
          <TTable
            loading={loading}
            columns={_.get(tableData, 'columns', [])}
            dataSource={_.get(tableData, 'dataSources', [])}
            rowKey="id"
            size="small"
          />
        )}
      </div>
    </div>
  );
}
export default PreMode;
