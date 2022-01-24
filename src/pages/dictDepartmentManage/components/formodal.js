import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, message } from 'antd';
import _ from 'lodash';
import DepartmentTreeSelect from './departmentSelect';

import { CORE, DICT, DICTAUTH } from '@/services/api';
import DictTable from './dictTable';

class DictAuthModal extends Component {
  createForm = null;

  state = {};

  handelSubmit = async (values = {}) => {
    const { handleCancel, reload, initData = {} } = this.props;
    const { dicts = [], ...others } = values;
    const formatSubmitValue = {
      ...others,
      dictIds: _.flattenDeep(dicts.map(({ childIds = [] }) => childIds)).map(it => ({ id: it })),
    };
    const { id } = initData;
    if (id) {
      await DICTAUTH.updateDictAuthUsingPOST({ body: { ...formatSubmitValue, id } });
    } else {
      await CORE.createDictAuthUsingPOST({ body: formatSubmitValue });
    }
    message.success('提交成功');
    handleCancel();
    reload({});
  };

  fetchDictWithOutId = dictId => {
    return new Promise((resolve, reject) => {
      DICT.findTreeDictionaryUsingPOST({ body: { id: dictId } })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  render() {
    const { handleCancel, title, initData = {}, editAble = false } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible
        title={title}
        maskClosable={false}
        initialValues={initData}
        handleCancel={handleCancel}
        footer={
          <>
            <Button onClick={handleCancel}>取消</Button>
            <TButton.Button
              type="primary"
              ghost={false}
              onClick={() => {
                this.createForm.current.validateFields().then(vals => {
                  this.handelSubmit(vals);
                });
              }}
            >
              提交
            </TButton.Button>
          </>
        }
      >
        <Row style={{ flex: 'auto', minWidth: 0 }}>
          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="deptId"
            label="部门名称"
            rules={[{ required: true, message: '词条类型不能为空' }]}
          >
            <DepartmentTreeSelect disabled={!editAble} />
          </TItem>
          <TItem name="dicts" label="字典">
            <DictTable disabled={!editAble} />
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default DictAuthModal;
