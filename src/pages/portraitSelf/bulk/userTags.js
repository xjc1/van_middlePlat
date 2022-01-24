import React, { useState } from 'react';
import { FormCard, TItem } from '@/components/tis_ui';
import { Select, Switch, Skeleton } from 'antd';
import { appUserType } from '@/utils/constantEnum';
import AddUserTag from "@/pages/portraitSelf/bulk/addTags";

const defaultLeftLayout = {
  col: 8,
  wrapperCol: { span: 8 },
  labelCol: { span: 16 },
};

const defaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};


function userTags({ userTagValue, setUserTagValue, object }) {
  const [editTuningWord, setEditTuningWord] = useState(false);
  function renderItemByStatus(edit, child) {
    if (!edit) {
      return (
        <TItem {...defaultRightLayout}>
          <Skeleton.Input />
        </TItem>
      );
    }
    return child;
  }


  return (
   <div>
     <FormCard title="个人用户数据">

       <TItem label="操作类型" {...defaultLeftLayout} >
         <Switch
           checked={editTuningWord}
           onChange={checked => {
             setEditTuningWord(checked);
             if(!checked){
               setUserTagValue([])
             }
           }}
         />
       </TItem>
       {renderItemByStatus(
         editTuningWord,
         <TItem name="operateType" rules={[{ required: true, message: '操作类型必填!' }]} {...defaultRightLayout}>
           <Select allowClear>
             <Select.Option value='0'>添加</Select.Option>
             <Select.Option value='1'>删除</Select.Option>
           </Select>
         </TItem>,
       )}

       <TItem label="用户标签" {...defaultLeftLayout}>
         <Switch
           checked={editTuningWord}
           onChange={checked => {
             setEditTuningWord(checked);
             if(!checked){
               setUserTagValue([])
             }
           }}
         />
       </TItem>
       {renderItemByStatus(
         editTuningWord,
           <TItem {...defaultRightLayout}>
              <AddUserTag
                userTagValue={userTagValue}
                setUserTagValue={setUserTagValue}
                object={object}
              />
            </TItem>
       )}
       {/* TODO 联调 */}
     </FormCard>
   </div>
  );
}

export default (userTags);
