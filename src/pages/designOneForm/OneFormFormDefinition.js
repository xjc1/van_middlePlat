import React, { PureComponent } from 'react';
import Styles from '@/pages/designStudios/formDefinition/formDefinition.less';
import OneFormQueryBar from './OneFormQueryBar';
import Region from '@/layouts/goldenLayout/Region';
import FormDefinition from '@/pages/designStudios/formDefinition/formDefinition';
import { FormRules, TButton, TItem } from '@/components/tis_ui';
import { CORE, FORMS } from '@/services/api';
import { Input, message } from 'antd';
import { connect } from 'dva';
import NewFormModal from '@/pages/designStudios/formDefinition/NewFormModal';
import { oneFormType } from '@/utils/constantEnum';
import RegionsContext from '@/layouts/goldenLayout/RegionsContext';
import { TSearchSelector } from '@/components/bussinessComponents';

class OneFormFormDefinition extends PureComponent {
  queryForm = null;

  FORM_TYPE = oneFormType.oneForm;

  constructor() {
    super();
    this.createNewForm = this.createNewForm.bind(this);
    this.commitNewForm = this.commitNewForm.bind(this);
    this.commitNewFormWithCopy = this.commitNewFormWithCopy.bind(this);
    this.editForm = this.editForm.bind(this);
    this.deleteForm = this.deleteForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.openCopyModal = this.openCopyModal.bind(this);
  }

  state = {
    page: 0,
    size: 10,
    total: 0,
    formEditorData: null,
    copyFormData: null,
    dataSource: [],
    query: {},
  };

  componentDidMount() {
    this.fetchList({});
  }

  createNewForm() {
    this.setState({
      formEditorData: {},
    });
  }

  editForm(record) {
    this.setState({
      formEditorData: record,
    });
  }

