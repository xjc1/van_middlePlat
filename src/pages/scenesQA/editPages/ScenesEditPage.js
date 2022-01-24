import React, { useState } from 'react';
import { Card, Tabs, Radio, Modal, Tooltip } from 'antd';
import _ from 'lodash';
import classNames from 'classnames';
import styles from '../scenesQA.less';
import globalStyles from '@/global.less';
import Question from './Question';
import Matter from './Matter';
import OneFormAndRule from './OneFormAndRule';
import ChildScenesEdit from './ChildScenesEdit';
import Properties from './Properties';
import { scenesType } from '@/utils/constantEnum';
import { connect } from 'dva';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import authEnum, { authCheck } from '@/utils/auth';

const { TabPane } = Tabs;

function ScenesEditPage({ dispatch, node }) {
  const { type = scenesType.NORMAL_SCENES } = node;
  const [page, setPage] = useState('question');
  const [editType, setEditType] = useState(type);
  const isNormalType = editType === scenesType.NORMAL_SCENES;

  // 一表和规则 节点字段页权限判定
  const authPage = authCheck(
    authEnum.scenes_table,
    [
      {
        key: 'oneFormAndRule',
        tab: '一表和规则',
      },
      {
        key: 'nodeOptions',
        tab: '节点字段',
      },
    ],
    [],
  );

  return (
    <Card
      bordered
      tabList={
        isNormalType && [
          {
            key: 'question',
            tab: '问题',
          },
          {
            key: 'matter',
            tab: '事项和材料',
          },
          ...authPage,
        ]
      }
      //  extra={<PreViewSwitch />}
      onTabChange={key => {
        setPage(key);
      }}
      title={
        <Tooltip title={node.name}>
          <span
            style={{
              maxWidth: 400,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'inline-block',
            }}
          >
            {node.name}
          </span>
        </Tooltip>
      }
      style={{
        height: '100%',
        position: 'relative',
      }}
      extra={
        <Radio.Group value={editType}>
          <Radio
            value={scenesType.NORMAL_SCENES}
            onChange={({ target }) => {
              const { value } = target;
              Modal.confirm({
                title: '警告?',
                icon: <ExclamationCircleOutlined />,
                content: '更改主题类型为普通主题,会丢失节点的配置,确定要更改吗?',
                onOk() {
                  setEditType(value);
                  node.sid = undefined;
                  node.question = undefined;
                  node.scenesId = undefined;
                  node.type = value;
                  dispatch({
                    type: 'scenesQA/touch',
                  });
                },
              });
            }}
          >
            {scenesType.$v_names[scenesType.NORMAL_SCENES]}
          </Radio>
          <Radio
            disabled={node.children && node.children.length > 0}
            value={scenesType.CONNECT_SCENES}
            onChange={({ target }) => {
              const { value } = target;
              Modal.confirm({
                title: '警告?',
                icon: <ExclamationCircleOutlined />,
                content: '更改主题类型为子主题. 确定要更改吗?',
                onOk() {
                  setEditType(value);
                  node.type = value;
                  node.question = undefined;
                  node.scenesId = undefined;
                  dispatch({
                    type: 'scenesQA/touch',
                  });
                },
              });
                 
            }}
          >
            {scenesType.$v_names[scenesType.CONNECT_SCENES]}
          </Radio>
        </Radio.Group>
      }
      bodyStyle={{
        maxHeight: '100%',
      }}
    >
      {isNormalType ? (
        <div
          style={{
            padding: '10px 0 10px 10px',
          }}
          className={classNames(styles.editPageInnerbox, globalStyles.innerboxScroll)}
        >
          <Tabs activeKey={page} renderTabBar={() => <div />}>
            <TabPane key="question">
              <Question />
            </TabPane>
            <TabPane key="matter">
              <Matter />
            </TabPane>
            <TabPane key="oneFormAndRule">
              <OneFormAndRule />
            </TabPane>
            <TabPane key="nodeOptions">
              <Properties />
            </TabPane>
          </Tabs>
        </div>
      ) : (
        <ChildScenesEdit node={node} />
      )}
    </Card>
  );
}

export default connect()(ScenesEditPage);
