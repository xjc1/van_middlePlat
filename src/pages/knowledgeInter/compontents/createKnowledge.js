/* eslint-disable */
import React from 'react';
import { Form, Modal, Row, Input, message, Button, DatePicker } from 'antd';
import styles from './index.less';
import { FormCard, TItem } from '@/components/tis_ui';
import { FileUpload } from '@/components/bussinessComponents';
import {
  pageStatus as pageEnum,
} from '@/utils/constantEnum';
import { CORE, KNOWLEDGESTOREINTERFACES } from '@/services/api';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD hh:mm:ss';

function CreateKnowLedge({
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
  const { id } = initData;
  const [form] = Form.useForm();

  const handleSumit = async (vals, recordId) => {
    const { interfaceFileDownloadUrl = ['', ''], publishDate } = vals;
    const [path, fileName] = interfaceFileDownloadUrl;
    let newPublishDate;
    if (publishDate) {
      newPublishDate = moment(publishDate).format(dateFormat);
    }

    // 处理上传文件的地址与名称
    const newData = {
      ...vals,
      interfaceFileDownloadUrl: path,
      interfaceFileName: fileName,
      publishDate: newPublishDate,
    };
    // 存在id则走更新流程
    if (recordId) {
      await KNOWLEDGESTOREINTERFACES.updateKnowledgeStoreInterfaceUsingPOST({
        body: { ...newData, id },
      });
    } else {
      await CORE.addKnowledgeStoreInterfaceUsingPOST({ body: newData });
    }

    message.success('操作成功');
    onCancel();
    reload();
  };

  return (
    <Modal
      visible
      title={`${pageEnum.$v_names[pageStatus]}知识库接口`}
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
                  handleSumit(vals, id);
                });
              }}
            >
              保存
            </Button>
          )}
        </>
      }
      {...others}
    >
      <Form form={form} className={styles.cardsLayout} initialValues={initData}>
        <FormCard title="接口信息">
          <Row>
            <TItem
              label="接口名称"
              name="interfaceName"
              rules={[{ required: true, message: '接口名称不能为空!' }]}
            >
              <Input disabled={!editVisible} />
            </TItem>
            <TItem
              label="接口编号"
              name="interfaceNum"
              rules={[{ required: true, message: '接口编号不能为空!' }]}
            >
              <Input disabled={!editVisible} />
            </TItem>

            <TItem name="interfaceDesc" label="接口描述">
              <Input disabled={!editVisible} />
            </TItem>
            <TItem name="publishDate" label="发布日期">
              <DatePicker disabled={!editVisible} format={dateFormat} showTime />
            </TItem>

            <TItem label="接口文件" name="interfaceFileDownloadUrl">
              <FileUpload
                download
                fileTypelist={['xlsx', 'xls', 'doc', 'docx', 'pdf', 'ppt', 'pptx', 'txt']}
                maxFileSize={5}
                disabled={!editVisible}
              />
            </TItem>
          </Row>
        </FormCard>
      </Form>
    </Modal>
  );
}

export default CreateKnowLedge;
