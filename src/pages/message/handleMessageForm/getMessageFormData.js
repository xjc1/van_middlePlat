import React, { useEffect } from 'react';
import { NOTIFY } from '@/services/api';
import { connect } from 'dva';
import _ from 'lodash';
import { Card, message as Tips, Spin } from 'antd';
import { contentType as contentTypeConst } from '@/utils/constantEnum';
import Index from './index';

// base64解码
const decodeBase64 = str => {
  let result = str;
  try {
    result = decodeURIComponent(escape(window.atob(str)));
  } catch (e) {
    Tips.error('解析出错');
  }
  return result;
};

const splitString = string => (string ? string.split(',') : []);

function GetMessageFormData(props) {
  const { location, dispatch, step } = props;
  const { query = {}, pathname } = location;
  const { formData } = step;
  useEffect(() => {
    if (pathname.indexOf('create') === -1) {
      NOTIFY.getOneMsgDetailUsingGET(query.id).then(detail => {
        const handledDetail = handleParamsData(detail);
        if (pathname.indexOf('view') > -1) {
          dispatch({ type: 'createMessageForm/check', payload: handledDetail });
        } else if (pathname.indexOf('edit') > -1) {
          dispatch({ type: 'createMessageForm/editFormData', payload: handledDetail });
        } else if (pathname.indexOf('copy') > -1) {
          dispatch({ type: 'createMessageForm/copy', payload: handledDetail });
        }
      });
    } else {
      dispatch({ type: 'createMessageForm/createMessage' });
    }
  }, []);

  function handleRelationData(content) {
    const types = ['scenes', 'matters', 'qa', 'policy', 'services', 'articles'];
    if (!content) {
      return content;
    }
    return types.reduce((res, type) => {
      if (_.has(content, type)) {
        const ids = _.get(content, type, []);
        return { ...res, [type]: ids.map(({ id }) => id) };
      }
      return res;
    }, {});
  }

  function handleParamsData(focusItem) {
    const {
      clientType,
      regions,
      personalLabels,
      legalLabels,
      messageContent,
      contentType,
    } = focusItem;
    let nextItem = {
      ...focusItem,
      clientType: splitString(clientType),
      regions: splitString(regions),
      personalLabels: splitString(personalLabels),
      legalLabels: splitString(legalLabels),
      messageContent: messageContent === '' ? {} : JSON.parse(messageContent),
      haveLink: 0,
    };

    // 处理非原文链接的形式
    if (contentType !== contentTypeConst.originLink) {
      nextItem.messageContent = {
        ...nextItem.messageContent,
        ...handleRelationData(nextItem.messageContent),
      };
    }

    const { customLinks, richContent } = nextItem.messageContent;
    // 自定义链接
    if (customLinks && customLinks.length > 0) {
      nextItem = { ...nextItem, haveLink: 1 };
      dispatch({
        type: 'createMessageForm/changeLinkData',
        payload: nextItem.messageContent.customLinks,
      });
    }
    // 解码富文本
    if (richContent) {
      nextItem = {
        ...nextItem,
        messageContent: {
          ...nextItem.messageContent,
          richContent: decodeBase64(richContent),
        },
      };
    }
    return nextItem;
  }

  return (
    <>
      {(formData && formData.id) || pathname.indexOf('create') > -1 ? (
        <Index />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default connect(({ createMessageForm, message }) => ({ ...createMessageForm, ...message }))(
  GetMessageFormData,
);
