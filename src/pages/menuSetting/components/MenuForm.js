import React from 'react';
import { TItem, FormRules } from '@/components/tis_ui';
import { DictSelect, PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import { appUserType, commonYesNo } from '@/utils/constantEnum';
import { Button, Input, Select, TreeSelect, Row } from 'antd';
import _ from 'lodash';

function MenuForm({ menuTree, disabled, copyParent }) {
  const deepTraversal = treeData => {
    const result = [];
    treeData.forEach(item => {
      const loop = data => {
        result.push({
          status: data.status,
          id: data.id,
          name: data.name,
          parentId: data.parentId,
        });
        const child = data.children;
        if (child) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < child.length; i++) {
            loop(child[i]);
          }
        }
      };
      loop(item);
    });
    return result;
  };

  const item2treeNode = (roots, group) => {
    return _.map(roots, ({ id, name }) => ({
      key: id,
      value: id,
      title: name,
      name,
      children: group[id] && item2treeNode(group[id], group),
    }));
  };

  const flattenTree = deepTraversal(menuTree);
  const group = _.groupBy(flattenTree, 'parentId');
  const treeNode = item2treeNode(group.null || group.undefined, group);

  return (
    <>
      <TItem name="name" label="菜单名称" rules={[FormRules.required('菜单名称必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="path" label="菜单路径" rules={[FormRules.required('菜单路径必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="uniqueCode" label="菜单唯一编码">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="objectType" label="对象类型">
        <Select disabled={disabled}>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <Row>
        <TItem
          label="上级菜单"
          name="parentId"
          col={16}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
        >
          <TreeSelect
            disabled={disabled}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择上级菜单"
            allowClear
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeData={treeNode}
            getPopupContainer={triggerNode => triggerNode.parentElement}
          />
        </TItem>

        <Button type="primary" onClick={copyParent}>
          数据继承
        </Button>
      </Row>

      <TItem name="en" label="菜单英文名">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="personalPortraitTag" label="个人画像标签">
        <PortraitTagDrawerSelect type={appUserType.self} disabled={disabled} />
      </TItem>
      <TItem name="legalPersonPortraitTag" label="法人画像标签">
        <PortraitTagDrawerSelect type={appUserType.legalPerson} disabled={disabled} />
      </TItem>
      <TItem name="navbarIcon" label="字体图标">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="image" label="图标链接">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="clientType" label="终端类型">
        <DictSelect dict="ZDLX" dictType="tree" showArrow multiple disabled={disabled} />
      </TItem>
      <TItem name="regions" label="行政区划">
        <DictSelect
          disabled={disabled}
          multiple
          dict="SH00XZQH"
          treeNodeFilterProp="title"
          showSearch
          dictType="tree"
        />
      </TItem>
      <TItem name="directoryId" label="目录代码">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="collectionCaliber" label="归集口径">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="display" label="默认展示">
        <Select disabled={disabled}>
          {_.map(commonYesNo, (v, k) => (
            <Select.Option key={k} value={v}>
              {commonYesNo.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="faceDetect" label="人脸识别">
        <Select disabled={disabled}>
          {_.map(commonYesNo, (v, k) => (
            <Select.Option key={k} value={v}>
              {commonYesNo.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="showErrorCorrection" label="纠错是否显示">
        <Select disabled={disabled}>
          {_.map(commonYesNo, (v, k) => (
            <Select.Option key={k} value={v}>
              {commonYesNo.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="attributionDepartment" label="归属部门">
        <DictSelect disabled={disabled} multiple dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
      </TItem>
      <TItem label="工单编号" name="workOrderCode">
        <DictSelect dictType="tree" multiple dict="GDBM" />
      </TItem>
    </>
  );
}

export default MenuForm;
