import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import { Badge, Input, Space } from 'antd';
import { connect } from 'dva';
import { CopyOutlined, MinusOutlined, ScissorOutlined, SyncOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import MaterialList from '../MaterialList';
import SplitMaterialList from '../SplitMaterialList';
import { EmptyFn, OperateBar, TButton, TCard } from '@/components/tis_ui';
import Styles from '../index.less';
import { adaptText } from '@/utils/AdaptiveHelper';
import { MATERIAL } from '@/services/api';

function Index({
                 matter = {},
                 materialDTOS = [],
                 hidden = false,
                 resolveMaterialDTOS = [],
                 onDeleteMaterial = EmptyFn,
                 dictNames,
                 dispatch,
               }) {
  const [filterStr, setFilterStr] = useState();

  const [selectedKeys, setSelectedKeys] = useState([]);

  const searchRef = useRef();

  const materials =
    filterStr && filterStr !== ''
      ? _.filter(materialDTOS, ({ name }) => _.includes(name, filterStr))
      : materialDTOS;

  const { run: setFilterStrDecounced } = useDebounceFn(
    str => {
      setFilterStr(str);
    },
    {
      wait: 500,
    },
  );

  const coverOriginalMaterial = ids => {
    MATERIAL.coverMaterialUsingPUT({
      body: {
        matterId: matter.id,
        materialIds: ids || selectedKeys,
      },
    }).then(() => {
      setSelectedKeys([]);
      dispatch({
        type: 'split/fetchMaterial',
      });
    });
  };

  const coverSplitMaterial = id => {
    MATERIAL.coverMaterialUsingPUT({
      body: {
        matterId: matter.id,
        resolvedMaterialId: id,
      },
    }).then(() => {
      dispatch({
        type: 'split/fetchMaterial',
      });
    });
  };

  return (
    <TCard
      className={classNames(
        Styles.materialSplitContentWrapper,
        hidden && Styles.materialSplitContentHidden,
      )}
      tight
      title={
        <Space className={Styles.materialSplitToolbar}>
          <Badge
            style={{
              backgroundColor: '#1890ff',
              zIndex: 2,
            }}
            count={selectedKeys.length}
          >
            <TButton.Button
              type="primary"
              icon={<CopyOutlined />}
              disabled={selectedKeys.length <= 0}
              confirmText="??????"
              confirmContent={`???????????????????????????${selectedKeys.length}??????????????????${adaptText(
                '????????????',
              )}????`}
              onClick={() => {
                coverOriginalMaterial(selectedKeys);
              }}
            >
              ??????????????????
            </TButton.Button>
          </Badge>
          <Badge count={selectedKeys.length}>
            <TButton.Button
              type="danger"
              icon={<MinusOutlined />}
              disabled={selectedKeys.length <= 0}
              confirmText="??????"
              confirmContent={`???????????????????????????${selectedKeys.length}???????????????????`}
              onClick={() => {
                onDeleteMaterial(selectedKeys);
                setSelectedKeys([]);
              }}
            >
              ??????
            </TButton.Button>
          </Badge>
        </Space>
      }
      extra={
        <div className={Styles.materialSplitToolbar}>
          <Input
            ref={searchRef}
            placeholder="????????????"
            allowClear
            onChange={({ target }) => {
              setFilterStrDecounced(target.value);
            }}
            style={{ width: 500, marginLeft: 10 }}
          />
        </div>
      }
      bodyStyle={{
        padding: '0px',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <MaterialList
        materials={materials}
        isValid={false}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          onChange: nextKeys => {
            setSelectedKeys(nextKeys);
          },
        }}
        extraOperate={record => {
          return (
            <OperateBar.Button
              icon={<ScissorOutlined />}
              confirmText="??????"
              confirmContent="???????????????????????????????"
              onClick={() => {
                coverOriginalMaterial([record.id]);
              }}
            >
              ??????
            </OperateBar.Button>
          );
        }}
        onDelete={onDeleteMaterial}
        expandable={{
          expandedRowRender: record => (
            <SplitMaterialList
              material={record}
              dictNames={dictNames}
              extraOperate={splitRecord => {
                return (
                  <OperateBar.Button
                    icon={<SyncOutlined />}
                    confirmText="??????"
                    confirmContent="?????????????????????????????????????"
                    onClick={() => {
                      coverSplitMaterial(splitRecord.id);
                    }}
                  >
                    ??????
                  </OperateBar.Button>
                );
              }}
              onCover={coverSplitMaterial}
            />
          ),
          rowExpandable: record => _.find(resolveMaterialDTOS, { parentId: record.id }),
        }}
      />
    </TCard>
  );
}

export default connect(({ split }) => {
  return {
    resolveMaterialDTOS: split.resolveMaterialDTOS,
    matter: split.matter,
  };
})(Index);
