import React, { Component } from 'react';
import { TurboTree } from '@/components/tis_ui';
import { SCENE } from '@/services/api';
import authEnum, { Auth } from '@/utils/auth';

class Tree extends Component {
  state = {
    tree: null,
  };

  componentDidMount() {
    SCENE.getSceneTreeUsingGET('5b7fbc379e38d679a2eb060b').then(({ children }) => {
      this.setState({
        tree: children,
      });
    });
  }

  render() {
    console.info(authEnum.scenes_edit_alias);
    const { tree } = this.state;
    return (
      <div
        style={{
          height: '700px',
          position: 'relative',
          width: '500px',
        }}
      >
        <TurboTree
          // 高亮显示的node, 比如是表达正在被编辑的node, 值是node的cid
          nodeId={null}
          // tree 对象每个节点需要包含cid, name, children = [] 几个字段.
          tree={tree}
          // 工具栏上的按钮, 这个例子上是所有功能都有, 默认全功能
          /*
          EXPAND_ALL  展开全部
          COLLAPSE_ALL  收陇全部
          COLLAPSE_OTHERS 收拢其他, 除了我这一条路劲
          MOVE_UP  上移一个身位
          MOVE_DOWN 下移一个身位
           */
          actions={{ ...TurboTree.ACTIONS }}
          // 创建节点树, tree为[], 或者没有tree的时候, 用来创建第一个节点
          onCreateTree={() => {}}
          // 点击保存时候触发
          onSave={() => {}}
          // 节点被选中事件, 返回选中节点及其父节点
          onSelected={(node, parentNode) => {}}
          // 节点被取消事件
          onUnSelected={() => {}}
          // 双击节点事件
          onDoubleSelect={cid => {
            console.info(cid);
          }}
          // 内部节点发生改变后,(拖动, 改名, 新增, 删除)重新触发渲染操作
          onUpdate={next => {
            this.setState({
              tree: next,
            });
          }}
        />
      </div>
    );
  }
}

export default Tree;
