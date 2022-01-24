import React, { useState } from 'react';
import classNames from 'classnames';
import { DesignLayout, DesignMain, DetailPanel, LeftLayout, OperateToolbar } from '@/layouts/designLayout';
import { FullscreenOutlined, FullscreenExitOutlined, LogoutOutlined, PlusSquareOutlined } from '@ant-design/icons';
import PolicyDetailPanel from '../policyDetailPanel';
import Styles from '../index.less';
import { EmptyFn, TButton } from '@/components/tis_ui';
import { POLICYATLAS } from "@/services/api";

const defaultPanelWidth = 380;

function Index({
                 title = ' ',
                 children,
                 policyDetail,
                 onClose = EmptyFn,
                 onFlush = EmptyFn,
                 onDrill = EmptyFn,
                 onAddNode = EmptyFn,
                 selectedEdge = null,
               }) {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <DesignLayout
      className={classNames(
        Styles.policyGraphCanvas,
        fullScreen && Styles.policyGraphCanvasFullScreen,
      )}
    >
      <DesignMain className={Styles.policyGraphCanvasMain}>
        <OperateToolbar className={Styles.policyGraphCanvasToolbar}>
          <div className={Styles.policyGraphCanvasToolbarBtns}>
            <OperateToolbar.Command
              primary
              tip="退出"
              icon={<LogoutOutlined />}
              onCommand={onClose}
            />
            {!fullScreen && (
              <OperateToolbar.Command
                tip="全屏"
                icon={<FullscreenOutlined />}
                onCommand={() => {
                  setFullScreen(true);
                }}
              />
            )}
            <OperateToolbar.Command
              tip="新增政策节点"
              icon={<PlusSquareOutlined />}
              onCommand={onAddNode}
            />
            {fullScreen && (
              <OperateToolbar.Command
                tip="恢复"
                icon={<FullscreenExitOutlined />}
                onCommand={() => {
                  setFullScreen(false);
                }}
              />
            )}
            <TButton.Delete confirmText="您确认要删除此关系吗?"
                            disabled={!selectedEdge}
                            type="link"
                            onClick={() => {
                              POLICYATLAS.deletePolicyAtlasRelationUsingPOST({
                                body: {
                                  endId: selectedEdge.target,
                                  startId: selectedEdge.source,
                                }
                              }).then(onFlush);
                            }}>
              删除关系
            </TButton.Delete>
          </div>
          <OperateToolbar.Text text={title} className={Styles.policyGraphCanvasTitle} />
        </OperateToolbar>
        {children}
      </DesignMain>
      <LeftLayout>
        {policyDetail && (
          <DetailPanel
            key={policyDetail.nodeId}
            width={defaultPanelWidth}
            className={Styles.policyGraphCanvasDetailPanel}
          >
            <PolicyDetailPanel policyDetail={policyDetail} onDrill={onDrill} />
          </DetailPanel>
        )}
      </LeftLayout>
    </DesignLayout>
  );
}

export default Index;
