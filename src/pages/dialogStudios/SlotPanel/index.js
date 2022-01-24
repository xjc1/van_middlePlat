import React from 'react';
import { Input, Button, Table, Dropdown, Menu, Space } from 'antd';
import {
  EditOutlined,
  CloseOutlined,
  SlidersOutlined,
  CopyOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { connect } from 'dva';
import Styles from '../EditorItemPanel/settingPanel.less';
import IntentStyles from './index.less';
import { EmptyFn } from '@/components/tis_ui';

function Index({
                 dispatch,
                 slots = [],
                 theme,
                 onClose = EmptyFn,
                 onEditSlot = EmptyFn,
               }) {
  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          槽位管理
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <div className={IntentStyles.intentPanel}>
          <div className={IntentStyles.intentPanelTitle}>
            <div>
              <Input.Search placeholder="请输入需要搜索的槽位" />
            </div>
            <div className={IntentStyles.intentPanelTitleBtns}>
              <Button
                type="link"
                onClick={() => {
                  onEditSlot({ isRequired: true});
                }}
              >
                添加槽位
              </Button>
              <Dropdown
                overlay={
                  <Menu onClick={() => {
                  }}>
                    <Menu.Item key="1" icon={<CopyOutlined />}>
                      复制槽位
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VerticalAlignTopOutlined />}>
                      导入槽位
                    </Menu.Item>
                    <Menu.Item key="3" icon={<VerticalAlignBottomOutlined />}>
                      导出槽位
                    </Menu.Item>
                  </Menu>
                }
              >
                <SlidersOutlined />
              </Dropdown>
            </div>
          </div>
          <div className={IntentStyles.intentPanelContent}>
            <Table
              size="small"
              bordered
              rowKey="id"
              dataSource={slots}
              columns={[
                {
                  title: '槽位名称',
                  dataIndex: 'name',
                },
                {
                  title: '是否必填',
                  dataIndex: 'isRequired',
                  width: 100,
                  render(isRequired) {
                    return isRequired ? <span>必填</span> : <span>非必填</span>;
                  },
                },
                {
                  title: '操作',
                  className: IntentStyles.intentPanelCell,
                  render(n, record) {
                    return (
                      <Space>
                        <a
                          onClick={() => {
                            onEditSlot(record);
                          }}
                        >
                          编辑
                        </a>
                        <a
                          onClick={() => {
                            dispatch({
                              type: 'dialogStudios/removeSlot',
                              slot: record,
                            });
                          }}
                        >
                          删除
                        </a>
                      </Space>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ dialogStudios }) => {
  const { slots } = dialogStudios;
  return {
    slots,
  };
})(Index);
