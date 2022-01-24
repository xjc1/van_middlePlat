import { Input, Button, Col, Row, Card } from 'antd';
import React from 'react';
import { TItem } from '@/components/tis_ui';
import { DictSelect, EmoticonSelector } from '@/components/bussinessComponents';
import { connect } from 'dva';
import _ from 'lodash';

const bodyStyle = {
  position: 'absolute',
  top: '65px',
  bottom: '0px',
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
};

function QuestionsBlock(props) {
  const { formData = {}, check = false, dispatch } = props;
  const { question = [] } = formData;

  function addQuestion() {
    dispatch({
      type: 'chatLibrary/addQuestion',
    });
  }

  function deleteQuestion(deleteKey) {
    dispatch({
      type: 'chatLibrary/deleteQuestion',
      deleteKey,
    });
  }
  return (
    <>
      <Card
        title="问题配置"
        extra={
          <Button disabled={check} onClick={addQuestion} type="primary">
            添加问题
          </Button>
        }
        bodyStyle={bodyStyle}
        style={{ height: '100%' }}
      >
        <TItem
          col={22}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="attributionDepartment"
          label="归属部门"
        >
          <DictSelect
            dict="SHGSBMSH"
            dictType="tree"
            multiple
            showSearch
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem
          col={22}
          name="clientType"
          label="终端类型"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <DictSelect dict="ZDLX" dictType="tree" multiple disabled={check} />
        </TItem>
        <TItem
          col={22}
          name="category"
          label="分类"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input disabled={check} />
        </TItem>
        <TItem
          name="questionExpression"
          label="表情"
          col={22}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <EmoticonSelector col={3} />
        </TItem>
        {question.map(({ key }) => (
          <Row key={key}>
            <TItem
              col={22}
              label="问题"
              key={key}
              name={['question', key]}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Input disabled={check} />
            </TItem>
            <Col span={1}>
              {question.length > 1 && (
                <Button disabled={check} type="link" onClick={() => deleteQuestion(key)} danger>
                  删除
                </Button>
              )}
            </Col>
          </Row>
        ))}
      </Card>
    </>
  );
}

export default connect(({ chatLibrary, user }) => ({
  ...chatLibrary,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))(QuestionsBlock);
