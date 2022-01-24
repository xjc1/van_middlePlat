import React, { useEffect, useState } from 'react';
import { MESSAGES, TRANSLATE } from '@/services/api';
import { Card, Spin } from 'antd';
import moment from 'moment';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import _ from 'lodash';
import { warningFormat } from '@/utils/constantEnum';
import { treeMethods } from '@tong/datastructure';
import { getTreeKeyItem  } from '@/utils/tools';
import Index from './messageForm/index';
import { commonRelatedKeys, relatedKeyToFormName } from './messageConst';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const uuid = new IDGenerator('msgDetail');
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



function EditMessage({ location }) {
  const { query = {}, pathname } = location;
  const [formData, setFormData] = useState(null);
  async function formatFormData(resp, pathName) {
    const { objectType, startTime, endTime, pushTime, id, receiveRange, msgContent = [], tagConditions } = resp;
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
      id: pathName.indexOf('copy') > -1 ? undefined : id,
      allUser: receiveRange === 0,
      tagConditions: formatConditions,
      msgContent: msgContent.map(item => {
        const { content, msgPicture } = item;
        const { uploadPicture = {} } = msgPicture;
        const { name: imgName, url: imgUrl } = uploadPicture;
        const {
          type,
          relatedArticle = [],
          relatedMatter = [],
          relatedPolicy = [],
          relatedScene = [],
          relatedService = [],
          relatedProject = [],
          relatedFile = [],
        } = content;
        // 如果type是事项服务这种，处理为单选
        const singleRelated = _.get(content, [relatedKeyToFormName[type], 0], {});
        return {
          ...item,
          msgPicture: {
            ...msgPicture,
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
            relatedFile: relatedFile.map(({ name, url }) => [url, name]),
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
      MESSAGES.getMessageDetailUsingGET(query.id).then(resp => {
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

export default EditMessage;
