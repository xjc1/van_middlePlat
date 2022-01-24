import React, { PureComponent } from 'react';
import {
  QueryBarCard,
  TItem,
  TTable,
  TButton,
  OperateBar,
  FormRules as Rules,
} from '@/components/tis_ui';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import { Select, Row, Col } from 'antd';
import authEnum, { authCheck } from '@/utils/auth';
import _ from 'lodash';
import {
  RollbackOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { commonYesNo, hotIsAbsent } from '@/utils/constantEnum';
import { connect } from 'dva';
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
      type: 0,
      attributionDepartment,
    };
    dispatch({
      type: 'hotQuestion/saveHotEvent',
      payload: { req_body, type: 0, attributionDepartment },
    });
  };

  addHot = () => {
    const { dispatch, list } = this.props;
    this.form.validateFields().then(vals => {
      const infos = vals.qa.map(item => ({
        elemId: item.value,
        objectType: vals.objectType,
        top: 1,
        tourist: vals.tourist ? vals.tourist : 0,
        isAbsent: 1,
        editable: true,
        elemName: item.label.split('_')[0],
        regions: item.label.split('_')[1],
      }));
      const newData = _.concat(infos, list);
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
    const { dispatch, deptCode } = this.props;
    this.queryForm.setFieldsValue({ attributionDepartment: deptCode });
    this.fetchList(deptCode);
    dispatch({ type: 'hotQuestion/fetchDict', payload: { code: 'DXLX0001' } });
  }

  fetchList = deptCode => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotQuestion/fetchList',
      payload: { type: 0, attributionDepartment: deptCode },
    });
  };

  render() {
    const { list = [], loading } = this.props;
    const columns = [
      {
        title: '问题名称',
        dataIndex: 'elemName',
        width: '25%',
        key: 'elemName',
        render: (name, record) => {
          return <span style={{ color: name ? 'black' : 'red' }}>{name || record.elemId}</span>;
        },
      },
      {
        title: '行政区划',
        dataIndex: 'regions',
        width: '8%',
        render: code => {
          const { dictNames } = this.props;
          return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
        },
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        width: '8%',
        render: code => {
          const { dictNames } = this.props;
          return dictNames.DXLX0001[code];
        },
        key: 'objectType',
      },
      {
        title: '游客问题',
        dataIndex: 'tourist',
        render: text => commonYesNo.$v_names[text],
        key: 'tourist',
      },
      {
        title: '是否缺失',
        dataIndex: 'isAbsent',
        width: '8%',
        render: text => hotIsAbsent.$v_names[text],
        key: 'isAbsent',
      },
      {
        title: '是否上架',
        dataIndex: 'status',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '是否审核',
        dataIndex: 'review',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '操作',
        dataIndex: 'operator',
        align: 'center',
        width: '300px',
        key: 'operator',
        render: (text, record) => (
          <OperateBar>
            <OperateBar.Button
              danger
              disabled={!authCheck(authEnum.hotQuestion_delete, true, false) || !record.editable}
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="确定删除吗?"
              onClick={() => {
                this.deleteHot(record);
              }}
            >
              删除
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
              上移
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
              下移
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    return (
      <HotPage
        value="question"
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
              label="归属部门"
              rules={[{ required: true, message: '归属部门不能为空' }]}
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
                <TItem name="qa" label="问答" rules={[Rules.required('问答必选')]}>
                  <TSearchSelector type="synonym" />
                </TItem>
                <TItem name="objectType" label="对象类型" rules={[Rules.required('对象类型必填')]}>
                  <DictSelect
                    dict="DXLX0001"
                    treeNodeFilterProp="title"
                    showSearch
                    dictType="tree"
                  />
                </TItem>
                <TItem name="tourist" label="游客问题">
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
                添加
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
              提交
            </TButton.Commit>
          )}
        />
      </HotPage>
    );
  }
}

export default Index;
