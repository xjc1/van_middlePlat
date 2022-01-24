import React, { Component } from 'react';
import { TItem, ModalForm, TButton } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Button, Input, Row, Avatar, Select, message, notification } from 'antd';
import _ from 'lodash';
import { appUserType, commonReview } from '@/utils/constantEnum';
import EmptyFn from '@/utils/EmptyFn';
import { KERNEL } from '@/services/api';
import styles from '../applicationAudit.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

class ReviewApplication extends Component {
  queryForm = null;

  // 更改审核状态
  updateReviewState = async type => {
    const {
      info: { id },
      fetchList,
      complete,
    } = this.props;

    try {
      await KERNEL.updateApplicationReviewUsingPOST({ body: { id, review: type } });
      fetchList({});
      complete();
      notification.success({
        message: `应用${commonReview.$v_names[type]}`,
      });
    } catch (error) {
      message.error('好像出错了哦……');
      console.log('error', error);
    }
  };

  render() {
    const { info, readOnly, complete = EmptyFn } = this.props;

    const initialValues = info || {};

    return (
      <ModalForm
        onForm={form => {
          this.queryForm = form;
        }}
        visible
        title="应用信息"
        maskClosable={false}
        handleCancel={complete}
        initialValues={initialValues}
        footer={
          <>
            <Button onClick={complete}>取消</Button>
            {!readOnly && (
              <>
                <TButton.Button
                  type="danger"
                  ghost={false}
                  confirmText="警告"
                  confirmContent="确定要驳回吗?"
                  onClick={() => this.updateReviewState(commonReview.reject)}
                  style={{ marginRight: 0 }}
                >
                  驳回
                </TButton.Button>
                <TButton.Button
                  type="primary"
                  ghost={false}
                  onClick={() => this.updateReviewState(commonReview.resolve)}
                >
                  通过
                </TButton.Button>
              </>
            )}
          </>
        }
      >
        <div className={styles.twoGridPage}>
          <div className={styles.leftGrid}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <TItem name="name" label="应用名称" col={12} {...layout}>
                <Input disabled={readOnly} />
              </TItem>
              <TItem name="telephone" label="联系电话" col={12} {...layout}>
                <Input disabled={readOnly} />
              </TItem>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <TItem name="regions" label="行政区" col={12} {...layout}>
                <DictSelect
                  disabled={readOnly}
                  multiple
                  dict="SH00XZQH"
                  field="regions"
                  dictType="tree"
                  col={11}
                />
              </TItem>
              <TItem name="objectType" label="面向空间" col={12} {...layout}>
                <Select disabled={readOnly}>
                  {_.map(appUserType, (v, k) => (
                    <Select.Option key={k} value={v}>
                      {appUserType.$names[k]}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
            </Row>
            <TItem name="deployPath" label="应用发布路径" col={24} {...layout}>
              <Input disabled={readOnly} placeholder="请输入" col={24} />
            </TItem>
            <TItem name="path" label="应用地址" col={24} {...layout}>
              <Input disabled={readOnly} placeholder="请输入" />
            </TItem>
            <TItem name="simple" label="应用简介" col={24} {...layout}>
              <TextArea disabled={readOnly} autoSize={{ minRows: 4 }} placeholder="请输入" />
            </TItem>
          </div>
          <div className={styles.rightGrid}>
            <p>图标</p>
            <Avatar size={128} src={info.icon} />
          </div>
        </div>
      </ModalForm>
    );
  }
}

export default ReviewApplication;
