import React from 'react';
import { Button, Descriptions, PageHeader, Table, Space, TreeSelect } from "antd";
import { EmptyFn, OperateBar, TButton } from '@/components/tis_ui';
import { connect } from 'dva';
import classNames from "classnames";
import { FileSearchOutlined, RollbackOutlined } from "@ant-design/icons";
import Styles from './index.less';
import { commonUpDownStatus, subsystemsType } from "@/utils/constantEnum";
import { validMenus } from "@/pages/subsystem/utils";

function SubSystemConfig({ system, onEdit = EmptyFn, onPageEdit = EmptyFn, dispatch }) {
  const { name, url, menuId, position, type, childMenus = [], status = 0, id } = system;

  return (
    <PageHeader
      className={classNames(Styles.subsystemWrap, commonUpDownStatus.down === status && Styles.subsystemDiabled)}
      ghost={false}
      title={name}
      subTitle={childMenus.length === 0 && url}
      extra={<Space>
        {
          commonUpDownStatus.down === status &&
          <Button onClick={() => {
            dispatch({
              type: 'subsystem/upStatus',
              id,
            });
          }}>上架</Button>
        }
        {
          commonUpDownStatus.up === status &&
          <Button onClick={() => {
            dispatch({
              type: 'subsystem/downStatus',
              id,
            });
          }}>下架</Button>
        }
        <TButton.Delete confirmText="警告"
                        confirmContent="删除子模块将不能再恢复, 是否继续删除?"
                        onClick={() => {
                          dispatch({
                            type: 'subsystem/deleteMenu',
                            id: system.id,
                          });
                        }}>删除</TButton.Delete>
        <Button type="primary"
                onClick={() => {
                  onEdit(system);
                }}>
          编辑
        </Button>
      </Space>}
    >
      <div className={Styles.subsystemConfig}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="子系统标识">
            <a>{menuId}</a>
          </Descriptions.Item>
          <Descriptions.Item label="子系统名称">{name}</Descriptions.Item>
          <Descriptions.Item label="icon" />
          <Descriptions.Item label="子系统类型">{subsystemsType.$v_names[type]}</Descriptions.Item>
          <Descriptions.Item label="菜单位置">
            <TreeSelect type="tree"
                        size="small"
                        value={position}
                        disabled
                        treeLine
                        treeData={validMenus}
                        style={{ width: 150 }} />
          </Descriptions.Item>
        </Descriptions>
        <div className={Styles.subsystemPageConfig}>
          <div className={Styles.subsystemChildren}>
            <div className={Styles.subsystemChildrenHeader}>
              <h3 className={Styles.subsystemConfigTitle}>子菜单配置</h3>
              <Button type="link"
                      style={{ marginTop: -2 }}
                      onClick={() => {
                        onPageEdit({
                          system,
                        });
                      }}
              >添加子页面</Button>
            </div>
            {childMenus.length > 0 && <Table
              columns={[
                {
                  title: '菜单标识',
                  dataIndex: 'menuId',
                },
                {
                  title: 'url',
                  dataIndex: 'url',
                },
                {
                  title: '名称',
                  dataIndex: 'name',
                },
                {
                  title: '上下架',
                  dataIndex: 'status',
                  render(val) {
                    return commonUpDownStatus.$v_names[val];
                  }
                },
                {
                  title: '权限',
                  dataIndex: 'permissions',
                },
                {
                  title: '操作',
                  width: 150,
                  render(record) {
                    return <OperateBar
                      more={
                        <>
                          {
                            commonUpDownStatus.down === record.status &&
                            <OperateBar.Button onClick={() => {
                              dispatch({
                                type: 'subsystem/upStatus',
                                id: record.id,
                              });
                            }}>上架</OperateBar.Button>
                          }
                          {
                            commonUpDownStatus.up === record.status &&
                            <OperateBar.Button onClick={() => {
                              dispatch({
                                type: 'subsystem/downStatus',
                                id: record.id,
                              });
                            }}>下架</OperateBar.Button>
                          }
                          <OperateBar.Button
                            danger
                            icon={<RollbackOutlined />}
                            confirmText="警告"
                            confirmContent="确定要删除此页面配置吗?"
                            onClick={() => {
                              dispatch({
                                type: 'subsystem/deleteMenu',
                                id: record.id,
                              });
                            }}
                          >
                            删除
                          </OperateBar.Button>
                        </>
                      }
                    >
                      <OperateBar.Button
                        icon={<FileSearchOutlined />}
                        onClick={() => {
                          onPageEdit({
                            system,
                            page: record,
                          });
                        }}
                      >
                        编辑
                      </OperateBar.Button>
                    </OperateBar>;
                  }
                },
              ]}
              rowClassName="xxx"
              dataSource={childMenus}
              size="small"
              rowKey="id"
              pagination={false} />}
          </div>
        </div>
      </div>
    </PageHeader>
  );
}

export default connect(({ subsystem }) => subsystem)(SubSystemConfig);
