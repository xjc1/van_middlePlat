import React, { useEffect, useState } from 'react';
import { Modal, Input, Tree, Space, message } from 'antd';
import { EmptyFn, TTable } from '@/components/tis_ui';
import DictAssistant from '@/utils/DictAssistant';
import _ from 'lodash';
import Styles from './index.less';
import classNames from 'classnames';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import { CORE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

function Index({ onCancel = EmptyFn, onOk = EmptyFn }) {
  const [selectedKey, setSelectedKey] = useState([]);

  const [selectedNode, setSelectedNode] = useState();

  const [treeData, setTreeData] = useState();

  const [query, setQuery] = useState({});

  const [queryStr, setQueryStr] = useState('');

  const [list, setList] = useState([]);

  useEffect(() => {
    Code2Name(CORE.listStandardMaterialUsingGET({ params: query }), ['CLLX', 'type']).then(
      ({ content = [], dictNames = {} }) => {
        const { CLLX } = dictNames;
        setList(
          _.map(content, ({ type, ...others }) => {
            return {
              type,
              typeCn: CLLX[type],
              ...others,
            };
          }),
        );
      },
    );
  }, [query]);

  useEffect(() => {
    Promise.all([
      DictAssistant.fetchDictsTreeByMidGroundWithMemo('CLLX,CLLX'),
      DictAssistant.fetchDictsTreeByMidGroundWithMemo('SHFZBMSH,SHFZBMSH'),
    ])
      .then(datas => {
        return _.map(datas, data => {
          const [firstItem] = data;
          return firstItem;
        });
      })
      .then(items => {
        const nextTreeData = _.map(items, ({ title, id, children = [] }) => {
          return {
            title,
            key: id,
            selectable: false,
            children: _.map(children, ({ title: title2, parentcode, id: id2, value }) => {
              return { title: title2, key: id2, isLeaf: true, parentcode, code: value };
            }),
          };
        });
        setTreeData(nextTreeData);
      });
  }, []);

  return (
    <Modal
      visible
      title="选择标准材料"
      onCancel={onCancel}
      width={1100}
      onOk={() => {
        if (!selectedNode) {
          message.warning('请选择标准材料');
          return;
        }
        onOk(selectedNode);
      }}
    >
      <div className={Styles.formModalWrapper}>
        <div className={Styles.formModalHeader}>
          <Input.Search
            placeholder="标准材料名称"
            allowClear
            value={queryStr}
            onChange={({ target }) => {
              setQueryStr(target.value);
            }}
            onSearch={str => {
              setQuery({ page: 0, pageSize: 10, name: str });
              setSelectedKey([]);
            }}
            style={{ width: 400 }}
          />
        </div>
        <div className={Styles.formModalContent}>
          <div className={layoutSytles.twoGridPage}>
            <div className={classNames(layoutSytles.leftGrid, Styles.formModalCategoryList)}>
              <div
                className={classNames(Styles.formModalCategoryTitle, Styles.formModalCategoryBtn)}
                onClick={() => {
                  setQuery({ page: 0, pageSize: 10 });
                  setSelectedKey([]);
                }}
              >
                全部分类
              </div>
              {treeData && (
                <div className={Styles.formModalTreeWrapper}>
                  <Tree.DirectoryTree
                    defaultExpandAll
                    treeData={treeData}
                    selectedKeys={selectedKey}
                    onSelect={(nextSelectedKeys, { node }) => {
                      const { parentcode, code } = node;
                      switch (parentcode) {
                        case 'CLLX':
                          setQuery({ page: 0, pageSize: 10, type: code });
                          break;
                        case 'SHFZBMSH':
                          setQuery({ page: 0, pageSize: 10, issuingDepartment: code });
                          break;
                        default:
                      }
                      setSelectedKey(nextSelectedKeys);
                      setQueryStr('');
                    }}
                  />
                </div>
              )}
            </div>
            <div className={classNames(layoutSytles.rightGrid, Styles.formModalList)}>
              <div className={Styles.formModalTableWrapper}>
                <TTable
                  bordered
                  title={() => {
                    return (
                      <Space className={Styles.formModalTableTitle}>
                        <span className={Styles.pre}>已选中:</span>
                        <span>{selectedNode && `${selectedNode.name} [${selectedNode.code}]`}</span>
                      </Space>
                    );
                  }}
                  size="small"
                  scroll={{ y: 300 }}
                  rowSelection={{
                    type: 'radio',
                    onChange: (selectedRowKeys, nodes) => {
                      const [nextSelectedNode] = nodes;
                      setSelectedNode(nextSelectedNode);
                    },
                  }}
                  columns={[
                    {
                      title: '材料名称',
                      dataIndex: 'name',
                      width: 110,
                    },
                    {
                      title: '材料编码',
                      dataIndex: 'code',
                      width: 110,
                    },
                    {
                      title: '材料类型',
                      dataIndex: 'typeCn',
                      width: 110,
                    },
                  ]}
                  rowKey="id"
                  dataSource={list}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Index;
