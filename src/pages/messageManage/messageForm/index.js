import React, { Component } from 'react';
import { Card, Form, message } from 'antd';
import { confirmAble, FormBtnGp, FormCard, TItem } from '@/components/tis_ui';
import BaseInfo from '@/pages/messageManage/messageForm/BaseInfo';
import PushInfo from '@/pages/messageManage/messageForm/PushInfo';
import RelationInfo from '@/pages/messageManage/messageForm/RelationInfo';
import router from '@/utils/tRouter';
import { connect } from 'dva';
import _ from 'lodash';
import { warningFormat } from '@/utils/constantEnum';
import { treeMethods } from '@tong/datastructure';
import DetailInfo from './DetailInfo';
import { relatedKeyToFormName, commonRelatedKeys } from '../messageConst';

const { mapTree } = treeMethods
@connect(({ messageManage }) => messageManage)
class Index extends Component {
  createForm = React.createRef();

  back2list = confirmAble({
    confirmText: '警告',
    confirmContent: (
      <span style={{ color: 'red' }}>
        现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到消息列表吗?
      </span>
    ),
    onClick: () => {
      router.push('messageManage');
    },
  });

  back2listNoConfirm = () => {
    router.push('messageManage');
  };

  renderTitleName = () => {
    const { isCheck, formData, pathname } = this.props;
    if (pathname.indexOf('copy') > -1) {
      return <span>复制消息</span>;
    }
    if (isCheck) {
      return <span>查看消息</span>;
    }
    if (!isCheck && formData.id) {
      return <span>编辑消息</span>;
    }
    return <span>创建消息</span>;
  };

  formatRelatedItem = (relatedItem = {}) => {
    const {
      format = warningFormat.default,
      name,
      content,
      relatedId = [],
      ...otherInfo
    } = relatedItem;
    if (format !== warningFormat.default) {
      return [{ format, name, content, ...otherInfo }];
    }

    return relatedId.map(({ label, value }) => ({
      format,
      name: label,
      relatedId: value,
      ...otherInfo,
    }));
  };

  getRelatedItemBySingleRelated = singleRelated => {
    const { format = warningFormat.default } = singleRelated;
    if (!singleRelated) {
      return [];
    }

    return [
      {
        ...singleRelated,
        format,
        name:
          singleRelated.format === warningFormat.default
            ? _.get(singleRelated, 'relatedId.label')
            : singleRelated.name,
        relatedId: _.get(singleRelated, 'relatedId.value'),
      },
    ];
  };

  formatMsgContent = (msgContent, val) => {
    return msgContent.map(({ id }) => {
      const { content = {}, msgPicture = {} } = val[id];
      const { uploadPicture = [] } = msgPicture;
      const [imgUrl, imgName] = uploadPicture;
      const {
        relatedArticle = {},
        relatedMatter = {},
        relatedPolicy = {},
        relatedScene = {},
        relatedService = {},
        relatedProject = {},
        relatedFile = [],
        singleRelated,
        type,
        ...otherContent
      } = content;
      const newContent = {
        ...val[id],
        msgPicture: {
          ...msgPicture,
          uploadPicture: imgUrl ? { name: imgName, url: imgUrl } : undefined,
        },
        content: {
          ...otherContent,
          type,
          relatedArticle: this.formatRelatedItem(relatedArticle),
          relatedMatter: this.formatRelatedItem(relatedMatter),
          relatedPolicy: this.formatRelatedItem(relatedPolicy),
          relatedScene: this.formatRelatedItem(relatedScene),
          relatedService: this.formatRelatedItem(relatedService),
          relatedProject: this.formatRelatedItem(relatedProject),
          relatedFile: relatedFile.map(([url, name]) => name && { name, url }).filter(Boolean),
        },
      };
      if (commonRelatedKeys.includes(type)) {
        newContent.content[relatedKeyToFormName[type]] = this.getRelatedItemBySingleRelated(
          singleRelated,
        );
      }
      return newContent;
    });
  };

  formatFormData = val => {
    const { rangeTime, tags, pushTime, msgContent = [], allUser, tagConditions = [] } = val;
    const [startTime, endTime] = rangeTime || [];
    const formatConditions = mapTree(tagConditions,({operator,tagInfo = {}, children = []}) => {
      if(tagInfo.value){
        return {tagId: tagInfo.value,children}
      }
      return { operator,children }
    })[0];
    return {
      ...val,
      startTime: startTime && startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: endTime && endTime.format('YYYY-MM-DD HH:mm:ss'),
      tags: tags && tags.map(({ key }) => key),
      pushTime: pushTime && pushTime.format('YYYY-MM-DD HH:mm:ss'),
      msgContent: this.formatMsgContent(msgContent, val),
      receiveRange: allUser ? 0 : 1,
      tagConditions: formatConditions
    };
  };

  onValidateForm = () => {
    this.createForm.current.validateFields().then(val => {
      const { formData, dispatch } = this.props;
      const { pullMsg, pushMsg } = val;
      if (!(pullMsg || pushMsg)) {
        message.info('发送方式至少必选一个');
        return;
      }
      const reqBody = this.formatFormData(val);
      dispatch({
        type: formData.id ? 'messageManage/editMessage' : 'messageManage/createMessage',
        body: { ...reqBody, id: formData.id },
      });
    });
  };

  isShowRelationInfo = () => {
    const { pathname } = this.props;
    if (pathname.indexOf('edit') > -1 || pathname.indexOf('view') > -1) {
      return true;
    }
    return false;
  };

  formatInitValue = formData => {
    const { msgContent = [] } = formData;
    const detailInfo = msgContent.reduce((result, item) => {
      const detail = result;
      const { id } = item;
      detail[id] = item;
      return detail;
    }, {});
    return {
      ...formData,
      ...detailInfo,
    };
  };

  formValuesChange = changeValues => {
    const { pullMsg, pushMsg } = changeValues;
    if (!_.isUndefined(pullMsg) || !_.isUndefined(pushMsg)) {
      this.createForm.current.setFieldsValue({
        msgType: undefined,
      });
    }
  };

  render() {
    const { isCheck, formData } = this.props;
    return (
      <div>
        <Card
          bordered
          title={
            <span>
              <span>
                <span>消息列表</span> /
              </span>
              {this.renderTitleName()}
              <a
                style={{ float: 'right' }}
                onClick={isCheck ? this.back2listNoConfirm : this.back2list}
              >
                返回消息列表
              </a>
            </span>
          }
        >
          <Form
            ref={this.createForm}
            initialValues={this.formatInitValue(formData)}
            onValuesChange={this.formValuesChange}
            preserve={false}
          >
            <FormCard title="基本信息" bordered={false}>
              <BaseInfo isCheck={isCheck} />
            </FormCard>
            <FormCard title="推送时间" bordered={false}>
              <PushInfo isCheck={isCheck} formData={formData} formRef={this.createForm} />
            </FormCard>
            <FormCard title="详细信息" bordered={false}>
              <TItem name="msgContent" label="">
                <DetailInfo isCheck={isCheck} formData={formData} formRef={this.createForm} />
              </TItem>
            </FormCard>
            {this.isShowRelationInfo() && (
              <FormCard title="相关信息" bordered={false}>
                <RelationInfo isCheck={isCheck} formData={formData} />
              </FormCard>
            )}
            <FormBtnGp onOk={this.onValidateForm} disabled={isCheck} />
          </Form>
        </Card>
      </div>
    );
  }
}

export default Index;
