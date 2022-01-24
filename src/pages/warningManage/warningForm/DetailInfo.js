import { TItem, TButton } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Collapse } from 'antd';
import React, { useEffect } from 'react';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import ContentSelect from '@/pages/warningManage/warningForm/ContentSelect';
import { terminalType, messageConfigType } from '@/utils/constantEnum';
import MessageConfigSelect from '@/pages/messageConfig/MessageConfigSelect';

const { Panel } = Collapse;
const uuid = new IDGenerator('detailInfos');

function translateClientType(clientTypeList = []) {
  const result = clientTypeList.map(type => terminalType.$v_names[type]).join(';');
  return `终端类型-${result}`;
}

function DetailInfo({ isCheck, onChange, value = [], formRef }) {
  useEffect(() => {
    if (value.length === 0) {
      onChange([{ id: uuid.next() }]);
    }
  }, []);

  function genExtra(delId) {
    return (
      <>
        {value.length > 1 && (
          <TButton.Delete
            confirmText="警告"
            onClick={() => {
              onChange(value.filter(({ id }) => id !== delId));
            }}
            disabled={isCheck}
            confirmContent="确定要删除吗?"
          >
            删除终端
          </TButton.Delete>
        )}
      </>
    );
  }
  return (
    <div>
      <TButton.Create
        onClick={() => {
          onChange([...value, { id: uuid.next() }]);
        }}
        disabled={isCheck}
      >
        添加终端
      </TButton.Create>
      <Collapse style={{ width: '150%', margin: '20px auto' }}>
        {value.map(({ id, clientType, ...others }) => (
          <Panel forceRender header={translateClientType(clientType)} key={id} extra={genExtra(id)}>
            <TItem
              name={[id, 'clientType']}
              label="终端类型"
              rules={[{ required: true, message: '终端类型不能为空!' }]}
            >
              <DictSelect
                onChange={val => {
                  onChange(
                    value.map(item => {
                      const { id: key } = item;
                      if (key === id) {
                        return {
                          ...item,
                          clientType: val,
                        };
                      }
                      return item;
                    }),
                  );
                }}
                dict="ZDLX"
                dictType="tree"
                multiple
                disabled={isCheck}
              />
            </TItem>
            <TItem name={[id, 'style']} label="提醒样式">
              <MessageConfigSelect disabled={isCheck} type={messageConfigType.notice} />
            </TItem>
            <TItem name={[id, 'noteAbstract']} label="提醒摘要">
              <Input disabled={isCheck} />
            </TItem>
            <ContentSelect isCheck={isCheck} id={id} data={others} formRef={formRef} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
export default DetailInfo;
