import React, { PureComponent } from 'react';
import { EmptyFn, QueryBarCard, TButton, TItem } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 23 },
};

class FieldQueryBar extends PureComponent {
  queryForm = null;

  static defaultProps = {
    onSceneChange: EmptyFn,
  };

  constructor() {
    super();
    this.queryField = this.queryField.bind(this);
  }

  queryField() {
    this.queryForm.validateFields().then(({ sceneIds = {} }) => {
      const { value: sceneId } = sceneIds;
      const { onSceneChange } = this.props;
      onSceneChange(sceneId);
      /* if (sceneId) {
        onSceneChange(sceneId);
      } else {
        message.error('请先选择您要操作的主题');
      } */
    });
  }

  render() {
    const { onSceneChange, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={form => {
          this.queryForm = form;
        }}
        {...others}
      >
        <TItem col={20} name="sceneIds" {...layout}>
          <TSearchSelector mode={null} type="scene" placeholder="请选择编排字段所属主题" />
        </TItem>
        <TItem col={4}>
          <TButton.List onClick={this.queryField}>查询主题字段</TButton.List>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default FieldQueryBar;
