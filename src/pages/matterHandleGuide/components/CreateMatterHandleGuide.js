import React, { PureComponent } from 'react';
import { Button, notification } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { TabForm } from '@/components/tis_ui';
import { terminalType } from '@/utils/constantEnum';
import { MATTERHANDLEGUIDES, CORE } from '@/services/api';
import BaseInfo from './BaseInfo';

class Index extends PureComponent {
  form = null;

  state = {};

  handleSubmit = () => {
    const { initialValues } = this.props;
    const { id } = initialValues || {};
    this.form.validateFields().then(vals => {
      const {
        relatedPolicies = [],
        relatedMatters = [],
        relatedServices = [],
        relatedProjects = [],
        relatedArticles = [],
      } = vals;
      const newData = {
        ...vals,
        relatedPolicies: relatedPolicies.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relatedMatters: relatedMatters.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relatedServices: relatedServices.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relatedProjects: relatedProjects.map(it => {
          const { value } = it;
          return { id: value };
        }),
        relatedArticles: relatedArticles.map(it => {
          const { value } = it;
          return { id: value };
        }),
      };
      if (id) {
        this.updateMatterHandleGuide({ ...newData, id });
      } else {
        this.addMatterHandleGuide(newData);
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addMatterHandleGuide = async body => {
    await CORE.saveMatterHandleGuideUsingPOST({ body });
    notification.success({
      message: 'εε»Ίζε',
    });
    router.push('matterHandleGuide');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateMatterHandleGuide = async body => {
    await MATTERHANDLEGUIDES.updateMatterHandleGuideUsingPOST({ body });
    notification.success({
      message: 'ζ΄ζ°ζε',
    });
  };

  render() {
    const { initialValues = {}, editVisible = true, title = 'ζ°ε»Ίη½δΈεδΊζεΌ' } = this.props;
    const initData = initialValues || {
      clientType: [terminalType.pc],
    };

    return (
      <TabForm
        initialValues={initData}
        defaultTabKey="baseInfo"
        title={title}
        onForm={formRef => {
          this.form = formRef;
        }}
        btnOption={{
          okText: initialValues ? 'δΏε­ι‘Ήη?δΏ‘ζ―' : 'ζδΊ€',
          okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
          onOk: this.handleSubmit,
          disabled: !editVisible,
        }}
        extra={
          <>
            <Button type="link" onClick={() => router.goBack()}>
              θΏεεθ‘¨
            </Button>
          </>
        }
      >
        <BaseInfo
          tabKey="baseInfo"
          title="εΊζ¬δΏ‘ζ―"
          setPortraitType={nextPortraitType => this.setPortraitType(nextPortraitType)}
          editVisible={editVisible}
        />
      </TabForm>
    );
  }
}

export default Index;
