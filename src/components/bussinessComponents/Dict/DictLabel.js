import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Divider, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import Styles from './DictLabel.less';
import { recursiveTreeData } from '@/utils/assistant';

function CodeInfo({ code }) {
  return (
    <Tooltip
      title={
        <Typography.Paragraph onClick={e => e.stopPropagation()} style={{ color: '#fff' }} copyable>
          {code}
        </Typography.Paragraph>
      }
    >
      <CopyrightOutlined style={{ color: '#1890ff', paddingRight: 10 }} />
    </Tooltip>
  );
}

function flattenTree2Obj(treeData) {
  const flattenData = {};
  _.forEach(treeData, item => {
    recursiveTreeData(item, ({ value, label, code, children }) => {
      flattenData[value] = code || value;
      return {
        id: value,
        name: label,
        children,
      };
    });
  });
  return flattenData;
}

function cascaderDropdownRender(param = {}) {
  const { root, onClose } = param;
  return function(menus) {
    const {
      props: { activeValue = [], options = [] },
    } = menus;
    const id2codeMap = flattenTree2Obj(options);

    return (
      <div onBlur={onClose}>
        {menus}
        <Divider style={{ margin: 0 }} />
        <div
          style={{
            paddingLeft: 10,
            fontWeight: 600,
            height: '30px',
            lineHeight: '30px',
            background: '#1890ff',
            color: '#fff',
          }}
        >
          {root && <span className={Styles.rootNode}>{root}</span>}{' '}
          {_.map(activeValue, vId => {
            return (
              <Typography.Paragraph key={vId} className={Styles.dictSpan} copyable>
                {id2codeMap[vId]}
              </Typography.Paragraph>
            );
          })}
          {onClose && (
            <span
              onClick={onClose}
              style={{
                float: 'right',
                paddingRight: '10px',
                cursor: 'pointer',
              }}
            >
              x
            </span>
          )}
        </div>
      </div>
    );
  };
}

export default CodeInfo;

export { cascaderDropdownRender };
