import React from 'react';
import _ from 'lodash';
import { EmptyFn, TItem } from '@/components/tis_ui';
import { Select, Divider } from 'antd';
import { connect } from 'dva';
import OptionsFormListSetting from "../OptionsFormListSetting";
import Styles from "../optionsFormListSetting.less";

const { Option } = Select;

function SlotSetting({ name, slots = [], onOpenEdit = EmptyFn }) {
  return (
    <OptionsFormListSetting name={name}
                            title="槽位配置"
                            addBtnTitle="添加配置项"
                            endSlot={() => (<div className={Styles.optionSettingCard}>
                              当以上槽位均填充完成后，将继续进行后续的引导流程，如通过判断节指定返回答案等。
                            </div>)
                            }
    >
      {
        ({ fieldName, fieldKey, others }) => {
          return <>
            <TItem name={[fieldName, 'slotId']}
                   fieldKey={[fieldKey, 'slotId']}
                   label="选项"
                   {...others}
            >
              <Select width="100%"
                      dropdownRender={(menu) => {
                        return <div>
                          {menu}
                          <Divider style={{ margin: '4px 0' }} />
                          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <span>
                              如果没有可以
                            </span>
                            <a style={{ paddingLeft: 10 }} onClick={onOpenEdit}>添加槽位</a>
                          </div>
                        </div>;
                      }}>
                {
                  _.map(slots, ({ id, name: slotName }) => <Option key={id} value={id}>{slotName}</Option>)
                }
              </Select>
            </TItem>
          </>;
        }
      }
    </OptionsFormListSetting>
  );
}

export default connect(({ dialogStudios }) => {
  return {
    slots: dialogStudios.slots,
  };
})(SlotSetting);
