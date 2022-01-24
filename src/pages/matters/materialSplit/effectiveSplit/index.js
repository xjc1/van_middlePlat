import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import { Badge, Input, Space } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { CopyOutlined, EditOutlined, MinusOutlined, ScissorOutlined } from '@ant-design/icons';
import MaterialList from '../MaterialList';
import SplitMaterialList from '../SplitMaterialList';
import { EmptyFn, OperateBar, TButton, TCard } from '@/components/tis_ui';
import Styles from '../index.less';
import ModalType from '../ModalType';
import { adaptText } from '@/utils/AdaptiveHelper';
import authEnum, { Auth, authCheck } from '@/utils/auth';

function Index({
  dispatch,
  hidden = false,
  materialDTOS = [],
  resolveMaterialDTOS = [],
  dictNames,
  onDeleteMaterial = EmptyFn,
  onDeleteSplitMaterial = EmptyFn,
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

  const copyMaterial = () => {
    dispatch({
      type: 'split/copyMaterial',
      materialIds: selectedKeys,
    });
    setSelectedKeys([]);
  };

  const onSplit = record => {
    dispatch({
      type: 'split/selectedItem',
      material: {
        matterId: record.matterId,
        name: record.name,
        fromWhere: record.fromWhere,
        materialFormat: record.materialFormat,
        needDesc: record.needDesc,
        format: record.format,
        detail: record.detail,
        memo: record.memo,
        originalNumber: record.originalNumber,
        parentId: record.id,
      },
      modalType: ModalType.Split,
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
          <Auth auth={authEnum.matters_origin}>
            <TButton.Create
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'split/selectedItem',
                  modalType: ModalType.Original,
                });
              }}
            >
              添加原始材料
            </TButton.Create>
          </Auth>
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
              confirmText="警告"
              confirmContent={`确定您要复制选中的${selectedKeys.length}个原始材料到${adaptText(
                '拆解材料',
              )}吗?`}
              onClick={copyMaterial}
            >
              复制成拆解材料
            </TButton.Button>
          </Badge>
          <Auth auth={authEnum.matters_origin}>
            <Badge count={selectedKeys.length}>
              <TButton.Button
                type="danger"
                icon={<MinusOutlined />}
                disabled={selectedKeys.length <= 0}
                confirmText="警告"
                confirmContent={`确定您要删除选中的${selectedKeys.length}个原始材料吗?`}
                onClick={() => {
                  onDeleteMaterial(selectedKeys);
                  setSelectedKeys([]);
                }}
              >
                删除
              </TButton.Button>
            </Badge>
          </Auth>
        </Space>
      }
      extra={
        <div className={Styles.materialSplitToolbar}>
          <Input
            ref={searchRef}
            placeholder="查询材料"
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
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          onChange: nextKeys => {
            setSelectedKeys(nextKeys);
          },
        }}
        onDelete={onDeleteMaterial}
        extraOperate={record => {
          return (
            <OperateBar.Button icon={<ScissorOutlined />} onClick={() => onSplit(record)}>
              {adaptText('拆解')}
            </OperateBar.Button>
          );
        }}
        expandable={{
          expandedRowRender: record => (
            <SplitMaterialList
              material={record}
              dictNames={dictNames}
              extraOperate={splitRecord => {
                return authCheck(
                  authEnum.matters_origin,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      dispatch({
                        type: 'split/selectedItem',
                        material: splitRecord,
                        modalType: ModalType.Split,
                      });
                    }}
                  >
                    编辑
                  </OperateBar.Button>,
                );
              }}
              onDelete={onDeleteSplitMaterial}
            />
          ),
          rowExpandable: record => _.find(resolveMaterialDTOS, { parentId: record.id }),
        }}
      />
    </TCard>
  );
}

export default connect(({ split }) => {
  return { resolveMaterialDTOS: split.resolveMaterialDTOS };
})(Index);
