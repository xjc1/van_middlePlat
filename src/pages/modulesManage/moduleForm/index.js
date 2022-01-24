import React, { useEffect, useState } from 'react';
import { TabForm } from '@/components/tis_ui';
import { Button } from 'antd';
import router from '@/utils/tRouter';
import { connect } from 'dva';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import BaseInfo from './BaseInfo';
import SuggestInfo from './SuggestInfo';
import ContentList from './contentList';
import InterfaceConfig from './interfaceConfig';
import _ from 'lodash';
import { modulesContentType, modulesMixType } from '@/utils/constantEnum';

function transformContentList(val) {
  const { relatedContents = [], filtrateValues = [], key, ...otherVals } = val;
  const filtrateGroups = _.groupBy(filtrateValues, 'field');
  return {
    ...otherVals,
    filtrateValues: _.map(filtrateGroups, (items, k) => {
      return {
        field: k,
        value: _.map(items, ({ value }) => {
          return {
            id: value,
          };
        }),
      };
    }),
    relatedContents: _.map(relatedContents, ({ value }) => value),
  };
}

const field2Code = {
  [modulesContentType.SCENE]: 'scene',
  [modulesContentType.MATTER]: 'matter',
  [modulesContentType.POLICY]: 'policy',
  [modulesContentType.ARTICLE]: 'article',
  [modulesContentType.SERVICE]: 'service',
  [modulesContentType.POLICY_PROJECT]: 'policy_project',
};

function transformOutputList(
  { scene = [], matter = [], policy = [], article = [], service = [], policy_project = [] },
  needTranslateFieldsGroup = {},
) {
  return _.map(
    [
      { type: modulesContentType.SCENE, items: scene },
      { type: modulesContentType.MATTER, items: matter },
      { type: modulesContentType.POLICY, items: policy },
      { type: modulesContentType.ARTICLE, items: article },
      { type: modulesContentType.SERVICE, items: service },
      { type: modulesContentType.POLICY_PROJECT, items: policy_project },
    ],
    ({ type, items }) => {
      const needTranslateFieldNames = needTranslateFieldsGroup[type] || [];
      return {
        contentType: type,
        fields: _.map(items, str => {
          return {
            field: str,
            needTranslate: needTranslateFieldNames.includes(str),
          };
        }),
      };
    },
  );
}

function transformSpecialList({ contentType, list = [], ...others }) {
  return { ...others, contentType, itemId: list.map(({ value }) => value) };
}

function EditModule({
  dispatch,
  strategyObj,
  detail = {
    mixStrategy: { type: modulesMixType.CONTENT },
  },
  disabled = false,
}) {
  let formRef = null;
  const [isPageUp, setIsPageUp] = useState(!!detail.pageSize);

  const [initialValues] = useState(() => {
    const {
      limit = 300,
      pageSize = 10,
      clientType = [],
      code,
      contentList = [],
      contentType = [],
      outputFields = [],
      specialList = [],
      description,
      name,
      object,
      region,
      ...others
    } = detail;
    return {
      ...others,
      name,
      code,
      limit,
      pageSize,
      region,
      object,
      clientType,
      description,
      contentList,
      specialList,
      contentType,
      ..._.reduce(
        outputFields,
        (result, { contentType: fieldContentType, fields }) => {
          return {
            ...result,
            [field2Code[fieldContentType]]: _.map(fields, ({ field }) => field),
            needTranslateFieldGroups: {
              ...result.needTranslateFieldGroups,
              [fieldContentType]: fields
                .filter(({ needTranslate }) => needTranslate)
                .map(({ field }) => field),
            },
          };
        },
        {},
      ),
    };
  });

  useEffect(() => {
    dispatch({ type: 'modulesManage/fetchOutputFieldList' });
  }, []);

  const formatSubmitMixStrategy = mixStrategy => {
    const percentages = _.get(mixStrategy, 'percentages', []);
    // 全空就不传值
    const filterEmptyPercentages = _.filter(percentages, (item = {}) => {
      const { percent } = item;
      return !!percent;
    });

    const formatPercentage = percentages.map(({ percent, ...otherInfo }) => {
      return { ...otherInfo, percent: percent || 0 };
    });
    return {
      ...mixStrategy,
      percentages: filterEmptyPercentages.length ? formatPercentage : undefined,
    };
  };

  const handleSubmit = () => {
    formRef
      .validateFields()
      .then(vals => {
        const {
          contentList = [],
          specialList = [],
          topList = [],
          scene,
          matter,
          policy,
          article,
          service,
          policy_project,
          pageSize,
          needTranslateFieldGroups = {},
          mixStrategy = {},
          ...others
        } = vals;

        return {
          ...others,
          id: detail.id,
          mixStrategy: formatSubmitMixStrategy(mixStrategy),
          contentList: _.map(contentList, transformContentList),
          specialList: _.map(specialList, transformSpecialList),
          topList: _.map(topList, ({ id, contentType }) => ({ id, contentType })),
          outputFields: transformOutputList(
            {
              scene,
              matter,
              policy,
              article,
              service,
              policy_project,
            },
            needTranslateFieldGroups,
          ),
          pageSize: isPageUp ? pageSize : null,
        };
      })
      .then(data => {
        dispatch({
          type: detail.id ? 'modulesManage/updateModule' : 'modulesManage/addModule',
          payload: data,
        });
      });
  };

  return (
    <TabForm
      title={detail.id ? '编辑模块' : '新增模块'}
      onForm={form => {
        formRef = form;
      }}
      initialValues={initialValues}
      defaultTabKey="baseInfo"
      btnOption={
        !disabled && {
          okText: detail.id ? '保存模块信息' : '提交模块信息',
          okIcon: detail.id ? <SaveOutlined /> : <CheckOutlined />,
          onOk: handleSubmit,
        }
      }
      extra={
        <Button type="link" onClick={() => router.goBack()}>
          返回列表页
        </Button>
      }
    >
      <BaseInfo title="基本信息" tabKey="baseInfo" disabled={disabled} />
      <SuggestInfo
        strategyObj={strategyObj}
        title="推荐信息"
        tabKey="suggestInfo"
        disabled={disabled}
      />
      <ContentList title="内容清单" tabKey="content" disabled={disabled} />
      <InterfaceConfig
        title="接口配置"
        tabKey="interface"
        isPageUp={isPageUp}
        setIsPageUp={setIsPageUp}
        disabled={disabled}
        formRef={formRef}
      />
    </TabForm>
  );
}

export default connect(({ modulesManage }) => modulesManage)(EditModule);
export { field2Code };
