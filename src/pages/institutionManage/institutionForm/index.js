import React from 'react';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { TabForm } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import { message, notification } from 'antd';
import router from '@/utils/tRouter';
import _ from 'lodash';
import InstitutionInfo from './institutionInfo';
import Sociology from './Sociology';

function DictFormModal({ initialValues = {}, title, disabled }) {
  let formRef = null;

  const { id: recordId } = initialValues;

  const handleSubmit = async () => {
    try {
      const formData = await formRef.validateFields();
      const { relatedInstitutions = [], serviceType = [], serviceProject = [], city } = formData;
      const newValue = {
        ...formData,
        relatedInstitutionIds: _.map(relatedInstitutions, ({ id }) => id),
        serviceType: _.map(serviceType, id => ({ id })),
        serviceProject: _.map(serviceProject, id => ({ id })),
        city: city ? { id: city } : undefined,
      };
      // 如果有id走更新操作
      if (recordId) {
        await KERNEL.modifyInstitutionUsingPOST({ body: { ...newValue, id: recordId } });
        message.success('更新成功');
      } else {
        await KERNEL.addInstitutionUsingPOST({ body: newValue });
        message.success('新增成功');
        router.push('institutionManage');
      }
    } catch (err) {
      if (err.errorFields && err.errorFields.length) {
        const firstErrInfo = err.errorFields[0].errors[0];
        notification.error({
          message: `${firstErrInfo},并检查所有必填项是否填完`,
        });
      }
    }
  };

  return (
    <TabForm
      title={title}
      defaultTabKey="basicInfo"
      onForm={form => {
        formRef = form;
      }}
      initialValues={initialValues}
      hideRequiredMark={disabled}
      btnOption={{
        onOk: handleSubmit,
        okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
        disabled,
      }}
    >
      <InstitutionInfo
        title="基本信息"
        tabKey="basicInfo"
        disabled={disabled}
        recordId={recordId}
      />
      <Sociology title="社会化机构信息" tabKey="sociology" disabled={disabled} />
    </TabForm>
  );
}

export default DictFormModal;
