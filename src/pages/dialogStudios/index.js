import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { DesignLayout, DesignToolbar, DesignMain, DetailPanel, LeftLayout } from '@/layouts/designLayout';
import { connect } from 'dva';
import { message } from 'antd';
import DialogEditor from './FlowEditor';
import { ITEM_TYPES, PANEL_TYPES } from '@/pages/dialogStudios/itemConst';
import UserInputSettingPanel from './EditorItemPanel/UserInputSettingPanel';
import OptionSettingPanel from './EditorItemPanel/OptionSettingPanel';
import JudgeSettingPanel from './EditorItemPanel/JudgeSettingPanel';
import AnswerSettingPanel from './EditorItemPanel/AnswerSettingPanel';
import SlotSettingPanel from './EditorItemPanel/SlotSettingPanel';
import SlotPanel from './SlotPanel';
import IntentEditPanel from './IntentEditPanel';
import SlotEditPanel from './SlotEditPanel';
import RuleEditPanel from './RuleEditPanel';
import TriggerModePanel from './TriggerModePanel';
import { MANAGE_TYPE } from './dailogConst';

const defaultPanelWidth = 380;
const slotPanelWidth = 450;

function Index({ dispatch, nodes = [], edges = [], groups = [], selectedNode, match }) {
  const [managePanel, setManagePanel] = useState();
  const [editPanel, setEditPanel] = useState();

  const data = useMemo(() => {
    return { nodes, edges, groups };
  }, [nodes, edges, groups]);

  useEffect(() => {
    if (_.isUndefined(managePanel)) {
      setEditPanel();
    }
  }, [managePanel]);

  const updateFormdata = formData => {
    dispatch({
      type: 'dialogStudios/updateNodeDetail',
      formData,
    });
  };

  const generateUserInputNode = (id) => {
    dispatch({
      type: 'dialogStudios/generateUserInputNode',
      id,
    });
  };

  const updateJugeFormdata = formData => {
    dispatch({
      type: 'dialogStudios/updateJugeNodeDetail',
      formData,
    });
  };

  useEffect(() => {
    const {
      params: { id },
    } = match;
    dispatch({
      type: 'dialogStudios/fetchDialog',
      id,
    });
    return () => {
      dispatch({
        type: 'dialogStudios/reset',
      });
    };
  }, []);

  return (
    <DesignLayout>
      <DesignToolbar />
      <DesignMain>
        <DialogEditor
          data={data}
          activeBtn={managePanel}
          onCheck={() => {
            dispatch({
              type: 'dialogStudios/check',
            });
          }}
          onTriggerMode={() => {
            setManagePanel(managePanel !== MANAGE_TYPE.TRIGGER_MODE ? MANAGE_TYPE.TRIGGER_MODE : null);
            setEditPanel();
          }}
          onSlot={() => {
            setManagePanel(managePanel !== MANAGE_TYPE.SLOT ? MANAGE_TYPE.SLOT : null);
            setEditPanel();
          }}
          onSave={() => {
            dispatch({
              type: 'dialogStudios/saveDialog',
            });
          }}
          onCanvasSelected={() => {
            dispatch({
              type: 'dialogStudios/clean',
            });
            setManagePanel();
            setEditPanel();
          }}
          onNodeSelected={item => {
            const { type: itemType } = item;
            dispatch({
              type: 'dialogStudios/focusNode',
              id: item.id,
              itemType,
            });
          }}
          onAddGroup={(item) => {
            dispatch({
              type: `dialogStudios/addGroup`,
              newGroup: {
                ...item,
                type: 'group'
              },
            });
          }}
          onUnlockGroup={(id) => {
            dispatch({
              type: `dialogStudios/unlockGroup`,
              groupId: id,
            });
          }}
          onUpdateGroup={(group) => {
            const { collapsed, ...others } = group;
            if (collapsed) {
              message.info('暂不支持折叠');
            }
            dispatch({
              type: `dialogStudios/updateGroup`,
              group: others,
            });
          }}
          onNodeAdd={item => {
            dispatch({
              type: `dialogStudios/addNode`,
              nextNode: item,
            });
          }}
          onNodeCopy={item => {
            dispatch({
              type: `dialogStudios/copyNode`,
              nextNode: item,
            });
          }}
          onEdgeAdd={item => {
            dispatch({
              type: 'dialogStudios/addEdge',
              nextEdge: item,
            });
          }}
          onEdgeRemove={model => {
            dispatch({
              type: 'dialogStudios/removeEdge',
              model,
            });
          }}
          onNodeRemove={id => {
            dispatch({
              type: 'dialogStudios/removeNode',
              id,
            });
          }}
          onNodeUpdated={item => {
            dispatch({
              type: 'dialogStudios/updateNode',
              nextNode: item,
            });
          }}
          onEdgeUpdated={item => {
            dispatch({
              type: 'dialogStudios/updateEdge',
              nextEdge: item,
            });
          }}
        />
      </DesignMain>
      <LeftLayout>
        {selectedNode && PANEL_TYPES.includes(selectedNode.nodeType) && (
          <DetailPanel width={defaultPanelWidth}>
            {selectedNode.nodeType === ITEM_TYPES.USER_INPUT_NODE && (
              <UserInputSettingPanel
                key={selectedNode.id}
                model={selectedNode}
                onChange={updateFormdata}
                isTriggerMode={managePanel === MANAGE_TYPE.TRIGGER_MODE}
                onTriggerMode={() => {
                  setManagePanel(MANAGE_TYPE.TRIGGER_MODE);
                  setEditPanel();
                }}
                onEditIntent={(record) => {
                  setEditPanel({
                    type: MANAGE_TYPE.INTENT,
                    record,
                  });
                }}
                onEditRule={(record) => {
                  setEditPanel({
                    type: MANAGE_TYPE.RULE,
                    record,
                  });
                }}
              />
            )}
            {selectedNode.nodeType === ITEM_TYPES.JUDGE_NODE && (
              <JudgeSettingPanel
                key={selectedNode.id}
                model={selectedNode}
                onChange={updateJugeFormdata}
              />
            )}
            {selectedNode.nodeType === ITEM_TYPES.OPTION_NODE && (
              <OptionSettingPanel
                key={selectedNode.id}
                model={selectedNode}
                onChange={updateFormdata}
                onGenerateUserInputNode={generateUserInputNode}
              />
            )}
            {selectedNode.nodeType === ITEM_TYPES.ANSWER_NODE && (
              <AnswerSettingPanel
                key={selectedNode.id}
                model={selectedNode}
                onChange={updateFormdata}
              />
            )}
            {selectedNode.nodeType === ITEM_TYPES.SLOT_NODE && (
              <SlotSettingPanel
                onOpenEdit={() => {
                  setManagePanel(MANAGE_TYPE.SLOT);
                }}
                key={selectedNode.id}
                model={selectedNode}
                onChange={updateFormdata}
              />
            )}
          </DetailPanel>
        )}
        {managePanel === MANAGE_TYPE.TRIGGER_MODE && (
          <DetailPanel width={500}>
            <TriggerModePanel
              theme="light"
              onEditIntent={(record) => {
                setEditPanel({
                  type: MANAGE_TYPE.INTENT,
                  record,
                });
              }}
              onEditRule={(record) => {
                setEditPanel({
                  type: MANAGE_TYPE.RULE,
                  record,
                });
              }}
              onClose={() => {
                setManagePanel();
              }}
            />
          </DetailPanel>
        )}
        {managePanel === MANAGE_TYPE.SLOT && (
          <DetailPanel width={slotPanelWidth} level="2">
            <SlotPanel
              theme="light"
              onEditSlot={(record) => {
                setEditPanel({
                  type: MANAGE_TYPE.SLOT,
                  record,
                });
              }}
              onClose={() => {
                setManagePanel();
              }}
            />
          </DetailPanel>
        )}
        {editPanel && editPanel.type === MANAGE_TYPE.INTENT && (
          <DetailPanel
            width={defaultPanelWidth}
            level="3"
          >
            <IntentEditPanel
              theme="light2"
              intent={editPanel.record}
              onClose={() => {
                setEditPanel();
              }}
            />
          </DetailPanel>
        )}
        {editPanel && editPanel.type === MANAGE_TYPE.SLOT && (
          <DetailPanel
            width={defaultPanelWidth}
            level="3"
          >
            <SlotEditPanel
              theme="light2"
              slot={editPanel.record}
              onClose={() => {
                setEditPanel();
              }}
            />
          </DetailPanel>
        )}
        {editPanel && editPanel.type === MANAGE_TYPE.RULE && (
          <DetailPanel
            width={defaultPanelWidth}
            level="3"
          >
            <RuleEditPanel
              theme="light2"
              rule={editPanel.record}
              onClose={() => {
                setEditPanel();
              }}
            />
          </DetailPanel>
        )}
      </LeftLayout>
    </DesignLayout>
  );
}

export default connect(({ dialogStudios }) => {
  return dialogStudios;
})(Index);
