import React from 'react';
import IntentStyles from "./index.less";
import { Button, Dropdown, Input, Menu, Space, Table } from "antd";
import {
  MinusOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons";
import _ from "lodash";
import GlobalStyles from "@/global.less";
import { connect } from "dva";
import { ITEM_TYPES } from "@/pages/dialogStudios/itemConst";

function IntentsTable({ onEdit, title, intents, canNodeSelected, currentSelectIntents = [], dispatch }) {
  return (
    <div className={IntentStyles.tablePanel}>
      <h3>{title}</h3>
      <div className={IntentStyles.tablePanelTitle}>
        <div>
          <Input.Search placeholder="请输入需要搜索的意图" />
        </div>
        <div className={IntentStyles.tablePanelTitleBtns}>
          <Button
            type="link"
            onClick={() => {
              onEdit({});
            }}
          >
            添加意图
          </Button>
        </div>
      </div>
      <div className={IntentStyles.tablePanelContent}>
        <Table
          size="small"
          bordered
          rowKey="id"
          dataSource={intents}
          columns={[
            {
              title: '意图名称',
              dataIndex: 'name',
            },
            {
              title: '用户话术',
              dataIndex: 'similarList',
              key: 'content',
              render(similarList) {
                return (
                  <>
                    {_.map(similarList, ({ id, content }) => {
                      return (
                        <div key={id} className={GlobalStyles.textOverviewEllipsis}>
                          {content}
                        </div>
                      );
                    })}
                  </>
                );
              },
            },
            {
              title: '阀值',
              dataIndex: 'similarList',
              key: 'threshold',
              width: 100,
              render(similarList) {
                return (
                  <>
                    {_.map(similarList, ({ id, threshold }) => {
                      return (
                        <div key={id} className={GlobalStyles.textOverviewEllipsis}>
                          {threshold}
                        </div>
                      );
                    })}
                  </>
                );
              },
            },
            {
              title: '操作',
              className: IntentStyles.tablePanelCell,
              render(n, record) {
                return (
                  <Space>
                    <a
                      onClick={() => {
                        onEdit(record);
                      }}
                    >
                      编辑
                    </a>
                    {canNodeSelected ? (
                      <Button
                        type="link"
                        onClick={() => {
                          dispatch({
                            type: 'dialogStudios/updateNodeIntent',
                            intent: [...currentSelectIntents, record.id],
                          });
                        }}
                        disabled={_.includes(currentSelectIntents, record.id)}
                      >
                        选择
                      </Button>
                    ) : (
                      <Dropdown
                        overlay={
                          <Menu onClick={() => {
                          }}>
                            <Menu.Item key="2" icon={<VerticalAlignTopOutlined />}>
                              导出
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => {
                                dispatch({
                                  type: 'dialogStudios/removeIntent',
                                  intent: record,
                                });
                              }}
                              key="3"
                              icon={<MinusOutlined />}
                            >
                              删除
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <a>更多操作</a>
                      </Dropdown>
                    )}
                  </Space>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default connect(({ dialogStudios }) => {
  const { intents, selectedNode } = dialogStudios;
  return {
    intents,
    canNodeSelected: selectedNode && selectedNode.nodeType === ITEM_TYPES.USER_INPUT_NODE,
    currentSelectIntents: selectedNode && selectedNode.setting && selectedNode.setting.intentIds,
  };
})(IntentsTable);
