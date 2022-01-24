import React, { useEffect, useState } from 'react';
import { FormCard, TItem, FormRules } from '@/components/tis_ui';
import { Form, Row, Input, message, Select, Card } from 'antd';
import { sexType } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import router from '@/utils/tRouter';
import _ from 'lodash';
import AddUserTag from './addUserTag';

const defaultLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function ViewPortraitSelf(props) {
  const {
    match: {
      params: { id },
    },
    editVisible = false,
  } = props;
  const [initValue, setInitValue] = useState(null);
  const [timeKey, setTimeKey] = useState(Date.now());
  const [userTagValue, setUserTagValue] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await KERNEL.queryUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements, userBasicInfo = {}, updateTime } = res;
      const init = { userTag: tagManagements, ...userBasicInfo, updateTime };
      setUserTagValue(tagManagements);
      setInitValue(init);
      setTimeKey(Date.now());
    } catch (e) {
      message.error('获取数据失败');
    }
  }

  async function handleAddTag(tagId) {
    if (id) {
      await KERNEL.addNewUserTagUsingPOST({
        body: { portraitTagId: tagId, uniqueCode: id },
      });
      const res = await KERNEL.queryUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements } = res;
      setUserTagValue(tagManagements);
      message.success('操作成功');
    }
  }

  async function handleRemoveTag(tagId) {
    if (id) {
      await KERNEL.removeUserTagForKernelUsingPOST({
        body: { portraitTagId: tagId, uniqueCode: id },
      });
      const res = await KERNEL.queryUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements } = res;
      setUserTagValue(tagManagements);
      message.success('操作成功');
    }
  }

  function handleRefresh(code) {
    return new Promise((resolve, reject) => {
      KERNEL.refreshPersonalTagUsingPOST(code)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return (
    initValue && (
      <Card
        bordered
        title={
          <span>
            <span>
              <span>个人列表/更多信息</span>
            </span>
            <a
              style={{ float: 'right' }}
              onClick={() => router.push('portraitSelf')}
            >
              返回个人列表
            </a>
          </span>
        }
      >
        <Form form={form} initialValues={initValue} key={timeKey}>
          <FormCard title="个人基本信息" style={{ border: 'unset' }}>
            <Row style={{ flex: 'auto', minWidth: 0 }}>
              <TItem name="name" label="姓名" {...defaultLayout}>
                <Input disabled />
              </TItem>
              <TItem
                name="uniqueCode"
                label="证件号码"
                rules={[FormRules.idNum()]}
                {...defaultLayout}
              >
                <Input disabled />
              </TItem>
              <TItem name="certificateType" label="证件类型" {...defaultLayout}>
                <Input disabled />
              </TItem>
              <TItem name="sex" label="性别" {...defaultLayout}>
                <Select disabled>
                  {_.map(sexType, (v, k) => (
                    <Select.Option key={k} value={v}>
                      {sexType.$names[k]}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
              <TItem name="age" label="年龄" {...defaultLayout}>
                <Input disabled />
              </TItem>
            </Row>
          </FormCard>
          <FormCard title="个人画像标签" style={{ border: 'unset' }}>
            <Row style={{ flex: 'auto', minWidth: 0 }}>
              <TItem label="用户标签" {...defaultLayout}>
                <AddUserTag
                  handleRefresh={() => handleRefresh(initValue.code)}
                  reload={() => getData()}
                  userTagValue={userTagValue}
                  updateTime={initValue.updateTime}
                  handleAddTag={handleAddTag}
                  handleRemoveTag={handleRemoveTag}
                  disabled={!editVisible}
                />
              </TItem>
            </Row>
          </FormCard>
        </Form>
      </Card>
    )
  );
}

export default ViewPortraitSelf;
