import React from 'react';
import { connect } from 'dva';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import WrapperViewEdit from './WrapperViewEdit';
import WidgetViewEdit from './WidgetViewEdit';
import UnitViewEdit from './UnitViewEdit';
import Style from '@/pages/designStudios/widgetWrapperView/index.less';
import PageViewEdit from '@/pages/designStudios/widgetWrapperView/PageViewEdit';

function Index({ selectedItem, formData }) {
  if (selectedItem) {
    const { type, id } = selectedItem;
    switch (type) {
      case ElementType.WRAPPER:
        return (
          <div className={Style.frEditPanel}>
            <WrapperViewEdit key={id} {...selectedItem} />
          </div>
        );
      case ElementType.WIDGET:
        return (
          <div className={Style.frEditPanel}>
            <WidgetViewEdit key={id} {...selectedItem} />
          </div>
        );

      case ElementType.UNIT:
        return (
          <div className={Style.frEditPanel}>
            <UnitViewEdit key={id} {...selectedItem} />
          </div>
        );
      default:
        return <div>无配置</div>;
    }
  } else {
    return (
      <div className={Style.frEditPanel}>
        {formData && (
          <PageViewEdit preEvents={formData.preEvents} extraClass={formData.extraClass} />
        )}
      </div>
    );
  }
}

export default connect(({ formDesigner }) => {
  return { selectedItem: formDesigner.selectedItem, formData: formDesigner.formData };
})(Index);
