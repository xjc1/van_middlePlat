import React, { Component } from 'react';
import { ModalForm, TButton, utils, FormCard } from '@/components/tis_ui';
import { Button } from 'antd';
import { connect } from 'dva';
import { commonYesNo, terminalType } from '@/utils/constantEnum';
import PolicyBasic from '@/pages/policyWords/addOrEditForm/PolicyBasic';
import PolicyExpand from '@/pages/policyWords/addOrEditForm/PolicyExpand';

const { Base64 } = utils;

@connect(({ policyWords }) => ({ ...policyWords }))
class PolicyWordsForm extends Component {
  createForm = null;

  saveData = () => {
    const { info, dispatch } = this.props;
    this.createForm.current.validateFields().then(vals => {
      const nextValue = { ...vals };
      nextValue.explain = Base64.base64(vals.explain);
      if (info.id) {
        nextValue.id = info.id;
        nextValue.status = info.status;
        dispatch({ type: 'policyWords/editHotWords', payload: nextValue });
      } else {
        nextValue.status = 0;
        dispatch({ type: 'policyWords/add', payload: nextValue });
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyWords/cancel',
      payload: false,
    });
  };

  render() {
    const { isOpenModal, isCheck, info } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible={isOpenModal}
        title="百科词条维护"
        okText="确认"
        cancelText="取消"
        maskClosable={false}
        handleCancel={this.handleCancel}
        initialValues={{
          ...info,
          explain: info.explain ? Base64.decodeBase64(info.explain) : '',
          clientType: info.clientType ? info.clientType : [terminalType.pc],
          isShare: info.isShare ? info.isShare : commonYesNo.no,
        }}
        footer={
          <>
            <Button onClick={this.handleCancel}>取消</Button>
            {!isCheck && (
              <TButton.Button type="primary" ghost={false} onClick={this.saveData}>
                提交
              </TButton.Button>
            )}
          </>
        }
      >
        <FormCard title="基本信息" bordered={false}>
          <PolicyBasic isCheck={isCheck} />
        </FormCard>
        <FormCard title="扩展信息" bordered={false}>
          <PolicyExpand isCheck={isCheck} />
        </FormCard>
      </ModalForm>
    );
  }
}

export default PolicyWordsForm;
