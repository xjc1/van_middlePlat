import React from 'react';
import IntentStyles from "./index.less";
import { Button, Dropdown, Input, Menu, Space, Table } from "antd";
import {
  MinusOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons";
import _ from "lodash";
import { connect } from "dva";
import { ITEM_TYPES } from "@/pages/dialogStudios/itemConst";

function RulesManageTable({ onEdit, title, rules = [], canNodeSelected, currentSelectRules = [], dispatch }) {
  return (
    <div className={IntentStyles.tablePanel}>
      <h3>{title}</h3>
      <div className={IntentStyles.tablePanelTitle}>
        <div>
          <Input.Search placeholder="请输入需要搜索的规则名称" />
        </div>
        <div className={IntentStyles.tablePanelTitleBtns}>
          <Button type="link"
                  onClick={() => {
                    onEdit({});
                  }}
          >
            添加规则
          </Button>
        </div>
      </div>
      <div className={IntentStyles.tablePanelContent}>
        <Table
          size="small"
          bordered
          rowKey="id"
          dataSource={rules}
          columns={[
            {
              title: '规则名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              className: IntentStyles.tablePanelCell,
              width: 150,
              render(n, record) {
                return (
                  <Space>
                    <a onClick={() => {
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
                            type: 'dialogStudios/updateNodeRule',
                            rules: [...currentSelectRules, record.id],
                          });
                        }}
                        disabled={_.includes(currentSelectRules, record.id)}
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
                                  type: 'dialogStudios/removeRule',
                                  id: record.id,
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
  const { rules, selectedNode } = dialogStudios;
  return {
    rules,
    canNodeSelected: selectedNode && selectedNode.nodeType === ITEM_TYPES.USER_INPUT_NODE,
    currentSelectRules: selectedNode && selectedNode.setting && selectedNode.setting.ruleIds,
  };
})(RulesManageTable);
