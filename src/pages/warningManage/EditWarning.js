import React, { useEffect, useState } from 'react';
import { NOTIFICATIONS, TRANSLATE } from '@/services/api';
import { Card, Spin } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { treeMethods } from '@tong/datastructure';

import { getTreeKeyItem  } from '@/utils/tools';
import { commonRelatedKeys, relatedKeyToFormName } from './warningConst';
import Index from './warningForm/index';
import { warningFormat } from '@/utils/constantEnum';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const uuid = new IDGenerator('detail');
const { mapTree } = treeMethods;

function isCheck(pathname = '') {
  return pathname.includes('view');
}

function formatFormRelatedItem(relatedItem = []) {
  if (!relatedItem.length) {
    return undefined;
  }

  return {
    ...relatedItem[0],
    format: _.get(relatedItem, '0.format', warningFormat.default),
    content: _.get(relatedItem, '0.content'),
    name: _.get(relatedItem, '0.name'),
    relatedId: _.map(relatedItem, ({ relatedId }) => relatedId),
  };
}


function EditWarning({ location }) {
  const { query = {}, pathname } = location;
  const [formData, setFormData] = useState(null);
  async function formatFormData(resp, pathName) {
    const { noteContent = [], objectType, startTime, endTime, pushTime, id, receiveRange,tagConditions } = resp;
    let rangeTime = null;
    if (startTime) {
      rangeTime = [moment(startTime, dateFormat), moment(endTime, dateFormat)];
    }
    const tagIds = getTreeKeyItem(_.compact([tagConditions]), 'tagId')
    const tagIdNames = await TRANSLATE.portraitTagTranslateUsingPOST({ body: tagIds });
    const formatConditions = mapTree(_.compact([tagConditions]),({operator,tagId, children = []}) => {
      if(tagId){
        return {tagInfo: { key: tagId, value: tagId, label: tagIdNames[tagId]},children, key: IDGenerator.next()}
      }
      return { operator,children, key: IDGenerator.next() }
    });
    setFormData({
      ...resp,
      objectType: String(objectType),
      rangeTime,
      pushTime: pushTime && moment(pushTime, dateFormat),
      allUser: receiveRange === 0,
      tagConditions: formatConditions,
      id: pathName.indexOf('copy') > -1 ? undefined : id,
      noteContent: noteContent.map(item => {
        const { content, notePicture = {} } = item;
        const { uploadPicture = {} } = notePicture;
        const { name: imgName, url: imgUrl } = uploadPicture;
        const {
          type,
          relatedArticle = [],
          relatedMatter = [],
          relatedPolicy = [],
          relatedScene = [],
          relatedService = [],
          relatedProject = [],
          relatedMessage = [],
        } = content;
        // 如果type是事项服务这种，处理为单选
        const singleRelated = _.get(content, [relatedKeyToFormName[type], 0], {});
        return {
          ...item,
          notePicture: {
            ...notePicture,
            uploadPicture: imgUrl ? [imgUrl, imgName] : [],
          },
          content: {
            ...content,
            relatedArticle: formatFormRelatedItem(relatedArticle),
            relatedMatter: formatFormRelatedItem(relatedMatter),
            relatedPolicy: formatFormRelatedItem(relatedPolicy),
            relatedScene: formatFormRelatedItem(relatedScene),
            relatedService: formatFormRelatedItem(relatedService),
            relatedProject: formatFormRelatedItem(relatedProject),
            relatedMessage: formatFormRelatedItem(relatedMessage),
            singleRelated: commonRelatedKeys.includes(type)
              ? { ...singleRelated, relatedId: _.compact([singleRelated.relatedId]) }
              : undefined,
          },
          id: uuid.next(),
        };
      }),
    });
  }
  

  useEffect(() => {
    if (query.id) {
      NOTIFICATIONS.getNotificationDetailUsingGET(query.id).then(resp => {
        formatFormData(resp, pathname);
      });
    } else {
      setFormData({});
    }
  }, []);
  return (
    <>
      {formData ? (
        <Index isCheck={isCheck(pathname)} formData={formData} pathname={pathname} />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditWarning;
