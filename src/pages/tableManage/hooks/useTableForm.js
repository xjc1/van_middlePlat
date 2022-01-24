/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { PORTRAIT } from '@/services/api';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import { message } from 'antd';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import router from '@/utils/tRouter';
import _ from 'lodash';

/**
 * @param {String} id 库表id
 */
function useTableForm(id) {
  const [initialValues, setInitialValues] = useState(null);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [safeExecute] = useUnmount();

  useEffect(() => {
    // 有id是编辑，无id是新增
    if (id) {
      getData(id);
    } else {
      safeExecute(setInitialValues)({});
    }
  }, []);

  function getFormatDataArray(dataStr) {
    let dataArray = [];
    if (dataStr) {
      const parseResult = JSON.parse(dataStr);
      // 不是预期的结果就返回空
      dataArray = Array.isArray(parseResult) ? parseResult : [parseResult];
    }
    return _.map(dataArray, item => ({ ...item, key: IDGenerator.next('tableDataId') }));
  }

  async function getData(tableId) {
    const { tableSchema, sampleData, ...others } = await PORTRAIT.getTableDetailUsingGET(tableId);
    const formatInitValues = {
      ...others,
      tableSchema: getFormatDataArray(tableSchema),
      sampleData: getFormatDataArray(sampleData),
    };
    safeExecute(setInitialValues)(formatInitValues);
  }

  function formatSubmitValues(values = {}) {
    const { tableSchema = [], sampleData = [], ...others } = values;
    const tableSchemaRemoveKey = _.map(tableSchema, item => _.omit(item, ['key']));
    const sampleDataRemoveKey = _.map(sampleData, item => _.omit(item, ['key']));
    const newValues = {
      ...others,
      tableSchema: JSON.stringify(tableSchemaRemoveKey),
      sampleData: JSON.stringify(sampleDataRemoveKey),
    };
    return newValues;
  }

  async function handleCreate(values = {}) {
    const submitValues = formatSubmitValues(values);
    await PORTRAIT.addTableUsingPOST({ body: submitValues });
    message.success('新增成功');
    router.push({ name: 'tableManage' });
  }

  async function handleEdit(values = {}) {
    const submitValues = formatSubmitValues(values);

    await PORTRAIT.updateTableUsingPOST({ body: submitValues });
    message.success('编辑成功');
  }

  return {
    initialValues,
    handleCreate,
    handleEdit,
    isNeedCheck,
    setIsNeedCheck,
  };
}

export default useTableForm;
