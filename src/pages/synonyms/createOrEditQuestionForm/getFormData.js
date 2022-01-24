import React, { useEffect, useState } from 'react';
import { utils } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import _ from 'lodash';
import Index from './index';

const { Base64 } = utils;

function GetFormData(props) {
  const { deptCode } = props;
  const [check, setCheck] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ attributionDepartment: [deptCode] });
  const { location } = props;
  const { query = {}, pathname } = location;

  useEffect(() => {
    if (pathname.indexOf('create') === -1) {
      KERNEL.findSynonymDetailUsingGET(query.id).then(focusItem => {
        const formatData = handleFormatData(focusItem);
        setFormData(formatData);
        if (pathname.indexOf('view') > -1) {
          setCheck(true);
        } else {
          setEdit(true);
        }
      });
    }
  }, []);

  const fixRelationData = data => {
    const result = [];
    if (data && data.length > 0) {
      data.forEach(item => {
        result.push(item.id);
      });
    }
    return result;
  };

  function handleFormatData(item = {}) {
    const {
      category = [],
      relationMatchScene = [],
      relationMatchMatters = [],
      relationMatchPolicy = [],
      relationMatchService = [],
      relationMatchProject = [],
      relationMatchArticle = [],
      content,
      answer,
    } = item;
    const formatData = {
      ...item,
      relationMatchScene: fixRelationData(relationMatchScene),
      answer: _.isArray(answer) ? _.compact(answer) : _.compact([answer]),
      relationMatchMatters: fixRelationData(relationMatchMatters),
      relationMatchPolicy: fixRelationData(relationMatchPolicy),
      relationMatchProject: fixRelationData(relationMatchProject),
      relationMatchService: fixRelationData(relationMatchService),
      relationMatchArticle: fixRelationData(relationMatchArticle),
      category: category.map(({ id }) => id),
      content: content ? Base64.decodeBase64(content) : '',
    };
    return formatData;
  }

  const getIndex = () => {
    const { id = '' } = formData;
    if (id || pathname.indexOf('create') > -1) {
      return <Index initFormData={{ ...formData }} check={check} edit={edit} />;
    }
    return (
      <Card style={{ width: '100%', height: '100%' }}>
        <Spin />
      </Card>
    );
  };

  return getIndex();
}

export default connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))(GetFormData);
