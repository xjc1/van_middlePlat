import React, {useState} from 'react';
import { Card,List } from 'antd';
import _ from 'lodash'
import { TTable } from "@/components/tis_ui";
import { appUserType,recommendContent } from '@/utils/constantEnum';
import { v4 as uuid } from 'uuid';

function testResult({data}){
  const [key, setKey] = useState('满足的政策标签')
  const [type, setType] =useState('string')
  const tabList = []
  _.forEach(data,(v,k)=>{
    if(typeof v==='string'){
      tabList.push({ key: String(k), tab: String(k), type: 'string'})
    }else if(v instanceof Array){
      if(typeof v[0] === 'object'){
        tabList.push({ key:  String(k), tab:  String(k), type: 'ArrayObject'})
      }else{
        tabList.push({ key:  String(k), tab:  String(k), type: 'Array'})
      }
    }else if(typeof v === 'number'){
      tabList.push({ key:  String(k), tab:  String(k), type: 'int'})
    } else{
      tabList.push({ key: String(k), tab:  String(k), type: 'object'})
    }
  })

  const conditionColumn = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: '_id',
      render: (id,record)=> id?id:record.id
    }
  ];

  const resultColumn = [
    {
      title: '名称',
      dataIndex: 'description',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '对象类型',
      dataIndex: 'userObjectType',
      render:type=> appUserType.$v_names[type]
    },
    {
      title: '推荐类型',
      dataIndex: 'type',
      render:type=> recommendContent.$v_names[type]
    },
  ];

  const sceneColumn = [
    {
      title: '场景名称',
      dataIndex: 'name',
    },
    {
      title: '关联事项',
      dataIndex: 'value',
      render:text=>
        <List
          dataSource={text}
          pagination={{ pageSize: 6 }}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
    }
  ]

  function objectToArray(data) {
    return _.reduce(data,function (result,value,key){
      result.push({ name: key, value: value, id: uuid() });
      return result;
    },[])
  }

  return(
    <>
      <Card
        style={{ width: '100%', minHeight: '300px', marginBottom: '10px' }}
        title="测试结果"
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          setKey(key);
          setType(_.find(tabList,{key}).type)
        }}
      >
        {(type==='string' ||type==='int')  && data[key]}
        {type==='Array' &&
          <List
            dataSource={data[key]}
            pagination={{ pageSize: 5 }}
            renderItem={item => (
              <List.Item>
                 {item}
              </List.Item>
            )}
          />
        }
        {type==='ArrayObject' &&
          <TTable
            columns={key!=='去除包含的事项、场景排序后最终结果(每种类别取前100条,如果没有推荐内容，显示热门)'?conditionColumn:resultColumn}
            dataSource={data[key]}
            rowKey={text => text.id || text._id}
          />
        }
        {type==='object' &&
        <TTable
          columns={sceneColumn}
          dataSource={objectToArray(data[key])}
          rowKey={text => text.id || text._id}
        />
        }
      </Card>
    </>
  )
}
export default testResult
