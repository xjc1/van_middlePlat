import React, { PureComponent } from 'react';
import { Card, Modal, notification } from 'antd';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { FileUpload } from '@/components/bussinessComponents';
import { KERNEL } from '@/services/api';
import OperatingManualList from './OperatingManualList';
import styles from './operatingManual.less';

@connect(({ operatingManual }) => operatingManual)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    createOM: false,
    uploadInfo: {},
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'operatingManual/fetchList',
      params: {
        page,
        size,
      },
      body: query,
    });
  };

  render() {
    const { createOM, uploadInfo: { fileAddr = null } } = this.state;

    return (
      <div>
        <Card>
          <TButton.Create onClick={() => this.setState({ createOM: true })}>
            新增手册
          </TButton.Create>
        </Card>

        <OperatingManualList className={styles.operatingManualList} fetchList={this.fetchList} />

        <Modal
          title="新增手册"
          visible={createOM}
          onCancel={() => this.setState({ createOM: false })}
          onVisibleChange={() => this.setState({ uploadInfo: {} })}
          onOk={async () => {
            const { uploadInfo: body } = this.state;
            await KERNEL.addHandbookUsingPOST({ body });
            this.fetchList({});
            this.setState({ createOM: false });
            notification.success({
              message: '成功新增',
            });
          }}
        >
          <FileUpload
            key={createOM}
            maxFileSize={20}
            showAddress={fileAddr}
            onChange={([addr, name]) => {
              this.setState({
                uploadInfo: {
                  name,
                  fileAddr: addr,
                },
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Index;
