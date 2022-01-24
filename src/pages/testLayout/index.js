import React, { PureComponent } from 'react';
import { TabForm } from '@/components/tis_ui';
import { Input } from 'antd';
import PageLayout from '@/layouts/ThreeSevenLayoutForm';
import RichTextTab from './compontens/richTextTab';
import styles from './testLayout.less';

const bodyStyle = {
  position: 'absolute',
  top: '97px',
  bottom: '0px',
  overflowY: 'scroll',
  overflowX: 'hidden',
};

class Index extends PureComponent {
  queryForm = null;

  left = () => {
    return <div className={styles.innerboxScroll}> test </div>;
  };

  right = () => {
    return (
      <TabForm
        // initialValues={}
        onForm={nextForm => {
          this.form = nextForm;
        }}
        defaultTabKey="richText"
        title="答案编辑"
        bodyStyle={bodyStyle}
        heightStyle={{ height: 97 }}
        btnOption={
          {
            // okText: 'test',
            // okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
            // onOk: this.handleSubmit,
            // disabled: !editVisible,
          }
        }
      >
        <RichTextTab tabKey="richText" title="富文本" />
        <Input tabKey="pureText" title="纯文本" />
      </TabForm>
    );
  };

  render() {
    return <PageLayout left={this.left()} right={this.right()} />;
  }
}

export default Index;
