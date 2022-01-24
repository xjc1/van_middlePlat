import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { OperateBar } from '@/components/tis_ui';
import EditSynonymsSetting from './editSynonymsSetting';

@connect(({ synonymsSetting }) => synonymsSetting)
class SynonymsSettingList extends PureComponent {
  state = {
    setting: null,
  };

  columns = [
    {
      title: '配置名称',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: '配置代码',
      dataIndex: 'code',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <OperateBar>
         <OperateBar.Button icon={<EditOutlined />} onClick={() => this.handleEdit(record.code)}>
            编辑
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleEdit = type => {
    this.setState({ setting: type });
  };

  render() {
    const { className, dataSource = [] } = this.props;
    const { setting } = this.state;

    return (
      <div className={className}>
        <Table columns={this.columns} dataSource={dataSource} pagination={false} rowKey="id" />

        {setting && (
          <EditSynonymsSetting type={setting} finish={() => this.setState({ setting: null })} />
        )}
      </div>
    );
  }
}

export default SynonymsSettingList;
