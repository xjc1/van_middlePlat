
/* eslint-disable  no-unused-expressions, no-underscore-dangle, no-func-assign */

// 本文件由代码生成，勿直接修改
import { notification } from "antd";
import Request, { codeMessage } from '@/utils/request';
import { EventCenter } from '@/components/tis_ui';
import _ from 'lodash';
const { BASE_URL = '' } = process.env;

function fail({ msg, status }) {
  notification.error({
    message: `请求错误 ${status}`,
    description: msg,
  });
  if (status === 401) {
    EventCenter.emit('401');
  }
};

window.addEventListener('unhandledrejection', event => {
    if(event instanceof  PromiseRejectionEvent){
        event.reason && event.reason._TYPE_ === 'apiError' && fail(event.reason)
    }
});

function mapClientType2String(clientType) {
  return Array.isArray(clientType) ? clientType.map(String) : String(clientType);
}

function formatResponse(response) {
  if (_.isNil(response)) return response;
  if (typeof response === 'object' && !Array.isArray(response)) {
    // 处理列表中终端类型的转换
    if (_.has(response, 'content[0].clientType')) {
      const { content } = response;
      return {
        ...response,
        content: content.map(it => {
          const { clientType = [] } = it;
          return {
            ...it,
            clientType: mapClientType2String(clientType),
          };
        }),
      };
    }
    // 处理详情中终端类型的转换
    if (_.has(response, 'clientType')) {
      const { clientType } = response;
      return { ...response, clientType: mapClientType2String(clientType) };
    }
  }
  return response;
}

let options = {
  preUrl: `${BASE_URL}/uesop/api`,
  endPoint: '',
  send(url, options2, resolve, reject) {
    Request(url, options2)
      .then(res => {
        if (res.state === 1) {
          resolve(formatResponse(res.data));
        } else if (res.state === 0) {
          reject({
            _TYPE_: 'apiError',
            status: res.code,
            msg: res.msg,
          })
        } else {
          res.json().then(resJson => {
            const {
              data: { status, message },
            } = resJson;
            reject({
              _TYPE_: 'apiError',
              status,
              msg: message,
            });
          });
        }
      }).catch(error => {
        const { response: resp } = error;
      if (resp && resp.status && resp.status in codeMessage) {
        reject({
          _TYPE_: 'apiError',
          status: codeMessage[resp.status],
          msg: resp.statusText,
          data:resp,
        });
      } else {
        resp.json().then(respJson => {
          reject({
            _TYPE_: 'apiError',
            status: respJson.status,
            msg: respJson.message,
            data:respJson,
          });
        });
      }
    });
  },
};


function setting({fail: resetFail, ...nextOptions}) {
    options = {...options, ...nextOptions};
    fail = resetFail || fail;
}


export default setting;
export { fail };




