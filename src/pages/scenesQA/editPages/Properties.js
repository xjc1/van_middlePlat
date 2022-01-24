/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Button, Col, Form, Row, Input } from 'antd';
import { RichText, TItem, TSelect } from '@/components/tis_ui';
import { TSearchSelector, UploadImageUseFs } from '@/components/bussinessComponents';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { connect } from 'dva';
import { themeGuideOptionStatus } from '@/utils/constantEnum';

function Properties({ focusNode }) {
  const [form] = Form.useForm();
  const {
    uuid,
    policyWords = [],
    cue,
    pictureUrl = {},
    status = themeGuideOptionStatus.empty,
  } = focusNode;

  const [debounceChange] = useState(() => {
    return _.debounce(() => {
      form
        .validateFields()
        .then(
          ({
            uuid: nextUuid,
            policyWords: nextPolicyWords = [],
            cue: nextCue,
            pictureUrl: nextPicUrl,
            status: nextStatus,
          }) => {
            focusNode.uuid = nextUuid;
            focusNode.policyWords = _.map(nextPolicyWords, ({ value }) => ({ rid: value }));
            focusNode.cue = nextCue;
            focusNode.pictureUrl = nextPicUrl && { url: nextPicUrl[0], name: nextPicUrl[1] };
            focusNode.status = nextStatus;
          },
        );
    }, 500);
  });

  return (
    <>
      <Form
        form={form}
        initialValues={{
          uuid,
          policyWords: _.map(policyWords, ({ rid }) => rid),
          cue,
          pictureUrl: [pictureUrl.url, pictureUrl.name],
          status,
        }}
        style={{ padding: '0 5%' }}
        onChange={debounceChange}
      >
        <Row>
          <TItem col={18} labelCol={{ span: 8 }} label="选项唯一标识" name="uuid">
            <Input />
          </TItem>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Button
              onClick={() => {
                form.setFieldsValue({ uuid: uuidv4() });
                debounceChange();
              }}
            >
              生成
            </Button>
          </Col>
          <TItem wrapperCol={{ span: 18 }} label="选项状态" name="status">
            <TSelect onChange={debounceChange}>
              {_.map(themeGuideOptionStatus, (value, key) => (
                <TSelect.Option key={key} value={value}>
                  {themeGuideOptionStatus.$names[key]}
                </TSelect.Option>
              ))}
            </TSelect>
          </TItem>
          <TItem wrapperCol={{ span: 18 }} label="百科词条" name="policyWords">
            <TSearchSelector
              onChange={debounceChange}
              type="policyWords"
              style={{ width: '100%' }}
            />
          </TItem>
          <TItem labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} label="选项关联提示" name="cue">
            <RichText base64 onChange={debounceChange} />
          </TItem>
          <TItem labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} label="流程图" name="pictureUrl">
            <UploadImageUseFs onChange={debounceChange} />
          </TItem>
        </Row>
      </Form>
    </>
  );
}

export default connect(({ scenesQA }) => ({
  focusNode: scenesQA.focusNode,
  scenesId: scenesQA.scenesId,
  tree: scenesQA.tree,
}))(Properties);
