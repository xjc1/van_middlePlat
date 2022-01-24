import React, { useState } from 'react';
import SliderStep from '@/pages/designStudios/widgetWrapperView/sliderStep';
import { Divider, Form, Input, Select, Slider } from 'antd';
import { TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/units';
import classNames from 'classnames';
import Style from '@/pages/designStudios/widgetWrapperView/index.less';
import Styles from '@/pages/designStudios/layoutPanel/index.less';
import { oneFormWrapperStatus } from '@/utils/constantEnum';
import { connect } from 'dva';

function UnitViewEdit({ field, col, id, displayName, extraClass = [], extraData = {}, dispatch }) {
  const UnitSetting = infoes[field].setting;

  const [update] = useState(() =>
    _.debounce(allValues => {
      dispatch({
        type: 'formDesigner/updateSelectedItem',
        payload: {
          id,
          ...allValues,
        },
      });
    }, 500),
  );

  return (
    <>
      <div>
        <h3>控件容器配置</h3>
        <Form
          layout="vertical"
          initialValues={{
            field,
            extraClass,
            displayName,
            colspan: SliderStep[col],
          }}
          onValuesChange={(changeValues, allValues) => {
            const { colspan, ...otherValues } = allValues;
            update({
              ...otherValues,
              col: SliderStep[colspan],
            });
          }}
        >
          <Divider orientation="left">基本参数</Divider>
          <Form.Item label="组件类型" name="field">
            <TSelect>
              {_.map(infoes, (v, k) => {
                return (
                  <Select.Option key={k} value={k}>
                    <i className={classNames(Style.selectIcon, Styles.wrapperIcon, v.iconfont)} />
                    {v.name}
                  </Select.Option>
                );
              })}
            </TSelect>
          </Form.Item>

          <Form.Item name="displayName" label="展示名称">
            <Input allowClear />
          </Form.Item>

          <Form.Item label="自定义class" name="extraClass">
            <TSelect open={false} mode="tags" placeholder="输入您的自定义的class,用于控制风格">
              {_.map(extraClass, cls => {
                return (
                  <TSelect.Option key={cls} value={cls}>
                    {cls}
                  </TSelect.Option>
                );
              })}
            </TSelect>
          </Form.Item>

          <Form.Item label="初始状态" name="initState">
            <TSelect allowClear={false}>
              {_.map(oneFormWrapperStatus, (key, value) => (
                <TSelect.Option key={key} value={key}>
                  {oneFormWrapperStatus.$names[value]}
                </TSelect.Option>
              ))}
            </TSelect>
          </Form.Item>

          <Form.Item label="栅栏布局" name="colspan">
            <Slider max={3} min={1} step={1} />
          </Form.Item>
        </Form>
      </div>
      <UnitSetting field={field} {...extraData} onUpdate={update} />
    </>
  );
}

export default connect()(UnitViewEdit);
