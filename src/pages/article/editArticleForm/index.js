/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { utils, TabForm } from '@/components/tis_ui';
import _ from 'lodash';
import { terminalType } from '@/utils/constantEnum';
import { connect } from 'dva';
import { ARTICLE } from '@/services/api';
import router from '@/utils/tRouter';

import ArticleBasic from '@/pages/article/editArticleForm/ArticleBasic';
import ArticleExpand from '@/pages/article/editArticleForm/ArticleExpand';
import { objectDict } from '@/constants';

const { Base64 } = utils;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

function initDisabledObject(objectType) {
  switch (objectType) {
    case objectDict.person:
      return objectDict.legalPerson;
    case objectDict.legalPerson:
      return objectDict.person;
    default:
      return objectDict.personAndLegalPerson;
  }
}

function Index({ title = '添加文章', detailInfo = {}, disabled, deptCode }) {
  const initialValues = detailInfo || {
    attributionDepartment: [deptCode],
    clientType: [terminalType.pc],
  };
  const { clientType, files = [], objectType } = detailInfo;

  const [formRef, setFormRef] = useState(null);
  const [valibleClientType, setValibleClientType] = useState(clientType);
  const [cFiles, setCFiles] = useState(files);
  const [object, setObject] = useState(objectType);
  const [disabledObjectType, setDisabledObjectType] = useState(initDisabledObject(objectType));

  let tabForm = null;

  useEffect(() => {
    setFormRef(tabForm);
  }, [tabForm]);

  async function handleSubmit() {
    const {
      content,
      department = [],
      category = [],
      threeType = [],
      downloadData = [],
      releaseTime,
      personalPortraitTag = [],
      legalPersonPortraitTag = [],
      personalOrPortraitTag = [],
      legalPersonOrPortraitTag = [],
      files: nextFiles = {},
      ...others
    } = await formRef.validateFields();

    const deleteFiles = _.chain(nextFiles)
      .map(file => {
        return file;
      })
      .filter(({ downloadUrl = [] }) => {
        return downloadUrl.length > 0;
      })
      .value();

    _.forEach(deleteFiles, (file, key) => {
      const { downloadUrl = [] } = file;
      if (downloadUrl.length === 0) {
        cFiles[key].operate.handleDelete();
      }
    });

    const submitFiles = deleteFiles.map(({ downloadUrl }) => {
      const [url, name] = downloadUrl;
      return {
        url,
        name,
      };
    });

    const nextValue = {
      content: content && Base64.base64(content),
      department: department.map(code => ({ code })),
      category: category.map(({ val, code }) => ({
        code: val ? _.last(val) : code,
      })),
      threeType: threeType.map(({ val, code }) => ({
        code: val ? _.last(val) : code,
      })),
      downloadUrl: _.head(downloadData),
      from: _.last(downloadData),
      releaseTime: releaseTime && releaseTime.format(dateFormat),
      personalPortraitTag: personalPortraitTag.map(({ key }) => ({ tagId: key })),
      legalPersonPortraitTag: legalPersonPortraitTag.map(({ key }) => ({ tagId: key })),
      personalOrPortraitTag: personalOrPortraitTag.map(({ key }) => ({ tagId: key })),
      legalPersonOrPortraitTag: legalPersonOrPortraitTag.map(({ key }) => ({ tagId: key })),
      files: submitFiles,
      ...others,
    };

    if (detailInfo && detailInfo.id) {
      await updateArticle({
        ...detailInfo,
        ...nextValue,
      });
    } else {
      await createArticle(nextValue);
    }
  }

  async function createArticle(newValue) {
    return ARTICLE.addArticleUsingPOST({ body: newValue })
      .then(() => {
        notification.success({
          message: '新增成功',
        });
        router.replace('article');
      })
      .catch(e => {
        console.log('e => ', e);
        notification.error({
          message: '新增失败',
        });
      });
  }

  async function updateArticle(nextValue) {
    return ARTICLE.updateArticleUsingPOST({ body: nextValue })
      .then(() => {
        notification.success({
          message: '更新成功',
        });
      })
      .catch(e => {
        console.log('e => ', e);
        notification.error({
          message: '更新失败',
        });
      });
  }

  return (
    <TabForm
      title={title}
      onForm={form => {
        tabForm = form;
      }}
      initialValues={initialValues}
      onValuesChange={({ clientType: nextClientType }) => {
        if (nextClientType) {
          setValibleClientType(nextClientType);
        }
      }}
      btnOption={{
        onOk: handleSubmit,
        okText: detailInfo.id ? '保存修改' : '提交文章',
        disabled,
      }}
      defaultTabKey="articleBasic"
    >
      <ArticleBasic
        disabled={disabled}
        cFiles={cFiles}
        setCFiles={data => setCFiles(data)}
        setObject={data => setObject(data)}
        setDisabledObjectType={data => setDisabledObjectType(data)}
        form={formRef}
        title="基本信息"
        tabKey="articleBasic"
      />
      <ArticleExpand
        disabled={disabled}
        valibleClientType={valibleClientType}
        object={object}
        disabledObjectType={disabledObjectType}
        title="扩展信息"
        tabKey="articleExpand"
      />
    </TabForm>
  );
}

export default connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))(Index);
