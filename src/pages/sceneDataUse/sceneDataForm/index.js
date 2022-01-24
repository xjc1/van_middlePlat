import React, { useState } from 'react';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { TabForm } from '@/components/tis_ui';
import { SCENEDATA, CORE } from '@/services/api';
import { message, notification } from 'antd';
import router from '@/utils/tRouter';
import _ from 'lodash';
import BaseInfo from './BaseInfo';
import DataUseConfig from './DataUseConfig';

function SceneDataForm({ initialValues = {}, title, disabled }) {
  let formRef = null;

  const { id: recordId, matters: initMatters = [], dataType } = initialValues;
  const [selectMatters, setSelectMatters] = useState(initMatters.map(item => ({ value: item })));
  const [currentDataType, setCurrentDataType] = useState(dataType);

  const handleSubmit = async () => {
    try {
      const formData = await formRef.validateFields();
      const { sceneDataFields = [], sceneDataMaterials = [], matters = [] } = formData;
      const newValue = {
        ...formData,
        sceneDataFields: _.map(
          sceneDataFields,
          ({ id, subject, materialFieldName, masterRule }) => ({
            standardFieldId: id,
            subject,
            materialFieldName,
            masterRule,
          }),
        ),
        sceneDataMaterials: _.map(sceneDataMaterials, ({ id, subject }) => ({
          standardMaterialId: id,
          subject,
        })),
        matters: matters.map(({ value }) => value),
      };
      // 如果有id走更新操作
      if (recordId) {
        await SCENEDATA.updateUsingPOST({ body: { ...newValue, id: recordId } });
        message.success('更新成功');
      } else {
        await CORE.addUsingPOST({ body: newValue });
        message.success('新增成功');
        router.push('sceneDataReuseManage');
      }
    } catch (err) {
      const { errorFields = [], msg } = err;
      if (msg) {
        notification.error({
          message: msg,
        });
        return;
      }
      if (errorFields.length) {
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
      <BaseInfo
        currentDataType={currentDataType}
        setCurrentDataType={setCurrentDataType}
        title="基本信息"
        tabKey="basicInfo"
        disabled={disabled}
        formRef={formRef}
        selectMatters={selectMatters}
        setSelectMatters={setSelectMatters}
      />
      <DataUseConfig
        selectMatters={selectMatters}
        currentDataType={currentDataType}
        title="用数配置"
        tabKey="dataUseConfig"
        disabled={disabled}
      />
    </TabForm>
  );
}

export default SceneDataForm;
