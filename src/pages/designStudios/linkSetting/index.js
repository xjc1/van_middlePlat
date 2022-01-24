import React from 'react';
import _ from 'lodash';
import { Button, Divider } from 'antd';
import Styles from './index.less';
import LinkRule from './LinkRule';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

function Index({ formId, links = [], dispatch }) {
  function onLinkChange(id, linkValues) {
    dispatch({
      type: 'formDesigner/updateSelectedItem',
      payload: {
        id: formId,
        links: _.map(links, link => {
          if (link.id === id) {
            return { ...link, ...linkValues };
          }
          return link;
        }),
      },
    });
  }

  function onRemove(rmId) {
    dispatch({
      type: 'formDesigner/updateSelectedItem',
      payload: {
        id: formId,
        links: _.filter(links, ({ id }) => id !== rmId),
      },
    });
  }

  function newLink() {
    dispatch({
      type: 'formDesigner/updateSelectedItem',
      payload: {
        id: formId,
        links: [...links, { id: IDGenerator.nextName('link', 10), type: 'link' }],
      },
    });
  }

  return (
    <div className={Styles.linkSetting}>
      <Divider orientation="left">联动配置</Divider>
      {_.map(links, ({ id, ...others }) => (
        <LinkRule
          key={id}
          onRuleChange={onLinkChange}
          onRemove={onRemove}
          formId={formId}
          id={id}
          rule={others}
        />
      ))}
      <div className={Styles.linkAddWrapper}>
        <Button type="primary" onClick={newLink} icon={<PlusOutlined />} size="small">
          新建联动规则
        </Button>
      </div>
    </div>
  );
}

export default connect()(Index);
