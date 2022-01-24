import {Input, List, Row, Button, Col} from "antd";
import React, {useState} from "react";
import { TItem } from '@/components/tis_ui';
import LineWrap from "../lineWrap";
import './style.less'
import {connect} from "dva";

function content(props) {
  const { formData= {}, dispatch} = props;
  const [data, setData] = useState(formData.contentLists || []);
  const [canAdd, setCanAdd] = useState(true);
  const [content, setContent] = useState('');

  function addInput(){
    data.push(content);
    setData([...data]);
    setContent('');
    setCanAdd(true);
    formData.contentLists = data;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  }

  function deleteText(item) {
    const newData = data.filter(record=>record!==item);
    setData([...newData]);
    formData.contentLists = newData;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  }

  return (
    <Row>
      <TItem
        name="contentTitle"
        label="内容标题"
        col={20}
      >
        <Input />
      </TItem>
      <TItem
        label="内容"
        col={20}
      >
        <Input
          onChange={(value)=>{setCanAdd(false); setContent(value.target.value)}}
          value={content}
        />
      </TItem>
      <Col span={4}>
        <Button title="添加内容" onClick={addInput} disabled={canAdd} > + </Button>
      </Col>
      <TItem
        name="contentLists"
        label="已添加内容列表"
        col={20}
      >
        <List
          dataSource={data}
          bordered
          pagination={{
            pageSize: 5,
          }}
          itemLayout="vertical"
          renderItem={item =>
            <List.Item
              id="content"
              extra={
                <a
                  onClick={() => deleteText(item)}
                >
                  删除
                </a>
            }>
              <LineWrap title={item} lineClampNum={1} />
            </List.Item>}
        />
      </TItem>
    </Row>
  );
}

export default connect(({ createMessageForm }) => ({ ...createMessageForm, ...createMessageForm.step })) (content)
