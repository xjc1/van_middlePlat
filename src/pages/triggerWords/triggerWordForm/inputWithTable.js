import React, {useState} from "react";
import { TItem } from '@/components/tis_ui';
import { Input,Row,Table, Button, message, Form } from "antd"
import EmptyFn from '@/utils/EmptyFn';
import _ from "lodash"

function index({value=[], onChange=EmptyFn, isCheck }) {
  const [inputValue,setInputValue] = useState(null);
  return(
    <div>
      <Row>
        <TItem col={22}  wrapperCol={22}>
          <Input
            id="name"
            value={inputValue}
            onChange={(content)=>setInputValue(content.target.value)}
            disabled={isCheck}
          />
        </TItem>
        <TItem col={2} >
          <Button  disabled={isCheck} onClick={()=>{
            if(inputValue){
              const isExist = _.find(value,{name:inputValue});
              if(isExist){
                message.info(`您已经添加过【${inputValue}】,请不要重复添加`)
              }else{
                onChange([...value,{name:inputValue}]);
              }
              setInputValue("")
            }else{
              message.info("请先输入要添加的内容")
            }
          }}>
            添加
          </Button>
        </TItem>
        <TItem wrapperCol={24}>
          <Table
            columns={[{
              title: '名称',
              dataIndex: 'name',
            },{
              title: '操作',
              dataIndex: 'id',
              render:(text,record)=><a
                onClick={()=> {
                  onChange(value.filter(({name})=>name!==record.name))
                }}
                disabled={isCheck}
              >删除</a>
            }]}
            pagination={{defaultPageSize:5}}
            dataSource={value}
            rowKey="name"
          />
        </TItem>
      </Row>
    </div>
  )
}

export default index
