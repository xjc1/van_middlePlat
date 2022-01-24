import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { Button, Card, Row, Form, notification } from 'antd';
import { TItem } from '@/components/tis_ui';
import { sourceType } from '@/utils/constantEnum';
import { CORE, WORKORDER } from '@/services/api';
import SettingOfQuestion from '@/pages/knowledgeLibWorkOrder/SettingOfQuestion';
import SettingOfAnswer from '@/pages/knowledgeLibWorkOrder/SettingOfAnswer';
import SettingOfOthers from '@/pages/knowledgeLibWorkOrder/SettingOfOthers';

const formatBy = (value = [], key, itemKey) =>
  value.map(item => ({ [key]: item[itemKey] })).filter(Boolean);

@connect(({ knowledgeLibWorkOrder }) => knowledgeLibWorkOrder)
class EditWorkOrder extends PureComponent {
  createForm = React.createRef();

  handleSubmit = vals => {
    const { workOrderInfo } = this.props;

    const {
      department = [],

      relationMatchScene = [],
      relationMatchMatter = [],
      relationMatchService = [],
      relationMatchPolicy = [],
      relationMatchProject = [],

      file = [],
    } = vals;

    const handledVals = {
      ...vals,

      department: department.join(),

      relationMatchScene: formatBy(relationMatchScene, 'id', 'key'),
      relationMatchMatter: formatBy(relationMatchMatter, 'id', 'key'),
      relationMatchService: formatBy(relationMatchService, 'id', 'key'),
      relationMatchPolicy: formatBy(relationMatchPolicy, 'id', 'key'),
      relationMatchProject: formatBy(relationMatchProject, 'id', 'key'),

      enclosure: file[0],
      enclosureName: file[1],
    };

    if (workOrderInfo) {
      this.handleUpdate({ ...workOrderInfo, ...handledVals });
    } else {
      this.handleCreate(handledVals);
    }
  };

  handleCreate = async body => {
    await CORE.addWorkOrderUsingPOST({ body });
    router.goBack();
    notification.success({
      message: '成功添加',
    });
  };

  handleUpdate = async body => {
    await WORKORDER.updateWorkOrderUsingPOST({ body });
    notification.success({
      message: '成功更新',
    });
  };

  handlePass = async id => {
    await WORKORDER.approvedWorkOrderUsingPOST(id);
    router.goBack();
    notification.success({
      message: '成功审核',
    });
  };

  handleRefuse = async id => {
    await WORKORDER.notApprovedWorkOrderUsingPOST(id);
    router.goBack();
    notification.success({
      message: '成功驳回',
    });
  };

  render() {
    const { workOrderInfo, title = '上报工单', readOnly, audit } = this.props;

    const initialValues = workOrderInfo || { source: String(sourceType.recordByHand) };

    const renderBtn = () => {
      if (audit) {
        return (
          <>
            <Button size="large" type="primary" onClick={() => this.handlePass(workOrderInfo.id)}>
              通过
            </Button>
            <Button
              size="large"
              danger
              onClick={() => this.handleRefuse(workOrderInfo.id)}
              style={{ margin: '0 20px' }}
            >
              驳回
            </Button>
            <Button size="large" onClick={() => router.goBack()}>
              关闭
            </Button>
          </>
        );
      }
      return (
        <>
          {!readOnly && (
            <Button size="large" type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
              提交
            </Button>
          )}
          <Button size="large" onClick={() => router.goBack()}>
            关闭
          </Button>
        </>
      );
    };

    return (
      <div>
        <Card
          bordered
          title={
            <span>
              <span>
                <span>{title}</span>
              </span>
              <a style={{ float: 'right' }} onClick={() => router.goBack()}>
                返回列表
              </a>
            </span>
          }
        >
          <Form
            ref={this.createForm}
            onFinish={this.handleSubmit}
            initialValues={initialValues}
            hideRequiredMark={readOnly}
            scrollToFirstError
          >
            <SettingOfQuestion readOnly={readOnly} />
            <SettingOfAnswer readOnly={readOnly} />
            <SettingOfOthers readOnly={readOnly} />
            <Row>
              <TItem
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'center' }}
              >
                {renderBtn()}
              </TItem>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default EditWorkOrder;
