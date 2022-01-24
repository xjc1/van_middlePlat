import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Space, Modal } from 'antd';
import { TButton, utils } from "@/components/tis_ui";
import CertificationSyncList from "./CertificationSyncList";
import UnSyncModal from "./UnSyncModal";
import styles from './index.less';
import { CORE, LICENSE } from "@/services/api";
import { certificationSyncChange } from "@/utils/constantEnum";

const { IDGenerator } = utils;

class Index extends PureComponent {
  queryForm = null;

  state = {
    loading: false,
    list: [],
    syncType: '9',
    page: 0,
    size: 10,
    total: 0,
  };

  constructor() {
    super();
    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount() {
    this.fetchList({});
  }

  fetchList({ page = 0, size = 10  }) {
    const { syncType } = this.state;
    CORE.listDataSyncRecordUsingGET({
      params: {
        page,
        size,
        syncType
      }
    }).then(({ content, number, totalElements, }) => {
      this.setState({
        list: content,
        page: number,
        total: totalElements,
      });
    });
  }

  render() {
    const { list, page, size, total, loading } = this.state;
    return (
      <div>
        <div className={styles.certificationSyncQuerybar}>
          <Space>
            <TButton.Button type="primary"
                            onClick={() => {
                              LICENSE.getSyncStatisticUsingGET().then(data => {
                                const syncItems = _.map(data, (v, k) => {
                                  return {
                                    status: certificationSyncChange.$v_names[k],
                                    num: v,
                                    key: IDGenerator.next(),
                                  };
                                });
                                Modal.info({
                                  title: '未同步详情',
                                  width: 800,
                                  content: (
                                    <UnSyncModal data={syncItems} />
                                  )
                                });
                              });
                            }}>查看未同步</TButton.Button>
            <TButton.Button type="primary"
                            onClick={() => {
                              this.setState({
                                loading: true,
                              });
                              LICENSE.licenseSyncUsingPOST().then(() => {
                                this.fetchList({});
                                this.setState({
                                  loading: false,
                                });
                              });
                            }}>一键同步</TButton.Button>
          </Space>
        </div>
        <CertificationSyncList
          loading={loading}
          list={list}
          pageNum={page}
          pageSize={size}
          total={total}
          onPageSizeChange={this.fetchList}
          className={styles.certificationSyncList}
        />
      </div>
    );
  }
}

export default Index;

