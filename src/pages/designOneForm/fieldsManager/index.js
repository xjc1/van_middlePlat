import React, { PureComponent } from 'react';
import RegionsContext from '@/layouts/goldenLayout/RegionsContext';
import Styles from './index.less';
import FieldQueryBar from './FieldQueryBar';
import Region from '@/layouts/goldenLayout/Region';
import { connect } from 'dva';
import { Input, Form } from 'antd';
import { TItem } from '@/components/tis_ui';
import FieldList from '@/pages/designOneForm/fieldsManager/FieldList';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

class Index extends PureComponent {
  formRef = React.createRef();

  constructor() {
    super();
    this.onSceneChange = this.onSceneChange.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  // sceneId
  onSceneChange(sceneId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'fieldStore/fetchList',
      sceneId,
    });
  }

  onSelectItem(item) {
    const { dispatch } = this.props;
    dispatch({
      type: 'fieldStore/editItem',
      id: item.id,
    });
  }

  render() {
    const { dispatch, fields, list = [], selectedItem = {}, ...others } = this.props;
    return (
      <Region {...others}>
        <RegionsContext.Consumer>
          {() => (
            <div className={Styles.fieldQueryBar}>
              <FieldQueryBar onSceneChange={this.onSceneChange} />
              <Form ref={this.formRef} className={Styles.fieldFilter} layout="inline">
                <TItem col={6} label="ID" name="fieldId" {...layout}>
                  <Input allowClear />
                </TItem>
                <TItem col={6} label="字段名" name="fieldName" {...layout}>
                  <Input allowClear />
                </TItem>
                <TItem col={6} label="事项id" name="matterId" {...layout}>
                  <Input allowClear />
                </TItem>
              </Form>
              <div className={Styles.fieldList}>
                <FieldList
                  list={list}
                  onSelectItem={this.onSelectItem}
                  selectedId={selectedItem.id}
                />
              </div>
            </div>
          )}
        </RegionsContext.Consumer>
      </Region>
    );
  }
}

export default connect(({ fieldStore }) => {
  return {
    list: fieldStore.list,
    selectedItem: fieldStore.selectedItem ? fieldStore.selectedItem : undefined,
  };
})(Index);
