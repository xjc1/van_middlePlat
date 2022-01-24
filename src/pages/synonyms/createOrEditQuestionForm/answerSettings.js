import { Input, Row } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { RichText, TItem } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents';

@connect(({ createQuestionForm }) => ({ ...createQuestionForm, ...createQuestionForm.step }))
class answerSettings extends PureComponent {
  render() {
    const { check } = this.props;
    return (
      <Fragment>
        <Row>
          <TItem name="answer" label="答案">
            <Input.TextArea rows={4} disabled={check} />
          </TItem>
          <TItem name="content" label="回复内容">
            <RichText readOnly={check} />
          </TItem>
          <TItem name="relationMatchScene" label="关联主题">
            <TSearchSelector type="scene" disabled={check} />
          </TItem>
          <TItem name="relationMatchMatters" label="关联事项">
            <TSearchSelector type="matter" disabled={check} />
          </TItem>
          <TItem name="relationMatchService" label="关联服务">
            <TSearchSelector type="convenience" disabled={check} />
          </TItem>
          <TItem name="relationMatchPolicy" label="关联政策">
            <TSearchSelector type="policyLibrary" disabled={check} />
          </TItem>
          <TItem name="relationMatchProject" label="关联项目">
            <TSearchSelector type="project" disabled={check} />
          </TItem>
        </Row>
      </Fragment>
    );
  }
}

export default answerSettings;
