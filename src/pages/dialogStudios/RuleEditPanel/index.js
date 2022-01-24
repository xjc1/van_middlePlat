import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Form, Input, Row, InputNumber, message } from 'antd';
import { EditOutlined, CloseOutlined, PlusOutlined, LineOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { IDGenerator } from "@tong/assistant";
import Styles from '../EditorItemPanel/settingPanel.less';
import RuleStyles from './index.less';
import { EmptyFn, FormRules, TButton, TItem, TSwitch } from '@/components/tis_ui';

function Index({ rule, theme, onClose = EmptyFn, dispatch }) {
  const [formRef] = Form.useForm();
  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          {`${rule.id ? '编辑' : '创建'}规则`}
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <div className={RuleStyles.ruleEditPanel}>
          <div className={RuleStyles.ruleEditPanelContent}>
            <Form initialValues={rule} form={formRef}>
              <TItem name="name" label="规则名称" rules={[FormRules.required('必填')]}>
                <Input />
              </TItem>
              <Form.List name="innerRules">
                {(fields, { add, remove }) => (
                  <div className={RuleStyles.ruleEditPanelFormList}>
                    <div className={RuleStyles.ruleEditPanelFormListHeader}>
                      <div className={RuleStyles.ruleEditPanelFormListName}>规则管理</div>
                      <Button
                        type="link"
                        onClick={() => {
                          const nextId = IDGenerator.next();
                          add({ id: nextId });
                        }}
                        icon={<PlusOutlined />}
                      >
                        添加
                      </Button>
                    </div>
                    <div className={RuleStyles.ruleEditPanelFormListBody}>
                      {fields.map(({ key, fieldKey, name: fieldName, ...others }) => {
                        return (
                          <div key={key} className={RuleStyles.ruleEditPanelFormListPiece}>
                            <Row>
                              <TItem name={[fieldName, 'rule']} fieldKey={[fieldKey, 'id']}
                                     label="规则" {...others}>
                                <Input />
                              </TItem>
                              <TItem name={[fieldName, 'require']} label="必填" {...others}>
                                <TSwitch />
                              </TItem>
                            </Row>
                            <div className={RuleStyles.ruleEditPanelPieceFooter}>
                              <TButton.Button
                                shape="round"
                                className={RuleStyles.ruleEditPanelRemoveBtn}
                                icon={<LineOutlined />}
                                size="small"
                                onClick={() => {
                                  remove(fieldName);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Form.List>
              <TItem name="randomMatchCount" label="随机匹配个数">
                <InputNumber />
              </TItem>
            </Form>
          </div>
          <div className={RuleStyles.ruleEditPanelFooter}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                formRef.validateFields().then(nextVals => {
                  const { innerRules = [], randomMatchCount } = nextVals;
                  const notRequires = _.filter(innerRules, ({ require }) => {
                    return !require;
                  });
                  if (randomMatchCount > notRequires.length) {
                    message.error('配置错误, 随机匹配个数 不能比 非必须的规则数量大. ');
                    return;
                  }
                  if (rule.id) {
                    dispatch({
                      type: 'dialogStudios/updateRule',
                      rule: { ...nextVals, id: rule.id },
                    });
                  } else {
                    dispatch({
                      type: 'dialogStudios/addRule',
                      rule: nextVals,
                    });
                  }
                  onClose();
                });
              }}
              block
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ dialogStudios }) => dialogStudios)(Index);
