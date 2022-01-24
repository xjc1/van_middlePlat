import React, { useEffect, useState } from 'react';
import {Button, Col, Row, Table, Input, Select, message, Modal} from 'antd';
import _ from "lodash";
import {Form} from "antd/lib/form";
import { similarQuestionSimilarType, similarQuestionQuestionType } from '@/utils/constantEnum';
import { SIMILARQUESTION } from '@/services/api'
import EmptyFn from '@/utils/EmptyFn';

function SimilarQuestion({ handleCancel = EmptyFn, relatedId=null, type=null, reload = EmptyFn}) {

  const [questionType, setQuestionType] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const resp = await SIMILARQUESTION.findSimilarQuestionUsingPOST({body:{relatedId, relatedType: type}});
      if(resp.similarQuestion && resp.similarQuestion.length>0){
        setData(resp.similarQuestion)
      }
    }catch (e) {
      message.error("获取相似问数据失败")
    }

  }

  async function saveSimilarQuestion() {
    const body = {relatedId, relatedType:type, similarQuestion:data};
    try{
      await SIMILARQUESTION.saveSimilarQuestionUsingPOST({body});
      message.success("保存相似问数据成功");
      reload();
      handleCancel()
    }catch (e) {
      message.error("保存相似问数据失败")
    }

  }
  
  function addSimilarQuestion() {
    data.push({name,type:questionType});
    const newData = _.uniqBy(data, "name");
    if(data.length !== newData.length){
      message.info(`已经添加过【${name}】了，请不要重复添加`)
    }
    setData([...newData])
  }

  function changeQuestionType(value) {
    setQuestionType(value)
  }

  function changeName(value) {
    setName(value.target.value)
  }

  const canAdd = () => {
    if(name && name.value!== "" && questionType!==undefined && questionType !== ""){
      return false
    }
    return true
  };

  function deleteSimilar(record) {
    data.map((item,index)=>{
      if(item.name === record.name){
        data.splice(index,1)
      }
    });
    setData([...data])
  }
  

  return (
    <Modal
      title="相似问维护"
      visible
      onOk={saveSimilarQuestion}
      onCancel={handleCancel}
      width="600px"
    >
      <Row>
        <Col span={10}>
          <Input id="name" addonBefore="名称" onChange={changeName} />
        </Col>
        <Col span={10}>
          <Select allowClear style={{width:200}} placeholder="请选择类型" onChange={changeQuestionType}>
            {_.map(similarQuestionQuestionType, (key, value) => (
              <Select.Option key={key} value={key}>
                {similarQuestionQuestionType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Button onClick={addSimilarQuestion} disabled={canAdd()}>添加</Button>
        </Col>
        <Col span={24}>
          <Table
            dataSource={data}
            rowKey={item=>item.name}
            columns={[
              {
                title: '名称',
                dataIndex: 'name',
              },
              {
                title: '类型',
                dataIndex: 'type',
                render:text=>similarQuestionQuestionType.$v_names[text]
              },
              {
                title: '操作',
                dataIndex: 'operator',
                align: 'center',
                render: (text, record) => (
                  <a
                    onClick={() => {deleteSimilar(record)}}
                  >
                    删除
                  </a>
                ),
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <Select value={type} disabled={true} style={{width:"100%"}} placeholder="请选择相似类型">
            {_.map(similarQuestionSimilarType, (key, value) => (
              <Select.Option key={key} value={key}>
                {similarQuestionSimilarType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Modal>

  )
}
export default SimilarQuestion;

