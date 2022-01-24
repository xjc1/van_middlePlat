import _ from 'lodash';
import { TItem, TButton } from '@/components/tis_ui';
import { Input, Collapse, Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import ContentSelect from './ContentSelect';
import { terminalType, warningFormat } from '@/utils/constantEnum';
import DictSelect from '../Dict/DictSelect';
import Styles from './index.less';

const { Panel } = Collapse;

function translateClientType(clientType) {
  const result = clientType.map(type => terminalType.$v_names[type]).join(';');
  return `终端类型-${result}`;
}

function ExtraBtn({ disabled, onRemove }) {
  return (
    <>
      <TButton.Delete
        confirmText="警告"
        onClick={() => {
          onRemove();
        }}
        disabled={disabled}
        confirmContent="确定要删除吗?"
      >
        删除终端
      </TButton.Delete>
    </>
  );
}

function initRelatedContent(items = []) {
  if (!items.length) {
    return undefined;
  }
  const [firstItem] = items;
  const relatedIds = _.map(items, ({ relatedId: customRelatedId }) => {
    return customRelatedId;
  });
  return {
    ...firstItem,
    relatedId: relatedIds,
  };
}

function transportRelatedContent({ relatedId = [], format, ...others }) {
  if (_.isUndefined(format)) {
    return [];
  }
  if (format !== warningFormat.default) {
    return [{ format, ...others }];
  }
  const nextRelatedId = _.isArray(relatedId) ? relatedId : [relatedId];
  return _.map(nextRelatedId, ({ value, label }) => {
    return {
      ...others,
      format,
      relatedId: value,
      name: label,
    };
  });
}

function initData(data) {
  const { msgPicture = {}, content = {}, ...others } = data;
  const { uploadPicture } = msgPicture;
  const {
    relatedArticle,
    relatedFile,
    relatedMatter,
    relatedMessage,
    relatedPolicy,
    relatedProject,
    relatedScene,
    relatedService,
    ...contentOthers
  } = content;
  return {
    ...others,
    msgPicture: {
      ...msgPicture,
      uploadPicture: uploadPicture && [uploadPicture.url, uploadPicture.name],
    },
    content: {
      ...contentOthers,
      relatedScene: relatedScene && initRelatedContent(relatedScene),
      relatedArticle: relatedArticle && initRelatedContent(relatedArticle),
      relatedMatter: relatedMatter && initRelatedContent(relatedMatter),
      relatedPolicy: relatedPolicy && initRelatedContent(relatedPolicy),
      relatedMessage: relatedMessage && initRelatedContent(relatedMessage),
      relatedProject: relatedProject && initRelatedContent(relatedProject),
      relatedService: relatedService && initRelatedContent(relatedService),
    },
  };
}

function transformData(data) {
  const { msgPicture = {}, content = {}, ...others } = data;
  const { uploadPicture } = msgPicture;
  const {
    relatedArticle,
    relatedFile,
    relatedMatter,
    relatedMessage,
    relatedPolicy,
    relatedProject,
    relatedScene,
    relatedService,
    ...contentOthers
  } = content;
  return {
    ...others,
    msgPicture: {
      ...msgPicture,
      uploadPicture: uploadPicture && {
        url: uploadPicture[0],
        name: uploadPicture[1],
      },
    },
    content: {
      ...contentOthers,
      relatedArticle: _.isEmpty(relatedArticle) ? [] : transportRelatedContent(relatedArticle),
      relatedMatter: _.isEmpty(relatedMatter) ? [] : transportRelatedContent(relatedMatter),
      relatedPolicy: _.isEmpty(relatedPolicy) ? [] : transportRelatedContent(relatedPolicy),
      relatedProject: _.isEmpty(relatedProject) ? [] : transportRelatedContent(relatedProject),
      relatedScene: _.isEmpty(relatedScene) ? [] : transportRelatedContent(relatedScene),
      relatedService: _.isEmpty(relatedService) ? [] : transportRelatedContent(relatedService),
      relatedMessage: _.isEmpty(relatedMessage) ? [] : transportRelatedContent(relatedMessage),
      relatedFile:
        relatedFile &&
        _.map(relatedFile, file => {
          const [url, name] = file;
          return {
            name,
            url,
          };
        }),
    },
  };
}

function MessgeTypeConfig({ disabled, name, value, label, layout = {}, filterType = [], formRef }) {
  return (
    <div className={Styles.messageTypeConfig}>
      <Form.List name={name} label={label}>
        {(fields, { add, remove }) => {
          return (
            <>
              <Collapse>
                {fields.map(field => {
                  const { key, ...others } = field;
                  const fieldData = value[key] || {};
                  const { clientType = [] } = fieldData;
                  return (
                    <Panel
                      forceRender
                      header={translateClientType(clientType)}
                      key={key}
                      extra={<ExtraBtn disabled={disabled} onRemove={() => remove(field.name)} />}
                    >
                      <TItem
                        {...others}
                        name={[field.name, 'clientType']}
                        fieldKey={[field.fieldKey, 'clientType']}
                        label="终端类型"
                        rules={[{ required: true, message: '终端类型不能为空!' }]}
                        {...layout}
                      >
                        <DictSelect dict="ZDLX" dictType="tree" multiple disabled={disabled} />
                      </TItem>
                      <TItem
                        {...others}
                        name={[field.name, 'msgAbstract']}
                        fieldKey={[field.fieldKey, 'msgAbstract']}
                        label="消息摘要"
                        {...layout}
                      >
                        <Input disabled={disabled} />
                      </TItem>
                      <ContentSelect
                        field={others}
                        disabled={disabled}
                        value={fieldData}
                        layout={layout}
                        onTypeChange={(type) => { 
                          formRef.setFields([{name: ['contents',key,'content'], value: {type}}]);
                        }}
                        filterType={filterType}
                      />
                    </Panel>
                  );
                })}
              </Collapse>
              <div className={Styles.messageTypeConfigFooter}>
                <TButton.Create
                  className={Styles.messageTypeConfigAddBtn}
                  onClick={() => {
                    add();
                  }}
                  disabled={disabled}
                >
                  添加终端
                </TButton.Create>
              </div>
            </>
          );
        }}
      </Form.List>
    </div>
  );
}

MessgeTypeConfig.propTypes = {
  name: PropTypes.string.isRequired,
};

MessgeTypeConfig.transformData = transformData;
MessgeTypeConfig.initData = initData;

export default MessgeTypeConfig;
