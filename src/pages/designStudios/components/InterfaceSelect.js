import React, { useState } from 'react';
import { TSelect, TItem, FormRules } from '@/components/tis_ui';
import _ from 'lodash';
import Styles from './InterfaceSelect.less';
import { Form, Tag, Divider } from 'antd';
import { connect } from 'dva';
import InterfaceApiSelect from '@/pages/designStudios/components/InterfaceApiSelect';

function filedTip(type) {
  return `
   字段要求:
   1, 必须设置了中文描述.
   2, 类型必须为[${type}].
  `;
}

function InterfaceSelect({ apis = [], fields = [] }) {
  const [responseFileds, setResponseFields] = useState([]);

  function onSelectedField(val) {
    console.log('-> val', val);
  }

  return (
    <div className={Styles.interfaceSelect}>
      <Form.Item name="api" label="接口名称" rules={[FormRules.required('必填')]}>
        <InterfaceApiSelect apis={apis} onResponseFields={setResponseFields} />
      </Form.Item>
      {responseFileds && responseFileds.length > 0 && (
        <div>
          {_.map(fields, ({ name, label, type }) => {
            return (
              <Form.Item key={name} name={name} label={TItem.getLabel(label, filedTip(type))}>
                <TSelect
                  showSearch
                  className={Styles.fieldSelect}
                  placeholder="选择您的字段"
                  onChange={val => {
                    onSelectedField({ name, val });
                  }}
                >
                  {_.map(responseFileds, ({ description, pathKey, type: fieldType }) => {
                    const pathKeyChain = _.join(pathKey, '.');
                    return (
                      <TSelect.Option
                        disabled={fieldType !== type}
                        key={pathKeyChain}
                        value={pathKeyChain}
                        label={description}
                      >
                        <div>
                          <Tag className={Styles.fieldOption}>{description}</Tag>
                          {pathKeyChain}
                        </div>
                      </TSelect.Option>
                    );
                  })}
                </TSelect>
              </Form.Item>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default connect(({ interfaceManage }) => {
  return {
    apis: interfaceManage.apis,
  };
})(InterfaceSelect);
