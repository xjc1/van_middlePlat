import React, { useMemo } from 'react';
import Styles from './index.less';
import { connect } from 'dva';
import { Timeline } from 'antd';
import {
  PlayCircleOutlined,
  Loading3QuartersOutlined,
  PullRequestOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { oneFormEvents } from '@/utils/constantEnum';

function treeFr(treeData, fn) {
  const { content } = treeData;
  // eslint-disable-next-line consistent-return
  _.forEach(content, (item, index) => {
    if (fn(item, treeData, index)) {
      return false;
    }
    treeFr(item, fn);
  });
}

function scanPreEvents({ preEvents = [] }, apis = []) {
  const nextPreEvent = [];
  _.forEach(preEvents, preEvent => {
    const apiInstance = _.find(apis, { id: preEvent.api }) || {};
    const { url, method } = apiInstance;
    if (url && method) {
      nextPreEvent.push({
        id: preEvent.id,
        api: apiInstance,
      });
    }
  });
  return nextPreEvent;
}

function scanDatasource(name, formItem, dataSource, apis = [], fn) {
  const dataSourceEvents = [];
  if (dataSource) {
    switch (dataSource.dataSourceType) {
      case 'dynamic': {
        const { api } = dataSource;
        const apiInstance = _.find(apis, { id: api }) || {};
        const { url, method } = apiInstance;
        if (url && method) {
          fn({ id: name, api: apiInstance, ...formItem });
        }
        break;
      }
      default:
        break;
    }
  }
  return dataSourceEvents;
}

function scanLinks(id, links, apis) {
  const linkEvents = [];
  _.forEach(links, ({ source, sourceName, sourceNameSpace, name, nameSpace, api, oper, so }) => {
    if (source) {
      const apiInstance = _.find(apis, { id: api });
      linkEvents.push({
        eventId: `${source}_${id}_${oper}_${so}`,
        source,
        target: id,
        oper,
        so,
        sourceName,
        sourceNameSpace,
        itemName: name,
        itemNameSpace: nameSpace,
        api: apiInstance,
      });
    }
  });
  return linkEvents;
}

function scanValidator(name, formItem, { remote }, apis) {
  const validatorEvents = [];
  if (!_.isEmpty(remote)) {
    const apiInstance = _.find(apis, { id: remote.api }) || {};
    validatorEvents.push({ id: name, api: apiInstance, ...formItem });
  }
  return validatorEvents;
}

function Index({ formData, apis = [] }) {
  const eventGroup = useMemo(() => {
    let preEvents = [];
    const dataSourceEvents = [];
    const validatorEvents = [];
    const linkEvents = [];
    if (formData) {
      preEvents = scanPreEvents(formData, apis);
      treeFr(formData, item => {
        const { dataSource, validator = {}, links = [], id, name: itemName, nameSpace } = item;
        scanDatasource(
          `${id}_${oneFormEvents.data}`,
          { itemName, nameSpace },
          dataSource,
          apis,
          event => {
            dataSourceEvents.push(event);
          },
        );
        scanValidator(
          `${id}_${oneFormEvents.validate}`,
          { itemName, nameSpace },
          validator,
          apis,
          event => {
            validatorEvents.push(event);
          },
        );
        const innerLinks = scanLinks(id, links, apis);
        if (innerLinks.length > 0) {
          linkEvents.push({
            id,
            links: innerLinks,
          });
        }
        return false;
      });
    }
    return { preEvents, dataSourceEvents, validatorEvents, linkEvents };
  }, [formData, apis]);

  const { preEvents, dataSourceEvents, validatorEvents, linkEvents } = eventGroup;
  return (
    <div className={Styles.eventPanel}>
      <Timeline
        style={{
          padding: 10,
        }}
      >
        {_.map(preEvents, ({ id, api }) => {
          return (
            <Timeline.Item key={id} dot={<PlayCircleOutlined />} color="green">
              <p>前置事件: {id}</p>
              <p>接口名称: {api.name}</p>
              <p>接口地址: {api.url}</p>
            </Timeline.Item>
          );
        })}

        {_.map(dataSourceEvents, ({ id, itemName, nameSpace, api }) => {
          return (
            <Timeline.Item key={id} dot={<Loading3QuartersOutlined />}>
              <p>取值事件: {id}</p>
              <p>字段名称: {itemName}</p>
              <p>命名空间: {nameSpace}</p>
              <p>接口名称: {api.name}</p>
              <p>接口地址: {api.url}</p>
            </Timeline.Item>
          );
        })}

        {_.map(validatorEvents, ({ id, itemName, nameSpace, api }) => {
          return (
            <Timeline.Item key={id} dot={<FunctionOutlined />}>
              <p>校验事件: {id}</p>
              <p>字段名称: {itemName}</p>
              <p>命名空间: {nameSpace}</p>
              <p>接口名称: {api.name}</p>
              <p>接口地址: {api.url}</p>
            </Timeline.Item>
          );
        })}

        {_.map(linkEvents, ({ links }) => {
          return _.map(
            links,
            ({
              eventId,
              source,
              // sourceName,
              // sourceNameSpace,
              // itemName,
              // itemNameSpace,
              target,
              oper,
              so,
              api,
            }) => {
              return (
                <Timeline.Item key={eventId} dot={<PullRequestOutlined />} color="red">
                  <p>联动事件: {eventId}</p>
                  <p>字段名称: {target}</p>
                  <p>联动字段id: {source}</p>
                  {/* <p>联动字段名称: {sourceName}</p>
                  <p>联动字段命名空间: {sourceNameSpace}</p> */}
                  <p>目标字段: {target}</p>
                  {/* <p>目标字段名称: {itemName}</p>
                  <p>目标字段命名空间: {itemNameSpace}</p> */}
                  <p>监听动作: {oper}</p>
                  <p>相应动作: {so}</p>
                  {api && (
                    <>
                      <p>接口名称: {api.name}</p>
                      <p>接口地址: {api.url}</p>
                    </>
                  )}
                </Timeline.Item>
              );
            },
          );
        })}
      </Timeline>
    </div>
  );
}

export default connect(({ formDesigner, interfaceManage }) => {
  return {
    formData: formDesigner.formData,
    apis: interfaceManage.apis,
  };
})(Index);
