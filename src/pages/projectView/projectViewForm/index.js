import {useEffect, useState} from "react";
import { PROJECTOVERVIEWS,POLICY } from '@/services/api';
import {Card, message, Spin} from 'antd'
import React from "react";
import { utils } from '@/components/tis_ui';
import CreateProjectView from './createProjectView'
const {IDGenerator} = utils;
const deptIDGenerator = new IDGenerator("dept");

function index(props) {
  const {
    match: {
      params: { id },
      path="",
    },
  } = props;

  const [formData, setFormData] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [title, setTitle] = useState('新增项目一览');

  useEffect(() => {
    if (id) {
      if(path.indexOf("view") > -1){
        setIsCheck(true);
        setTitle("查看项目一览")
      }else{
        setIsCheck(false);
        setTitle("编辑项目一览")
      }
      getDetail(id);
    }else{
      setFormData({});
    }
  }, []);

  async function getDetail(recordId) {
    try {
      const data = await PROJECTOVERVIEWS.findAllProjectOverviewUsingGET(recordId);
      if(data.relatedPolicies){
        const policy = await POLICY.getPolicyByIdsUsingPOST({
          body: data.relatedPolicies.map(({id})=>id),
        });
        policy.forEach(item=>{item.label = item.name; item.key=item.id});
        data.policyDetail = policy
      }
      if(data.departments && data.departments.length>0){
        data.departments = data.departments.map(({deptName,address,contacts})=>{
          if (contacts && contacts.length>0){
            contacts.forEach(item => {
              item.key = deptIDGenerator.next()
            })
          }
          return { deptName, address, contacts, key:deptIDGenerator.next()}
        })
      }
      setFormData(data)
    }catch (e) {
      message.error("获取详情失败，失败原因：" + e.msg)
    }


  }
  return(
    <>
      { formData ? (<CreateProjectView formData={formData} isCheck={isCheck} title={title} />)
        :(<Card style={{ width: '100%', height: '100%' }} ><Spin /></Card>)
      }
    </>
  )

}

export default index
