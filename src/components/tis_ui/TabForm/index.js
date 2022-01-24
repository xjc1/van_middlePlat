/* eslint-disable import/no-extraneous-dependencies  */
import React, { useState, useContext } from 'react';
import { Card, Form, notification } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EmptyFn from '../utils/EmptyFn';
import styles from './tabForm.less';
import FormBtnGp from './FormBtnGp';

const FormNamesCtx = React.createContext(null);

function Tab({ tabKey, children }) {
  const formNames = useContext(FormNamesCtx);
  if (children) {
    _.forEach(_.isArray(children) ? children : [children], item => {
      if (!item) return;
      const {
        props: { name },
      } = item;
      formNames.push({ name, group: tabKey });
    });
  }
  return children || null;
}

Tab.propTypes = {
  tabKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function TabForm({
  defaultTabKey,
  extra,
  style = {},
  title,
  children,
  bodyStyle,
  headStyle,
  bordered,
  onForm = EmptyFn,
  btnOption,
  ...others
}) {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState(defaultTabKey);
  // 将children统一为数组类型
  const childrenArray = Array.isArray(children) ? children : [children];
  const validChildren = _.filter(childrenArray, child => {
    if (!child) return false;
    const {
      props: { tabKey, title: tab },
    } = child;
    return tabKey && tab;
  });
  const [tabs] = useState(() =>
    _.map(validChildren, ({ props: { tabKey, title: tab } }) => ({
      key: tabKey,
      tab,
    })),
  );

  const formNames = [];

  onForm(form);
  return (
    <Card
      style={style}
      title={title}
      extra={extra}
      tabList={tabs}
      bordered={bordered}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      activeTabKey={activeKey}
      onTabChange={key => {
        setActiveKey(key);
      }}
    >
      <FormNamesCtx.Provider value={formNames}>
        <Form
          form={form}
          scrollToFirstError
          onFinishFailed={({ errorFields }) => {
            const errName = errorFields[0].name[0];
            if (errName) {
              notification.error({ message: '请检查所有必填项是否填完' });
            }
            const { group } = _.find(formNames, { name: errName });
            setActiveKey(group);
          }}
          {...others}
        >
          <div className={styles.tabContainer}>
            {_.map(validChildren, child => {
              const {
                props: { tabKey },
              } = child;
              return (
                <div
                  key={tabKey}
                  className={classNames(styles.tab, activeKey === tabKey && styles.active)}
                >
                  {React.cloneElement(child, { formRef: form })}
                </div>
              );
            })}
            {btnOption && <FormBtnGp {...btnOption} />}
          </div>
        </Form>
      </FormNamesCtx.Provider>
    </Card>
  );
}

TabForm.propTypes = {
  /** 表单标题 */
  title: PropTypes.string.isRequired,
  /** 获取表单实例的方法 */
  // eslint-disable-next-line react/require-default-props
  onForm: PropTypes.func,
  /** 默认标签页 */
  defaultTabKey: PropTypes.string.isRequired,
  /** 详情查看 **antd** 中 `card` 组件的 `extra` 属性 */
  // eslint-disable-next-line react/require-default-props
  extra: PropTypes.any,
  /** 详情查看 **FormBtnGp** 的配置 */
  // eslint-disable-next-line react/require-default-props
  btnOption: PropTypes.object,
  /** 表单样式 */
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.object,
  /** 表单内容 */
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.any,
  /** 边框线 */
  // eslint-disable-next-line react/require-default-props
  bordered: PropTypes.bool,
};

TabForm.Tab = Tab;

export default TabForm;
