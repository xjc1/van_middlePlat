import React, { PureComponent } from 'react';
import {
  QueryBarCard,
  TItem,
  TTable,
  TButton,
  OperateBar,
  FormRules as Rules,
} from '@/components/tis_ui';
import { TSearchSelector, DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import authEnum, { authCheck } from '@/utils/auth';
import { hotIsAbsent, commonYesNo } from '@/utils/constantEnum';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import HotPage from '../HotPage';
import styles from '../hot.less';

@connect(({ hotQuestion, loading, user }) => ({
  ...hotQuestion,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
  loading: loading.effects['hotQuestion/fetchList'],
}))
class Index extends PureComponent {
  form = null;

  queryForm = null;

  addForm = async () => {
    const { dispatch, list } = this.props;
    const { attributionDepartment } = await this.queryForm.validateFields();
    const req_body = {
      infos: list,
      type: 4,
      attributionDepartment,
    };
    dispatch({
      type: 'hotQuestion/saveHotEvent',
      payload: { req_body, type: 4, attributionDepartment },
    });
  };

  addHot = () => {
    const { dispatch, list } = this.props;
    this.form.validateFields().then(vals => {
      const newData = _.concat(
        vals.policy.map(item => ({
          elemId: item.value,
          top: 1,
          isAbsent: 1,
          editable: true,
          elemName: item.label.split('_')[0],
          regions: item.label.split('_')[1],
        })),
        list,
      );
      dispatch({ type: 'hotQuestion/addHot', payload: newData });
      this.form.resetFields();
    });
  };

  deleteHot = record => {
    const { dispatch, list } = this.props;
    const data = list.filter(({ elemId }) => elemId !== record.elemId);
    dispatch({ type: 'hotQuestion/addHot', payload: data });
  };

  componentDidMount() {
    const { deptCode } = this.props;
    this.queryForm.setFieldsValue({ attributionDepartment: deptCode });
    this.fetchList(deptCode);
  }

  fetchList = deptCode => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotQuestion/fetchList',
      payload: { type: 4, attributionDepartment: deptCode },
    });
  };

  render() {
    const columns = [
      {
        title: '????????????',
        dataIndex: 'elemName',
        width: '30%',
        render: (name, record) => {
          return <span style={{ color: name ? 'black' : 'red' }}>{name || record.elemId}</span>;
        },
      },
      {
        title: '????????????',
        dataIndex: 'regions',
        width: '10%',
        render: code => {
          const { dictNames } = this.props;
          return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
        },
      },
      {
        title: '????????????',
        dataIndex: 'isAbsent',
        render: text => hotIsAbsent.$v_names[text],
      },
      {
        title: '????????????',
        dataIndex: 'status',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '????????????',
        dataIndex: 'review',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '??????',
        dataIndex: 'operator',
        align: 'center',
        width: '300px',
        render: (text, record) => (
          <OperateBar>
            <OperateBar.Button
              danger
              disabled={!authCheck(authEnum.hotQuestion_delete, true, false) || !record.editable}
              icon={<RollbackOutlined />}
              confirmText="??????"
              confirmContent="????????????????"
              onClick={() => {
                this.deleteHot(record);
              }}
            >
              ??????
            </OperateBar.Button>
            <OperateBar.Button
              disabled={
                !authCheck(authEnum.hotQuestion_edit_alias, true, false) || !record.editable
              }
              icon={<ArrowUpOutlined />}
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({ type: 'hotQuestion/upGo', payload: record });
              }}
            >
              ??????
            </OperateBar.Button>
            <OperateBar.Button
              disabled={
                !authCheck(authEnum.hotQuestion_edit_alias, true, false) || !record.editable
              }
              icon={<ArrowDownOutlined />}
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({ type: 'hotQuestion/downGo', payload: record });
              }}
            >
              ??????
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list = [], loading } = this.props;
    return (
      <HotPage
        value="policy"
        queryItem={
          <QueryBarCard
            className={styles.createForm}
            onForm={form => {
              this.queryForm = form;
            }}
          >
            <TItem
              col={20}
              name="attributionDepartment"
              label="????????????"
              rules={[{ required: true, message: '????????????????????????' }]}
            >
              <DictSelect
                allowClear={false}
                onChange={code => {
                  this.fetchList(code);
                }}
                dict="SHGSBMSH"
                dictType="tree"
                showSearch
                treeNodeFilterProp="title"
              />
            </TItem>
          </QueryBarCard>
        }
        editForm={
          <QueryBarCard
            className={styles.createForm}
            onForm={form => {
              this.form = form;
            }}
          >
            <Col span={20}>
              <Row>
                <TItem name="policy" label="??????" rules={[Rules.required('????????????')]}>
                  <TSearchSelector type="policyLibrary" />
                </TItem>
              </Row>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                borderLeft: '1px solid #dddddd',
              }}
            >
              <TButton.Button
                disabled={!authCheck(authEnum.hotQuestion_edit_alias, true, false)}
                icon={<PlusOutlined />}
                size="large"
                style={{
                  margin: 'auto',
                }}
                onClick={this.addHot}
              >
                ??????
              </TButton.Button>
            </Col>
          </QueryBarCard>
        }
      >
        <TTable
          bordered
          className={styles.mainList}
          columns={columns}
          dataSource={list.filter(data => data.top === 1)}
          rowKey="elemId"
          loading={loading}
          title={() => (
            <TButton.Commit
              disabled={!authCheck(authEnum.hotQuestion_edit_alias, true, false)}
              onClick={() => {
                this.addForm();
              }}
              style={{ marginLeft: 'auto', display: 'block', width: '200px' }}
            >
              ??????
            </TButton.Commit>
          )}
        />
      </HotPage>
    );
  }
}

export default Index;
