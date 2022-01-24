import React from 'react';
import { Row, Input, DatePicker, Divider, Button } from 'antd';
import { TabForm, TItem, RichText, EmptyFn, TRadioWithText } from '@/components/tis_ui';
import { DictSelect, FileUpload } from '@/components/bussinessComponents';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { objectDict } from '@/constants';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { commonAbsence } from '@/utils/constantEnum';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const fileIDGenerator = new IDGenerator('newFile');

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ArticleBasic({
                        disabled,
                        form,
                        cFiles,
                        setCFiles = EmptyFn(),
                        setObject = EmptyFn(),
                        setDisabledObjectType = EmptyFn(),
                        ...others
                      }) {
  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem
          name="name"
          label="文章名称"
          rules={[{ required: true, message: '文章名称不能为空!' }]}
          {...layout}
        >
          <Input disabled={disabled} />
        </TItem>
        <TItem name="level" label="文章级别" {...layout}>
          <DictSelect dict="ZCJB0001" disabled={disabled} />
        </TItem>
        <TItem
          name="regions"
          label="行政区划"
          rules={[{ required: true, message: '行政区划不能为空!' }]}
          {...layout}
        >
          <DictSelect
            dict="SH00XZQH"
            disabled={disabled}
            treeNodeFilterProp="title"
            showSearch
            dictType="tree"
          />
        </TItem>
        <TItem name="content" label="文章正文" {...layout}>
          <RichText readOnly={disabled} />
        </TItem>
        <TItem name="articleAbstract" label="摘要" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem name="url" label="原文链接" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        {_.map(cFiles, (cFile, id) => {
          return (
            <TItem key={id} label="相关附件" name={['files', id, 'downloadUrl']} {...layout}>
              <FileUpload
                disabled={disabled}
                download
                allowClear
                maxFileSize={100}
                onProxyDeleteControl={deleteFn => {
                  // eslint-disable-next-line no-param-reassign
                  cFile.operate = { handleDelete: deleteFn };
                }}
              />
            </TItem>
          );
        })}
        <Divider>
          <Button
            onClick={() => {
              const newCFiles = { ...cFiles, [fileIDGenerator.next()]: {} };
              setCFiles(newCFiles);
            }}
          >
            附件
          </Button>
        </Divider>
        <TItem name="releaseTime" label="发布日期" {...layout}>
          <DatePicker showTime disabled={disabled} format={dateFormat} />
        </TItem>
        {disabled && (
          <>
            <TItem name="createTime" label="创建时间" {...layout}>
              <Input disabled />
            </TItem>
            <TItem name="collectDepartment" label="创建部门" {...layout}>
              <DepartmentTreeSelect disabled />
            </TItem>
            <TItem name="updateTime" label="更新时间" {...layout}>
              <Input disabled />
            </TItem>
            <TItem name="updateDept" label="更新部门" {...layout}>
              <DepartmentTreeSelect disabled />
            </TItem>
          </>
        )}
        <TItem name="sourceType" label="文章来源" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem
          name="clientType"
          label="终端类型"
          {...layout}
          rules={[{ required: true, message: '终端类型不能为空!' }]}
        >
          <DictSelect dict="ZDLX" dictType="tree" showArrow disabled={disabled} multiple />
        </TItem>
        <TItem name="objectType" label="对象类型" {...layout}>
          <DictSelect
            dict="DXLX0001"
            disabled={disabled}
            dictType="tree"
            onChange={value => {
              setObject(value);
              form.setFieldsValue({ threeType: undefined });
              if (value === objectDict.legalPerson) {
                setDisabledObjectType(objectDict.person);
                form.setFieldsValue({
                  personalPortraitTag: undefined,
                  personalOrPortraitTag: undefined,
                });
              } else if (value === objectDict.person) {
                setDisabledObjectType(objectDict.legalPerson);
                form.setFieldsValue({
                  legalPersonPortraitTag: undefined,
                  legalPersonOrPortraitTag: undefined,
                });
              } else {
                setDisabledObjectType('');
              }
            }}
          />
        </TItem>
        <TItem name="attributionDepartment" label="归属部门" tip="字典: SHGSBMSH" {...layout}>
          <DictSelect
            disabled={disabled}
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem
          label="线上帮办"
          name="onlineHelp"
          {...layout}
          disabled={disabled}
          rules={[{ required: true, message: '线上帮办必填' }]}
        >
          <TRadioWithText
            contentCol={4}
            disabled={disabled}
            datasource={commonAbsence}
            text="（若该内容为线上帮办使用，请勾选【是】，否则请勾选【否】）"
          />
        </TItem>
      </Row>
    </TabForm.Tab>
  );
}

export default ArticleBasic;
