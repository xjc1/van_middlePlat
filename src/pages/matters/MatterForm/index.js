import React, { PureComponent } from 'react';
import { notification, Button, Spin } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { TabForm } from '@/components/tis_ui';
import { MATTER } from '@/services/api';
import _ from 'lodash';
import authEnum, { authCheck } from '@/utils/auth';
import { connect } from 'dva';
import { terminalType, commonObjectType } from '@/utils/constantEnum';
import BaseInfo from './BaseInfo';
import ExpandInfo from './ExpandInfo';
import Recommend from './Recommend';
import adaptObject from '@/utils/AdaptObject';

const format = (data = [], key, itemKey) =>
  data.map(item => {
    if (itemKey) {
      return { [key]: item[itemKey] };
    }
    return { [key]: item };
  });

@connect(({ user }) => ({ deptCode: _.get(user, 'currentUser.dept.departNum') }))
class Index extends PureComponent {
  form = null;

  state = {
    objectType: commonObjectType.personal,
    // 数据提交后更新页面的key
    timeKey: Date.now(),
    loading: false,
  };

  componentDidMount() {
    const { instance } = this.props;
    const { object } = instance || {};
    const obj = adaptObject(object);
    this.setState({ objectType: obj });
  }

  changeObjectType = type => {
    this.setState({ objectType: type });
  };

  handleSubmit = () => {
    const { instance } = this.props;

    this.form
      .validateFields()
      .then(vals => {
        const {
          lawBasisArr,
          department,
          relationMatchService,
          relationMatchScene,
          relationMatchProject,
          relationMatchPolicy,
          relationMatchSynonym,
          relationMatchArticle,
          preMatter,
          afterMatter,
          applyNoticeFile = [],
          limitNoticeFile = [],
          legalBasisNoticeFile = [],
          rankingCondition,
          recommendTag,
          restrictiveConditionLegalPerson,
          restrictiveConditions,
          personalPortraitTag = [],
          legalPersonPortraitTag = [],
          type,
        } = vals;

        const [applyNoticeFileInfo, applyNoticeFileName] = applyNoticeFile;
        const [limitNoticeFileInfo, limitNoticeFileName] = limitNoticeFile;
        const [legalBasisNoticeFileInfo, legalBasisNoticeFileName] = legalBasisNoticeFile;

        const handledVals = {
          ...vals,
          // 基本信息 tab
          lawBasisArr: format(lawBasisArr, 'id', 'key'),
          department,

          // 事项拓展信息 tab
          relationMatchService: format(relationMatchService, 'id', 'key'),
          relationMatchScene: format(relationMatchScene, 'id', 'key'),
          relationMatchProject: format(relationMatchProject, 'id', 'key'),
          relationMatchPolicy: format(relationMatchPolicy, 'id', 'key'),
          relationMatchSynonym: format(relationMatchSynonym, 'id', 'key'),
          relationMatchArticle: format(relationMatchArticle, 'id', 'key'),
          preMatter: format(preMatter, 'id', 'key'),
          afterMatter: format(afterMatter, 'id', 'key'),
          applyNoticeFileInfo,
          applyNoticeFileName,
          limitNoticeFileInfo,
          limitNoticeFileName,
          legalBasisNoticeFileInfo,
          legalBasisNoticeFileName,

          // 事项推荐信息 tab
          rankingCondition: format(rankingCondition, 'id'),
          recommendTag: format(recommendTag, 'code'),
          restrictiveConditionLegalPerson: format(restrictiveConditionLegalPerson, 'id'),
          restrictiveConditions: format(restrictiveConditions, 'id'),
          personalPortraitTag: format(personalPortraitTag, 'tagId', 'key'),
          legalPersonPortraitTag: format(legalPersonPortraitTag, 'tagId', 'key'),
          type: format(type, 'code', 'code'),
        };

        if (instance) {
          this.updateMatter({ ...instance, ...handledVals });
        } else {
          this.addMatter(handledVals);
        }
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          const firstErrInfo = err.errorFields[0].errors[0];
          notification.error({
            message: `${firstErrInfo},请检查所有必填项是否填完`,
          });
        }
        return Promise.reject(err);
      });
  };

  addMatter = async body => {
    await MATTER.addMatterUsingPOST({ body });
    notification.success({
      message: '成功新增事项',
    });
    router.replace('matters');
  };

  updateMatter = async body => {
    const { loadDetail } = this.props;
    this.setState({ loading: true });
    await MATTER.updateMatterUsingPOST({ body });
    notification.success({
      message: '成功更新事项',
    });
    await loadDetail();
    this.setState({ loading: false });

    this.setState({ timeKey: Date.now() });
  };

  render() {
    const { instance, deptCode, disabled } = this.props;
    const { objectType, timeKey, loading } = this.state;

    const initialValues = instance || {
      clientType: [terminalType.pc],
      object: commonObjectType.personal,
      attributionDepartment: [deptCode],
    };

    return (
      <Spin spinning={loading}>
        <TabForm
          key={timeKey}
          initialValues={initialValues}
          onForm={nextForm => {
            this.form = nextForm;
          }}
          defaultTabKey="baseInfo"
          title={instance ? '编辑事项' : '创建事项'}
          btnOption={{
            okText: instance ? '保存事项信息' : '提交事项',
            okIcon: instance ? <SaveOutlined /> : <CheckOutlined />,
            disabled,
            onOk: this.handleSubmit,
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
            disabled={disabled}
            tabKey="baseInfo"
            title="基本信息"
            changeObjectType={type => {
              this.changeObjectType(type);
              // 面向对象更改则重置画像数据
              this.form.setFieldsValue({ type: undefined });
              if (type === commonObjectType.personal) {
                this.form.setFieldsValue({
                  legalPersonPortraitTag: undefined,
                });
              }
              if (type === commonObjectType.legalPerson) {
                this.form.setFieldsValue({
                  personalPortraitTag: undefined,
                });
              }
            }}
          />

          {authCheck(
            authEnum.matters_editmore,
            <ExpandInfo
              disabled={disabled}
              tabKey="expand"
              title="事项拓展信息"
              instance={instance}
            />,
          )}

          {authCheck(
            authEnum.matters_editmore,
            <Recommend
              disabled={disabled}
              tabKey="recommend"
              title="事项推荐信息"
              objectType={objectType}
              instance={instance}
            />,
          )}
        </TabForm>
      </Spin>
    );
  }
}

export default Index;
