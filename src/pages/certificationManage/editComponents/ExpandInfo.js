import React from 'react';
import _ from 'lodash';
import { TItem, TabForm, FormRules, EmptyFn } from '@/components/tis_ui';
import { TSearchSelector } from "@/components/bussinessComponents";
import AddRelations from "@/components/bussinessComponents/Relation/AddRelations";
import { bulkAddType } from "@/components/bussinessComponents/MessageRelatedWithModeSelector/const";
import { Tooltip, Button } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo(props) {
  const { editVisible, onOperateForm = EmptyFn } = props;

  return (
    <TabForm.Tab {...props}>
      <TItem name="relatedMaterial"
             label="关联材料"
             {...layout}>
        <TSearchSelector type="standard_material"
                         mode="single"
                         disabled={!editVisible} />
      </TItem>
      <TItem name="relatedDataService"
             label="关联用数"
             {...layout}>
        <TSearchSelector type="data_reuse"
                         mode="single"
                         disabled={!editVisible} />
      </TItem>
      <TItem name="relatedMatter" label="相关事项" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          canDelete={false}
          bulkAddType={bulkAddType.scene}
          extraColumn={[
            {
              title: '区划',
              dataIndex: 'regions',
              ellipsis: true,
              render: regions => (
                <Tooltip title={regions} placement="topLeft">
                  {regions}
                </Tooltip>
              ),
            },
            {
              title: '来源',
              dataIndex: 'source',
              ellipsis: true,
              render(source) {
                return source === 0 ? '材料' : '手动';
              },
            },
            {
              title: '操作',
              dataIndex: 'operator',
              align: 'center',
              render: (text, record) => {
                return record.source !== 0 &&
                  <Button type="link"
                          danger
                          onClick={() => {
                            onOperateForm((form) => {
                              const data = form.getFieldValue('relatedMatter') || [];
                              form.setFieldsValue({
                                relatedMatter: _.filter(data, ({ key }) => key !== record.key)
                              });
                            });
                          }}>删除</Button>;
              },
            },
          ]}
          disabled={!editVisible}
          type="scene"
        />
      </TItem>
      <TItem name="relatedPolicy" label="相关政策" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          canDelete={false}
          bulkAddType={bulkAddType.policyLibrary}
          disabled={!editVisible}
          extraColumn={[
            {
              title: '来源',
              dataIndex: 'source',
              ellipsis: true,
              render(source) {
                return source === 0 ? '材料' : '手动';
              },
            },
            {
              title: '操作',
              dataIndex: 'operator',
              align: 'center',
              render: (text, record) => {
                return record.source !== 0 &&
                  <Button type="link"
                          danger
                          onClick={() => {
                            onOperateForm((form) => {
                              const data = form.getFieldValue('relatedPolicy') || [];
                              form.setFieldsValue({
                                relatedPolicy: _.filter(data, ({ key }) => key !== record.key)
                              });
                            });
                          }}>删除</Button>;
              },
            },
          ]}
          type="policyLibrary"
        />
      </TItem>
      <TItem name="relatedScene" label="相关主题" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          bulkAddType={bulkAddType.scene}
          disabled={!editVisible}
          type="scene"
        />
      </TItem>
      <TItem name="relatedService" label="相关服务" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          bulkAddType={bulkAddType.convenience}
          disabled={!editVisible}
          type="convenience"
        />
      </TItem>
      <TItem name="relatedArticle" label="相关文章" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          bulkAddType={bulkAddType.article}
          disabled={!editVisible}
          type="article"
        />
      </TItem>
      <TItem name="relatedProject" label="相关项目" {...layout}>
        <AddRelations
          showBulkAdd
          firstTranslate
          bulkAddType={bulkAddType.project}
          disabled={!editVisible}
          type="project"
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
