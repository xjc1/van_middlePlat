import React, { useState } from 'react';
import { Form, Input, Slider, Select, Divider, Space, Button } from 'antd';
import { TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/wrappers';
import Style from './index.less';
import classNames from 'classnames';
import { connect } from 'dva';
import SliderStep from './sliderStep';
import Styles from '@/pages/designStudios/layoutPanel/index.less';
import LinkSetting from '../linkSetting';
import { oneFormWrapperStatus } from '@/utils/constantEnum';

function WrapperViewEdit({ dispatch, ...others }) {
  const {
    field,
    title,
    col,
    id,
    extraClass = [],
    links,
    initState = oneFormWrapperStatus.visible,
  } = others;
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

  const [changeCol] = useState(() =>
    _.debounce(nextCol => {
      dispatch({
        type: 'formDesigner/updateSelectedItemChildren',
        payload: {
          id,
          col: SliderStep[nextCol],
        },
      });
    }, 500),
  );

  return (
    <div>
      <h3>控件容器配置</h3>
      <Form
        layout="vertical"
        initialValues={{
          field,
          title,
          extraClass,
          colspan: SliderStep[col],
          initState,
        }}
        onValuesChange={(changeValues, allValues) => {
          const { colspan, innerColspan, ...otherValues } = allValues;
          update({
            ...otherValues,
            col: SliderStep[colspan],
          });
        }}
      >
        <Divider orientation="left">基本参数</Divider>
        <Form.Item label="容器类型" name="field">
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

        <Form.Item label="标题" name="title">
          <Input />
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
      <LinkSetting formId={id} links={links} />
      <span id="quick" />
      <Divider orientation="left">快捷操作</Divider>
      <Form layout="vertical">
        <Form.Item label="子元素排版" name="innerColspan">
          <Space>
            <Button type="link" onClick={() => changeCol(3)}>
              1栏布局
            </Button>
            <Button type="link" onClick={() => changeCol(2)}>
              2栏布局
            </Button>
            <Button type="link" onClick={() => changeCol(1)}>
              3栏布局
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect()(WrapperViewEdit);
