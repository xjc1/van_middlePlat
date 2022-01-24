import React, { PureComponent } from 'react';
import { notification, Button } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { TabForm } from '@/components/tis_ui';
import { CORE, DECLAREPROJECT } from '@/services/api';
import { terminalType } from '@/utils/constantEnum';
import BaseInfo from './BaseInfo';
import ExtraInfo from '@/pages/projectManage/compontents/ExtraInfo';
import SuggestInfo from '@/pages/projectManage/compontents/SuggestInfo';

class Index extends PureComponent {
  form = null;

  state = {
    portraitType: null,
  };

  componentDidMount() {
    if (this.form) {
      this.setState({
        portraitType: this.form.getFieldValue('objectType'),
      });
    }
  }

  setPortraitType(portraitType) {
    this.setState({
      portraitType,
    });
  }

  handleSubmit = () => {
    const { initialValues } = this.props;
    const { id } = initialValues || {};
    this.form.validateFields().then(vals => {
      const {
        downloadUrl: file = [],
        directPolicies = [],
        relatedPolicies = [],
        preProjects = [],
        preMatters = [],
        threeType = [],
        relationMatchService = [],
        relationMatchScene = [],
        relationMatchMatter = [],
        rankingCondition = [],
        restrictiveConditions = [],
        restrictiveConditionLegalPerson = [],
        legalPersonPortraitTag = [],
        personalPortraitTag = [],
        personalUnnecessaryPortraitTag = [],
        legalPersonUnnecessaryPortraitTag = [],
        timeTags = [],
        classification = [],
        implementationDepartment = [],
        suggestTags = [],

        projectTypes = [],
        minimalConditionRelation = [],
      } = vals;
      const [fileUrl, filePath] = file;
      const newData = {
        ...vals,
        downloadUrl: fileUrl,
        form: filePath,
        timeTags: _.map(timeTags, ({ key, ...others }) => others),
        classification: _.map(classification, ({ key }) => {
          return { id: key };
        }),
        directPolicies: directPolicies.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relatedPolicies: relatedPolicies.map(it => {
          const { value } = it;
          return { id: value };
        }),
        preProjects: preProjects.map(it => {
          const { value } = it;
          return { id: value };
        }),
        preMatters: preMatters.map(it => {
          const { value } = it;
          return { id: value };
        }),
        threeType: threeType.map(it => {
          const { key } = it;
          return { id: key };
        }),
        relationMatchService: relationMatchService.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relationMatchScene: relationMatchScene.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relationMatchMatter: relationMatchMatter.map(it => {
          const { value } = it;
          return { id: value };
        }),
        restrictiveConditions: restrictiveConditions.map(it => {
          return { id: it };
        }),
        rankingCondition: rankingCondition.map(it => {
          return { id: it };
        }),
        implementationDepartment: implementationDepartment.map(({ key }) => {
          return { id: key };
        }),
        restrictiveConditionLegalPerson:
          restrictiveConditionLegalPerson &&
          restrictiveConditionLegalPerson.map(it => {
            return { id: it };
          }),
        legalPersonPortraitTag: _.map(legalPersonPortraitTag, ({ value }) => ({ tagId: value })),
        personalPortraitTag: _.map(personalPortraitTag, ({ value }) => ({ tagId: value })),
        personalUnnecessaryPortraitTag: personalUnnecessaryPortraitTag.map(({ value }) => ({
          tagId: value,
        })),
        legalPersonUnnecessaryPortraitTag: legalPersonUnnecessaryPortraitTag.map(({ value }) => ({
          tagId: value,
        })),
        suggestTags: suggestTags.map(({ name }) => name),
        projectTypes: _.map(projectTypes, ({ key }) => {
          return { id: key };
        }),
        minimalConditionRelation: minimalConditionRelation[0],
      };

      if (id) {
        this.updateProject({ ...newData, id });
      } else {
        this.addProject(newData);
      }
    });
  };

  addProject = async body => {
    await CORE.createProjectUsingPOST({ body });
    notification.success({
      message: '新增成功',
    });
    router.push('projectManage');
  };

  updateProject = async body => {
    await DECLAREPROJECT.updateProjectUsingPOST({ body });
    notification.success({
      message: '更新成功',
    });
  };

  render() {
    const { initialValues = {}, editVisible = true, title = '新建项目' } = this.props;
    const { portraitType } = this.state;
    const { objectType } = initialValues || {};
    const initData = initialValues || {
      clientType: [terminalType.pc],
    };
    return (
      <TabForm
        initialValues={initData}
        defaultTabKey="baseInfo"
        title={title}
        onForm={formRef => {
          this.form = formRef;
        }}
        btnOption={{
          okText: initialValues ? '保存项目信息' : '提交',
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
      >
        <BaseInfo
          tabKey="baseInfo"
          title="基本信息"
          setPortraitType={nextPortraitType => this.setPortraitType(nextPortraitType)}
          editVisible={editVisible}
        />
        <ExtraInfo tabKey="extraInfo" editVisible={editVisible} title="拓展信息" />
        <SuggestInfo
          tabKey="suggestInfO"
          editVisible={editVisible}
          portraitType={portraitType || objectType}
          title="推荐信息"
          conditionText={initialValues.condition}
          targetId={initialValues.id}
        />
      </TabForm>
    );
  }
}

export default Index;
