import React from 'react';
import { Alert, Menu } from 'antd';
import { XORTree } from '@/components/bussinessComponents';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import TagNode from './TagNode';

const colorList = {
  and: 'success',
  or: 'error',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Index({ value = [], onChange, objectType, ...others }) {
  const defaultItem = [
    {
      key: 'defaultKey',
      isRoot: true,
      operator: 'and',
      children: [],
    },
  ];
  const handleAddChild =({node, refresh}) => {
    node.children.push({key: IDGenerator.next(), tagInfo : undefined});
      refresh()
  }
  return (
    <div >
      <div >
          <XORTree
            isRequire={false}
            value={value.length ? value : defaultItem}
            addChildItemText='添加子级标签'
            operates={[XORTree.operate.addChildAndOr, XORTree.operate.remove]}
            extraOperate={
       
                     <Menu.Item key="addChildTag">
                          <PlusOutlined />
                          添加子级标签
                        </Menu.Item>
         
            }
            extraOperatesClick={({key, node, pNode, refresh}) => {
              switch(key) {
                case 'addChildTag' :
                  handleAddChild({node, pNode, refresh});
                  break;
                  default: 
                  break;
              }
            }}
            onChange={nextTree => {
              onChange(nextTree);
            }}
            renderNode={({ pNode, refresh, node, relationType }) => {
              return (
                <Alert
                  type={colorList[relationType]}
                  message={
                    <TagNode
                      disabled={others.disabled}
                      objectType={objectType}
                      conditionItem={node}
                      onEdit={condition => {
                        const index = _.findIndex(pNode.children, node);
                        // eslint-disable-next-line no-param-reassign
                        if(condition && pNode.children[index]) {
                          // eslint-disable-next-line no-param-reassign
                          pNode.children[index].tagInfo = condition;
                        }
                        refresh();
                      }}
                      tagInfo={node.tagInfo}
                      onDelete={() => {
                        const index = _.findIndex(pNode.children, node);
                        pNode.children.splice(index, 1);
                        refresh();
                      }}
                    />
                  }
                />
              );
            }}
            {...others}
          />
        </div>
    </div>
  );
}

export default Index;
