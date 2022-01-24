import React, { PureComponent } from 'react';
import { notification } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { TabForm } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';
import { ReviewRecordTable } from '@/components/bussinessComponents';
import BaseInfo from './compontents/basicInfo';
import ExpandInfo from './compontents/ExpandInfo';
import authEnum, { hasAuth } from '@/utils/auth';

class Index extends PureComponent {
  form = React.createRef();

  checkAuth = auth => {
    const { isAuditPage = false } = this.props;
    if (isAuditPage) {
      return hasAuth(authEnum[`tagAudit_detail_${auth}`]);
    }
    return hasAuth(authEnum[`tagManage_detail_${auth}`]);
  };

  treeRemoveKey = tree => {
    return _.map(tree, item => {
      const { key, isRoot, children = [], ...others } = item;

      const formatItem = {
        ...others,
      };
      if (children.length) {
        formatItem.children = this.treeRemoveKey(children);
      }
      return formatItem;
    });
  };

  handleSubmit = () => {
    // 函数多级配置的数据单独处理
    const { recordId, reload = EmptyFn, customSubmit } = this.props;
    this.form.validateFields().then(async vals => {
      const {
        synonymInfos = [],
        complexFunction: funTree,
        expireTime,
        createTime,
        updateTime,
        relatedFunction,
        conditionId: conditionObj,
        threeLevels = [],
        tagThemes = [],
      } = vals;
      const functionId = _.get(relatedFunction, 'functionId.key');
      const functionValue = _.get(relatedFunction, 'values', []);
      const conditionId = _.get(conditionObj, 'key');
      let newTime = expireTime;
      if (expireTime) {
        newTime = expireTime.format('YYYY-MM-DD HH:mm:ss');
      }
      const newSynonyms = synonymInfos.map(it => it.tagId);
      const newThreeLevels = threeLevels.map(it => ({ code: it.code }));
      // 函数多级配置树
      const formatFunTree = this.treeRemoveKey(funTree);
      const newValue = {
        ...vals,
        // 函数配置只有一个根节点
        complexFunction: formatFunTree.length ? formatFunTree[0] : null,
        synonyms: newSynonyms,
        threeLevels: newThreeLevels,
        id: recordId,
        expireTime: newTime,
        conditionId,
        // 后端数据有的没有更新时间
        createTime: createTime ? createTime.format('YYYY-MM-DD HH:mm:ss') : createTime,
        updateTime: updateTime ? updateTime.format('YYYY-MM-DD HH:mm:ss') : updateTime,
        relatedFunction: functionId && { functionId, values: functionValue },
        tagThemes: tagThemes.map(id => ({ tagId: id })),
      };

      // 有自定义提交请求，走自定义
      if (customSubmit && typeof customSubmit === 'function') {
        customSubmit(newValue);
        return;
      }

      // 有ID则走更新流程 没有ID走新建流程
      if (recordId) {
        await KERNEL.updatePortraitTagUsingPOST({ body: newValue });
        // 刷新页面
        notification.success({ message: '操作成功,请到标签审核进行审核操作' });
        reload();
      } else {
        await KERNEL.addPortraitTagUsingPOST({ body: newValue });
        notification.success({ message: '新建成功，请到标签审核进行审核操作' });
        router.replace('tags');
      }
    });
  };

  resetCheckValue = () => {
    this.form.setFields([{ name: ['relatedFunction', 'values'], value: undefined }]);
  };

  resetCheckFun = () => {
    this.form.setFields([
      { name: ['relatedFunction', 'values'], value: undefined },
      { name: ['relatedFunction', 'functionId'], value: undefined },
    ]);
  };

  render() {
    const {
      initialValues = {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      title = '',
      okText = '',
      editVisible = true,
      recordId,
      initSchema,
      logicDesc,
      formBtnOptions = {},
      changeLogicDesc = EmptyFn,
      onlyCurrentReview = false,
    } = this.props;
    let longTime = true;
    const { expireTime, object, logicType, useType = 0, shareToAll, tableType } = initialValues;
    if (expireTime) {
      longTime = false;
    }
    return (
      <TabForm
        title={title}
        defaultTabKey="basicInfo"
        onForm={form => {
          this.form = form;
        }}
        initialValues={initialValues}
        hideRequiredMark={!editVisible}
        btnOption={{
          onOk: this.handleSubmit,
          okText,
          okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
          disabled: !editVisible,
          ...formBtnOptions,
        }}
      >
        <BaseInfo
          title="基本信息"
          tabKey="basicInfo"
          formRef={this.form}
          permanent={longTime}
          editVisible={editVisible}
          recordId={recordId}
          shareToAll={shareToAll}
        />
        {this.checkAuth('expandInfo') && (
          <ExpandInfo
            title="拓展信息"
            tabKey="expandInfo"
            funcTableType={tableType}
            initSchema={initSchema}
            object={object}
            logicType={logicType}
            realtime={useType}
            editVisible={editVisible}
            formRef={this.form}
            resetCheckFun={this.resetCheckFun}
            logicDesc={logicDesc}
            changeLogicDesc={changeLogicDesc}
            resetCheckValue={this.resetCheckValue}
            recordId={recordId}
          />
        )}
        {recordId && this.checkAuth('reviewRecord') && (
          <TabForm.Tab title="审核记录" tabKey="reviewRecords">
            <ReviewRecordTable
              onlyCurrent={onlyCurrentReview}
              elementId={recordId}
              reviewIds={initialValues.reviewIds}
            />
          </TabForm.Tab>
        )}
      </TabForm>
    );
  }
}

export default Index;
