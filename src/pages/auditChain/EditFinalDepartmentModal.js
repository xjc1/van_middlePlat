import React, { PureComponent } from 'react';
import { FormRules, ModalForm, TItem } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import SelectDept from './components/SelectDept';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

class EditFinalDepartmentModal extends PureComponent {
  form = null;

  handleSubmit = () => {
    const { onOk = EmptyFn } = this.props;
    this.form.current.validateFields().then(vals => {
      const { depts = [] } = vals;
      onOk({
        chain: depts.map(({ value, order }) => ({ role: value, order })),
        ...vals,
      });
    });
  };

  render() {
    const { title, formData, onOk, ...others } = this.props;

    return (
      <ModalForm
        title={`审核链配置 - ${title}`}
        visible
        onForm={form => {
          this.form = form;
        }}
        initialValues={formData}
        onOk={() => this.handleSubmit()}
        {...others}
      >
        <TItem name="depts" label="部门" rules={[FormRules.required('必填')]} {...layout}>
          <SelectDept
            columns={[
              {
                title: '序号',
                dataIndex: 'order',
                width: '8%',
                align: 'center',
              },
              {
                title: '部门名称',
                dataIndex: 'label',
              },
            ]}
          />
        </TItem>
      </ModalForm>
    );
  }
}

export default EditFinalDepartmentModal;
