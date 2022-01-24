import React from 'react';
import { Card, Form, Input, InputNumber, Radio, notification, Select } from 'antd';
import _ from 'lodash';
import {
  TItem,
  RichText,
  FormRules,
  TButton,
  EventCenter,
  FormBtnGp,
  UploadImage,
} from '@/components/tis_ui';
import { DictIdSelect } from '@/components/bussinessComponents';
import { appUserType } from '@/utils/constantEnum';

import { UNION } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';
import AddScenes from './AddScenes';
import AddCompare from './AddCompare';
import AddFile from './addFile';
import AddOuterLink from './addOuterLink';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function EditOneMatter(props) {
  const { title, oneMatterInfo, readOnly, fetchList = EmptyFn } = props;

  const [form] = Form.useForm();

  const handledInfo = oneMatterInfo
    ? {
        ...oneMatterInfo,
        category: oneMatterInfo.category && oneMatterInfo.category.map(({ id }) => id),
      }
    : null;

  const initialValues = handledInfo || {
    onTop: 0,
  };

  function handleSubmit() {
    form
      .validateFields()
      .then(vals => {
        const { scenes = [], category } = vals;

        const handledVals = {
          ...vals,
          scenes: scenes.map(item =>
            _.pick(item, ['sceneId', 'sceneName', 'regions', 'fileAddr', 'display']),
          ),
          category: category.map(item => ({ id: item })),
        };

        if (oneMatterInfo) {
          updateOneMatter({ ...oneMatterInfo, ...handledVals });
        } else {
          createOneMatter(handledVals);
        }
      })
      .catch(err => {
        if (err.errorFields) {
          const firstErrField = err.errorFields[0].name[0];
          form.scrollToField(firstErrField);
          notification.error({
            message: '请检查所有必填项是否填完',
          });
        }
      });
  }

  async function createOneMatter(body) {
    await UNION.addNewUnionProcessUsingPOST({ body });
    fetchList({});
    EventCenter.emit('goBack');
    notification.success({
      message: '成功添加一事联办',
    });
  }

  async function updateOneMatter(body) {
    await UNION.updateUnionProcessUsingPOST({ body });
    fetchList({});
    notification.success({
      message: '成功更新一事联办',
    });
  }

  return (
    <Card
      title={title || '新增主题专栏'}
      extra={
        <TButton.Button type="link" ghost={false} onClick={() => EventCenter.emit('goBack')}>
          返回列表
        </TButton.Button>
      }
      style={{ height: '100%' }}
    >
      <Form form={form} initialValues={initialValues} hideRequiredMark={readOnly}>
        <TItem name="name" label="联办名称" rules={[FormRules.required('必填')]} {...layout}>
          <Input disabled={readOnly} />
        </TItem>
        <TItem name="onTop" label="是否置顶" rules={[FormRules.required('必填')]} {...layout}>
          <Radio.Group disabled={readOnly || (oneMatterInfo && !oneMatterInfo.status)}>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </TItem>
        <TItem name="category" label="所属分类" rules={[FormRules.required('必填')]} {...layout}>
          <DictIdSelect dict="lbfl" dictType="tree" disabled={readOnly} multiple />
        </TItem>
        <TItem name="objectType" label="申报对象" rules={[FormRules.required('必填')]} {...layout}>
          <Select disabled={readOnly}>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="scenes" label="添加主题" {...layout}>
          <AddScenes disabled={readOnly} />
        </TItem>
        <TItem name="unionProcessConfigFiles" label="添加文件" {...layout}>
          <AddFile disabled={readOnly} />
        </TItem>
        <TItem name="unionProcessOutreachSceneInfos" label="外链主题" {...layout}>
          <AddOuterLink disabled={readOnly} />
        </TItem>
        <TItem name="picture" label="上传图片" {...layout}>
          <UploadImage disabled={readOnly} allowClear imgStyle={{ background: '#ccc' }} />
        </TItem>
        <TItem name="comments" label="备注" {...layout}>
          <RichText base64 readOnly={readOnly} />
        </TItem>
        <TItem name="sort" label="排序" rules={[FormRules.required('必填')]} {...layout}>
          <InputNumber min={1} step={1} disabled={readOnly} />
        </TItem>
        <TItem name="compare" label="效能提升对比" {...layout}>
          <AddCompare disabled={readOnly} />
        </TItem>
        <FormBtnGp
          disabled={readOnly}
          onOk={handleSubmit}
          okText={oneMatterInfo ? '保存' : '提交'}
        />
      </Form>
    </Card>
  );
}

export default EditOneMatter;
