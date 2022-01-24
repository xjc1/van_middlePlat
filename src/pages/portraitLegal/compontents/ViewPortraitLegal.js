import React, { useEffect, useState } from 'react';
import { FormCard, TItem, FormRules } from '@/components/tis_ui';
import { Form, Row, Input, message, DatePicker, Card } from 'antd';
import { KERNEL } from '@/services/api';
import moment from 'moment';
import router from '@/utils/tRouter';
import AddUserTag from './addUserTag';

const defaultLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const dateFormat = 'YYYY/MM/DD';

function ViewPortraitSelf(props) {
  const {
    match: {
      params: { id },
    },
    editVisible = false,
  } = props;
  const [form] = Form.useForm();
  const [initValue, setInitValue] = useState(null);
  const [timeKey, setTimeKey] = useState(Date.now());
  const [userTagValue, setUserTagValue] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await KERNEL.queryLegalUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements, legalUserBasicInfo = {}, updateTime } = res;

      const { establishDate } = legalUserBasicInfo;
      const formatDate = establishDate ? moment(establishDate, dateFormat) : establishDate;
      const init = {
        userTag: tagManagements,
        ...legalUserBasicInfo,
        establishDate: formatDate,
        updateTime,
      };
      setUserTagValue(tagManagements);
      setInitValue(init);
      setTimeKey(Date.now());
    } catch (e) {
      setInitValue({});
      message.error('获取数据失败');
    }
  }

  async function handleAddTag(tagId) {
    if (id) {
      await KERNEL.addNewLegalTagUsingPOST({
        body: { portraitTagId: tagId, uniqueCode: id },
      });
      const res = await KERNEL.queryLegalUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements } = res;
      setUserTagValue(tagManagements);
      message.success('操作成功');
    }
  }

  async function handleRemoveTag(tagId) {
    if (id) {
      await KERNEL.removeLegalTagForKernelUsingPOST({
        body: { portraitTagId: tagId, uniqueCode: id },
      });
      const res = await KERNEL.queryLegalUserTagMoreUsingGET({ params: { uniqueCode: id } });
      const { tagManagements } = res;
      setUserTagValue(tagManagements);
      message.success('操作成功');
    }
  }

  function handleRefresh(code) {
    return new Promise((resolve, reject) => {
      KERNEL.refreshLegalTagUsingPOST(code)
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
              <span>法人列表/更多信息</span>
            </span>
            <a
              style={{ float: 'right' }}
              onClick={() => router.push('portraitLegal')}
            >
              返回法人列表
            </a>
          </span>
        }
      >
        <Form form={form} key={timeKey} initialValues={initValue}>
          <FormCard title="法人基本信息" style={{ border: 'unset' }}>
            <Row style={{ flex: 'auto', minWidth: 0 }}>
              <TItem name="corpName" label="法人名称" {...defaultLayout}>
                <Input disabled />
              </TItem>
              <TItem
                name="uniqueCode"
                label="统一社会信用代码"
                rules={[FormRules.idNum()]}
                {...defaultLayout}
              >
                <Input disabled />
              </TItem>
              <TItem name="corpType" label="法人类别" {...defaultLayout}>
                <Input disabled />
              </TItem>
              <TItem name="establishDate" label="成立日期" {...defaultLayout}>
                <DatePicker format={dateFormat} disabled />
              </TItem>
            </Row>
          </FormCard>
          <FormCard title="法人画像标签" style={{ border: 'unset' }}>
            <Row style={{ flex: 'auto', minWidth: 0 }}>
              <TItem label="用户标签" {...defaultLayout}>
                <AddUserTag
                  handleRefresh={() => handleRefresh(initValue.code)}
                  reload={() => getData()}
                  updateTime={initValue.updateTime}
                  userTagValue={userTagValue}
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
