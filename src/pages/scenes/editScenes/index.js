import React, { useState } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import _ from 'lodash';
import { Card, Form, Tabs, notification, Tooltip, Input } from 'antd';
import { CheckOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { TButton, ModalForm, TItem, FormRules } from '@/components/tis_ui';
import { SCENE } from '@/services/api';
import { matterNeedAppointment, terminalType } from '@/utils/constantEnum';
import BasicInfo from './components/basicinfo/BasicInfo';
import JointDepts from './components/jointDepts/JointDepts';
import Relations from './components/relations/Relations';
import SceneNotice from './components/sceneNotice/SceneNotice';
import FillNotice from './components/fillNotice/FillNotice';
import Explanation from './components/explanation/Explanation';
import AuditRecord from './components/auditRecord/AuditRecord';
import styles from '../scenes.less';
import ExpandInfo from './components/expandInfo';
import { adaptText } from "@/utils/AdaptiveHelper";

const { TabPane } = Tabs;
const { TextArea } = Input;

const format = (data = [], key, itemKey) =>
  data.map(item => {
    if (itemKey) {
      return { [key]: item[itemKey] };
    }
    return { [key]: item };
  });

function EditScene(props) {
  const { title, audit, sceneInfo, disabled, deptCode } = props;
  const [tab, setTab] = useState('basicinfo');
  const [rejectScene, setRejectScene] = useState(false);
  const [form] = Form.useForm();
  let rejectForm = null;
  const initialValues = sceneInfo || {
    hidden: 0,
    clientType: [terminalType.pc],
    attributionDepartment: [deptCode],
    isNeedAudit: 0,
  };

  function handleSubmit() {
    form
      .validateFields()
      .then(vals => {
        const {
          matters = [],
          department = [],
          recommendTag = [],
          type = [],
          windows = [],
          nextMatter = [],
          relationMatchPolicy = [],
          relationMatchMatters = [],
          relationMatchService = [],
          relationMatchProject = [],
          relationArticles = [],
          explanation = {},
          isNeedOrder,
          orderAddress,
          linkReduceRatio,
          materialReduceRatio,
          runReduceRatio,
          timeReduceRatio,
          ...others
        } = vals;

        const sceneData = {
          ...others,
          matters: matters.map(item => _.pick(item, ['mid', 'no', 'category'])),
          department: department.map(item => _.pick(item, ['name', 'advice', 'auditState'])),
          recommendTag: format(recommendTag, 'code'),
          type: format(type, 'code', 'code'),
          windows: windows.map(item => ({
            ...item,
            regions: item.regions && item.regions.value,
          })),
          nextMatter: format(nextMatter, 'rid', 'key'),
          relationMatchPolicy: format(relationMatchPolicy, 'rid', 'key'),
          relationMatchMatters: format(relationMatchMatters, 'rid', 'key'),
          relationMatchService: format(relationMatchService, 'rid', 'key'),
          relationMatchProject: format(relationMatchProject, 'rid', 'key'),
          relationArticles: format(relationArticles, 'rid', 'key'),
          explanation: {
            services: format(explanation.services, 'rid', 'id'),
            question: format(explanation.question, 'rid', 'id'),
            policy: format(explanation.policy, 'rid', 'id'),
          },
          orderAddress: isNeedOrder === matterNeedAppointment.yes ? orderAddress : undefined,
        };
        let data = null;
        if (sceneInfo) {
          data = { ...sceneInfo, ...sceneData };
          updateScene(data);
        } else {
          data = sceneData;
          createNewScene(data);
          router.replace('scenes');
        }
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          const firstErrField = err.errorFields[0].name[0];
          setTab('basicinfo');
          form.scrollToField(firstErrField);
          notification.error({
            message: '????????????????????????????????????',
          });
        }
      });
  }

  async function createNewScene(body = {}) {
    const { dispatch } = props;
    await SCENE.addSceneUsingPOST({ body });
    form.resetFields();
    dispatch({
      type: 'scenes/fetchList',
      params: {
        page: 0,
        size: 10,
      },
    });
    notification.success({
      message: '????????????????????????',
    });
  }

  async function updateScene(body = {}) {
    await SCENE.updateSceneUsingPOST({ body });
    notification.success({
      message: '????????????????????????',
    });
  }

  async function handlePassScene() {
    const { id } = sceneInfo;
    await SCENE.passSceneUsingPOST({
      body: {
        elementId: id,
      },
    });
    router.goBack();
    notification.success({
      message: '????????????',
    });
  }

  async function handleRejectScene() {
    const { id } = sceneInfo;
    const { suggestion } = await rejectForm.current.validateFields();
    await SCENE.refuseSceneUsingPOST({
      body: {
        comments: suggestion,
        elementId: id,
      },
    });
    setRejectScene(false);
    router.goBack();
    notification.success({
      message: '????????????',
    });
  }

  function renderTabList() {
    const list = [
      {
        key: 'basicinfo',
        tab: '????????????',
      },
      {
        key: 'jointDepts',
        tab: '????????????',
      },
      {
        key: 'relations',
        tab: '????????????',
      },
      {
        key: 'sceneNotice',
        tab: '????????????',
      },
      {
        key: 'fillNotice',
        tab: '????????????',
      },
      {
        key: 'explanation',
        tab: adaptText('???????????????'),
      },
      {
        key: 'expandInfo',
        tab: '????????????',
      },
    ];
    if (sceneInfo) {
      list.push({
        key: 'auditRecord',
        tab: '????????????',
      });
    }
    return list;
  }

  return (
    <>
      <Card
        title={title || '????????????'}
        extra={
          <TButton.Button type="link" ghost={false} onClick={() => router.goBack()}>
            ????????????
          </TButton.Button>
        }
        tabList={renderTabList()}
        onTabChange={key => {
          setTab(key);
        }}
        activeTabKey={tab}
        style={{ height: '100%' }}
      >
        <Form
          form={form}
          hideRequiredMark={disabled}
          scrollToFirstError
          initialValues={initialValues}
        >
          <Tabs activeKey={tab} renderTabBar={() => <div />}>
            <TabPane key="basicinfo" forceRender>
              <BasicInfo {...props} sceneForm={form} sceneInfo={sceneInfo} />
            </TabPane>
            <TabPane key="jointDepts" forceRender>
              <JointDepts {...props} sceneForm={form} />
            </TabPane>
            <TabPane key="relations" forceRender>
              <Relations {...props} sceneForm={form} />
            </TabPane>
            <TabPane key="sceneNotice" forceRender>
              <SceneNotice {...props} sceneForm={form} />
            </TabPane>
            <TabPane key="fillNotice" forceRender>
              <FillNotice {...props} sceneForm={form} />
            </TabPane>
            <TabPane key="explanation" forceRender>
              <Explanation {...props} sceneForm={form} />
            </TabPane>
            {sceneInfo && (
              <TabPane key="auditRecord" forceRender>
                <AuditRecord {...props} sceneForm={form} />
              </TabPane>
            )}
            <TabPane key="expandInfo" forceRender>
              <ExpandInfo {...props} sceneForm={form} />
            </TabPane>
          </Tabs>
        </Form>

        <div className={styles.formBtnGroup}>
          {!audit && (
            <Tooltip placement="left" title={sceneInfo ? '????????????' : '????????????'}>
              <TButton.Button
                className={styles.formBtnItem}
                type="primary"
                ghost={false}
                shape="circle"
                onClick={handleSubmit}
                style={{
                  marginRight: 0,
                  display: disabled ? 'none' : 'block',
                }}
              >
                {sceneInfo ? <SaveOutlined /> : <CheckOutlined />}
              </TButton.Button>
            </Tooltip>
          )}
          <Tooltip placement="left" title="???????????????">
            <TButton.Button
              className={styles.formBtnItem}
              type="default"
              ghost={false}
              shape="circle"
              onClick={() => router.goBack()}
              style={{ marginRight: 0 }}
            >
              <RollbackOutlined />
            </TButton.Button>
          </Tooltip>
          {audit && (
            <>
              <TButton.Button
                className={styles.formBtnItem}
                type="primary"
                shape="circle"
                onClick={handlePassScene}
                style={{ fontSize: 'initial' }}
              >
                ??????
              </TButton.Button>
              <TButton.Button
                className={styles.formBtnItem}
                danger
                shape="circle"
                onClick={() => setRejectScene(true)}
                style={{ fontSize: 'initial' }}
              >
                ??????
              </TButton.Button>
            </>
          )}
        </div>
      </Card>
      {rejectScene && (
        <ModalForm
          title="??????????????????"
          visible
          onForm={fm => {
            rejectForm = fm;
          }}
          onOk={handleRejectScene}
          handleCancel={() => setRejectScene(false)}
          width="40%"
        >
          <TItem name="suggestion" label="????????????" rules={[FormRules.required('??????')]}>
            <TextArea style={{ minHeight: 200 }} />
          </TItem>
        </ModalForm>
      )}
    </>
  );
}

export default connect(({ scenes, user }) => ({
  ...scenes,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))(EditScene);
