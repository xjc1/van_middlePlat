import React, { useState } from 'react';
import { Form, Modal, Row, Input, message, Button, Radio, Col } from 'antd';
import styles from './index.less';
import { FormCard, TItem, TSelect } from '@/components/tis_ui';
import { FileUpload, DictSelect } from '@/components/bussinessComponents';
import {
  pageStatus as pageEnum,
  appUserType,
  themeStatus,
  cardingStatus,
} from '@/utils/constantEnum';
import { THEME } from '@/services/api';
import { themeExcelUrl, themeWordUrl } from '@/constants';
import _ from 'lodash';

const PHONE = 'phone';
const LANDLINE = 'landline';
const PHONE_REGEX = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
const LANDLINE_REGEX = /^\d{3}-\d{8}$|^\d{4}-\d{7}$/;

function CreateTheme({
  width = 900,
  onFinish,
  dispatch,
  newInstance,
  editVisible,
  pageStatus = 'new',
  onCancel,
  reload,
  initData = {},
  ...others
}) {
  const { id, phones = [] } = initData;
  const initContactType = LANDLINE_REGEX.test(phones[0]) ? LANDLINE : PHONE;
  const [contactType, setContactType] = useState(initContactType);
  const [form] = Form.useForm();

  const handleSumit = async (vals, recordId, status = 0) => {
    const { excelUrl = [], wordUrl = [], phone } = vals;
    const [path, fileName] = excelUrl;
    const [wordPath, wordFileName] = wordUrl;

    // 处理上传文件的地址与名称
    const newData = {
      ...vals,
      phones: [phone],
      excelUrl: path,
      excelName: fileName,
      wordUrl: wordPath,
      wordName: wordFileName,
      status,
    };
    // 存在id则走更新流程
    if (recordId) {
      await THEME.updateThemeUsingPOST({ body: { ...newData, id } });
    } else {
      await THEME.addOneThemeUsingPOST({ body: newData });
    }

    message.success('操作成功');
    onCancel();
    reload();
  };

  const renderContact = type => {
    switch (type) {
      case PHONE:
        return (
          <TItem
            key={PHONE}
            label="联系电话"
            name="phone"
            rules={[
              { required: true, message: '联系电话不能为空!' },
              {
                pattern: PHONE_REGEX,
                message: '手机号不合法',
              },
            ]}
          >
            <Input disabled={!editVisible} />
          </TItem>
        );
      case LANDLINE:
        return (
          <TItem
            key={LANDLINE}
            label="座机号码"
            name="phone"
            rules={[
              { required: true, message: '座机号码不能为空!' },
              {
                pattern: LANDLINE_REGEX,
                message: '座机号码不合法，区号(3位)-号码(8位) 或者 区号(4位)-号码(7位)',
              },
            ]}
          >
            <Input disabled={!editVisible} placeholder="xxx-xxxxxxxx 或者 xxxx-xxxxxxx" />
          </TItem>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible
      title={`${pageEnum.$v_names[pageStatus]}业务梳理上报`}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      width={width}
      bodyStyle={{
        background: '#f5f5f5',
        padding: '10px',
      }}
      footer={
        <>
          <Button onClick={onCancel}>取消</Button>
          {editVisible && (
            <Button
              type="primary"
              ghost={false}
              onClick={() => {
                form.validateFields().then(vals => {
                  handleSumit(vals, id, themeStatus.submit);
                });
              }}
            >
              保存
            </Button>
          )}

          {editVisible && (
            <Button
              type="primary"
              ghost={false}
              onClick={() => {
                form.validateFields().then(vals => {
                  handleSumit(vals, id, themeStatus.audit);
                });
              }}
            >
              提交审核
            </Button>
          )}
        </>
      }
      {...others}
    >
      <Form form={form} className={styles.cardsLayout} initialValues={initData}>
        <FormCard title="主题信息">
          <Row>
            <TItem
              label="主题名称"
              name="name"
              rules={[{ required: true, message: '主题名称不能为空!' }]}
            >
              <Input disabled={!editVisible} />
            </TItem>
            <Col offset={6} style={{ marginBottom: '20px' }}>
              <Radio.Group
                disabled={!editVisible}
                value={contactType}
                onChange={e => setContactType(e.target.value)}
              >
                <Radio value={PHONE}>联系电话</Radio>
                <Radio value={LANDLINE}>座机号码</Radio>
              </Radio.Group>
            </Col>
            {renderContact(contactType)}
            <TItem
              name="object"
              label="申报对象"
              rules={[{ required: true, message: '请选择申报对象' }]}
            >
              <TSelect disabled={!editVisible}>
                {_.map(appUserType, (v, k) => (
                  <TSelect.Option key={k} value={v}>
                    {appUserType.$names[k]}
                  </TSelect.Option>
                ))}
              </TSelect>
            </TItem>
            <TItem
              name="regions"
              label="行政区划"
              rules={[{ required: true, message: '请选择行政区划' }]}
            >
              <DictSelect
                dict="SH00XZQH"
                dictType="tree"
                disabled={!editVisible}
                placeholder="请选择行政区划"
              />
            </TItem>

            <TItem
              label="牵头部门"
              name="headDept"
              rules={[{ required: true, message: '牵头部门不能为空!' }]}
            >
              <Input disabled={!editVisible} />
            </TItem>
            <TItem label="配合部门" name="cooperationDept">
              <Input disabled={!editVisible} />
            </TItem>
            <TItem label="备注" name="comments">
              <Input.TextArea autoSize={{ minRows: 6, maxRows: 10 }} disabled={!editVisible} />
            </TItem>
            <TItem
              name="cardingStatus"
              label="梳理状态"
              rules={[{ required: true, message: '请选择梳理状态' }]}
            >
              <TSelect disabled={!editVisible}>
                {_.map(cardingStatus, (v, k) => (
                  <TSelect.Option key={k} value={v}>
                    {cardingStatus.$names[k]}
                  </TSelect.Option>
                ))}
              </TSelect>
            </TItem>
            <TItem
              label="业务梳理Excel上传"
              name="excelUrl"
              rules={[{ required: true, message: 'Excel文件不能为空!' }]}
            >
              <FileUpload
                download
                fileTypelist={['xlsx', 'xls']}
                maxFileSize={10}
                disabled={!editVisible}
                templateUrl={themeExcelUrl}
              />
            </TItem>
            <TItem
              label='主题"一事一案"Word上传'
              name="wordUrl"
              rules={[{ required: true, message: 'Word文件不能为空!' }]}
            >
              <FileUpload
                download
                fileTypelist={['docx', 'doc']}
                maxFileSize={10}
                disabled={!editVisible}
                templateUrl={themeWordUrl}
              />
            </TItem>
          </Row>
        </FormCard>
      </Form>
    </Modal>
  );
}

export default CreateTheme;
