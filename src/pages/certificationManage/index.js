import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from "@/components/tis_ui";
import router from '@/utils/tRouter';
import { notification } from "antd";
import CertificationManageQueryBar from "./CertificationManageQueryBar";
import CertificationManageList from "./CertificationManageList";
import styles from './index.less';
import { LICENSE } from "@/services/api";
import TrackTool from "@/utils/TrackTool";

@connect(({ certificationManage }) => certificationManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    page: 0,
    size: 10,
  };

  componentDidMount() {
    this.fetchCertificationManage({});
  }

  fetchCertificationManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'certificationManage/fetchList',
      payload: {
        page, size, query
      }
    });
    this.setState({ query, page, size });
  };

  fetchCertificationManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'certificationManage/fetchList',
      payload: {
        page, size, query
      }
    });
    this.setState({ query, page, size });
  };


  render() {
    return (
      <div>
        <CertificationManageQueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create onClick={() => {
                router.push({
                  name: 'certificationManage_create',
                });
              }}>新增证照</TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search onClick={() => {
                this.queryForm.validateFields().then((query) => {
                  this.fetchCertificationManageWithQuery({ query });
                });
              }}>查询</TButton.Search>
              <TButton.Reset onClick={() => {
                // 重置数据
                this.queryForm.resetFields();
                this.setState({ query: {}, page: 0, size: 10 });
                this.fetchCertificationManageWithQuery({});
              }}>
                重置
              </TButton.Reset>
            </>
          }
        />

        <CertificationManageList
          className={styles.certificationManageList}
          changeStatus={async ({ status = 0, id }) => {
            const { query, page, size } = this.state;
            if (status === 0) {
              await LICENSE.publishLicenseUsingPOST(id);
              notification.success({ message: '上架成功!' });
              await this.fetchCertificationManageWithQuery({ query, page, size });
            } else if (status === 1) {
              await LICENSE.withdrawLicenseUsingPOST(id);
              notification.success({ message: '下架成功!' });
              await this.fetchCertificationManageWithQuery({ query, page, size });
            }
          }}
          handleDelete={async (id) => {
            await LICENSE.deleteLicenseUsingPOST(id);
            notification.success({ message: '删除成功!' });
            const { query, page, size } = this.state;
            await this.fetchCertificationManageWithQuery({ query, page, size });
          }}
          onEdit={({ id }) => {
            router.push({ name: 'certificationManage_edit', params: { id } });
          }}
          onPageSizeChange={this.fetchCertificationManage}
        />
      </div>
    );
  }
}

export default Index;