  openCopyModal(record) {
    this.setState({
      copyFormData: record,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteForm({ id }) {
    console.log('-> id', id);
  }

  updateForm() {
    const { formEditorData } = this.state;
    this.formRef.validateFields().then(({ name, sceneId = {}, context }) => {
      const { value: sid } = sceneId;
      try {
        const contextObj = JSON.parse(context);
        FORMS.updateFormDefinitionUsingPOST({
          body: {
            id: formEditorData.id,
            schema: formEditorData.schema,
            script: formEditorData.script,
            businessId: sid,
            name,
            context: JSON.stringify(contextObj, null, 2),
            type: this.FORM_TYPE,
          },
        }).then(() => {
          const { query } = this.state;
          this.fetchList({ query });
          this.setState({
            formEditorData: null,
          });
        });
      } catch (e) {
        message.error('上下文json有语法错误');
      }
    });
  }

  commitNewForm() {
    this.formRef.validateFields().then(({ name, sceneId = {}, context }) => {
      const { value: sid } = sceneId;
      try {
        const contextObj = JSON.parse(context);
        CORE.createFormDefinitionUsingPOST({
          body: {
            name,
            context: JSON.stringify(contextObj, null, 2),
            type: this.FORM_TYPE,
            businessId: sid,
          },
        }).then(() => {
          const { query } = this.state;
          this.fetchList({ query });
          this.setState({
            formEditorData: null,
          });
        });
      } catch (e) {
        message.error('上下文json有语法错误');
      }
    });
  }

  commitNewFormWithCopy() {
    const {
      copyFormData: { id, ...lastFormData },
    } = this.state;
    this.formRef.validateFields().then(({ name, sceneId = {}, context }) => {
      const { value: sid } = sceneId;
      try {
        const contextObj = JSON.parse(context);
        CORE.createFormDefinitionUsingPOST({
          body: {
            ...lastFormData,
            name,
            context: JSON.stringify(contextObj, null, 2),
            type: this.FORM_TYPE,
            businessId: sid,
          },
        }).then(() => {
          const { query } = this.state;
          this.fetchList({ query });
          this.setState({
            copyFormData: null,
          });
        });
      } catch (e) {
        message.error('上下文json有语法错误');
      }
    });
  }

  openFormEditor(record) {
    const { dispatch } = this.props;
    dispatch({
      type: 'fieldStore/fetchList',
      sceneId: record.businessId,
    });
    dispatch({
      type: 'formDesigner/openDesign',
      detail: record,
    });
  }

  fetchList({ size = 10, page = 0, query = {} }) {
    CORE.getFormDefinitionsUsingGET({
      params: { size, page, type: this.FORM_TYPE, ...query },
    }).then(({ number, size: nextSize, totalElements, content }) => {
      this.setState({
        page: number,
        size: nextSize,
        total: totalElements,
        dataSource: content,
        query,
      });
    });
  }

  render() {
    const { dataSource, page, size, total, formEditorData, copyFormData } = this.state;
    const { isEditing, dispatch, ...others } = this.props;
    return (
      <Region {...others}>
        <RegionsContext.Consumer>
          {({ setActiveKey }) => (
            <div className={Styles.formDefinition}>
              <OneFormQueryBar
                onForm={form => {
                  this.queryForm = form;
                }}
                actions={
                  <>
                    <TButton.Create onClick={this.createNewForm}>新建主题表单</TButton.Create>
                  </>
                }
                footer={
                  <>
                    <TButton.Search
                      onClick={() => {
                        this.queryForm.validateFields().then(query => {
                          this.fetchList({ query });
                        });
                      }}
                    >
                      查询
                    </TButton.Search>
                    <TButton.Reset
                      onClick={() => {
                        this.fetchList({ page: 0 });
                      }}
                    >
                      重置
                    </TButton.Reset>
                  </>
                }
              />
              <FormDefinition
                isEditing={isEditing}
                onDesign={record => {
                  this.openFormEditor(record);
                  setActiveKey('formDesigner');
                }}
                onDelete={this.deleteForm}
                onEditor={this.editForm}
                onCopy={this.openCopyModal}
                className={Styles.questionnaire}
                dataSource={dataSource}
                pagination={{
                  total,
                  pageSize: size,
                  current: page,
                  onChange: nextPage => {
                    const { query } = this.state;
                    this.fetchList({ page: nextPage, query });
                  },
                }}
              />
            </div>
          )}
        </RegionsContext.Consumer>
        {formEditorData && (
          <NewFormModal
            onForm={formRef => {
              this.formRef = formRef;
            }}
            onOk={formEditorData.id ? this.updateForm : this.commitNewForm}
            onCancel={() => {
              this.setState({ formEditorData: null });
            }}
            title={formEditorData.id ? '编辑一表' : '创建一表'}
            formEditorData={formEditorData}
          >
            <TItem name="name" label="一表名称" rules={[FormRules.required('一表名称必填')]}>
              <Input allowClear />
            </TItem>

            <TItem name="sceneId" label="主题">
              <TSearchSelector
                mode={null}
                type="scene"
                rules={[FormRules.required('关联主题必须选择')]}
                placeholder="请选择此一表关联的主题"
              />
            </TItem>
          </NewFormModal>
        )}

        {copyFormData && (
          <NewFormModal
            onForm={formRef => {
              this.formRef = formRef;
            }}
            onOk={this.commitNewFormWithCopy}
            onCancel={() => {
              this.setState({ copyFormData: null });
            }}
            title="复制一表"
            formEditorData={copyFormData}
          >
            <TItem name="name" label="一表名称" rules={[FormRules.required('一表名称必填')]}>
              <Input allowClear />
            </TItem>

            <TItem name="sceneId" label="主题">
              <TSearchSelector
                disabled
                mode={null}
                type="scene"
                placeholder="请选择此一表关联的主题"
              />
            </TItem>
          </NewFormModal>
        )}
      </Region>
    );
  }
}

export default connect(({ formDesigner }) => {
  return {
    isEditing: !!formDesigner.formData,
  };
})(OneFormFormDefinition);
