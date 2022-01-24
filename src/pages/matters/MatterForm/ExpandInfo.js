import React from 'react';
import { Input, Select } from 'antd';
import { TabForm, TItem, RichText, TLink } from '@/components/tis_ui';
import { TSearchSelector, FileUpload, MatterMultiTable, DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { matterDealType } from '@/utils/constantEnum';
import LimitType from '@/pages/matters/MatterForm/LimitType';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ExpandInfo({ disabled, instance, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <TItem name="colloquialName" label="口语化名称" {...layout}>
        <Input disabled={disabled} placeholder="请输入口语化名称" />
      </TItem>
      <TItem name="tuningWord" label="调节词" {...layout}>
        <Input.TextArea disabled={disabled} placeholder="请输入调节词" />
      </TItem>
      <TItem
        name="attributionDepartment"
        label="归属部门"
        tip="字典: SHGSBMSH"
        rules={[{ required: true, message: '归属部门必填' }]}
        {...layout}
      >
        <DictSelect
          disabled={disabled}
          dict="SHGSBMSH"
          dictType="tree"
          showSearch
          multiple
          treeNodeFilterProp="title"
        />
      </TItem>
      <TItem name="doUrl" label="PC端网上办理地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理地址" />
      </TItem>
      <TItem name="wechatUrl" label="微信端办理地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理地址" />
      </TItem>
      <TItem name="appUrl" label="App端办理地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理地址" />
      </TItem>
      <TItem name="terminalUrl" label="自助终端办理地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理地址" />
      </TItem>
      <TItem name="guideUrl" label="办事指南地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入地址" />
      </TItem>
      <TItem name="relationMatchService" label="关联服务" {...layout}>
        <TSearchSelector disabled={disabled} type="convenience" />
      </TItem>
      <TItem name="relationMatchScene" label="关联主题" {...layout}>
        <TSearchSelector disabled={disabled} type="scene" />
      </TItem>
      <TItem name="relationMatchProject" label="关联项目" {...layout}>
        <TSearchSelector disabled={disabled} type="project" />
      </TItem>
      <TItem name="relationMatchPolicy" label="关联政策" {...layout}>
        <TSearchSelector disabled={disabled} type="policyLibrary" />
      </TItem>
      {instance && (
        <TItem name="relationMatchSynonym" label="关联问题" {...layout}>
          <TSearchSelector type="synonym" disabled />
        </TItem>
      )}
      <TItem name="relationMatchArticle" label="关联文章" {...layout}>
        <TSearchSelector type="article" disabled={disabled} />
      </TItem>
      <TItem name="preMatter" label="前置事项" {...layout}>
        <MatterMultiTable showHeader disabled={disabled} />
      </TItem>
      <TItem name="afterMatter" label="后置事项" {...layout}>
        <MatterMultiTable showHeader disabled />
      </TItem>
      <TItem name="applyNotice" label="申请须知" {...layout}>
        <RichText contentStyle={{ height: 300 }} base64 readOnly={disabled} />
      </TItem>
      <TItem name="applyNoticeFile" label="上传申请须知文件" {...layout}>
        <FileUpload
          download
          fileTypeList={['jpg', 'png', 'doc', 'docx', 'pdf', 'rar']}
          disabled={disabled}
        />
      </TItem>
      <TItem name="limitNotice" label="限制须知" {...layout}>
        <RichText contentStyle={{ height: 300 }} base64 readOnly={disabled} />
      </TItem>
      <TItem name="limitNoticeFile" label="上传限制须知文件" {...layout}>
        <FileUpload
          download
          fileTypeList={['jpg', 'png', 'doc', 'docx', 'pdf', 'rar']}
          disabled={disabled}
        />
      </TItem>
      <TItem name="legalBasisNotice" label="法律依据来源" {...layout}>
        <RichText contentStyle={{ height: 300 }} base64 readOnly={disabled} />
      </TItem>
      <TItem name="legalBasisNoticeFile" label="上传法律依据来源文件" {...layout}>
        <FileUpload
          download
          fileTypeList={['jpg', 'png', 'doc', 'docx', 'pdf', 'rar']}
          disabled={disabled}
        />
      </TItem>
      <TItem name="handleTimeLimitType" label="办理时限类型" {...layout}>
        <Select disabled={disabled} placeholder="请选择办理时限类型">
          {_.map(matterDealType, (v, k) => (
            <Select.Option key={k} value={v}>
              {matterDealType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TLink dependencies={['handleTimeLimitType']}>
        {({ handleTimeLimitType }) => {
          if (!handleTimeLimitType) return <></>;
          const idFixedTime = handleTimeLimitType === matterDealType.fixed;
          return (
            <TItem
              name="handleTimeLimit"
              label={idFixedTime ? '固定期限' : '限定时限'}
              required
              rules={[
                () => ({
                  validator(rule, value) {
                    const { startTime, dateNumber } = value;
                    if (idFixedTime && !startTime) {
                      return Promise.reject(new Error('请选择固定期限'));
                    }
                    if (handleTimeLimitType === matterDealType.limit && !dateNumber) {
                      return Promise.reject(new Error('请输入限时期限'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              {...layout}
            >
              <LimitType idFixedTime={idFixedTime} />
            </TItem>
          );
        }}
      </TLink>
    </TabForm.Tab>
  );
}

export default ExpandInfo;
