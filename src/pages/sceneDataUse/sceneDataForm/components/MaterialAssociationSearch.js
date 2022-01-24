/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Tree } from 'antd';
import { EmptyFn, TButton } from '@/components/tis_ui';
import DictAssistant from '@/utils/DictAssistant';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import { CORE, MATTER } from '@/services/api';
import LeftCard from '@/components/tis_ui/bulk/LeftCard';
import RightCard from '@/components/tis_ui/bulk/RightCard';
import styles from './association.less';

function MaterialAssociationSearch({ onSubmit = EmptyFn, linkMatters = [], isUseMatter = false }) {
  const formRef = useRef();
  const [list, setList] = useState([]);
  const [treeData, setTreeData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [leftSelectData, setLeftSelectData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [query, setQuery] = useState({});
  const [selectedKey, setSelectedKey] = useState();
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: 10,
    total: 0,
    pageNum: 0,
    loading: false,
  });

  const clearData = () => {
    setModalVisible(false);
    setLeftSelectData([]);
    setRightData([]);
    setQuery({});
  };

  const fetchList = async ({ page = 0, size = 10, queryCondition = {} }) => {
    setPaginationInfo({ ...paginationInfo, loading: true });
    if (isUseMatter) {
      if (!linkMatters.length) {
        setList([]);
        setPaginationInfo({ ...paginationInfo, loading: false });
        return;
      }
      const { list: translateList, total, pageNum, pageSize } = await Code2Name(
        MATTER.findStandardMaterialByMatterIdsUsingPOST({
          params: { page, size },
          body: {
            ids: linkMatters.map(({ value }) => value),
            ...queryCondition,
          },
        }),
        ['CLLX', 'type'],
      ).then(({ content: items, totalElements, size: nextSize, number, dictNames = {} }) => {
        const { CLLX } = dictNames;
        return {
          list: _.map(items, ({ type, ...others }) => {
            return {
              type,
              typeCn: CLLX[type],
              ...others,
            };
          }),
          total: totalElements,
          pageSize: nextSize,
          pageNum: number,
        };
      });
      setList(translateList);
      setPaginationInfo({ total, pageNum, pageSize, loading: false });
    } else {
      const { list: translateList, total, pageNum, pageSize } = await Code2Name(
        CORE.listStandardMaterialUsingGET({
          params: {
            page,
            size,
            ...queryCondition,
          },
        }),
        ['CLLX', 'type'],
        ['CLLY', 'source'],
      ).then(({ content = [], totalElements, size: nextSize, number, dictNames = {} }) => {
        const { CLLX, CLLY } = dictNames;
        return {
          list: _.map(content, ({ type, source, ...others }) => {
            return {
              type,
              typeCn: CLLX[type],
              sourceCn: CLLY[source],
              ...others,
            };
          }),
          total: totalElements,
          pageSize: nextSize,
          pageNum: number,
        };
      });
      setList(translateList);
      setPaginationInfo({ total, pageSize, pageNum, loading: false });
    }
  };

  const onLeftSelectChange = selectedKeys => {
    const newSelectedData = _.uniqBy([...list, ...leftSelectData], 'id').filter(
      it => selectedKeys.indexOf(it.id) > -1,
    );
    setLeftSelectData(newSelectedData);
  };
  const onSearch = text => {
    setQuery({ name: text });
  };

  const leftToRight = () => {
    const newRightData = _.uniqBy([...leftSelectData, ...rightData], 'id');
    setRightData(newRightData);
    setLeftSelectData([]);
  };

  const columns = [
    {
      title: '材料名称',
      dataIndex: 'name',
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
      display: 'left',
    },
    {
      title: '操作',
      width: 50,
      display: 'right',
      render: record => {
        return (
          <a
            onClick={() => {
              const newData = rightData.filter(({ id }) => id !== record.id);
              setRightData(newData);
            }}
          >
            删除
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    fetchList({ queryCondition: query });
  }, [JSON.stringify(query), JSON.stringify(linkMatters), JSON.stringify(isUseMatter)]);

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
    <>
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        关联材料
      </Button>
      <Modal
        title="关联标准材料"
        visible={modalVisible}
        onForm={form => {
          formRef.current = form;
        }}
        width={1200}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={
          <>
            <TButton.Button
              onClick={() => {
                setModalVisible(false);
              }}
            >
              取消
            </TButton.Button>
            <TButton.Button
              type="primary"
              onClick={() => {
                onSubmit(rightData);
                clearData();
              }}
            >
              确定
            </TButton.Button>
          </>
        }
      >
        <div className={styles.associationSplit}>
          {isUseMatter ? (
            <></>
          ) : (
            <div style={{ flex: '0 0 180px' }}>
              <div
                style={{ padding: 16, cursor: 'pointer' }}
                onClick={() => {
                  setQuery({ page: 0, pageSize: 10 });
                  setSelectedKey([]);
                }}
              >
                全部分类
              </div>
              {treeData && (
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
                  }}
                />
              )}
            </div>
          )}
          <LeftCard
            title="标准材料"
            showSearch
            hiddenBack
            onSearch={onSearch}
            onSelectChange={onLeftSelectChange}
            selectedKeys={leftSelectData.map(item => item.id)}
            rightKeys={rightData.map(item => item.id)}
            leftToRight={leftToRight}
            loading={paginationInfo.loading}
            columns={columns.filter(({ display }) => display !== 'right')}
            searchPlaceholder="请输入标准材料名称"
            list={list}
            pagination={{
              total: paginationInfo.total,
              pageSize: paginationInfo.pageSize,
              current: paginationInfo.pageNum,
              onChange: (page, nextSize) =>
                fetchList({ page, size: nextSize, queryCondition: query }),
            }}
          />
          <RightCard
            title="已选数据"
            list={rightData}
            columns={columns.filter(({ display }) => display !== 'left')}
          />
        </div>
      </Modal>
    </>
  );
}

export default MaterialAssociationSearch;
