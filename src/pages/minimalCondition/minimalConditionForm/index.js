import React from 'react';
import { Button, Card, Form, Input, notification, Radio, Row, Col } from 'antd';
import { FormBtnGp, TItem, TSelect } from '@/components/tis_ui';
import { appUserType, commonYesNo, conditionApplyType } from '@/utils/constantEnum';
import { PortraitTagDrawerSelect, DictSelect } from '@/components/bussinessComponents';
import router from '@/utils/tRouter';
import _ from 'lodash';
import { MINIMALCONDITION } from '@/services/api';
import SourceTable from './components/SourceTable';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function MinimalConditionForm({ title = '编辑条件', info = {}, disabled = false }) {
  const [form] = Form.useForm();
  const { tagId } = info;
  const initialValues = {
    ...info,
    tagId: _.compact([tagId]),
  };

  function handleSubmit() {
    form.validateFields().then(val => {
      const { tagId: portrait = {} } = val;
      const { value: portraitId } = portrait;
      const nextValue = {
        ...info,
        ...val,
        tagId: portraitId,
      };
      MINIMALCONDITION.updateMinimalConditionUsingPOST({ body: nextValue })
        .then(() => notification.success({ message: '更新成功' }))
        .catch(e => notification.error({ message: `更新失败，${e.msg}` }));
    });
  }

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={() => router.goBack()}>
          返回列表
        </Button>
      }
    >
      <Form form={form} initialValues={initialValues}>
        <TItem name="objectType" label="对象类型" {...layout}>
          <DictSelect
            disabled
            placeholder="请选择对象类型"
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="DXLX0001"
          />
        </TItem>
        <TItem name="name" label="条件名称" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <Row>
          <Col span={16}>
            <TItem name="tagId" label="画像标签" wrapperCol={{ span: 16 }} labelCol={{ span: 6 }}>
              <PortraitTagDrawerSelect type={appUserType.self} mode="single" disabled={disabled} />
            </TItem>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => {
                window.open('#/content/portraitMenu/tags/editTag');
              }}
            >
              新增标签
            </Button>
          </Col>
        </Row>

        <TItem name="applyScenario" label="默认应用场景" {...layout}>
          <TSelect
            options={_.map(conditionApplyType, (v, k) => ({
              label: conditionApplyType.$names[k],
              value: v,
            }))}
            disabled={disabled}
          />
        </TItem>
        <TItem name="isUserLinked" label="是否关联用户" {...layout}>
          <Radio.Group
            disabled
            options={_.map(commonYesNo, (v, k) => ({
              label: commonYesNo.$names[k],
              value: Boolean(v),
            }))}
          />
        </TItem>
        <TItem name="sourceInfos" label="来源" {...layout}>
          <SourceTable disabled={disabled} />
        </TItem>
        <FormBtnGp disabled={disabled} onOk={handleSubmit} />
      </Form>
    </Card>
  );
}

export default MinimalConditionForm;
