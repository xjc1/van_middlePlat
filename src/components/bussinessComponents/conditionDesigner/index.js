import React, { useState } from 'react';
import { Alert } from 'antd';
import { HighLightRichText, utils, EmptyFn } from '@/components/tis_ui';
import { XORTree } from '@/components/bussinessComponents';
import _ from 'lodash';
import Styles from './index.less';
import ContentPopup from './ContentPopup';
import CreateCondition from './CreateCondition';

const { Base64 } = utils;

const colorList = {
  and: 'success',
  or: 'error',
};

const defaultItem = [
  {
    key: 'defaultKey',
    isRoot: true,
    operator: 'and',
    children: [],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Index({ value = defaultItem, content, base64, onChange, objectType }) {
  const [invalidContents, setInvalidContents] = useState([]);
  const formatContent = (text, isBase64) => {
    if (isBase64 && text) {
      return Base64.decodeBase64(text);
    }
    return text;
  };

  const getInitHighlight = initValue => {
    return _.reduce(
      initValue,
      (result, { children = [], conditionInfo = {} }) => {
        const { id, content: text = '', startMeta, endMeta } = conditionInfo;
        if (children.length) {
          const newResult = getInitHighlight(children);
          // eslint-disable-next-line no-param-reassign
          result = result.concat(newResult);
        } else {
          result.push({
            endMeta,
            startMeta,
            id,
            text,
          });
        }
        return result;
      },
      [],
    );
  };

  const getTreeKeys = initValue => {
    return _.reduce(
      initValue,
      (result, { children = [], conditionInfo = {} }) => {
        const { id } = conditionInfo;
        if (children.length) {
          const newResult = getTreeKeys(children);
          // eslint-disable-next-line no-param-reassign
          result = result.concat(newResult);
        } else {
          result.push(id);
        }
        return result;
      },
      [],
    );
  };

  return (
    <div className={Styles.conditionDesigner}>
      <div className={Styles.conditionDesignerWrapper}>
        <div className={Styles.conditionDesignerLeft}>
          <HighLightRichText
            html={formatContent(content, base64)}
            initData={getInitHighlight(value)}
            objectType={objectType}
            deleteIds={invalidContents}
            handleCreate={({ tip, handleCancel = EmptyFn, onFinish }) => (
              <CreateCondition
                tip={tip}
                handleCancel={handleCancel}
                onFinish={onFinish}
                objectType={objectType}
              />
            )}
            onCreate={node => {
              const { id, conditionInfo } = node;
              const newTreeData = value.map(item => {
                if (item.isRoot) {
                  const { children, ...others } = item;
                  return {
                    ...others,
                    children: [
                      {
                        key: id,
                        conditionInfo,
                      },
                      ...children,
                    ],
                  };
                }
                return item;
              });
              onChange(newTreeData);
            }}
          />
        </div>
        <div className={Styles.conditionDesignerRight}>
          <XORTree
            isRequire={false}
            value={value}
            operates={[XORTree.operate.addChildAndOr, XORTree.operate.remove]}
            onRelationDelete={(node = {}) => {
              const { children = [] } = node;
              const deleteKeys = getTreeKeys(children);
              setInvalidContents(deleteKeys);
            }}
            onChange={nextTree => {
              // setTreeData(nextTree);
              onChange(nextTree);
            }}
            renderNode={({ pNode, refresh, node, relationType }) => {
              return (
                <Alert
                  type={colorList[relationType]}
                  message={
                    <ContentPopup
                      objectType={objectType}
                      conditionItem={node}
                      onEdit={condition => {
                        const index = _.findIndex(pNode.children, node);
                        // eslint-disable-next-line no-param-reassign
                        pNode.children[index] = condition;
                        refresh();
                      }}
                      onDelete={() => {
                        const index = _.findIndex(pNode.children, node);
                        pNode.children.splice(index, 1);
                        setInvalidContents([node.key]);
                        refresh();
                      }}
                    />
                  }
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
