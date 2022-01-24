import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { TabForm } from '@/components/tis_ui';
import _ from 'lodash';
import { notification, Drawer } from 'antd';
import router from '@/utils/tRouter';
import { objectDict } from '@/constants';
import { POLICY } from '@/services/api';
import PolicyProps from './PolicyProps';
import PolicyCover from './PolicyCover';
import PolicyContent from './PolicyContent';
import ExtendRead from './ExtendRead';
import PolicyVersion from './PolicyVersion';
import ConditionRelated from './ConditionRelated';
import PolicyGraphPanel from './PolicyGraphPanel';
import PolicyDetailPanel from '@/pages/policyGraph/policyDetailPanel';

const defaultRelatedItem = {
  key: 'defaultKey',
  isRoot: true,
  operator: 'and',
  children: [],
};

function Index(props) {
  const {
    title = '新增政策',
    disabled = false,
    deptCode,
    policyInfo = {},
    objectType,
    setObjectType,
  } = props;
  const [formRef, setFormRef] = useState(null);
  const [showNode, setShowNode] = useState();
  const [valibleClientType, setValibleClientType] = useState(policyInfo.clientType);

  let tabForm = null;

  useEffect(() => {
    setFormRef(tabForm);
  }, [tabForm]);

  const initialValues = {
    objectType: objectDict.personAndLegalPerson,
    attributionDepartment: [deptCode],
    ...policyInfo,
  };

  const { permanent = false, showPredict, singleSelect = '' } = policyInfo;

  function handleSubmit() {
    formRef
      .validateFields()
      .then(values => {
        // 政策类型值需要转换为object
        const {
          pubTime,
          category = [],
          officialDocumentsTypes = [],
          occupationTag = [],
          currencyTag = [],
          threeType = [],
          department = [],
          relationMatchScene = [],
          relationMatchService = [],
          relationMatchProject = [],
          relationMatchMatters = [],
          relationPolicy = [],
          restrictiveCondition = [],
          restrictiveConditionLegalPerson = [],
          talentProject = [],
          singleSelect: sgSelect = [],
          personalPortraitTag = [],
          legalPersonPortraitTag = [],
          personalUnnecessaryPortraitTag = [],
          legalPersonUnnecessaryPortraitTag = [],
          files = [],
          minimalConditionRelation = defaultRelatedItem,
        } = values;
        const compactFiles = _.compact(files);
        const formData = {
          ...values,
          pubTime: pubTime ? pubTime.format('YYYY-MM-DD HH:mm:ss') : pubTime,
          category: category.map(it => ({ id: it })),
          officialDocumentsTypes: officialDocumentsTypes.map(it => ({ id: it })),
          department: department.map(it => ({ id: it })),
          // 后端有格式校验，没有则不转换格式 避免出现 [{code: ''}]
          occupationTag: occupationTag.map(({ key }) => ({ id: key })),
          currencyTag: currencyTag.map(({ key }) => ({ id: key })),
          threeType: threeType.map(({ key }) => ({ id: key })),
          relationMatchScene: relationMatchScene.map(it => ({ aid: it.value })),
          relationMatchService: relationMatchService.map(it => ({ aid: it.value })),
          relationMatchProject: relationMatchProject.map(it => ({ aid: it.value })),
          relationMatchMatters: relationMatchMatters.map(it => ({ aid: it.value })),
          relationPolicy: relationPolicy.map(it => ({ aid: it.value })),
          restrictiveCondition: restrictiveCondition.map(it => ({ aid: it.value })),
          singleSelect: sgSelect.join(','),
          restrictiveConditionLegalPerson: restrictiveConditionLegalPerson.map(it => ({
            aid: it.value,
          })),
          talentProject: talentProject.map(it => ({ code: it })),
          personalPortraitTag: personalPortraitTag.map(({ key }) => ({ tagId: key })),
          legalPersonPortraitTag: legalPersonPortraitTag.map(({ key }) => ({ tagId: key })),
          legalPersonUnnecessaryPortraitTag: legalPersonUnnecessaryPortraitTag.map(({ key }) => ({
            tagId: key,
          })),
          personalUnnecessaryPortraitTag: personalUnnecessaryPortraitTag.map(({ key }) => ({
            tagId: key,
          })),
          downloadUrl: _.get(compactFiles, '0.0'), // 这里为了兼容旧的数据格式，取files的第一个文件，将下载地址和名称给到downloadUrl与form
          form: _.get(compactFiles, '0.1'),
          files: compactFiles.map(([fileUrl, name]) => ({ name, url: fileUrl })),
          minimalConditionRelation: minimalConditionRelation[0],
        };

        let data;
        if (policyInfo.id) {
          data = { ...policyInfo, ...formData };
          handleEditPolicy(data);
        } else {
          data = formData;
          handleCreatePolicy(data).then(() => {
            router.replace({ name: 'policyContent' });
          });
        }
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          notification.error({
            message: '请检查所有必填项是否填完',
          });
        }
      });
  }

  async function handleCreatePolicy(body = {}) {
    const { dispatch } = props;
    await POLICY.addPolicyUsingPOST({ body });
    formRef.resetFields();
    dispatch({
      type: 'policyContent/fetchList',
      payload: {
        page: 0,
        size: 10,
      },
    });
    notification.success({
      message: '创建成功',
    });
  }

  function handleEditPolicy(body = {}) {
    POLICY.updatePolicyUsingPOST(policyInfo.id, { body }).then(() => {
      notification.success({
        message: '更新成功',
      });
    });
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <TabForm
        onForm={form => {
          tabForm = form;
        }}
        title={title}
        initialValues={initialValues}
        btnOption={{
          onOk: handleSubmit,
          okText: policyInfo.id ? '保存修改' : '提交政策',
          disabled,
        }}
        defaultTabKey="policyProps"
        hideRequiredMark={disabled}
        onValuesChange={({ clientType }) => {
          if (clientType) {
            setValibleClientType(clientType);
          }
        }}
      >
        <PolicyProps
          form={formRef}
          title="政策属性"
          tabKey="policyProps"
          initSingleSelect={singleSelect}
          showPredict={showPredict}
          disabled={disabled}
        />
        <PolicyCover
          title="政策覆盖"
          tabKey="policyCover"
          permanent={permanent}
          showPredict={showPredict}
          disabled={disabled}
          form={formRef}
          setObjectType={setObjectType}
        />
        <PolicyContent
          title="政策正文"
          tabKey="policyContent"
          disabled={disabled}
          valibleClientType={valibleClientType}
        />
        <ExtendRead title="扩展阅读" tabKey="extendRead" disabled={disabled} />
        {policyInfo.id && (
          <PolicyVersion
            title="版本信息"
            tabKey="policyVersion"
            targetId={policyInfo.id}
            disabled={disabled}
          />
        )}
        <ConditionRelated
          title="推荐信息"
          objectType={objectType}
          policyContent={policyInfo.content}
          tabKey="conditionRelated"
          targetId={policyInfo.id}
          disabled={disabled}
        />
        {policyInfo.id && (
          <PolicyGraphPanel
            title="政策图谱"
            tabKey="policyGraphPanel"
            onShow={setShowNode}
            detail={showNode}
            item={policyInfo}
          />
        )}
      </TabForm>
      {showNode && (
        <Drawer
          width={400}
          placement="right"
          closable={false}
          mask={false}
          onClose={() => {
            setShowNode(null);
          }}
          bodyStyle={{ padding: 0 }}
          visible={!!showNode}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <PolicyDetailPanel key={showNode.id} policyDetail={showNode} />
        </Drawer>
      )}
    </div>
  );
}

export default connect(({ user, policyContent }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
  listCondition: _.get(policyContent, 'condition'),
}))(Index);
