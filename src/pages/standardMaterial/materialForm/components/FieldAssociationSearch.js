/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { EmptyFn, TButton } from '@/components/tis_ui';
import { standardFieldDataType } from '@/utils/constantEnum';
import _ from 'lodash';
import { connect } from 'dva';
import LeftCard from '@/components/tis_ui/bulk/LeftCard';
import RightCard from '@/components/tis_ui/bulk/RightCard';
import CategoryList from '@/pages/standardFieldStore/categoryList';
import styles from './fieldAssociation.less';

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
];

function FieldAssociationSearch({
  dispatch = EmptyFn,
  onSubmit = EmptyFn,
  loading = false,
  list,
  total,
  pageSize,
  pageNum,
  categories = [],
}) {
  const formRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [leftSelectData, setLeftSelectData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [query, setQuery] = useState({});
  const [selectedID, setSelectedID] = useState();

  const clearData = () => {
    setModalVisible(false);
    setLeftSelectData([]);
    setRightData([]);
    setQuery({});
    setSelectedID();
  };

  const fetchList = ({ page = 0, size = 10, queryCondition = {} }) => {
    dispatch({
      type: 'standardFieldAssociation/fetchFields',
      page,
      size,
      query: queryCondition,
    });
  };
  const onLeftSelectChange = selectedKeys => {
    const newSelectedData = _.uniqBy([...list, ...leftSelectData], 'id').filter(
      it => selectedKeys.indexOf(it.id) > -1,
    );
    setLeftSelectData(newSelectedData);
  };
  const onSearch = text => {
    setQuery(text);
  };

  const leftToRight = () => {
    const newRightData = _.uniqBy([...leftSelectData, ...rightData], 'id');
    setRightData(newRightData);
    setLeftSelectData([]);
  };

  useEffect(() => {
    fetchList({ queryCondition: query });
  }, [JSON.stringify(query)]);

  useEffect(() => {
    dispatch({
      type: 'standardFieldAssociation/fetchCategory',
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
        <div className={styles.fieldAssociationSplit}>
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
          <LeftCard
            title="标准字段"
            showSearch
            onSearch={onSearch}
            onSelectChange={onLeftSelectChange}
            selectedKeys={leftSelectData.map(item => item.id)}
            rightKeys={rightData.map(item => item.id)}
            leftToRight={leftToRight}
            loading={loading}
            columns={columns}
            searchPlaceholder="请输入标准字段名称"
            pagination={{
              total,
              pageSize,
              current: pageNum,
              onChange: (page, nextSize) =>
                fetchList({ page, size: nextSize, queryCondition: query }),
            }}
            list={list}
          />
          <RightCard title="已选数据" list={rightData} columns={columns} />
        </div>
      </Modal>
    </>
  );
}

export default React.memo(
  connect(({ standardFieldAssociation, loading }) => ({
    ...standardFieldAssociation,
    loading: loading.effects['standardFieldAssociation/fetchFields'],
  }))(FieldAssociationSearch),
);
