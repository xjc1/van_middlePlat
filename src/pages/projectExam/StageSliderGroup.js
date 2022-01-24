import React, { useEffect } from 'react';
import _ from 'lodash';
import { TItem } from '@/components/tis_ui';
import { Input, Slider, Col, Divider, Button, Form, Row, InputNumber, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

function StageSliderGroup({ title, childTitle, stageHelper, onStageChange }) {
  const [stageForm] = Form.useForm();

  const [score, scoreStage] = stageHelper.val();

  useEffect(() => {
    _.forEach(scoreStage, stage => {
      stageForm.setFieldsValue({
        [`state_q_${stage.index}`]: [stage.stageMin, stage.num],
      });
    });
  }, [stageHelper]);

  return (
    <Form form={stageForm}>
      <TItem
        col="12"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="score"
        initialValue={stageHelper.score}
        label="整体分值"
      >
        <InputNumber
          min={1}
          onBlur={() => {
            const inputScore = stageForm.getFieldValue('score');
            if (inputScore === score) return;
            Modal.confirm({
              title: '修改整体分值,需要重新设置分值规则,确认要修改吗?',
              onOk: () => {
                onStageChange(stageHelper.setScore(inputScore).val());
              },
              onCancel: () => {
                stageForm.setFieldsValue({ score });
              },
            });
          }}
        />
      </TItem>
      <Divider orientation="left">{title}</Divider>
      {_.map(scoreStage, (stage, index) => {
        const marks = {
          0: stage.min,
          [stage.stageMin]: stage.stageMin,
          [stage.num]: stage.num,
        };
        const sidlerItemKey = `state_q_${stage.index}`;
        const nameItemKey = `stage_n_${stage.index}`;
        return (
          <Row key={`stage_${stage.index}`} className="ant-row">
            <TItem
              col="16"
              initialValue={[stage.stageMin, stage.num]}
              name={sidlerItemKey}
              label={`第${stage.index}阶段`}
              style={{ padding: '15px 0px' }}
            >
              <Slider
                range
                marks={marks}
                min={stage.min}
                max={stage.max}
                onAfterChange={num => {
                  const [start, end] = num;
                  if (start !== stage.stageMin && stage.index > 1) {
                    onStageChange(stageHelper.changeStageStart(index, start).val());
                  } else if (end < stage.max) {
                    onStageChange(stageHelper.changeStage(index, end).val());
                  } else {
                    onStageChange(stageHelper.val());
                  }
                }}
              />
            </TItem>
            <TItem
              col="6"
              initialValue={stage.name}
              name={nameItemKey}
              label={childTitle}
              style={{ padding: '15px 0px' }}
            >
              <Input
                onChange={() => {
                  onStageChange(
                    stageHelper.setStageName(index, stageForm.getFieldValue(nameItemKey)).val(),
                  );
                }}
              />
            </TItem>
            <Col span={2} style={{ padding: '15px 0px', textAlign: 'center' }}>
              {index > 0 && index === scoreStage.length - 1 && (
                <TItem style={{ marginBottom: 0 }}>
                  <Button
                    size="small"
                    type="danger"
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      onStageChange(stageHelper.deleteStage(index).val());
                    }}
                  />
                </TItem>
              )}
            </Col>
          </Row>
        );
      })}
    </Form>
  );
}

export default StageSliderGroup;
