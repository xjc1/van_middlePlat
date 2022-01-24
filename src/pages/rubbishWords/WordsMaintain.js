import React, { useEffect, useState } from 'react';
import { FormCard, TItem, FormBtnGp } from '@/components/tis_ui';
import { Form, Row, message, Card, InputNumber } from 'antd';
import { BANNEDWORDREPLY, CORE } from '@/services/api';
import router from '@/utils/tRouter';
import authEnum, { authCheck } from '@/utils/auth';
import { DictSelect } from '@/components/bussinessComponents';
import ReplyTable from './components/replyTable';

const defaultLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function WordsMaintain(props) {
  const {
    location: {
      query: { code },
    },
  } = props;
  const [initValue, setInitValue] = useState(null);
  const editAble = authCheck(authEnum.rubbishWords_edit_alias, true, false);
  console.log('🚀 ~ file: WordsMaintain.js ~ line 25 ~ WordsMaintain ~ editAble', editAble);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await CORE.getBannedWordReplyByCodeUsingGET({ params: { typeCode: code } });
      setInitValue(res);
    } catch (e) {
      message.error('获取数据失败');
      setInitValue({ code: '' });
    }
  }

  const handleSubmit = () => {
    const { id } = initValue;
    form.validateFields().then(vals => {
      BANNEDWORDREPLY.updateBannedWordReplyUsingPOST({
        body: { ...vals, id },
      }).then(() => {
        message.success('操作成功！');
      });
    });
  };

  return (
    initValue && (
      <Card
        style={{ minHeight: '100vh' }}
        bordered
        title={
          <span>
            <span>
              <span>垃圾词库/维护词条</span>
            </span>
            <a style={{ float: 'right' }} onClick={() => router.push('rubbishWords')}>
              返回词库列表
            </a>
          </span>
        }
      >
        <Form form={form} initialValues={initValue}>
          <FormCard title="维护信息" style={{ border: 'unset' }}>
            <Row style={{ flex: 'auto', minWidth: 0 }}>
              <TItem
                col={12}
                name="typeCode"
                label="词条类型"
                disabled
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                rules={[{ required: true, message: '词条类型不能为空' }]}
              >
                <DictSelect disabled dict="BWT1000" dictType="tree" />
              </TItem>

              <TItem
                col={12}
                name="threshold"
                label="阈值"
                {...defaultLayout}
                rules={[{ required: true, message: '阈值不能为空' }]}
              >
                <InputNumber min={0} max={1} disabled={!editAble} step={0.01} />
              </TItem>
              <ReplyTable disabled={!editAble} />
            </Row>
          </FormCard>
        </Form>
        <FormBtnGp disabled={!editAble} onOk={handleSubmit} />
      </Card>
    )
  );
}

export default WordsMaintain;
