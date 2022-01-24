import { Divider, Select, Input } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { TItem } from '@/components/tis_ui';
import { DictSelect, PortraitTag, PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType, receivingRange } from '@/utils/constantEnum';
import styles from './index.less';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

@connect(({ createMessageForm }) => ({
  ...createMessageForm.step,
  ...createMessageForm,
}))
class ReceivingRange extends PureComponent {
  state = {
    // eslint-disable-next-line react/no-unused-state
    regionsName: [],
  };

  changeUserType = userType => {
    const { formRef, formData, dispatch } = this.props;
    formData.userType = userType;
    formRef.current.setFieldsValue({
      personalUniqueCodes: undefined,
      enterpriseUniqueCodes: undefined,
      personalLabels: undefined,
      legalLabels: undefined,
    });
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  };

  // eslint-disable-next-line no-shadow
  changeReceivingRange = receivingRange => {
    const { formRef, formData, dispatch } = this.props;
    formData.receivingRange = receivingRange;
    formRef.current.setFieldsValue({
      personalUniqueCodes: undefined,
      enterpriseUniqueCodes: undefined,
      personalLabels: undefined,
      legalLabels: undefined,
    });
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  };

  render() {
    const { edit, formData, check } = this.props;
    const { userType } = formData;
    return (
      <Fragment>
        <div style={{ width: '900px' }} className={styles.desc}>
          <strong>接受群体配置</strong>
        </div>
        <Divider style={{ margin: '10px 0 10px' }} />
        <TItem
          col={20}
          name="userType"
          label="用户类型"
          {...layout}
          rules={[{ required: true, message: '用户类型不能为空!' }]}
        >
          <Select disabled={check} onChange={this.changeUserType}>
            {_.map(appUserType, (value, key) => (
              <Select.Option key={key} value={value}>
                {appUserType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem
          col={20}
          name="receivingRange"
          label="接收范围"
          {...layout}
          rules={[{ required: true, message: '接收范围不能为空!' }]}
        >
          <Select disabled={check} onChange={this.changeReceivingRange}>
            {_.map(receivingRange, (value, key) => (
              <Select.Option key={key} value={value}>
                {receivingRange.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        {(userType === appUserType.self || userType === appUserType.selfAndLegalPerson) &&
          formData.receivingRange === receivingRange.tags && (
            <TItem
              col={20}
              name="personalLabels"
              label="个人标签"
              {...layout}
              rules={[{ required: true, message: '个人标签不能为空!' }]}
            >
              <PortraitTagDrawerSelect
                type={appUserType.self}
                placeholder="请选择个人标签"
                disabled={check}
              />
            </TItem>
          )}
        {(userType === appUserType.legalPerson || userType === appUserType.selfAndLegalPerson) &&
          formData.receivingRange === receivingRange.tags && (
            <TItem
              col={20}
              name="legalLabels"
              label="法人标签"
              {...layout}
              rules={[{ required: true, message: '法人标签不能为空!' }]}
            >
              <PortraitTagDrawerSelect
                type={appUserType.legalPerson}
                placeholder="请选择法人标签"
                disabled={check}
                mode="multiple"
              />
            </TItem>
          )}

        {formData.receivingRange === 1 && (
          <div>
            <p style={{ textAlign: 'center', color: 'blue' }}>
              提示：多个用户唯一标识之间，请用英文逗号（,）分隔，例如：a,b,c
            </p>
            {_.includes(formData.userType, '2') && (
              <TItem
                col={20}
                name="enterpriseUniqueCodes"
                label="企业用户请输入统一社会信用代码"
                {...layout}
              >
                <Input.TextArea rows={4} disabled={edit || check} />
              </TItem>
            )}
            {_.includes(formData.userType, '1') && (
              <TItem
                col={20}
                name="personalUniqueCodes"
                label="个人用户请输入身份证号码"
                {...layout}
              >
                <Input.TextArea rows={4} disabled={edit || check} />
              </TItem>
            )}
          </div>
        )}
        {formData.receivingRange === 2 && (
          <TItem
            col={20}
            name="regions"
            label="行政区划"
            {...layout}
            rules={[{ required: true, message: '行政区划不能为空!' }]}
          >
            <DictSelect
              multiple
              dict="SH00XZQH"
              treeNodeFilterProp="title"
              showSearch
              disabled={check}
              dictType="tree"
              allowClear
              style={{ width: '100%' }}
            />
          </TItem>
        )}
      </Fragment>
    );
  }
}
export default ReceivingRange;
