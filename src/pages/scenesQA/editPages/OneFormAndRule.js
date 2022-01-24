/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Select, Input, Col, Tabs, Tooltip, Modal } from 'antd';
import { FormRules, TItem, TButton } from '@/components/tis_ui';
import _ from 'lodash';
import { connect } from 'dva';
import FieldBox from './FieldBox';
import { ONEFORM } from '@/services/api';
import {
  ApiOutlined,
  PullRequestOutlined,
  RetweetOutlined,
  ExclamationCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import RuleSelecter from '@/pages/scenesQA/editPages/RuleSelecter';
import SimpleScenesTree from '@/pages/scenesQA/editPages/SimpleScenesTree';
import styles from '@/pages/scenesQA/editPages/ChildScenesEdit.less';
import { PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import { appUserType, commonObjectType } from '@/utils/constantEnum';

function generateFormData(checked, modelIds, initValues) {
  const types = {};
  _.forEach(checked, ({ sid, applicationModel, value, required }) => {
    modelIds.add(applicationModel);
    initValues[`${sid}_${applicationModel}`] = value;
    initValues[`${sid}_${applicationModel}_required`] = required;
    types[`${sid}_${applicationModel}`] = true;
  });
  return types;
}

function OneFormAndRule({ focusNode, scenesId, sid, curSceneObjectType }) {
  const {
    ybReusedField = { showField: [], disableField: [], hideField: [] },
    definedSxId: sxId,
    regular,
    thirdPartyFormEncoding,
    situationCode,
    personalPortraitTag = [],
    legalPersonPortraitTag = [],
  } = focusNode;
  const [form] = Form.useForm();
  const [modelIds, setModelIds] = useState([]);
  const [usedModelIds, setUsedModelIds] = useState([]);
  const [fields, setFields] = useState([]);
  const [big, setBig] = useState('none');
  const [showFieldChecked, setShowFieldChecked] = useState();
  const [disableFieldChecked, setDisableFieldChecked] = useState();
  const [hiddenChecked, setHiddenChecked] = useState();
  const [definedSxId, setDefinedSxId] = useState(sxId);
  const [definedName, setDefinedName] = useState('-------*--------*--------*--------');
  const [checkedTypesMap, setCheckedTypesMap] = useState();
  const [selectedModeId, setSelectedModelId] = useState();
  const [copyNode, setCopyNode] = useState();

  useEffect(() => {
    if (definedSxId) {
      ONEFORM.getModelNameCnByIdUsingPOST({ body: { modelId: definedSxId } }).then(data => {
        setDefinedName(data[definedSxId]);
      });
    }
  }, [definedSxId]);

  const initeData = function(nextYbReusedField) {
    const initValues = {};
    const nextModelIds = new Set();
    const { showField, disableField, hideField } = nextYbReusedField;
    const showTypes = generateFormData(showField, nextModelIds, initValues);
    const disabledTypes = generateFormData(disableField, nextModelIds, initValues);
    const hideTypes = generateFormData(hideField, nextModelIds, initValues);
    const nextModelIdsArray = Array.from(nextModelIds);
    setCheckedTypesMap({
      showTypes,
      disabledTypes,
      hideTypes,
      initValues,
    });
    setUsedModelIds(nextModelIdsArray);
  };

  useEffect(() => {
    focusNode.ybReusedField = ybReusedField;
    initeData(focusNode.ybReusedField);
  }, []);

  useEffect(() => {
    if (usedModelIds.length === 0) return;
    const { showTypes, disabledTypes, hideTypes, initValues } = checkedTypesMap;
    const nextShowFieldChecked = [];
    const nextDisableFieldChecked = [];
    const nextHiddenChecked = [];
    Promise.all(
      _.map(usedModelIds, modelId =>
        ONEFORM.getModelNameAndModelItemsUsingGET({
          params: {
            modelId,
            sceneId: sid,
          },
        }),
      ),
    ).then(data => {
      const itemss = _.map(data, ({ name, items }, index) =>
        _.map(items, item => {
          const initKey = `${item.descriptionId}_${usedModelIds[index]}`;
          const next = {
            ...item,
            modelId: usedModelIds[index],
            modelName: name,
            value: initValues[initKey],
            required: initValues[initKey + '_required'],
            key: initKey,
          };
          if (showTypes[initKey]) {
            next.open = true;
            nextShowFieldChecked.push(next);
          }
          if (disabledTypes[initKey]) {
            next.open = true;
            nextDisableFieldChecked.push(next);
          }
          if (hideTypes[initKey]) {
            next.open = true;
            nextHiddenChecked.push(next);
          }
          return next;
        }),
      );
      setShowFieldChecked(nextShowFieldChecked);
      setDisableFieldChecked(nextDisableFieldChecked);
      setHiddenChecked(nextHiddenChecked);
      setFields(_.concat(...itemss));
    });
  }, [usedModelIds]);

  useEffect(() => {
    if (!showFieldChecked) return;
    ybReusedField.showField = _.map(
      showFieldChecked,
      ({ descriptionId, modelId, value, inputOrSelect, required }) => ({
        sid: descriptionId,
        applicationModel: modelId,
        value,
        required,
        inputOrSelect,
      }),
    );
  }, [showFieldChecked]);

  useEffect(() => {
    if (!disableFieldChecked) return;
    ybReusedField.disableField = _.map(
      disableFieldChecked,
      ({ descriptionId, modelId, value, inputOrSelect, required }) => ({
        sid: descriptionId,
        applicationModel: modelId,
        value,
        inputOrSelect,
        required,
      }),
    );
  }, [disableFieldChecked]);

  useEffect(() => {
    if (!hiddenChecked) return;
    ybReusedField.hideField = _.map(
      hiddenChecked,
      ({ descriptionId, modelId, value, inputOrSelect, required }) => ({
        sid: descriptionId,
        applicationModel: modelId,
        value,
        inputOrSelect,
        required,
      }),
    );
  }, [hiddenChecked]);

  const [update, setUpdate] = useState(() =>
    _.debounce(fn => {
      fn();
    }, 500),
  );

  return (
    <>
      <Form
        form={form}
        initialValues={{
          regular,
          thirdPartyFormEncoding,
          situationCode,
          personalPortraitTag: _.map(personalPortraitTag, ({ tagId }) => tagId),
          legalPersonPortraitTag: _.map(legalPersonPortraitTag, ({ tagId }) => tagId),
        }}
        style={{ minHeight: 400 }}
      >
        <Row>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            label="规则"
            name="regular"
          >
            <RuleSelecter
              onChange={val => {
                focusNode.regular = val;
              }}
            />
          </TItem>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            name="personalPortraitTag"
            label="个人画像标签"
          >
            <PortraitTagDrawerSelect
              type={appUserType.self}
              disabled={!curSceneObjectType.includes(commonObjectType.personal)}
              onChange={(val = []) => {
                focusNode.personalPortraitTag = _.map(val, ({ key }) => ({ tagId: key }));
              }}
            />
          </TItem>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            name="legalPersonPortraitTag"
            label="法人画像标签"
          >
            <PortraitTagDrawerSelect
              type={appUserType.legalPerson}
              disabled={!curSceneObjectType.includes(commonObjectType.legalPerson)}
              onChange={(val = []) => {
                focusNode.legalPersonPortraitTag = _.map(val, ({ key }) => ({ tagId: key }));
              }}
            />
          </TItem>
          <TItem col={18} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="事项表单标识">
            <Tooltip title={definedSxId}>
              <span>{definedName}</span>
            </Tooltip>
          </TItem>
          <Col span={6}>
            <Button
              disabled={!selectedModeId}
              onClick={() => {
                form.validateFields().then(({ currentModelId }) => {
                  focusNode.definedSxId = currentModelId.key;
                  setDefinedSxId(currentModelId.key);
                });
              }}
            >
              设置
            </Button>

            <TButton.Button
              confirmText="警告"
              ghost={false}
              style={{ marginLeft: 10 }}
              confirmContent="清空操作会清空表单标识,确定要清空吗?"
              icon={<RedoOutlined />}
              onClick={() => {
                focusNode.definedSxId = undefined;
                setDefinedSxId(undefined);
                setDefinedName('-------*--------*--------*--------');
              }}
            >
              清空
            </TButton.Button>
          </Col>

          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            label="获取模型列表"
            name="modalName"
          >
            <Input />
          </TItem>
          <Col span={6}>
            <Button
              onClick={() => {
                const modalName = form.getFieldValue('modalName');
                ONEFORM.getAllTisApplicationModelUsingPOST({
                  body: {
                    modelnamecnpart: modalName,
                    limit: 50,
                  },
                }).then(({ result }) => {
                  setModelIds(result);
                });
              }}
            >
              获取
            </Button>
          </Col>
          {modelIds.length > 0 && (
            <>
              <TItem
                col={18}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
                label="模型列表"
                name="currentModelId"
                rules={[FormRules.required('必须选择一个模型')]}
              >
                <Select
                  labelInValue
                  onChange={val => {
                    setSelectedModelId(val);
                  }}
                >
                  {_.map(modelIds, ({ modelId, modelName_cn: modelNameCn }) => (
                    <Select.Option key={modelId} value={modelId}>
                      {modelNameCn}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
              <Col span={6}>
                <TButton.Button
                  confirmText="警告"
                  ghost={false}
                  style={{ marginRight: 0 }}
                  confirmContent="覆盖操作会清空旧数据,确定要覆盖吗?"
                  disabled={!selectedModeId}
                  icon={<RetweetOutlined />}
                  onClick={() => {
                    form.validateFields().then(vals => {
                      const { value } = vals.currentModelId;
                      focusNode.ybReusedField = { showField: [], disableField: [], hideField: [] };
                      setFields([]);
                      initeData(focusNode.ybReusedField);
                      setUsedModelIds([value]);
                    });
                  }}
                >
                  覆盖
                </TButton.Button>
                <Button
                  disabled={!selectedModeId}
                  style={{
                    marginLeft: 10,
                  }}
                  icon={<PullRequestOutlined />}
                  onClick={() => {
                    form.validateFields().then(vals => {
                      const { value } = vals.currentModelId;
                      if (_.isString(value) && !_.includes(usedModelIds, value)) {
                        setUsedModelIds([...usedModelIds, value]);
                      }
                    });
                  }}
                >
                  添加
                </Button>
              </Col>
            </>
          )}
          {fields.length > 0 ? (
            <Col span={24}>
              <Tabs defaultActiveKey="showField" tabPosition="left">
                <Tabs.TabPane tab="展示" key="showField">
                  <FieldBox
                    selectedRows={showFieldChecked}
                    onCheck={setShowFieldChecked}
                    onChange={() =>
                      update(() => {
                        setShowFieldChecked([...showFieldChecked]);
                      })
                    }
                    fields={_.differenceBy(
                      fields,
                      disableFieldChecked,
                      hiddenChecked,
                      'descriptionId',
                    )}
                    onBigger={() => setBig('showField')}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="置灰" key="disableField">
                  <FieldBox
                    selectedRows={disableFieldChecked}
                    onCheck={setDisableFieldChecked}
                    onChange={() =>
                      update(() => {
                        setDisableFieldChecked([...disableFieldChecked]);
                      })
                    }
                    fields={_.differenceBy(
                      fields,
                      showFieldChecked,
                      hiddenChecked,
                      'descriptionId',
                    )}
                    onBigger={() => setBig('disableField')}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="隐藏" key="hidden">
                  <FieldBox
                    selectedRows={hiddenChecked}
                    onCheck={setHiddenChecked}
                    onChange={() =>
                      update(() => {
                        setHiddenChecked([...hiddenChecked]);
                      })
                    }
                    fields={_.differenceBy(
                      fields,
                      showFieldChecked,
                      disableFieldChecked,
                      'descriptionId',
                    )}
                    onBigger={() => setBig('hidden')}
                  />
                </Tabs.TabPane>
              </Tabs>
              <div className={styles.viewPanel}>
                <Button
                  icon={<ApiOutlined />}
                  className={styles.createBtn}
                  onClick={() => {
                    Modal.confirm({
                      title: '警告?',
                      icon: <ExclamationCircleOutlined />,
                      content: '此操作会清除已经配置的规则, 确定要继续吗?',
                      onOk() {
                        setFields([]);
                        setShowFieldChecked([]);
                        setDisableFieldChecked([]);
                        setHiddenChecked([]);
                      },
                    });
                  }}
                  type="danger"
                  block
                >
                  清除已有配置并重新配置规则
                </Button>
              </div>
            </Col>
          ) : (
            <>
              <TItem
                col={18}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
                label="从其他节点复制"
                name="copeNode"
              >
                <SimpleScenesTree
                  onChange={node => {
                    setCopyNode(node);
                  }}
                />
              </TItem>
              <Col span={6}>
                <Button
                  disabled={!copyNode}
                  onClick={() => {
                    focusNode.ybReusedField = copyNode.ybReusedField;
                    initeData(focusNode.ybReusedField);
                  }}
                >
                  复制
                </Button>
              </Col>
            </>
          )}
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            label="第三方表单编码"
            name="thirdPartyFormEncoding"
          >
            <Input
              placeholder="不超过50个字符"
              maxLength={50}
              onChange={e => {
                focusNode.thirdPartyFormEncoding = e.target.value;
              }}
            />
          </TItem>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            label="情形编码"
            name="situationCode"
          >
            <Input
              placeholder="不超过50个字符"
              maxLength={50}
              onChange={e => {
                focusNode.situationCode = e.target.value;
              }}
            />
          </TItem>
        </Row>
      </Form>
    </>
  );
}

export default connect(({ scenesQA }) => ({
  focusNode: scenesQA.focusNode,
  scenesId: scenesQA.scenesId,
  sid: scenesQA.sid,
  tree: scenesQA.tree,
  curSceneObjectType: scenesQA.curSceneObjectType,
}))(OneFormAndRule);
