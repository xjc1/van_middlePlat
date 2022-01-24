/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { CORE, STANDARDMATERIALS } from '@/services/api';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import _ from 'lodash';
import { message } from 'antd';
import router from '@/utils/tRouter';

/**
 * @param {String} id 材料id
 */
function useMaterialForm(id) {
  const [initialValues, setInitialValues] = useState(null);
  const [safeExecute] = useUnmount();

  useEffect(() => {
    // 有id是编辑，无id是新增
    if (id) {
      getData(id);
    } else {
      safeExecute(setInitialValues)({});
    }
  }, []);

  async function getData(materialId) {
    const {
      parentCode,
      parentName,
      attributes = [],
      ...others
    } = await STANDARDMATERIALS.queryStandardMaterialDetailUsingGET(materialId);
    const materialDetail = {
      ...others,
      attributes: attributes.map(item => ({ ...item, id: IDGenerator.next('filedId') })),
      parentCode: { label: parentName, key: parentCode, value: parentCode },
    };
    safeExecute(setInitialValues)(materialDetail);
  }

  function formatSubmitValues(values = {}) {
    const newValues = {
      ...values,
    };
    return newValues;
  }

  async function handleCreate(values = {}) {
    const submitValues = formatSubmitValues(values);
    const { parentCode, policyIds = [], ...others } = submitValues;
    await CORE.addStandardMaterialUsingPOST({
      body: {
        ...others,
        parentCode: _.get(parentCode, 'value'),
        policyIds: policyIds.map(({ value }) => value),
      },
    });
    message.success('新增成功');
    router.push({ name: 'standardMaterial' });
  }

  async function handleEdit(values = {}) {
    const submitValues = formatSubmitValues(values);
    const { parentCode, policyIds = [], ...others } = submitValues;
    await STANDARDMATERIALS.updateStandardMaterialUsingPOST({
      body: {
        ...others,
        parentCode: _.get(parentCode, 'value'),
        policyIds: policyIds.map(({ value }) => value),
      },
    });
    message.success('编辑成功');
  }

  return {
    initialValues,
    handleCreate,
    handleEdit,
  };
}

export default useMaterialForm;
