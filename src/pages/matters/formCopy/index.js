import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Steps, Button, Space, Tooltip, message, Modal } from 'antd';
import { connect } from 'dva';
import OriginalMaterialList from './OriginalMaterialList';
import MatterSelectedList from './MatterSelectedList';
import MatterMaterialList from './MatterMaterialList';
import Styles from './index.less';
import ModalType from '@/pages/matters/materialSplit/ModalType';
import { materialStatus } from '@/utils/constantEnum';
import { EventCenter, utils } from '@/components/tis_ui';
import { MATERIAL } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import OriginalMaterialAdd from '@/pages/matters/materialSplit/OriginalMaterialAdd';

const TAB_TYPE = {
  originalMaterial: 0,
  selectedMatters: 1,
  matterMaterials: 2,
};

const { IDGenerator } = utils;

const { Step } = Steps;

const idGenerator = new IDGenerator('material');

function Index({ match, materialDTOS = [], modalType, dispatch }) {
  const [process, setProcess] = useState(TAB_TYPE.originalMaterial);

  const [selectedKeys, setSelectedKeys] = useState([]);

  const [matterSelecteds, setMatterSelecteds] = useState([]);

  const [checkedMaterials, setCheckedMaterials] = useState([]);

  const [matterId] = useState(() => {
    const { id } = match.params;
    return id;
  });

  useEffect(() => {
    dispatch({
      type: 'split/fetchMaterial',
      id: matterId,
    });
  }, []);

  const checkMaterials = () => {
    return Code2Name(
      MATERIAL.testUsingPOST({
        body: {
          materialIds: selectedKeys,
          sourceMatterId: matterId,
          targetMatterIds: _.map(matterSelecteds, ({ id }) => id),
        },
      }),
      ['SH00XZQH', 'regions'],
    ).then(data => {
      const { content = [], dictNames = {} } = data;
      return _.map(content, ({ regions, ...others }) => {
        return {
          ...others,
          regions,
          regionsCn: dictNames.SH00XZQH[regions],
          id: idGenerator.next(),
        };
      });
    });
  };

  const copyMaterials = () => {
    return MATERIAL.resolveMaterialCopyUsingPOST({
      body: {
        materialIds: selectedKeys,
        sourceMatterId: matterId,
        targetMatterIds: _.map(matterSelecteds, ({ id }) => id),
      },
    }).then(() => {
      Modal.success({
        content: '复制材料成功.',
      });
    });
  };

  return (
    <div className={Styles.formCopy}>
      <div className={Styles.formCopyToolbar}>
        <Steps
          type="navigation"
          size="small"
          current={process}
          className={Styles.formCopyNavigation}
          onChange={nextProcess => {
            switch (nextProcess) {
              case TAB_TYPE.selectedMatters:
                if (_.isEmpty(selectedKeys)) {
                  message.error('请先选择第一步原始材料');
                  return;
                }
                setProcess(nextProcess);
                break;
              case TAB_TYPE.matterMaterials:
                if (_.isEmpty(selectedKeys)) {
                  message.error('请先选择第一步原始材料');
                  return;
                }
                if (_.isEmpty(matterSelecteds)) {
                  message.error('请先选择第二步目标事项');
                  return;
                }
                checkMaterials().then(data => {
                  setCheckedMaterials(data);
                  setProcess(nextProcess);
                });
                break;
              default:
                setProcess(nextProcess);
                break;
            }
          }}
        >
          <Step title="选择原始材料" />
          <Step title="选择目标事项" />
          <Step title="查看事项材料" />
        </Steps>
        <div className={Styles.formCopyBtns}>
          <Space>
            <Tooltip title="进入步骤3【查看事项材料】才可以保存">
              <Button
                style={{ width: 200 }}
                disabled={process !== TAB_TYPE.matterMaterials}
                type="primary"
                onClick={() => {
                  copyMaterials();
                }}
              >
                保存拆解材料复制
              </Button>
            </Tooltip>
            <Button
              type="link"
              onClick={() => {
                EventCenter.emit('goBack');
              }}
            >
              返回事项管理
            </Button>
          </Space>
        </div>
      </div>
      <div className={Styles.formCopyContentWrapper}>
        <OriginalMaterialList
          hidden={process !== TAB_TYPE.originalMaterial}
          materials={_.filter(materialDTOS, item => {
            return _.includes([materialStatus.add, materialStatus.update], item.status);
          })}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedKeys,
            onChange: nextKeys => {
              setSelectedKeys(nextKeys);
            },
          }}
          onEdit={record => {
            dispatch({
              type: 'split/selectedItem',
              material: record,
              modalType: ModalType.Original,
            });
          }}
        />
        <MatterSelectedList
          filterId={matterId}
          hidden={process !== TAB_TYPE.selectedMatters}
          matterSelecteds={matterSelecteds}
          setMatterSelecteds={setMatterSelecteds}
        />
        <MatterMaterialList
          materials={checkedMaterials}
          hidden={process !== TAB_TYPE.matterMaterials}
        />
      </div>
      {modalType === ModalType.Original && (
        <OriginalMaterialAdd
          title="原始材料"
          onCancel={() => {
            dispatch({
              type: 'split/unSelected',
            });
          }}
        />
      )}
    </div>
  );
}

export default connect(({ split }) => {
  return {
    materialDTOS: split.materialDTOS,
    modalType: split.modalType,
  };
})(Index);

export { TAB_TYPE };
