import React, { useEffect, useState } from 'react';
import { Button, Card, Popover, List, Typography, Input } from 'antd';
import { TButton } from '@/components/tis_ui';
import globalStyle from '@/global.less';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { MATTER, TRANSLATE } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import styles from './editPages.less';

function MatterBox({
  id,
  matter,
  materials = [],
  getName,
  dictNames,
  onChange = EmptyFn,
  onCancel,
}) {
  const [list, setList] = useState([]);
  const [searchMatterName, setSearchMatterName] = useState('');

  useEffect(() => {
    MATTER.findResolveMaterialByIdUsingGET(id).then(data => {
      TRANSLATE.materialTranslateUsingPOST({
        body: [
          {
            matterId: id,
            materialIds: _.map(materials, ({ rid }) => rid),
          },
        ],
      }).then(data2 => {
        const translatedMaterials = data2[id];
        const nextMaterials = _.uniqBy(
          [
            ..._.map(translatedMaterials.material, ({ name, absence, action }, key) => ({
              id: key,
              name,
              action,
              deleted: absence,
            })),
            ..._.map(data, ({ id: mid, name, action }) => ({ id: mid, name, action })),
          ],
          'id',
        );
        const needSelected = _.map(materials, ({ rid }) => rid);
        setList(
          nextMaterials.map(material =>
            _.includes(needSelected, material.id)
              ? {
                  ...material,
                  selected: true,
                }
              : material,
          ),
        );
      });
    });
  }, []);

  useEffect(
    _.debounce(() => {
      const nextMaterials = _.filter(list, ({ selected }) => selected);
      onChange(nextMaterials);
    }, 500),
    [list],
  );

  return (
    <Card
      hoverable
      type="inner"
      title={<span style={{ color: '#1890ff' }}>{getName(matter, dictNames)}</span>}
      className={styles.matterBox}
      extra={
        <TButton.Delete
          style={{ color: '#ff7875' }}
          icon={null}
          type="link"
          ghost={false}
          confirmText="警告"
          confirmContent="确认要删除此材料的编辑吗?"
          onClick={() => onCancel(id)}
        >
          删除
        </TButton.Delete>
      }
    >
      <div style={{ textAlign: 'center' }}>
        <Popover
          content={
            <div
              style={{
                position: 'relative',
                height: 300,
                width: 450,
              }}
            >
              <div className={classNames(styles.popSelectBox, globalStyle.innerboxScroll)}>
                <Input.Search
                  className={styles.matterSearchInput}
                  allowClear
                  enterButton
                  onSearch={setSearchMatterName}
                  placeholder="搜索材料"
                />
                <List
                  dataSource={_.filter(
                    list,
                    ({ selected, deleted, name = '', action = '' }) =>
                      !selected && !deleted && (name + action).includes(searchMatterName),
                  )}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <a
                          key="add"
                          onClick={() => {
                            // eslint-disable-next-line no-param-reassign
                            item.selected = true;
                            setList([...list]);
                          }}
                        >
                          添加
                        </a>,
                      ]}
                    >
                      <div>
                        {item.name}({item.action})
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          }
          trigger="click"
        >
          <Button icon={<PlusOutlined />}>添加材料</Button>
        </Popover>
      </div>
      <List
        dataSource={_.filter(list, ({ selected }) => selected)}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                type="link"
                key="add"
                onClick={() => {
                  // eslint-disable-next-line no-param-reassign
                  item.selected = false;
                  setList([...list]);
                }}
              >
                删除
              </Button>,
            ]}
          >
            <div>
              <Typography.Text type={item.deleted && 'danger'} delete={item.deleted}>
                {item.name}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default MatterBox;
