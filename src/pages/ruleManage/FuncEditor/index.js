import React, { useEffect, useState } from 'react';
import { Card, Form, message, Spin } from 'antd';
import classNames from 'classnames';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import BasicInfoSettings from './BasicInfoSetting';
import JudgmentSetting from './JudgmentSetting';
import { confirmAble, FormBtnGp } from '@/components/tis_ui';
import Styles from './index.less';
import router from '@/utils/tRouter';
import { appUserType, functionMethodType } from '@/utils/constantEnum';
import _ from 'lodash';
import { connect } from 'dva';
import { METHODSCHEMAS } from '@/services/api';
import PreMode from '@/pages/ruleManage/FuncEditor/preMode';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const fileIDGenerator = new IDGenerator('f');

function getTitle(id, isCheck) {
  if (id) {
    if (isCheck) {
      return '查看函数';
    }
    return '编辑函数';
  }
  return '新增函数';
}

function invalidValue(value) {
  if (JSON.stringify(value) === '[""]' || value === '' || !value) {
    return true;
  }
  return false;
}

function FuncEditor({ dispatch, location = {} }) {
  const [formRef] = Form.useForm();
  const [preMode, setPreMode] = useState(false);
  const [useField, setUseField] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [objectType, setObjectType] = useState(appUserType.self);
  const [initValue, setInitValue] = useState(null);
  const [tableType, setTableType] = useState('');

  const { query = {}, pathname } = location;
  const { id } = query;

  useEffect(() => {
    setIsCheck(false);
    if (pathname.indexOf('funcEditor') > 0) {
      // 编辑
      getDetail(id);
    } else if (pathname.indexOf('funcView') > 0) {
      // 查看
      getDetail(id);
      setIsCheck(true);
    } else {
      // 新增
      setInitValue({ methodType: 2 });
    }
  }, []);

  const onValidateForm = () => {
    formRef
      .validateFields()
      .then(vals => {
        const { func = [], useFields: judgeField = [] } = vals;
        const [baseMethodInfo = {}] = formatFuncSetting(func);
        const useFields = formatJudgeField(judgeField);
        dispatch({
          type: initValue.id ? 'ruleManage/editRule' : 'ruleManage/addFunction',
          body: {
            ...vals,
            baseMethodInfo,
            useFields,
            functionId: initValue.id,
            methodType: initValue.methodType,
          },
        });
        router.push('ruleManage');
      })
      .catch(() => {
        message.error('请确认必填都填写完毕再提交');
      });
  };

  async function getDetail(methodId) {
    METHODSCHEMAS.findMethodSchemaTagByIdUsingGET(methodId).then(res => {
      const { type } = res;
      const { useFields = [] } = handleInitValue(res);
      setInitValue(handleInitValue(res));
      setObjectType(type);
      setUseField(useFields);
    });
  }

  function handleInitValue(data) {
    const { baseMethodInfo = [], useFields = [] } = data;
    const useFieldList = useFields.map(item => {
      const { fieldDesc = {}, relatedFunction = {} } = item;
      return { ...item, ...relatedFunction, ...fieldDesc, key: fileIDGenerator.next() };
    });
    return {
      ...data,
      useFields: useFieldList,
      func: initFunc([baseMethodInfo], useFieldList),
    };
  }

  function initFunc(funList, useFieldList) {
    return funList.map(item => {
      const { methodItem = {}, children = [] } = item;
      const { values = [], tableAlias, field } = methodItem;
      const obj = _.find(useFieldList, { tableAlias, field }) || {};
      return {
        ...item,
        functionItem: obj.key && {
          ...methodItem,
          useField: obj.key,
          values: values.map(({ value }) => value),
        },
        key: fileIDGenerator.next(),
        children: children.length > 0 ? initFunc(children, useFieldList) : [],
      };
    });
  }

  function formatJudgeField(judgeFieldList) {
    return judgeFieldList.map(judgeField => {
      const {
        functionId,
        dataFormat,
        field,
        examples,
        name,
        tableName,
        type,
        tableAlias,
        relatedFunction: fieldDesc = {},
      } = judgeField;
      return {
        examples,
        field,
        fieldDesc: {
          dataFormat,
          relatedFunction: functionId && { functionId, ...fieldDesc },
          type,
        },
        name,
        tableAlias,
        tableName,
      };
    });
  }

  function formatFuncSetting(funcList) {
    return funcList.map(func => {
      const { functionItem = {}, children = [] } = func || {};
      const { functionId, values = [] } = functionItem;
      const fieldObj = _.find(useField, { key: functionItem.useField }) || {};
      const { field, tableAlias } = fieldObj;
      return {
        ...func,
        methodItem: functionId && {
          ...functionItem,
          tableAlias,
          field,
          values: values.map(val => ({ value: invalidValue(val) ? null : val })),
        },
        children: children.length > 0 ? formatFuncSetting(children) : [],
      };
    });
  }

  function back2list() {
    // 如果是其他地方跳转过来的,就直接返回
    const needBack = _.get(location, 'query.needBack', false);
    if (needBack) {
      router.goBack();
      return;
    }
    if (isCheck) {
      router.push('ruleManage');
      return;
    }
    const warning = confirmAble({
      confirmText: '警告',
      confirmContent: '现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到规则管理列表吗?',
      onClick: () => {
        router.push('ruleManage');
      },
    });
    warning();
  }

  return (
    <>
      {initValue ? (
        <div className={classNames(Styles.funcEditorWrapper, preMode && Styles.funcEditorPreMode)}>
          <Card
            bordered
            className={Styles.funcEditor}
            title={
              <span>
                <span>{getTitle(id, isCheck)}</span>
                <a
                  style={{ float: 'right' }}
                  onClick={() => router.push('ruleManage')}
                >
                  返回函数列表
                </a>
              </span>
            }
          >
            <Form
              onFieldsChange={() => {
                setUseField(formRef.getFieldValue('useFields') || []);
                setObjectType(formRef.getFieldValue('type') || appUserType.self);
                setTableType(formRef.getFieldValue('tableType'));
              }}
              form={formRef}
              onFinish={onValidateForm}
              initialValues={initValue}
            >
              <BasicInfoSettings
                isCheck={isCheck}
                formRef={formRef}
                isCustomFun={initValue.methodType === 2}
              />
              {initValue.methodType === functionMethodType.customFunction && (
                <JudgmentSetting
                  isCheck={isCheck}
                  useField={useField}
                  objectType={objectType}
                  tableType={tableType}
                  key={tableType + objectType}
                />
              )}
              <FormBtnGp
                style={{ bottom: '300px' }}
                onOk={onValidateForm}
                disabled={isCheck}
                onCancel={back2list}
              />
            </Form>
          </Card>
          {initValue.methodType === functionMethodType.customFunction && initValue.id && (
            <div className={Styles.preEditorWrapper}>
              <div
                className={Styles.preEditorHeader}
                onClick={() => {
                  setPreMode(!preMode);
                }}
              >
                函数效果预览 {preMode ? <DownOutlined /> : <UpOutlined />}
              </div>
              <div className={Styles.preEditorBody}>
                <div className={Styles.preEditorContent}>
                  <PreMode id={initValue.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default connect(({ ruleManage }) => ruleManage)(FuncEditor);
