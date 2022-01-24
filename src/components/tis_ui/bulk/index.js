/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OperateBar from '../OperateBar';
import ModalForm from '../Form/ModalForm';
import style from './index.less';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
import emptyFn from '../utils/EmptyFn';

class Index extends PureComponent {
  createForm = React.createRef();

  static propTypes = {
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
    onForm: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    initialValues: PropTypes.object,
    tableOptions: PropTypes.object.isRequired,
    searchPlaceholder: PropTypes.string,
    showSearch: PropTypes.bool,
    leftExtra: PropTypes.object,
    onBulk: PropTypes.func,
  };

  static defaultProps = {
    initialValues: {},
    leftExtra: null,
    onBulk: emptyFn,
    searchPlaceholder: '请输入并点击搜索',
    handleDelete: null,
    handleSubmit: null,
    showSearch: true,
  };

  state = {
    leftSelectKeys: [],
    leftSelectData: [],
    rightData: [],
    rightKeys: [],
    modalVisible: false,
  };

  onLeftSelectChange = selectedKeys => {
    const {
      tableOptions: { list = [] },
    } = this.props;
    const { leftSelectData } = this.state;
    const data = list.filter(it => selectedKeys.indexOf(it.id) > -1);
    const newSelectedData = _.uniqBy([...leftSelectData, ...data], 'id');
    this.setCheckedKeysAndDdata(selectedKeys, newSelectedData);
  };

  setCheckedKeysAndDdata = (selectedKeys, selectedData) => {
    this.setState({ leftSelectKeys: selectedKeys, leftSelectData: selectedData });
  };

  // 从左边添加到右边

  leftToRight = selectedKeys => {
    const { rightData, leftSelectData } = this.state;
    const data = leftSelectData.filter(it => selectedKeys.indexOf(it.id) > -1);
    const newRightData = _.uniqBy([...rightData, ...data], 'id');
    const keys = newRightData.map(item => item.id);
    this.setState({
      rightData: newRightData,
      rightKeys: keys,
      leftSelectKeys: [],
      leftSelectData: [],
    });
  };

  onEdit = () => {
    this.setState({ modalVisible: true });
  };

  onDelete = id => {
    const { rightData } = this.state;
    const newRightData = rightData.filter(it => id !== it.id);
    const newRightKeys = newRightData.map(item => item.id);
    this.setState({ rightData: newRightData, rightKeys: newRightKeys });
  };

  handleCancel = () => this.setState({ modalVisible: false });

  // 清除右侧数据
  clearRightData = () => this.setState({ rightKeys: [], rightData: [] });

  onSubmit = () => {
    const { handleSubmit } = this.props;
    const { rightKeys } = this.state;
    handleSubmit(rightKeys, this.handleCancel, this.clearRightData);
  };

  // 批量删除
  bulkDelete = () => {
    const { handleDelete } = this.props;
    const { rightKeys } = this.state;
    handleDelete(rightKeys, this.clearRightData);
  };

  render() {
    const {
      tableOptions,
      onSearch,
      showSearch,
      children,
      title,
      initialValues,
      onForm,
      searchPlaceholder,
      handleDelete,
      leftExtra,
      handleSubmit,
      onBulk,
    } = this.props;
    const { list, loading, columns, pagination, pagination_right } = tableOptions;
    const showBulkDelete = !!handleDelete;
    const showBulkEdit = !!handleSubmit;
    const leftColums = columns.filter(it => it.display !== 'right');
    const rightSide = columns.filter(it => it.display !== 'left');
    // 绑定操作
    onBulk({ setCheckedKeysAndDdata: this.setCheckedKeysAndDdata });
    const rightColumns = [
      ...rightSide,
      {
        title: '操作',
        dataIndex: 'operation',
        show: true,
        width: 100,
        align: 'center',
        render: (text, record) => {
          return (
            <OperateBar>
              <OperateBar.Button onClick={() => this.onDelete(record.id)}>取消</OperateBar.Button>
            </OperateBar>
          );
        },
      },
    ];
    return (
      <div className={classNames(style.splitPage)}>
        <LeftCard
          extra={leftExtra}
          title={title}
          showSearch={showSearch}
          onSearch={onSearch}
          onSelectChange={this.onLeftSelectChange}
          selectedKeys={this.state.leftSelectKeys}
          rightKeys={this.state.rightKeys}
          leftToRight={this.leftToRight}
          loading={loading}
          columns={leftColums}
          searchPlaceholder={searchPlaceholder}
          pagination={pagination}
          list={list}
        />

        <RightCard
          title="已选数据"
          list={this.state.rightData}
          columns={rightColumns}
          pagination={pagination_right}
          onEdit={this.onEdit}
          onDelete={this.bulkDelete}
          showBulkEdit={showBulkEdit}
          showBulkDelete={showBulkDelete}
        />
        {this.state.modalVisible && (
          <ModalForm
            onForm={onForm}
            initialValues={initialValues}
            visible
            title="批量编辑"
            preserve={false}
            maskClosable={false}
            handleCancel={this.handleCancel}
            width="50%"
            footer={
              <div>
                <Button onClick={this.handleCancel}>取消</Button>
                <Button type="primary" onClick={this.onSubmit}>
                  提交
                </Button>
              </div>
            }
          >
            {children}
          </ModalForm>
        )}
      </div>
    );
  }
}

export default Index;
