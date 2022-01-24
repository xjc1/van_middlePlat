import React, { Component } from 'react';
import { Card, Form } from 'antd';
import { confirmAble, FormBtnGp, FormCard, TItem } from '@/components/tis_ui';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import _ from 'lodash';
import { warningFormat } from '@/utils/constantEnum';
import { treeMethods } from '@tong/datastructure';
import Warning from './WarningInfo';
import RelationInfo from './RelationInfo';
import BaseInfo from './BaseInfo';
import DetailInfo from './DetailInfo';
import { relatedKeyToFormName, commonRelatedKeys } from '../warningConst';

const { mapTree } = treeMethods
@connect(({ warningManage }) => warningManage)
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
      router.replace('/content/messageMenu/warningManage');
    },
  });

  back2listNoConfirm = () => {
    router.replace('/content/messageMenu/warningManage');
  };

  renderTitleName = () => {
    const { isCheck, formData, pathname } = this.props;
    if (pathname.indexOf('copy') > -1) {
      return <span>复制提醒</span>;
    }
    if (isCheck) {
      return <span>查看提醒</span>;
    }
    if (!isCheck && formData.id) {
      return <span>编辑提醒</span>;
    }
    return <span>创建提醒</span>;
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

  formatNoteContent = (noteContent, val) => {
    return noteContent.map(({ id }) => {
      const { content = {}, notePicture = {} } = val[id];
      const { uploadPicture = [] } = notePicture;
      const [imgUrl, imgName] = uploadPicture;
      const {
        relatedArticle = {},
        relatedMatter = {},
        relatedPolicy = {},
        relatedScene = {},
        relatedService = {},
        relatedFile = [],
        relatedProject = {},
        relatedMessage = {},
        singleRelated,
        type,
        ...otherRelated
      } = content;
      const newContent = {
        ...val[id],
        notePicture: {
          ...notePicture,
          uploadPicture: uploadPicture.length ? { name: imgName, url: imgUrl } : undefined,
        },
        content: {
          ...otherRelated,
          type,
          relatedArticle: this.formatRelatedItem(relatedArticle),
          relatedMatter: this.formatRelatedItem(relatedMatter),
          relatedPolicy: this.formatRelatedItem(relatedPolicy),
          relatedScene: this.formatRelatedItem(relatedScene),
          relatedProject: this.formatRelatedItem(relatedProject),
          relatedMessage: this.formatRelatedItem(relatedMessage),
          relatedService: this.formatRelatedItem(relatedService),
          relatedFile: relatedFile.map(([name, url]) => name && { name, url }).filter(Boolean),
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
    const { rangeTime, tags, noteContent = [], allUser, pushTime, tagConditions = [] } = val;
    const [startTime, endTime] = rangeTime || [];
    const formatConditions = mapTree(tagConditions,({operator,tagInfo = {}, children = []}) => {
      if(tagInfo.value){
        return {tagId: tagInfo.value,children}
      }
      return { operator,children }
    })[0];
    return {
      ...val,
      pushTime: pushTime && pushTime.format('YYYY-MM-DD HH:mm:ss'),
      startTime: startTime && startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: endTime && endTime.format('YYYY-MM-DD HH:mm:ss'),
      tags: tags && tags.map(({ key }) => key),
      noteContent: this.formatNoteContent(noteContent, val),
      receiveRange: allUser ? 0 : 1,
      tagConditions: formatConditions
    };
  };

  onValidateForm = () => {
    this.createForm.current.validateFields().then(val => {
      const { formData, dispatch } = this.props;
      const reqBody = this.formatFormData(val);
      dispatch({
        type: formData.id ? 'warningManage/editWarning' : 'warningManage/createWarning',
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
    const { noteContent = [] } = formData;
    const detailInfo = noteContent.reduce((result, item) => {
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

  render() {
    const { isCheck, formData } = this.props;
    return (
      <div>
        <Card
          bordered
          title={
            <span>
              <span>
                <span>提醒列表</span> /
              </span>
              {this.renderTitleName()}
              <a
                style={{ float: 'right' }}
                onClick={isCheck ? this.back2listNoConfirm : this.back2list}
              >
                返回提醒列表
              </a>
            </span>
          }
        >
          <Form ref={this.createForm} initialValues={this.formatInitValue(formData)}>
            <FormCard title="基本信息" bordered={false}>
              <BaseInfo isCheck={isCheck} />
            </FormCard>
            <FormCard title="提醒时间" bordered={false}>
              <Warning isCheck={isCheck} formData={formData} formRef={this.createForm} />
            </FormCard>
            <FormCard title="详细信息" bordered={false}>
              <TItem name="noteContent" label="">
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
