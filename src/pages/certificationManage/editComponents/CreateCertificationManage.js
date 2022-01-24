import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Button, notification } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { TabForm } from '@/components/tis_ui';
import { terminalType } from '@/utils/constantEnum';
import BaseInfo from './BaseInfo';
import ExpandInfo from './ExpandInfo';
import RelationInfo from './RelationInfo';
import { LICENSE, STANDARDMATERIALS, TRANSLATE } from "@/services/api";

class Index extends PureComponent {
  form = null;

  state = {
    relativeMatter: [],
  };

  handleSubmit = () => {
    const { initialValues } = this.props;
    const { id } = initialValues || {};
    this.form.validateFields().then(({
                                       relatedMatter = [],
                                       relatedPolicy = [],
                                       relatedScene = [],
                                       relatedProject = [],
                                       relatedService = [],
                                       relatedMaterial = {},
                                       relatedDataService = {},
                                       editHistory,
                                       ...others
                                     }) => {
      const data = {
        relatedMaterial: relatedMaterial?.value,
        relatedMatter: _.map(relatedMatter, ({ source = 1, value }) => ({ itemId: value, source })),
        relatedPolicy: _.map(relatedPolicy, ({ source = 1, value }) => ({ itemId: value, source })),
        relatedScene: _.map(relatedScene, ({ source = 1, value }) => ({ itemId: value, source })),
        relatedProject: _.map(relatedProject, ({ source = 1, value }) => ({ itemId: value, source })),
        relatedService: _.map(relatedService, ({ source = 1, value }) => ({ itemId: value, source })),
        relatedDataService: relatedDataService?.key,
        ...others
      };
      if (id) {
        this.updateCertificationManage({ ...data, id });
      } else {
        this.addCertificationManage(data);
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addCertificationManage = async body => {
    await LICENSE.createLicenseUsingPOST({ body });
    notification.success({
      message: '创建成功',
    });
    router.push('certificationManage');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateCertificationManage = async body => {
    await LICENSE.updateLicenseUsingPOST({ body });
    notification.success({
      message: '更新成功',
    });
  };

  render() {
    const { initialValues = {}, editVisible = true, title = '新建证照' } = this.props;
    const initData = initialValues || {
      clientType: [terminalType.pc],
    };

    return (
      <TabForm initialValues={initData}
               defaultTabKey="baseInfo"
               title={title}
               onForm={formRef => {
                 this.form = formRef;
               }}
               btnOption={{
                 okText: initialValues ? '保存证照信息' : '提交',
                 okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
                 onOk: this.handleSubmit,
                 disabled: !editVisible,
               }}
               extra={
                 <>
                   <Button type="link" onClick={() => router.goBack()}>
                     返回列表
                   </Button>
                 </>
               }
               onValuesChange={async (values) => {
                 if ('relatedMaterial' in values) {
                   if (values?.relatedMaterial) {
                     const matters = await STANDARDMATERIALS.getMatterByStandardMaterialUsingGET({ params: { materialId: values.relatedMaterial.value } });
                     const materialDetail = await STANDARDMATERIALS.queryStandardMaterialDetailUsingGET(values.relatedMaterial.value).then(({ policyIds }) => policyIds);
                     const relativePolicys = await TRANSLATE.policyLibraryTranslateUsingPOST({ body: materialDetail });
                     const relatedMatter = this.form.getFieldValue('relatedMatter') || [];
                     const relatedPolicy = this.form.getFieldValue('relatedPolicy') || [];
                     this.form.setFieldsValue({
                       relatedMatter: _.concat(
                         _.filter(relatedMatter, ({ source = 1 }) => {
                           return source === 1;
                         }),
                         _.map(matters, ({ id, name, regionName }) => {
                           return {
                             value: id,
                             key: id,
                             label: name,
                             regions: regionName,
                             source: 0,
                           };
                         })),
                       relatedPolicy: _.concat(
                         _.filter(relatedPolicy, ({ source = 1 }) => {
                           return source === 1;
                         }),
                         _.map(relativePolicys, (v, k) => {
                           return {
                             value: k,
                             key: k,
                             label: v,
                             source: 0,
                           };
                         }))
                     });
                   } else {
                     const relatedMatter = this.form.getFieldValue('relatedMatter') || [];
                     const relatedPolicy = this.form.getFieldValue('relatedPolicy') || [];
                     this.form.setFieldsValue({
                       relatedMatter: _.filter(relatedMatter, ({ source }) => {
                         return source !== 0;
                       }),
                       relatedPolicy: _.filter(relatedPolicy, ({ source }) => {
                         return source !== 0;
                       })
                     });
                   }
                 }
               }}
      >
        <BaseInfo tabKey="baseInfo"
                  title="基本信息"
                  editVisible={editVisible} />
        <ExpandInfo tabKey="expandInfo"
                    title="拓展信息"
                    relativeMatter={this.state.relativeMatter}
                    onOperateForm={(fn) => {
                      fn(this.form);
                    }}
                    editVisible={editVisible} />
        <RelationInfo tabKey="relationInfo"
                      title="相关信息"
                      editVisible={editVisible} />
      </TabForm>
    );
  }
}

export default Index;
