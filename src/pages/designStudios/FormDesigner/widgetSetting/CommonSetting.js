import React from 'react';
import { Divider, Form, Input, Select, Slider } from 'antd';
import SliderStep from '@/pages/designStudios/widgetWrapperView/sliderStep';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import classNames from 'classnames';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';
import { oneFormWidgetStatus } from '@/utils/constantEnum';
import SettingStyle from './widgetSetting.less';

function CommonSetting({
  field,
  label,
  col,
  name,
  displayName,
  defaultValue,
  staticData,
  placeholder,
  extraClass = [],
  initState = oneFormWidgetStatus.visible,
  onUpdate = EmptyFn,
}) {
  return (
    <>
      <h3>控件配置</h3>
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionCommon)}>
        <Divider orientation="left">显示配置</Divider>
        <Form
          layout="vertical"
          initialValues={{
            field,
            label,
            defaultValue,
            staticData,
            extraClass,
            placeholder,
            colspan: SliderStep[col],
            displayName,
            initState,
            name,
          }}
          onValuesChange={(changeValues, allValues) => {
            const { colspan, ...otherValues } = allValues;
            onUpdate({
              ...otherValues,
              col: SliderStep[colspan],
            });
          }}
        >
          <Form.Item label="控件类型" name="field">
            <TSelect allowClear={false}>
              {_.map(infoes, (v, k) => {
                return (
                  <Select.Option key={k} value={k}>
                    <i className={classNames(Styles.selectIcon, v.iconfont)} />
                    {v.name}
                  </Select.Option>
                );
              })}
            </TSelect>
          </Form.Item>

          <Form.Item label="展示名称" name="displayName">
            <Input allowClear />
          </Form.Item>

          <Form.Item label="控件标识" name="name">
            <Input allowClear />
          </Form.Item>

          <Form.Item label="占位提示" name="placeholder">
            <Input allowClear />
          </Form.Item>

          <Form.Item label="初始状态" name="initState">
            <TSelect allowClear={false}>
              {_.map(oneFormWidgetStatus, (key, value) => (
                <TSelect.Option key={key} value={key}>
                  {oneFormWidgetStatus.$names[value]}
                </TSelect.Option>
              ))}
            </TSelect>
          </Form.Item>

          <Form.Item label="栅栏布局" name="colspan">
            <Slider max={3} min={1} step={1} />
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
        </Form>
      </div>
    </>
  );
}

export default CommonSetting;
