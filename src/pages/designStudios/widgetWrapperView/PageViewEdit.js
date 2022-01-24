import React, { useCallback } from 'react';
import { Divider, Form, Radio, Button, Space } from 'antd';
import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';
import PreEventsSetting from '@/pages/designStudios/preEventsSetting';
import { defaultSpan, verticalDefaultSpan } from '@/pages/designStudios/FormDesigner/widgets';
import { connect } from 'dva';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import { oneFormDisplayMode } from '@/utils/constantEnum';
import { TSelect } from '@/components/tis_ui';
import _ from 'lodash';

function PageViewEdit({ preEvents, layoutType = 'horizontal', extraClass = [], dispatch }) {
  console.log('-> extraClass', extraClass);
  const [pageFormRef] = Form.useForm();

  const onUpate = useCallback(
    vals => {
      if (vals.layoutType) {
        dispatch({
          type: 'formDesigner/updateAllItems',
          payload: {
            type: ElementType.WIDGET,
            data: {
              innerSpan:
                vals.layoutType === oneFormDisplayMode.vertical ? verticalDefaultSpan : defaultSpan,
            },
            rootData: {
              layoutType: vals.layoutType,
            },
          },
        });

        dispatch({
          type: 'formDesigner/updateRootItem',
          payload: {
            layoutType: vals.layoutType,
          },
        });
      }

      dispatch({
        type: 'formDesigner/updateRootItem',
        payload: {
          extraClass: vals.extraClass,
        },
      });
    },
    [pageFormRef],
  );

  const onSetOrder = useCallback(() => {
    dispatch({
      type: 'formDesigner/setOrder',
    });
  });

  const onCancelOrder = useCallback(() => {
    dispatch({
      type: 'formDesigner/unSetOrder',
    });
  });

  return (
    <div>
      <h3>表单配置</h3>
      <Form
        form={pageFormRef}
        onValuesChange={onUpate}
        initialValues={{
          layoutType,
          extraClass,
        }}
      >
        <Divider orientation="left">整体页面配置</Divider>
        <Form.Item name="layoutType" label="布局">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value={oneFormDisplayMode.horizontal}>
              {oneFormDisplayMode.$names.horizontal}
            </Radio.Button>
            <Radio.Button value={oneFormDisplayMode.vertical}>
              {oneFormDisplayMode.$names.vertical}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="序号">
          <Space>
            <Button type="link" onClick={onSetOrder} icon={<OrderedListOutlined />}>
              设置序号
            </Button>

            <Button type="link" onClick={onCancelOrder} icon={<UnorderedListOutlined />}>
              取消序号
            </Button>
          </Space>
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
      <Divider orientation="left">前置事件配置</Divider>
      <PreEventsSetting preEvents={preEvents} />
    </div>
  );
}

export default connect(({ formDesigner }) => {
  const {
    formData: { preEvents, layoutType },
  } = formDesigner;
  return {
    preEvents,
    layoutType,
  };
})(PageViewEdit);