const  CORE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // department , location , page , region , size , sort
    getAddressListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/address`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addAddressUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/address`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateAddressUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/address`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // desc , method , mock , name , page , queryParams[0].desc , queryParams[0].example , queryParams[0].name , queryParams[0].required , queryParams[0].type , queryPath.params[0].name , queryPath.params[0].value , queryPath.path , reqBodySchema , reqBodyType , reqHeaders[0].desc , reqHeaders[0].name , reqHeaders[0].required , reqHeaders[0].value , resBodySchema , resBodyType , size , sort , url
    getApiResourcesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/apiResources`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createApiResourceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/apiResources`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // matterId
    listApprovalResultUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/approvalResults`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addApprovalResultUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/approvalResults`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    findDeptExportRecordUsingGET({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/asyncExportRecord`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort , typeCode , word
    getBannedWordListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addBannedWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // typeCode
    getBannedWordReplyByCodeUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWordReply`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // attributionDepartment , clientType , objectType , page , size , sort
    findAllCommonQuestionUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/commonQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createCommonQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/commonQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort , syncType
    listDataSyncRecordUsingGET({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dataSyncRecords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    debugMethodUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/debugMethod`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // type
    debugRuleUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/debugRule`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // deptName , page , size , sort
    findAllDictAuthUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dictAuth`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createDictAuthUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dictAuth`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // userInfo
    dockingUserUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dockingUsers`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // name , page , required , size , sort , type
    queryExamQuestionUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createExamQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateExamQuestionUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createExpressionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // sceneId , type
    getFieldsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/fields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    saveFieldUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/fields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // matterId
    listFormCheckPointUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/formCheckPoint`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // businessId , context , eventDef , name , page , schema , script , size , sort , type
    getFormDefinitionsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/forms`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createFormDefinitionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/forms`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , departmentName , number , page , regions , size , sort , status , updateDept
    listHotlinesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    saveHotlineUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // method , name , page , size , sort , url
    getApiInterfacesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/interfaces`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , size , sort , 接口名称 , 接口编号
    listKnowledgeStoreInterfaceUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/knowledgeStoreInterfaces`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addKnowledgeStoreInterfaceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/knowledgeStoreInterfaces`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // department , materialId , materialName , matterId , matterType , name , object , regions , sceneId , sourceDesc
    queryMaterialAtlasUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/materialAtlas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // matterId , matterType , name , object , regions , sceneId
    queryMatterAtlasUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterAtlas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // matterId , page , size , sort
    getMatterFormListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createMatterFormUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , guideTopic , page , regions , size , sort , status , updateDept
    listMatterHandleGuidesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    saveMatterHandleGuideUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // cname , status , tableType , type
    findAllMethodSchemaUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addCustomMethodSchemaUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // isLinkSource , isLinkTag , name , objectType , page , size , sort
    getMinimalConditionListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalConditions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // code , contentType , name , object , page , size , sort
    getModuleListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addModuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // attributionDepartment , clientType , name , object , page , regions , size , sort , sourceType , status
    findAllMultiRoundSessionUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // name , page , size , sort , type
    findAllPageMenuUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createPageMenuUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createPolicyNodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , page , regions , size , sort , status , topic , updateDept
    listPolicyInterpretationsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    savePolicyInterpretationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // object
    getPortraitTagNumStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // objectType , page , size , sort
    getPortraitTagSyncConfigsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagSyncConfigs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // attributionDepartment , clientType , conflictWord , content , department , description , id , keyWord , objectType , page , regions , size , sort , status , tourist , type , wordLimit
    getPreciseQuestionsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/preciseQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createPreciseQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/preciseQuestions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createProjectOverviewUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateProjectOverviewUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createPullMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addPushingMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // expiryDate , msgType , page , size , sort , startDate , status , title
    getPushingMessageListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessages`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // clientType , dataType , department , page , sceneCode , sceneName , sceneType , size , sort
    findPageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name
    listStandardFieldClassificationUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFieldClassifications`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addStandardFieldClassificationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFieldClassifications`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // classification , code , name , objectType , page , size , sort
    listStandardFieldUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addStandardFieldUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // administrativeLevel , code , issuingDepartment , name , objectType , page , parentCode , size , sort , source , status , type
    listStandardMaterialUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addStandardMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    statUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // contentType , name , objectType , type
    findSuggestStrategyUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/suggestStrategies`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // code , name , object , page , size , sort
    getTagOutputsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addTagOutputUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addNewTagThemeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagTheme`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTagThemesUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagThemes`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // name , page , prompt , rule , size , sort , type
    getValidationRulesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/validations`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createValidationRuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/validations`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // syncType
    listViewSyncUsingGET({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/viewSyncs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // id , page , size , sort , type , word
    findAllTagStoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createTagStoreUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addWorkOrderUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // department , materialName , name , regions , sourceDesc
    queryZeroMaterialMattersUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/zeroMaterialMatters`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {CORE};



const  ADDRESS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getAddressDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/address/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteAddressUsingDELETE(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/address/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {ADDRESS};



const  APIRESOURCES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getDocumentUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/apiResources/api-docs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteApiResourcesUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/apiResources/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateApiResourceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/apiResources/edit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {APIRESOURCES};



const  APPLYCONDITION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportApplyConditionUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyCondition/exportExcel/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // matterId
    importApplyConditionUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyCondition/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getApplyConditionListUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyCondition/list/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportApplyConditionTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyCondition/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateOrAddApplyConditionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyCondition/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {APPLYCONDITION};



const  APPLYMATERIAL =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportApplyMaterialUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyMaterial/exportExcel/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // matterId
    importApplyMaterialUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyMaterial/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getApplyMaterialListUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyMaterial/list/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportApplyMaterialTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyMaterial/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateOrAddApplyMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/applyMaterial/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {APPLYMATERIAL};



const  APPROVALRESULTS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // matterId , originalName
    copyToApprovalResultUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/approvalResults/copy`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    deleteApprovalResultUsingPOST(id,matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/approvalResults/delete/${matterId}/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateApprovalResultUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/approvalResults/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {APPROVALRESULTS};



const  ARTICLE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addArticleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/addNew`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportArticleUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportArticleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getArticlelistUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getArticleDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importArticleUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportSynonymTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishArticleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteArticleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateArticleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateArticleBatchUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/updateBatch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawArticleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/article/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {ARTICLE};



const  ATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    countApprovalUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/approvalCount`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // department
    getDataAtlasDetailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/dataAtlas/detail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getDataAtlasUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/dataAtlasLit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    materialFromCountByMonthUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/materialReductionByMonth`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getSceneListUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/oneThingsAtlas/getSceneList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getReductionMaterialListUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/reductionMateriaList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    countMaterialsReductionUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/reductionMaterialsCount`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getRightsMapByDepartmentUsingGET(department,regions) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/rightsMapOfDepartment/${regions}/${department}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getRightsMapByRegionsUsingGET(regions) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/rightsMapOfRegions/${regions}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    countMaterialsTotalUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlas/totalMaterialsCount`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {ATLAS};



const  ATLASEXPORT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportOneThingsAtlasUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlasExport/oneThingsAtlas`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportOverviewUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlasExport/overview`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportReductionDetailUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlasExport/reductionDetail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportRightsMapUsingGET(regions) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlasExport/rightsMap/${regions}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportTotalReductionUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/atlasExport/totalReduction`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {ATLASEXPORT};



const  AUTH =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getUserInfoUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/auth/info`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    loginWithPasswordNotEncodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/auth/login`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8'
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    loginWithPasswordIsEncodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/auth/loginwithencode`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8'
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    logoutUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/auth/logout`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {AUTH};



const  BANNEDWORD =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportBannedWordUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteBannedWordUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // typeCode , word
    exportBannedWordUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/getTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importBannedWordUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateBannedWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getBannedWordUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWord/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {BANNEDWORD};



const  BANNEDWORDREPLY =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    updateBannedWordReplyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/bannedWordReply/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {BANNEDWORDREPLY};



const  BASEINFO =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addSceneBaseInfoDetailUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteSceneBaseInfoDetailUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getSceneBaseInfoListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishSceneBaseInfoUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateSceneBaseInfoDetailUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawSceneBaseInfoUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getOneSceneBaseInfoUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/baseInfo/int/scene/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {BASEINFO};



const  CERTDIRATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // department , regions
    queryIssueCertDirUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/certDirAtlas/issue`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // department , regions
    queryIssueCertDirDetailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/certDirAtlas/issue/detail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // department , regions
    queryNeedCertDirUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/certDirAtlas/need`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // department , regions
    queryNeedCertDirDetailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/certDirAtlas/need/detail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {CERTDIRATLAS};



const  CHAT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportChatLibraryUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addChatUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteChatUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportChatExcelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportChatExcelTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/exportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllChatUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateChatUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/findOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importChatExcelUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishChatUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateChatUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawChatUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/chat/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {CHAT};



const  COMMONQUESTIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteCommonQuestionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/commonQuestions/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateCommonQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/commonQuestions/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {COMMONQUESTIONS};



const  CONDITION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    createConditionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/condition/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteConditionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/condition/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllConditionUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/condition/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateConditionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/condition/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findConditionInfoByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/condition/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {CONDITION};



const  CONTENT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // dataExtId , id
    getApplyUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/applies`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addApplyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/applies`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateApplyUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/applies`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteApplyUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/applies/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , matterExtId , matterId
    getApprovalResultUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/approvalResults`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addApprovalResultUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/approvalResults`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateApprovalResultUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/approvalResults`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // dataExtId , keyType
    deleteApprovalResultUsingDELETE(matterId,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/approvalResults/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getArticleStoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/articles`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addArticleStoreUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/articles`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateArticleStoreUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/articles`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteArticleStoreUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/articles/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getCertDirUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/certDirs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addCertDirUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/certDirs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateCertDirUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/certDirs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteCertDirUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/certDirs/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getMaterialUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/materials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/materials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMaterialUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/materials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteMaterialUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/materials/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getMatterUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/matters`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/matters`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMatterUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/matters`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteMatterUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/matters/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getPolicyLibraryStoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyLibraries`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addPolicyLibraryStoreUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyLibraries`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyLibraryStoreUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyLibraries`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deletePolicyLibraryStoreUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyLibraries/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getPolicyWordsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyWords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addPolicyWordsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyWords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyWordsUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyWords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deletePolicyWordsUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/policyWords/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , code , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , id , lastPasswordResetDate , name , page , password , permissions , phone , size , sort , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    queryPortraitTagUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/portraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    addPortraitTagUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/portraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    updatePortraitTagUsingPUT({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/portraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    deletePortraitTagUsingDELETE({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/portraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getDeclareProjectUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/projects`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addDeclareProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/projects`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateDeclareProjectUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/projects`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteDeclareProjectUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/projects/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getSynonymUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/qa`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/qa`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/qa`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteSynonymUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/qa/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // dataExtId , id
    getConvenienceServiceUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/services`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addConvenienceServiceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/services`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateConvenienceServiceUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/services`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // keyType
    deleteConvenienceServiceUsingDELETE(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/content/services/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {CONTENT};



const  CONVENIENCE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addConvenienceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/addOne`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportConvenienceServiceUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    convenienceBatchOperateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/batch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportConvenienceTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportConvenienceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getConveniencesByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/getConveniencesByIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getConvenienceListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getConvenienceServiceListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getConvenienceDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importConvenienceUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    serviceMarkExportUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/markExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/portraitTagImport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/portraitTagImportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishConvenienceUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteConvenienceUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateConvenienceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawConvenienceUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/convenience/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {CONVENIENCE};



const  DECLAREPROJECT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportProjectUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getConditionTagsUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/conditionTagsRefresh/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteProjectUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    examinationProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/exam`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/excel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportExaminationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/exportExamination`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getDeclareProjectListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllProjectsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishProjectUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // regions
    syncProjectUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/sync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawProjectUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getProjectDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/declareProject/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {DECLAREPROJECT};



const  DICT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    findAllChildDictByCodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/allChild/code`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportDictionariesUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name , type
    changeStoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/check/change`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getErrorInfoUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/check/errorInfo`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getErrorDictUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/check/errorRootDict`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    setStructureUsingPUT() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/check/newStruct`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    validateDictUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/check/validated`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // oldRepository
    createDictionaryUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // oldRepository
    deleteDictionaryUsingPOST(id,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllDictionaryUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // type
    importDictionariesUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/importExcel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // id , oneLevel
    findOneTreeDictionaryUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/oneTree`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    exportDictionariesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/outputExcel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportDictTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findAllRootDictionaryUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/root`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // id
    batchTranslateDictByIdUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    batchTranslateDictByCodesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/batch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchTranslateDictPathByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/batch/idPath`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchTranslateDictByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/batchId`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    translateDictPathByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/idPath`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    translateDictByCodesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/one`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchTranslateDictPathByCodesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/translate/path`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findTreeDictionaryUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/tree`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // code , rootCode
    findTreeByCodeUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/tree/code`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateDictionaryUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dict/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {DICT};



const  DICTAUTH =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteDictAuthByIdUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dictAuth/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateDictAuthUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dictAuth/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findDictAuthByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dictAuth/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {DICTAUTH};



const  DIMENSION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addOneDimensionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getLabelsByDimensionIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/getLabels/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getDimensionListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getOneDimensionUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteDimensionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    searchDimensionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/search`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateDimensionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dimension/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {DIMENSION};



const  DOWNLOAD =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    downloadAsynchronousExportFileUsingGET({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/download/asyncExportFile`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {DOWNLOAD};



const  DYNAMICCHANGECOLLECTIONNAME =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    dynamicChangeCollectionNameUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/dynamicChangeCollectionName/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {DYNAMICCHANGECOLLECTIONNAME};



const  EXAMQUESTIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // name , page , required , size , sort , type
    queryExamQuestionForLinkedUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    queryExamQuestionByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteExamQuestionUsingDELETE(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/examQuestions/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {EXAMQUESTIONS};



const  EXPRESSIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteExpressionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllExpressionUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishExpressionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateExpressionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawExpressionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getExpressionDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/expressions/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {EXPRESSIONS};



const  FORMCHECKPOINT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportFormCheckPointTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/formCheckPoint/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportFormCheckPointUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/formCheckPoint/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // matterId
    importFormCheckPointUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/formCheckPoint/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateFormCheckPointUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/formCheckPoint/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {FORMCHECKPOINT};



const  FORMS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteFormDefinitionsUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/forms/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateFormDefinitionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/forms/edit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getFormDefinitionUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/forms/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {FORMS};



const  HOTWORD =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    createHotWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotWord/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteHotWordUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotWord/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllHotWordUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotWord/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateHotWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotWord/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {HOTWORD};



const  HOTLINES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteHotlineUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , departmentName , number , regions , status , updateDept
    exportMatterHandleGuideUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , clientType , collectDepartment , createTime , credentialsExpiredAfter , credentialsNonExpired , departmentName , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , number , password , permissions , phone , regions , status , updateDept , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    exportMatterHandleGuideAsyncUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/exportAsync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importMatterHandleGuideUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/importTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateHotlineUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getHotlineUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateHotlineStatusUsingPOST(id,status) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/hotlines/${id}/status/${status}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {HOTLINES};



const  IMPORT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    listExcelImportOperateRecordUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/import/record/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {IMPORT};



const  INTERFACES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // method , name , url
    getApiInterfacesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/interfaces/total`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getApiInterfaceUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/interfaces/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {INTERFACES};



const  KERNEL =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    adminUpdatePasswordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/admin/changePassword`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateAdminPermissionsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/admin/permissions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name , objectType , page , publishDepartment , regions , review , size , sort , status
    findAllApplicationUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createApplicationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteApplicationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateApplicationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateApplicationReviewUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application/updateReview`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateApplicationStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/application/updateStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    changeStatusOfPermissionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/changeStatusPermission`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteUsingPOST(departmentId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/delete/${departmentId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // id
    queryDepartmentUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/department`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addDepartmentUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/department`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    importDepartmentUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/department/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    editDepartmentUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/department/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // departNum , departmentName , description , id , parentDepartmentId , parentDepartmentName , status , syncTime , type , verticalMngDepartment
    listDepartmentsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/departments`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    editPermissionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/editPermission`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addHandbookUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/handbooks`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeHandbookUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/handbooks/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listHandbookUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/handbooks/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    saveHotEventsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/hotEvent`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // attributionDepartment , type
    getHotEventListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/hotEvent/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // clientType , content.pcContent.bgImage , content.pcContent.content , content.pcContent.link , content.pcContent.name , content.pcContent.type , id , objectType , page , pushTime.endTime , pushTime.startTime , pushTime.valid , pushType , review , scope.allUser , scope.regions , scope.users , size , sort , status
    findAllUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateReviewUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info/review`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateStatusUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info/status`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteUsingDELETE(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/info/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    addInstitutionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportInstitutionUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteInstitutionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    downInstitutionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/down/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    institutionExportUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getInstitutionImportUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getInstitutionImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/importTemp`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    upInstitutionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/up/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    modifyInstitutionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getInstitutionUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institution/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // category , clientType , code , name , page , regions , size , sort , status
    getInstitutionsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/institutions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // positionName , tagCategory , tagName , uniqueCode
    queryLegalUserTagMoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addNewLegalTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeLegalTagUsingDELETE({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    refreshLegalTagUsingPOST(uniqueCode) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTag/refresh/${uniqueCode}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    queryLegalTotalUserTagUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTag/total`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // corpName , page , pageSize , preQueryId , size , sort , tagIdInString , tagIds , tagRelation , uniqueCode
    getLegalUserTagListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    appendLegalTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTags/batchAdd`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeLegalTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/legalTags/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , pageSize
    listPermissionswithPageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/listPermissions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    synonymMarkExportUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/markExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removeLegalTagForKernelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/middle/legalTag/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeUserTagForKernelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/middle/personTag/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // describe , id , name , number , page , releaseTime , size , sort , status
    findAllCommonModelUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/model`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createCommonModelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/model`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteCommonModelUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/model/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateCommonModelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/model/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateCommonModelStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/model/updateStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    editStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/modifyStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addPermissionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/permission`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deletePermissionUsingDELETE({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/permission`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // positionName , tagCategory , tagName , uniqueCode
    queryUserTagMoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addNewUserTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeUserTagUsingDELETE({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    refreshPersonalTagUsingPOST(zjhm) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTag/refresh/${zjhm}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    queryTotalUserTagUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTag/total`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , pageSize , preQueryId , size , sort , tagIdInString , tagIds , tagRelation , uniqueCode
    getUserTagListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    appendPersonalTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTags/batchAdd`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removePersonalTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/personTags/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addPortraitTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportPortraitTagUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // objectType
    getAllCategoriesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/categories`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // category , objectType
    getAllCategoriesWithCategoryUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/categoriesWithCategory`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // name , objectType
    getAllCategoriesWithNameUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/categoriesWithName`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    removePortraitTagUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportPortraitTagsUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // name , object
    getPersonalTagNameListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/tagNames`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getPortraitTagTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/template`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePortraitTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPortraitTagDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTag/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    addNewPortraitTagSourceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTagSource`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removePortraitTagSourceUsingPOST(code) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTagSource/delete/${code}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePortraitTagSourceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTagSource/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findAllSourcesUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTagSources`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // name , page , size , sort
    findAllSourcesByPageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTagSources/page`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getPortraitTagPageListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort , sourceType , tagId
    getTagApplyScenarioUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/applyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    batchRemovePortraitTagUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/batchRemove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    updateBatchPortraitTagUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/batchUpdate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    bulkAddPortraitTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/bulkAdd`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name , page , size , sort
    getDisplayPositionUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/displayPosition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addDisplayPositionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/displayPosition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeDisplayPositionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/displayPositionDelete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateDisplayPositionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/displayPositionUpdate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getNotSyncPortraitTagsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/getNotSyncPortraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    notSyncPortraitTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/notSync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTagSortByPositionNameUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/sortInfo/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    syncPortraitTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/portraitTags/sync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addNewChainUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/review`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeChainUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/review/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getChainListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/review/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateChainUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/review/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getChainDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/review/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    addRoleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/role`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // id
    selectRoleDetailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/role/detail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // ids
    selectRolesDetailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/role/details`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateRoleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/role/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    selectRolesUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/roles`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteRolesUsingPOST(roleId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/roles/delete/${roleId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    selectRoleswithPageUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/rolesWithPage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // object
    getRootSpaceMenuTreeUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/rootSpaceMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenu/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMenuStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenu/updateStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSpaceMenuTreeUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenuTree`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateSpaceMenuTreeSortUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenuTree/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // clientType , name , objectType , page , parentId , regions , size , sort , status
    querySpaceMenusUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createSpaceMenuUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // id , page , size , sort
    queryChildSpaceMenusUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus/childMenus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    deleteSpaceMenuUsingPOST(menuId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus/delete/${menuId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateSpaceMenuUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSpaceMenuUsingGET(menuId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/spaceMenus/${menuId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // name
    getTagListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/statByTagName`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // department , name , number , page , size , sort
    findAllSubscribUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/subscribe`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createSubscribeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/subscribe`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSubscribReviewUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/subscribe/review`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportSynonymUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteSynonymUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importSynonymUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/importExcel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/outputExcel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportSynonymTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllSynonymUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/query`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSynonymByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/queryByIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findSynonymDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/synonymdetail/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateBatchSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/updateBatch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymReviewUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/updateReview`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/synonym/updateStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // avatarUrl , createTime , departNum , departmentId , departmentName , email , enabled , id , lastPasswordResetTime , name , page , password , phone , roleIds , roles[0].id , roles[0].parentRole , roles[0].roleCode , roles[0].roleName , roles[0].viewPermissions , size , sort , status , userId , userName , userType
    listUserUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addUserUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    userUpdatePasswordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user/changePassword`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeUserUsingPOST(userId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user/delete/${userId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateUserUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    queryUserDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/user/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    versionUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/kernel/version`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {KERNEL};



const  KEYPAIRS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getRsaPublicKeyUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/keyPairs/rsa/publicKey`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {KEYPAIRS};



const  KNOWLEDGESTOREINTERFACES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteKnowledgeStoreInterfaceUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/knowledgeStoreInterfaces/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateKnowledgeStoreInterfaceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/knowledgeStoreInterfaces/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    queryKnowledgeStoreInterfaceDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/knowledgeStoreInterfaces/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {KNOWLEDGESTOREINTERFACES};



const  LAW =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    findAllLawBasicUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/law/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {LAW};



const  LICENSE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    checkDuplicateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/check`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createLicenseUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteLicenseUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getLicenseDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/detail/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getLicenseListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishLicenseUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    licenseSyncUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/sync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getSyncStatisticUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/syncStatistic`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateLicenseUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawLicenseUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/license/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {LICENSE};



const  LINKED =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    searchArticleForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/linked/article`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    searchConditionForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/linked/condition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    searchLawBasicForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/linked/lawbasic`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    searchSynonymForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/linked/synonym`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {LINKED};



const  MARK =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addMarkUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/mark/addMark`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMarkUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/mark/getMark/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removeMarkUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/mark/removeMark/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMarkUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/mark/updateMark`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MARK};



const  MATERIAL =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    testUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/checkMaterial`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    coverMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/coverages`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listMaterialUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    materialCopyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/materialCopy`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    resolveMaterialCopyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/resolveMaterialCopy`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/material/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MATERIAL};



const  MATERIALATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportMaterialAtlasUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/materialAtlas/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MATERIALATLAS};



const  MATTER =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportMatterUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateBatchMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/batch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchRemoveMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/batchRemove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // appType , clientType , disassembly , editable , havePreMatter , haveResolveMaterial , mark , matterCode , matterCodes , matterType , missMaterial , name , object , regions , source , status , subItemName , title
    importBulkEditCodeUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/bulkEditImport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    bulkEditCodeImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/bulkEditImportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    completeMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/complete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMatterUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    queryMatterDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/detail/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    editMatterPublishStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/editPublishStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , sceneType , size , sort
    findMattersBySceneTypeUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findBySceneType`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    findLinkedSceneUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findLinkedScene/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findStandardFieldByMatterIdsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findLinkedStandardField`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findStandardMaterialUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findLinkedStandardMaterial`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findMaterialUnderMatterByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findMaterialById/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findMatterBySceneIdUsingGET(sceneId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findMatterBySceneId/${sceneId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findResolveMaterialByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/findResolveMaterialById/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // sceneType
    getDepartmentsRelatedUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/getDepartmentsRelated`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // sceneType
    getLicensesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/getLicenses`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listMatterUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMatterListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSceneLinkedMatterAndMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/getSceneLinkedMatterAndMaterial`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    matterMarkExportUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/markExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    copyResolvedMaterialsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/materials`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/portraitTagImport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/portraitTagImportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // type
    preMatterImportUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/preMatterImport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    preMatterImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/preMatterImportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    matterSyncUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/sync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matter/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MATTER};



const  MATTERATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportMatterAtlasUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterAtlas/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MATTERATLAS};



const  MATTERFORMS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    exportMatterFormExcelUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMatterFormUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    syncExportMatterFormUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportMatterFormExcelTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/exportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // formId
    importMatterFormFromExcelUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateMatterFormUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterFormDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterForms/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MATTERFORMS};



const  MATTERHANDLEGUIDES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteMatterHandleGuideUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , guideTopic , regions , status , updateDept
    exportMatterHandleGuideUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , clientType , collectDepartment , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , guideTopic , id , lastPasswordResetDate , name , password , permissions , phone , regions , status , updateDept , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    exportMatterHandleGuideAsyncUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/exportAsync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importMatterHandleGuideUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/importTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMatterHandleGuideUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterHandleGuideUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMatterHandleGuideStatusUsingPOST(id,status) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/matterHandleGuides/${id}/status/${status}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MATTERHANDLEGUIDES};



const  MESSAGECONFIGS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getAllMessageConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/allList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMessageConfigsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/batchUpdate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    createMessageConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMessageConfigUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMessageConfigUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    translateMessageConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/translate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMessageConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageConfigs/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MESSAGECONFIGS};



const  MESSAGEMODULES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    createMessageModuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMessageModuleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getMessageModuleDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/detail/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMessageModuleListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getFieldFromJsonUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/parse`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishMessageModuleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMessageModuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawMessageModuleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageModules/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MESSAGEMODULES};



const  MESSAGEPICTURES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getAllMessagePictureUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messagePictures/allList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    createMessagePictureUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messagePictures/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMessagePictureUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messagePictures/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMessagePictureUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messagePictures/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateMessagePictureUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messagePictures/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MESSAGEPICTURES};



const  MESSAGESTATISTIC =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportMessageStatisticUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageStatistic/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageStatistic/exportAsync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMessagePictureUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messageStatistic/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {MESSAGESTATISTIC};



const  MESSAGES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    generateMessageUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/generate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getMessageListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    recallMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/recall/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    stopMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/stop/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    translateMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/translate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMessageDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/messages/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MESSAGES};



const  METHODSCHEMAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // cname
    findBaseMethodSchemaUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/base`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    removeMethodSchemaByIdUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // cname , page , size , sort , status , tableType , type
    findMethodSchemasUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    findPreHandleMethodSchemaUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/preHandle`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishMethodSchemaUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    schemaTestUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/schemaTest`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findMethodSchemaTagByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/tag/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMethodSchemaUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawMethodSchemaUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findMethodSchemaByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/methodSchemas/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {METHODSCHEMAS};



const  MINIMALCONDITION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    miniConditionBatchEditUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/batchEdit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeMinimalConditionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , isLinkSource , isLinkTag , lastPasswordResetDate , name , name , objectType , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    exportMiniConditionAsyncUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/exportAsync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    miniConditionMergeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/merge`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMinimalConditionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMinimalConditionDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/minimalCondition/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MINIMALCONDITION};



const  MODULES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteModuleUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateModuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/edit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // contentType
    getFiltrateFieldsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/filtrateFields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // contentType , ids , isTranslation
    getContentsByIdsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/getContentsByIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // contentType , moduleId , name
    getGroupContentListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/groupList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getOutputFieldListUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/outputFields`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // code , contentType , region , threeType , uniqueId
    testModuleSuggestUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/testSuggest`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    translateTopListUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/translateTopList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getModuleDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/modules/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MODULES};



const  MULTIROUNDSESSION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // name , page , size , sort
    findAllOptionsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSession/options`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createOptionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSession/options/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteOptionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSession/options/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateOptionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSession/options/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findOptionByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSession/options/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MULTIROUNDSESSION};



const  MULTIROUNDSESSIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    cloneMultiRoundSessionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/clone/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    createMultiRoundSessionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMultiRoundSessionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // attributionDepartment , clientType , name , object , regions , sourceType , status
    exportMultiRoundSessionUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importMultiRoundSessionUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishMultiRoundSessionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    createSessionFlowUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/session`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findSessionFlowByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/session/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMultiRoundSessionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    validateSessionFlowUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/validate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawMultiRoundSessionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findMultiRoundSessionByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/multiRoundSessions/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {MULTIROUNDSESSIONS};



const  NOTIFICATIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    createNotificationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/create`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteNotificationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getNotificationDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/detail/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getNotificationListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishNotificationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    recallNotificationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/recall`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    stopNotificationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/stop/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateNotificationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notifications/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {NOTIFICATIONS};



const  NOTIFY =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    getMessageListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/getMessageList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getOneMsgDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getReadRecordsUsingGET({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/getReadRecords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    addNewMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/message`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/messageDelete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateMessageUsingPOST(id,{body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/messageUpdate/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/notify/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {NOTIFY};



const  ONEFORM =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    getAllTisApplicationModelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/getAllTisApplicationModel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // modelId , sceneId
    getModelNameAndModelItemsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/getModelNameAndModelItems`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getModelNameCnByIdUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/getModelNameCnById`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // namepart , type
    findStuffTypeListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/getStuffTypeList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // clientType , contentType , dataOrigin , region , sfzhm , type , userid
    qaDebugSuggestUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/qa/debugSuggest`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // uuid
    findRuleDtailUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/queryRuleDetail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // name , page , size
    findRulesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/queryRules`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // modelId , sceneId
    findSxFieldInforByModelidUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/querySxFieldInforByModelid`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // refreshType
    chatRefreshUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/refresh/chat`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    shellRefreshUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneForm/refresh/shell`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {ONEFORM};



const  ONEMATTERATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // sceneId
    queryOneMatterStatUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oneMatterAtlas/stat`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {ONEMATTERATLAS};



const  OPLOGS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    listOperationLogsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/oplogs/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {OPLOGS};



const  OUTLOG =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // printFlag
    changePrintLogFlagUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outLog/change`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {OUTLOG};



const  OUTSIDE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // uniqueCode
    getLegalAllTagsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalPortraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // positionName , tagCategory , tagName , uniqueCode
    queryLegalUserTagMoreToOutsideUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addNewLegalTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeLegalTagUsingDELETE({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , positionName , size , sort , tagCategory , tagName , uniqueCode
    queryLegalUserTagMoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTagPage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // corpName , page , pageSize , preQueryId , size , sort , tagIdInString , tagIds , tagRelation , uniqueCode
    getLegalUserTagListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    bulkUpdateUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    filterUsersToOutsideUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags/filterUsers`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // corpName , pageSize , preQueryId , tagIdInString , tagIds , tagRelation , uniqueCode
    findLegalByTagIdsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags/findByTagIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // pageSize
    getLegalPersonPageStartIdsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags/getPageStartIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getLegalPersonTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/legalTags/getUserTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeLegalTagForKernelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/middle/legalTag/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeUserTagForKernelUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/middle/personTag/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    queryModuleOutputUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/moduleOutput`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // uniqueCode
    getPersonalAllTagsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personPortraitTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // positionName , tagCategory , tagName , uniqueCode
    queryUserTagMoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addNewUserTagUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeUserTagUsingDELETE({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTag`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , positionName , size , sort , tagCategory , tagName , uniqueCode
    queryPersonTagPageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTagPage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , pageSize , preQueryId , size , sort , tagIdInString , tagIds , tagRelation , uniqueCode
    getUserTagListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    bulkUpdateUserTagUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    filterUsersUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags/filterUsers`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // pageSize , preQueryId , tagIdInString , tagIds , tagRelation , uniqueCode
    findPersonalByTagIdsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags/findByTagIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // pageSize
    getPersonalPageStartIdsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags/getPageStartIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getPersonalTagsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/outside/personTags/getUserTags`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {OUTSIDE};



const  PAGEMENUS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deletePageMenuUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishPageMenuUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // needStatusFilter
    findPageMenuTreeUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/tree`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updatePageMenuUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withDrawPageMenuUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findChildsByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pageMenus/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {PAGEMENUS};



const  POLICY =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addPolicyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // sourceId , targetId
    manuallyAddDuplicatesUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/addDuplicates`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportMatterUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    policyBatchEditUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/batch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchRemoveUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/batchRemove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    completePolicyUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/complete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getConditionTagsUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/conditionTagsRefresh/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deletePolicyUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/deletion/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getDuplicatesUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/duplicates/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportPolicyTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportPolicyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listPolicyUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getPolicyManagementListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getPolicyByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/getPolicyByIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    importPolicyUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getDuplicatePoliciesUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/list/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/portraitTagImport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    portraitTagImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/portraitTagImportTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    publishPolicyUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removeDuplicateUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/removeDuplicate/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    startPredictByPolicyIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/startPredictByPolicyIds`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTagApplyScenarioInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/tagApplyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyUsingPOST(id,{body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/update/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawPolicyUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policy/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {POLICY};



const  POLICYATLAS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    bathEditAtlasUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/batch`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deletePolicyAtlasUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deletePolicyAtlasRelationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/deleteRelation`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportNotInStoragePolicyUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/exportNotInStorage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listPolicyAtlasUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyNodeDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/policyNode/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    queryNotInStoragePolicyUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/queryNotInStorage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    queryPolicyAssociatedUsingGET(policyId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/queryPolicyAssociated/${policyId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    queryPolicyNodesUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/queryPolicyNodes`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyAtlasUsingGET(policyId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyAtlas/${policyId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {POLICYATLAS};



const  POLICYINTERPRETATIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deletePolicyInterpretationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // clientType , collectDepartment , regions , status , topic , updateDept
    exportMatterHandleGuideUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , clientType , collectDepartment , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , regions , status , topic , updateDept , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    exportMatterHandleGuideAsyncUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/exportAsync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importPolicyInterpretationUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    policyInterpretationImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/importTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyInterpretationUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyInterpretationUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyInterpretationStatusUsingPOST(id,status) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyInterpretations/${id}/status/${status}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {POLICYINTERPRETATIONS};



const  POLICYSEARCH =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    listUserUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policySearch/listUser`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {POLICYSEARCH};



const  POLICYWORDS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addPolicyWordsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportPolicyWordsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deletePolicyWordsUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // id
    findByIdUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/detail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    editPolicyWordsPublishStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/editPublishStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // clientType , name , source
    exportPolicyWordExcelUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/excel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importPolicyWordExcelUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/excel`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportPolicyWordExcelTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/excelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listPolicyWordsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name , page , size
    getPolicyWordsListForLinkedUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    removeDuplicateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/removeDuplicate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyWordsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/policyWords/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {POLICYWORDS};



const  PORTRAIT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // id
    getCurrentRecordsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/currentRecords`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    reviewPassUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/pass`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getHistoryRecordsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/records`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    reviewRefuseUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/refuse`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // category , collectionDept , name , objectType , page , size , sort , status
    getReviewAppliesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/reviewApplies`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateReviewObjectDetailUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/reviewObject`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getReviewObjectDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/reviewObject/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // category , collectionDept , name , objectType , page , size , sort , status
    getReviewPageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/reviews`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    addTableUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/table`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeTableUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/table/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // tableName
    checkTisDbUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/table/tableCheck`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateTableUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/table/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTableDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/table/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // cnName , enName , isUsedByFunc , objectType , page , size , sort , type
    getTableListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/tables`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // objectType , tableType
    getUsingTableListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portrait/tables/using`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {PORTRAIT};



const  PORTRAITTAGNUMSTATISTICS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // object
    getTagCategoryUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics/category`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // category , colType , object , rowType
    getPortraitTagNumDetailStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics/details`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // endTime , object , startTime , timeRang
    getPortraitTagIncrementsStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics/increments`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // category , object
    getPortraitTagPercentagesStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics/percentages`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // end.leapYear , end.month , end.monthValue , end.year , object , start.leapYear , start.month , start.monthValue , start.year
    getPortraitTagUpdateCountsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagNumStatistics/updateCounts`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {PORTRAITTAGNUMSTATISTICS};



const  PORTRAITTAGSTATISTICS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // object
    getPortraitTagApplicationUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/application`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // object
    getPortraitTagApplicationMenuUsingGET({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/application/menu`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // objectType
    getPortraitTagCoverageUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/coverage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getLastRefreshTimeUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/lastStatisticTime`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getPortraitTagOverviewUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/overview`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    refreshPortraitTagStatisticsUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/refresh`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getStatVersionUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/version`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    modifyStatVersionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagStatistics/version/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {PORTRAITTAGSTATISTICS};



const  PORTRAITTAGSYNCCONFIGS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deletePortraitTagSyncConfigUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagSyncConfigs/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePortraitTagSyncConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/portraitTagSyncConfigs/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {PORTRAITTAGSYNCCONFIGS};



const  PRECISEQUESTIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deletePreciseQuestionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/preciseQuestions/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePreciseQuestionPublishStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/preciseQuestions/publishStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePreciseQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/preciseQuestions/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {PRECISEQUESTIONS};



const  PROFESSIONALWORD =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addProfessionalWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchRemoveUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/batchRemove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteProfessionalWordUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // name , sourceType , wordFeature
    exportProfessionalWordUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // name , page , size , sort , sourceType , wordFeature
    getProfessionalWordListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getProfessionalWordByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/getTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importProfessionalWordUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateProfessionalWordUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/professionalWord/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {PROFESSIONALWORD};



const  PROJECTOVERVIEWS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    examinationProjectUsingPUT({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/exam`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishProjectOverviewUsingPUT(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllProjectOverviewUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/queries`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // code , name
    searchProjectOverviewUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/search`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // regions
    syncProjectUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/sync`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    withdrawProjectOverviewUsingPUT(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'PUT',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    findAllProjectOverviewUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteProjectOverviewUsingDELETE(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/projectOverviews/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'DELETE',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {PROJECTOVERVIEWS};



const  PULLMESSAGES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    copyPullMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/copy/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deletePullMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getPullMessageListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishPullMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    stopPullMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/stop/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updatePullMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPullMessageDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pullMessages/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {PULLMESSAGES};



const  PUSHHISTORY =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    getPushHistoryUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushHistory/list`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {PUSHHISTORY};



const  PUSHINGMESSAGE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    updatePushingMessageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage/edit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPushingMessageUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removePushingMessageUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage/${id}/remove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    startMessagePushUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage/${id}/start`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    stopMessagePushUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/pushingMessage/${id}/stop`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {PUSHINGMESSAGE};



const  RESOLVEMATERIAL =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addResolveMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/add`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportResolveMaterialUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteResolveMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/delete`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    editResolveMaterialAuditStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/editAuditStatus`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getResolveMaterialListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/findByCondition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    listResolveMaterialUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateResolveMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateExaminePointUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/updateExaminePoint`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findByIdUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/resolveMaterial/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {RESOLVEMATERIAL};



const  REVIEWELEMENT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // page , size , sort
    listMatterUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/reviewElement/matterList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {REVIEWELEMENT};



const  RULE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    refreshUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/rule/refresh`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {RULE};



const  SCENE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/addOne`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportMatterUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchEditUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/batchEdit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchRemoveUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/batchRemove`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    confirmCopyDetailUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/confirmCopyDetail`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    confirmMattersUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/confirmMatters`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    executeNormalCopyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/executeNormalCopy`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    executeRegionsCopyUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/executeRegionsCopy`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // auditState , clientType , editable , mark , materialAbsence , name , objectType , publishDept , regions , sceneCode , status
    sceneExportUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    passSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/finalPass`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    refuseSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/finalRefuse`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSceneDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/getDetails/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getSceneDetailByScenesIdUsingGET(sid) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/getDetailsBySid/${sid}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getSceneListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getSceneListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSceneTreeUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/getSceneTree/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    sceneMarkExportUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/markExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // sceneType
    getSceneMatterSystemInfoUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/matterSystemInfo`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , sceneType , size , sort
    oneCertListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/oneCerts`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // sceneType
    onlineSceneUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/onlineScene`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    scenePublishUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    refreshCacheUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/refresh`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removeSceneUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getSceneReviewListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/reviewList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSceneReviewDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/reviewLogs/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // node
    updateSceneQaUsingPOST(id,{params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/sceneQA/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    sceneWithdrawUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getSceneHandleConditionUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/${id}/handleConditions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // node
    updateSceneHandleConditionUsingPOST(id,{params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scene/${id}/handleConditions`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {SCENE};



const  SCENEDATA =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getListForLinkedUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData/getListForLinked`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePublishStateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData/update/publishState`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    findDetailsUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sceneData/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {SCENEDATA};



const  SCHEDULER =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // endTime , jobName , page , size , sort , startTime , status
    getJobLogsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobLogs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // endTime , jobName , page , size , sort , startTime
    getJobsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    createUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    executionUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/exec/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateIsPauseUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/updateIsPause`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getJobDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getJobStatusUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/scheduler/jobs/${id}/status`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {SCHEDULER};



const  SIMILARQUESTION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    findSimilarQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/similarQuestion/findone`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    saveSimilarQuestionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/similarQuestion/save`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {SIMILARQUESTION};



const  SPECIALSTEP =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    exportSpecialStepUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/specialStep/exportExcel/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // matterId
    importSpecialStepUsingPOST({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/specialStep/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getSpecialStepListUsingGET(matterId) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/specialStep/list/${matterId}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportSpecialStepTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/specialStep/outputExcelTemplate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateOrAddSpecialStepUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/specialStep/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {SPECIALSTEP};



const  STANDARDFIELDCLASSIFICATIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteStandardFieldClassificationUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFieldClassifications/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {STANDARDFIELDCLASSIFICATIONS};



const  STANDARDFIELDS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportStandardFieldUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteStandardFieldUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportStandardFieldTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importStandardFieldUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateStandardFieldUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    queryStandardFieldDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardFields/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {STANDARDFIELDS};



const  STANDARDMATERIALS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // materialId , page , size , sort
    applyScenarioUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/applyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportStandardMaterialUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    exportAttributesTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/attributes/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    asyncExportAttributesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/attributes/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    importAttributesUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/attributes/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteStandardMaterialUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    exportStandardMaterialTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    importStandardMaterialUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // issuingDepartment
    queryIssuingDepartmentNumVosUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/issuingDepartmentNum`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // materialId
    getMatterByStandardMaterialUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/matter`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateStandardMaterialUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateStandardMaterialStatusUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/update/status`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    queryStandardMaterialDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/standardMaterials/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {STANDARDMATERIALS};



const  STAT =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // sceneType
    generateEffectTableUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/generateEffectTable`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // recordId , sceneType
    getEffectTableByIdUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/getEffectTable`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getHistoryRecordsUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/getHistoryEffectTables`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // sceneType
    getSceneTotalReduceUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/getSceneTotalReduce`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // sceneType
    matterStatUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/matter`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getRelativeInfoByIdsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/relativeInfo`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // sceneType
    sceneStatUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/stat/scene`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {STAT};



const  SUGGESTSTRATEGIES =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // contentType , name , objectType , page , size , sort , type
    findPageSuggestStrategyUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/suggestStrategies/page`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getStrategyDetailUsingGET(code) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/suggestStrategies/${code}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {SUGGESTSTRATEGIES};



const  SYNONYMCONFIG =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // attributionDepartment
    findOneSynonymConfigUsingGET(code,{params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/synonymConfig/detail/${code}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymConfigNoAnswerUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/synonymConfig/synonymConfigNoAnswer`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymConfigSimpleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/synonymConfig/synonymConfigSatisfaction`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymConfigVoiceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/synonymConfig/synonymConfigVoice`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymConfigWelcomeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/synonymConfig/synonymConfigWelcome`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {SYNONYMCONFIG};



const  SYS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // code
    getSystemConfigUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sys/config`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    saveSystemConfigUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sys/config`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // name
    getSysConfigListUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/sys/configs`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {SYS};



const  TAGOUTPUTS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // object , portraitTagId
    getApplyScenarioUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs/applyScenario`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    deleteTagOutputUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateTagOutputUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTagOutputUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagOutputs/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {TAGOUTPUTS};



const  TAGSCENESTATISTICS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // object
    getMiniConditionStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagSceneStatistics/miniCondition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // object
    getSceneConditionStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagSceneStatistics/sceneCondition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // object
    getSceneGuideStatisticsUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagSceneStatistics/sceneGuide`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {TAGSCENESTATISTICS};



const  TAGTHEME =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    removeTagThemeUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagTheme/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagThemeTreeUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagTheme/themeTree`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // shareTags
    updateTagThemeUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagTheme/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getTagThemeDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tagTheme/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {TAGTHEME};



const  TAGS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // tagId
    getEditHistoriesUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/tags/editHistories`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    

};

export {TAGS};



const  THEME =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addOneThemeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/addNew`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getThemeListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getOneThemeUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getReviewThemeListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/getReviewList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    removeThemeUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    reviewThemeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/review`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    submitThemeUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/submit/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateThemeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawThemeUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/theme/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {THEME};



const  TRANSLATE =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    articleTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/articleTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    conditionTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/conditionTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    convenienceServiceTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/convenienceServiceTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    declareProjectTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/declareProjectTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    lawBasicTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/lawBasicTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    materialTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/materialTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    matterTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/matterTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    minimalConditionTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/minimalConditionTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    policyLibraryTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/policyLibraryTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    policyWordsTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/policyWordsTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    portraitTagTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/portraitTagTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    sceneDataTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/sceneDataTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    sceneTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/sceneTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    standardMaterialTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/standardMaterialTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    synonymTranslateUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/translate/synonymTranslate`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {TRANSLATE};



const  UNION =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    addNewUnionProcessUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/addNew`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    cancelOnTopUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/cancelOnTop/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    sceneDisplayUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/display/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    getUnionProcessListUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/getList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getOneUnionProcessUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/getOne/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getSceneNameListUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/getSceneNames`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    publishUnionProcessUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/publish/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    removeUnionProcessUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/remove/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    setOnTopUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/setOnTop/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateUnionProcessUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    withdrawUnionProcessUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/union/withdraw/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {UNION};



const  V1_0 =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    matterSynchronizeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/MatterSynchronize`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    auditSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/auditScene`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    auditSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/auditSynonym`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    batchMaterialAuditUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/batchMaterialAudit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getBelongSceneUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/belongScene`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getArticleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getArticle`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getCompleteDictByCodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getCompleteDictsByCode`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getConvenienceUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getConvenience`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getDeclareProjectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getDeclareProject`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getDictionaryUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getDictionary`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getDictionaryNeedAuthUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getDictionary/auth`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getExaminePointInfoUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getExaminePointInfo`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMaterialByConditionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMaterialByCondition`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMaterialManageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMaterialManage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMaterialManageLimitUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMaterialManageLimit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMatter`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterCodeBySceneIdUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMatterCodeBySenceId`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterCodeListUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMatterCodeList`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getMatterSelectUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getMatterSelect`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // params
    getNextLevelDictionaryUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getNextLevelDictionary`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    getPolicyLibraryUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getPolicyLibrary`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyLibraryDetailUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getPolicyLibraryDetial`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getPolicyLibraryLimitUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getPolicyLibraryLimit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getScenesUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getScenes`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getScenesByUriCodeUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getScenesByUriCode`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getScenesLimitUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getScenesLimit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getStatisticUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getStatistic`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSynonymsUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getSynonym`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getSynonymLimitUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/getSynonymLimit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateCollectionUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/updateCollection`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateMaterialManageUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/updateMaterialManage`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updatePolicyLibraryUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/updatePolicyLibrary`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    updateSynonymUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/v1.0/policyStore/updateSynonym`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {V1_0};



const  VALIDATIONS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    deleteValidationRulesUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/validations/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateValidationRuleUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/validations/edit`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {VALIDATIONS};



const  WORDS =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // accountNonExpired , accountNonLocked , admin , authorities[0].authority , avatar , createTime , credentialsExpiredAfter , credentialsNonExpired , dept.createTime , dept.deleteFlag , dept.departNum , dept.departmentName , dept.description , dept.id , dept.operator , dept.parentDepartmentId , dept.parentDepartmentName , dept.status , dept.syncTime , dept.type , dept.updateTime , dept.users[0].admin , dept.users[0].avatarUrl , dept.users[0].createTime , dept.users[0].deleteFlag , dept.users[0].email , dept.users[0].enabled , dept.users[0].id , dept.users[0].lastPasswordResetTime , dept.users[0].name , dept.users[0].operator , dept.users[0].password , dept.users[0].phone , dept.users[0].roles[0].createTime , dept.users[0].roles[0].deleteFlag , dept.users[0].roles[0].id , dept.users[0].roles[0].operator , dept.users[0].roles[0].parentRole , dept.users[0].roles[0].permissions[0].code , dept.users[0].roles[0].permissions[0].createTime , dept.users[0].roles[0].permissions[0].deleteFlag , dept.users[0].roles[0].permissions[0].description , dept.users[0].roles[0].permissions[0].id , dept.users[0].roles[0].permissions[0].locked , dept.users[0].roles[0].permissions[0].operator , dept.users[0].roles[0].permissions[0].permissionName , dept.users[0].roles[0].permissions[0].rule , dept.users[0].roles[0].permissions[0].status , dept.users[0].roles[0].permissions[0].type , dept.users[0].roles[0].permissions[0].updateTime , dept.users[0].roles[0].roleCode , dept.users[0].roles[0].roleName , dept.users[0].roles[0].updateTime , dept.users[0].roles[0].viewPermissions , dept.users[0].status , dept.users[0].updateTime , dept.users[0].userId , dept.users[0].userName , dept.users[0].userType , dept.verticalMngDepartment , email , enabled , expiredAfter , id , lastPasswordResetDate , name , password , permissions , phone , user.admin , user.avatarUrl , user.createTime , user.deleteFlag , user.department.createTime , user.department.deleteFlag , user.department.departNum , user.department.departmentName , user.department.description , user.department.id , user.department.operator , user.department.parentDepartmentId , user.department.parentDepartmentName , user.department.status , user.department.syncTime , user.department.type , user.department.updateTime , user.department.verticalMngDepartment , user.email , user.enabled , user.id , user.lastPasswordResetTime , user.name , user.operator , user.password , user.phone , user.roles[0].createTime , user.roles[0].deleteFlag , user.roles[0].id , user.roles[0].operator , user.roles[0].parentRole , user.roles[0].permissions[0].code , user.roles[0].permissions[0].createTime , user.roles[0].permissions[0].deleteFlag , user.roles[0].permissions[0].description , user.roles[0].permissions[0].id , user.roles[0].permissions[0].locked , user.roles[0].permissions[0].operator , user.roles[0].permissions[0].permissionName , user.roles[0].permissions[0].rule , user.roles[0].permissions[0].status , user.roles[0].permissions[0].type , user.roles[0].permissions[0].updateTime , user.roles[0].roleCode , user.roles[0].roleName , user.roles[0].updateTime , user.roles[0].viewPermissions , user.status , user.updateTime , user.userId , user.userName , user.userType , userId , userType , username
    asyncExportTagStoreUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/asyncExport`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    deleteTagStoreUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // id , type , word
    exportTagStoreUsingGET({params = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/export`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params
            },resolve, reject);
        });
    },
    
    // 
    importTagStoreUsingPOST() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/import`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    getTagStoreImportTemplateUsingGET() {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/template`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateTagStoreUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/words/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    

};

export {WORDS};



const  WORKORDER =  {
    pre_path:   `${options.endPoint}${options.preUrl}`,

    
    // 
    approvedWorkOrderUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/approved/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    deleteWorkOrderUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/delete/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // page , size , sort
    findAllWorkOrderUsingPOST({params = {},body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/findAll`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                params,
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    notApprovedWorkOrderUsingPOST(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/notApproved/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    
    // 
    updateWorkOrderUsingPOST({body = {}}) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/update`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                data: JSON.stringify(body)
            },resolve, reject);
        });
    },
    
    // 
    getWorkOrderDetailUsingGET(id) {
        const {endPoint, preUrl, send } = options;
        const $url = `${endPoint}${preUrl}/workOrder/${id}`;
        return new Promise((resolve, reject) => {
            send($url, {
                method: 'GET',
                headers: {
                          'Content-Type': 'application/json;charset=utf-8','Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
            },resolve, reject);
        });
    },
    

};

export {WORKORDER};

