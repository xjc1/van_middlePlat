import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import classNames from 'classnames';
import AddFormModal from './addFormModal';
import { FormOutlined } from '@ant-design/icons';
import FormList from './formList';
import FormConfig from './formConfig';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import Styles from './index.less';
import { connect } from 'dva';
import { CORE, MATTERFORMS } from '@/services/api';
import { confirmAble } from '@/components/tis_ui';

function Index({ match, dispatch }) {
  const [selectedNode, setSelectedNode] = useState();

  const [loading, setLoading] = useState(false);

  const [isChanged, setIsChanged] = useState();

  const [matterId] = useState(() => {
    const { id } = match.params;
    return id;
  });

  const [openAddForm, setOpenAddForm] = useState(false);

  const onFetchList = ({ page = 0, size = 10 }) => {
    dispatch({
      type: 'matterForm/fetchList',
      params: {
        matterId,
        page,
        size,
      },
    });
  };

  useEffect(() => {
    onFetchList({});
  }, []);

  const getDetail = id => {
    MATTERFORMS.getMatterFormDetailUsingGET(id).then(node => {
      setSelectedNode(node);
      setLoading(false);
    });
  };

  const onRefresh = ({ id }) => {
    setLoading(true);
    getDetail(id);
  };

  return (
    <div className={classNames(layoutSytles.twoGridPage, Styles.formSplit)}>
      <div className={classNames(layoutSytles.leftGrid, Styles.formSplitLeft)}>
        <FormList
          onAddForm={() => setOpenAddForm(true)}
          matterId={matterId}
          selected={selectedNode}
          onFetchList={onFetchList}
          onDelete={id => {
            MATTERFORMS.deleteMatterFormUsingPOST(id).then(() => {
              message.success('删除成功');
              onFetchList({});
            });
          }}
          onSelected={({ id }) => {
            if (isChanged) {
              confirmAble({
                confirmText: '提示',
                confirmContent: '当前表单有修改，切换表单编辑会丢失未保存的配置，确定要切换吗？',
                onClick: () => {
                  getDetail(id);
                },
              })();
            } else {
              getDetail(id);
            }
          }}
        />
      </div>
      <div className={classNames(layoutSytles.rightGrid, Styles.formSplitRight)}>
        {selectedNode && !loading && (
          <FormConfig
            key={selectedNode.id}
            formInstance={selectedNode}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
            onRefresh={onRefresh}
            onSave={fields => {
              MATTERFORMS.updateMatterFormUsingPOST({
                body: {
                  ...selectedNode,
                  fields,
                },
              }).then(() => {
                message.success('保存表单字段成功。');
                setIsChanged(false);
              });
            }}
          />
        )}
        {!selectedNode && !loading && (
          <div className={Styles.formSplitRightEmpty}>
            <FormOutlined />
            <p>点击左侧编辑，配置表单字段</p>
          </div>
        )}
        {selectedNode && loading && (
          <div className={Styles.formSplitRightEmpty}>
            <Spin />
          </div>
        )}
      </div>
      {openAddForm && (
        <AddFormModal
          matterId={matterId}
          onCancel={() => setOpenAddForm(false)}
          onOk={({ name, id: standardMaterialId }) => {
            CORE.createMatterFormUsingPOST({
              body: {
                matterId,
                name,
                standardMaterialId,
                role: 'CYZTBZ',
              },
            })
              .then(() => {
                message.success('创建表单成功');
                dispatch({
                  type: 'matterForm/fetchList',
                  params: {
                    matterId,
                    page: 0,
                    size: 10,
                  },
                });
                setOpenAddForm(false);
              })
              .catch(e => {
                message.error(`创建表单失败, [${e.message}]`);
              });
          }}
        />
      )}
    </div>
  );
}

export default connect(({ matterForm }) => matterForm)(Index);
