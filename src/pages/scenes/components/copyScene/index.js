import React, { useState } from 'react';
import { Radio, notification } from 'antd';
import moment from 'moment';
import { SCENE } from '@/services/api';
import { ModalForm } from '@/components/tis_ui';
import NormalCopy from './NormalCopy';
import RegionsCopy from './RegionsCopy';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

function CopyScene({ info, close }) {
  let sceneForm = null;
  const { id, name } = info;
  const initialValues = {
    name: `${name} (${moment(Date.now()).format(defaultFormat)})`,
  };
  const [type, setType] = useState(0);

  function handleSubmit() {
    sceneForm.current
      .validateFields()
      .then(({ name, regions = [] }) => {
        copy({ id, name: name || info.name, regions: regions.map(({ code }) => code) });
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          const firstErrField = err.errorFields[0].name[0];
          sceneForm.current.scrollToField(firstErrField);
          notification.error({
            message: '请检查所有必填项是否填完',
          });
        }
      });
  }

  async function copy(body) {
    if (type) {
      await SCENE.executeRegionsCopyUsingPOST({ body });
    } else {
      await SCENE.executeNormalCopyUsingPOST({ body });
    }
    notification.success({
      message: '成功复制主题',
    });
    close();
  }

  return (
    <ModalForm
      title="复制主题"
      onForm={form => {
        sceneForm = form;
      }}
      visible={true}
      maskClosable={false}
      onOk={handleSubmit}
      onCancel={close}
      initialValues={initialValues}
    >
      <div style={{ paddingBottom: '10px', borderBottom: '2px dashed #efefef' }}>
        <Radio.Group value={type} onChange={e => setType(e.target.value)}>
          <Radio value={0}>普通复制</Radio>
          <Radio value={1}>行政区划复制</Radio>
        </Radio.Group>
      </div>
      {info && (type ? <RegionsCopy info={info} /> : <NormalCopy info={info} />)}
    </ModalForm>
  );
}

export default CopyScene;
