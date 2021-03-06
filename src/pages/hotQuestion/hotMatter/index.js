import React, { PureComponent } from 'react';
import HotPage from '../HotPage';
import {
  QueryBarCard,
  TItem,
  TTable,
  TButton,
  OperateBar,
  FormRules as Rules,
} from '@/components/tis_ui';
import { Col, Row, Select } from 'antd';
import styles from '../hot.less';
import _ from 'lodash';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { commonYesNo, hotIsAbsent } from '@/utils/constantEnum';
import { connect } from 'dva';
import authEnum, { authCheck } from '@/utils/auth';
import { DictSelect } from '@/components/bussinessComponents';
import AddMatters from '../../scenes/editScenes/components/basicinfo/AddMatters';

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
      type: 2,
      attributionDepartment,
    };
    dispatch({
      type: 'hotQuestion/saveHotEvent',
      payload: { req_body, type: 2, attributionDepartment },
    });
  };

  addHot = () => {
    const { dispatch, list } = this.props;
    this.form.validateFields().then(vals => {
      const newData = _.concat(
        vals.matter.map(item => ({
          elemId: item.key,
          top: 1,
          tourist: vals.tourist ? vals.tourist : 0,
          isAbsent: 1,
          editable: true,
          elemName: item.label,
          regions: item.regions,
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
      payload: { type: 2, attributionDepartment: deptCode },
    });
  };

  render() {
    const columns = [
      {
        title: '????????????',
        dataIndex: 'elemName',
        width: '30%',
        render: (name, record) => {
          return (
            <span style={{ color: name ? 'black' : 'red' }}>
              {name ? name.split(',').join('_') : record.elemId}
            </span>
          );
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
        dataIndex: 'tourist',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '????????????',
        dataIndex: 'isAbsent',
        width: '10%',
        render: text => hotIsAbsent.$v_names[text],
      },
      {
        title: '????????????',
        dataIndex: 'status',
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
        value="matter"
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
            initialValues={{ tourist: 0 }}
          >
            <Col span={20}>
              <Row>
                <TItem name="matter" label="????????????" rules={[Rules.required('??????')]}>
                  <AddMatters disabled={!authCheck(authEnum.hotQuestion_edit_alias, true, false)} />
                </TItem>
                <TItem name="tourist" label="????????????">
                  <Select>
                    {_.map(commonYesNo, (v, k) => (
                      <Select.Option value={v} key={k}>
                        {commonYesNo.$v_names[v]}
                      </Select.Option>
                    ))}
                  </Select>
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
