/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { EmptyFn, TButton } from '@/components/tis_ui';
import { standardFieldDataType } from '@/utils/constantEnum';
import _ from 'lodash';
import { CORE, MATTER } from '@/services/api';
import LeftCard from '@/components/tis_ui/bulk/LeftCard';
import RightCard from '@/components/tis_ui/bulk/RightCard';
import CategoryList from '@/pages/standardFieldStore/categoryList';
import styles from './association.less';

function FieldAssociationSearch({ onSubmit = EmptyFn, linkMatters = [], isUseMatter = false }) {
  const formRef = useRef();
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: 10,
    total: 0,
    pageNum: 0,
    loading: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [leftSelectData, setLeftSelectData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [query, setQuery] = useState({});
  const [selectedID, setSelectedID] = useState();

  const columns = [
    {
      title: '字段名称',
      dataIndex: 'name',
    },
    {
      title: '字段分类',

      dataIndex: 'classification',
    },
    {
      title: '数据类型',

      dataIndex: 'dataType',

      render(text) {
        return standardFieldDataType.$v_names[text] || text;
      },
    },
    {
      title: '数据类型',

      dataIndex: 'dataType',
      display: 'left',
      render(text) {
        return standardFieldDataType.$v_names[text] || text;
      },
    },
    {
      title: '操作',
      width: 110,
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

  const clearData = () => {
    setModalVisible(false);
    setLeftSelectData([]);
    setRightData([]);
    setQuery({});
    setSelectedID();
  };

  const fetchList = async ({ page = 0, size = 10, queryCondition = {} }) => {
    setPaginationInfo({ ...paginationInfo, loading: true });
    // 如果有关联的事项就走事项的接口
    if (isUseMatter) {
      if (!linkMatters.length) {
        setList([]);
        setPaginationInfo({ ...paginationInfo, loading: false });
        return;
      }
      const {
        content = [],
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = await MATTER.findStandardFieldByMatterIdsUsingPOST({
        params: { page, size },
        body: {
          ids: linkMatters.map(({ value }) => value),
          ...queryCondition,
        },
      });
      setList(content);
      setPaginationInfo({ total, pageSize, pageNum, loading: false });
    } else {
      const {
        content = [],
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = await CORE.listStandardFieldUsingGET({
        params: {
          page,
          size,
          ...queryCondition,
        },
      });
      setList(content);
      setPaginationInfo({ total, pageSize, pageNum, loading: false });
    }
  };

  const fetchCategory = async () => {
    const categoryList = await CORE.listStandardFieldClassificationUsingGET({});
    const formatCategory = _.map(categoryList, ({ name, fieldNum }) => {
      return {
        id: name,
        name,
        fieldNum,
      };
    });
    setCategories(formatCategory);
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

  useEffect(() => {
    fetchList({ queryCondition: query });
  }, [JSON.stringify(query), JSON.stringify(linkMatters), JSON.stringify(isUseMatter)]);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        关联字段
      </Button>
      <Modal
        title="关联标准字段"
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
              <CategoryList
                showAddCategory={false}
                items={categories}
                selectedID={selectedID}
                onSelected={item => {
                  setSelectedID(item.id);
                  setQuery({ name: undefined, code: undefined, classification: item.id });
                }}
              />
            </div>
          )}
          <LeftCard
            title="标准字段"
            hiddenBack
            showSearch
            onSearch={onSearch}
            onSelectChange={onLeftSelectChange}
            selectedKeys={leftSelectData.map(item => item.id)}
            rightKeys={rightData.map(item => item.id)}
            leftToRight={leftToRight}
            loading={paginationInfo.loading}
            columns={columns.filter(({ display }) => display !== 'right')}
            searchPlaceholder="请输入标准字段名称"
            pagination={{
              total: paginationInfo.total,
              pageSize: paginationInfo.pageSize,
              current: paginationInfo.pageNum,
              onChange: (page, nextSize) =>
                fetchList({ page, size: nextSize, queryCondition: query }),
            }}
            list={list}
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

export default FieldAssociationSearch;
