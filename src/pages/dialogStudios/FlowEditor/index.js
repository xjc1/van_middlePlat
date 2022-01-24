import React, { useEffect, useRef } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { SaveOutlined, AlignLeftOutlined, BugOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import GGEditor, { Flow } from 'gg-editor';
import router from '@/utils/tRouter';
import keyboardJS from 'keyboardjs';
import Styles from '../index.less';
import FlowToolbar from '../FlowToolbar';
import EditorItemPanel from '../EditorItemPanel';
import { EmptyFn } from '@/components/tis_ui';
import { FlowContextMenu } from '../EditorContextMenu';

GGEditor.setTrackable(false);

function Index({
                 className,
                 data = {},
                 activeBtn,
                 onSave = EmptyFn,
                 onTriggerMode = EmptyFn,
                 onSlot = EmptyFn,
                 onNodeSelected = EmptyFn,
                 onNodeUpdated = EmptyFn,
                 onAddGroup = EmptyFn,
                 onUnlockGroup = EmptyFn,
                 onUpdateGroup = EmptyFn,
                 onEdgeUpdated = EmptyFn,
                 onNodeAdd = EmptyFn,
                 onEdgeAdd = EmptyFn,
                 onEdgeRemove = EmptyFn,
                 onNodeRemove = EmptyFn,
                 onNodeCopy = EmptyFn,
                 onCanvasSelected = EmptyFn,
                 onDrop = EmptyFn,
                 onCheck = EmptyFn,
               }) {

  const ref = useRef({});

  useEffect(() => {
    keyboardJS.reset();
    keyboardJS.bind('shift', () => {
      ref.current.shift = true;
    }, () => {
      ref.current.shift = false;
    });
  }, []);

  return (
    <div className={classNames(Styles.dialogEditor, className)}>
      <GGEditor className={Styles.dialogEditorWrap}>
        <Row className={Styles.dialogEditorToolbarWrap}>
          <Col span={24}>
            <FlowToolbar activeBtn={activeBtn}
                         onTriggerMode={onTriggerMode}
                         onSlot={onSlot} />
          </Col>
        </Row>
        <Row className={Styles.dialogEditorCanvasWrap}>
          <Col span={24}>
            <EditorItemPanel className={Styles.dialogEditorItemPanel} />
            <Flow
              className={Styles.dialogEditorCanvas}
              data={data}
              onAfterChange={e => {
                const { action, item } = e;
                if (item) {
                  const { type = '' } = item;
                  switch (`${action}_${type}`) {
                    case 'update_edge': {
                      const {
                        item: { model },
                      } = e;
                      onEdgeUpdated(model);
                      break;
                    }
                    case 'update_node': {
                      const {
                        item: { model },
                      } = e;
                      if (ref.current.shift) {
                        onNodeCopy(model);
                      } else {
                        onNodeUpdated(model);
                      }
                      break;
                    }
                    case 'add_node': {
                      const { model } = e;
                      onNodeAdd(model);
                      break;
                    }
                    case 'add_group': {
                      const { item: { model } } = e;
                      onAddGroup({
                        ...model,
                        type,
                      });
                      break;
                    }
                    case 'remove_group': {
                      const {
                        item: { model },
                      } = e;
                      onUnlockGroup(model.id);
                      break;
                    }
                    case 'update_group': {
                      const {
                        item: { model },
                      } = e;
                      onUpdateGroup(model);
                      break;
                    }
                    case 'add_edge': {
                      const { model } = e;
                      onEdgeAdd(model);
                      break;
                    }
                    case 'remove_node': {
                      onNodeRemove(item.id);
                      break;
                    }
                    case 'remove_edge': {
                      onEdgeRemove(item.model);
                      break;
                    }
                    default:
                      break;
                  }
                }
              }}
              onDrop={item => {
                const { currentShape, shape } = item;
                if (currentShape && shape && currentShape.isAnchor && shape.isAnchor) {
                  const { model: srcModel } = currentShape.getItem();
                  const { model: destModel } = shape.getItem();
                  onDrop(srcModel, destModel);
                }
              }}
              onClick={e => {
                const { item } = e;
                if (!item) {
                  onCanvasSelected();
                }
              }}
              onAfterItemSelected={e => {
                const { item = {} } = e;
                const { model, type } = item;
                onNodeSelected({ ...model, type });
              }}
            />
          </Col>
        </Row>
        <div className={Styles.dialogEditorFooter}>
          <Button
            type="link"
            icon={<AlignLeftOutlined />}
            size="large"
            onClick={() => {
              router.push('dialogManager');
            }}
          >
            返回到列表
          </Button>
          <div className={Styles.dialogEditorRightBtns}>
            <Space>
              <Button type="link" icon={<BugOutlined />} size="large" onClick={onCheck}>
                配置检测
              </Button>
              <Button
                type="primary"
                className={Styles.dialogEditorSaveBtn}
                onClick={onSave}
                icon={<SaveOutlined />}
                size="large"
              >
                保存
              </Button>
            </Space>
          </div>
        </div>
        <FlowContextMenu />
      </GGEditor>
    </div>
  );
}

export default Index;
