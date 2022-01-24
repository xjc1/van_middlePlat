import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DataImport } from '@/components/tis_ui';
import { DICT } from '@/services/api';
import {
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
// import DictModal from './dictForm';
import { pageStatus as pageEnum, dictStatus, asyncExportArguments } from '@/utils/constantEnum';
import { dictTemplateUrl, dictImportUrl, dictExportUrl } from '@/constants';
import { message, Tooltip, Popover, Typography } from 'antd';
import commonDownload from '@/services/commonDownload';
import _ from 'lodash';
import { AsyncExportFile } from '@/components/bussinessComponents';

import DictManageQueryBar from './DictManageQueryBar';
import DictManageList from './DictManageList';
import styles from './dictManage.less';
import DictFormModal from './dictForm';
import ErrorListModal from './components/ErrorListModal';

@connect(({ dictManage }) => dictManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    dictModalConfig: {
      pageStatus: -1,
    },
    errorModalData: null,
  };

  tableColumnTitle_dictPath = (
    <span>
      字典路径&nbsp;
      <Tooltip title="点击查看中文路径">
        <QuestionCircleOutlined />
      </Tooltip>
    </span>
  );

  columns = [
    {
      title: '字典名称',
      dataIndex: 'name',
    },
    {
      title: this.tableColumnTitle_dictPath,
      dataIndex: 'path',
      ellipsis: true,
      render: (path, record) => (
        <Popover
          trigger="click"
          overlayStyle={{ width: '500px' }}
          content={
            <>
              编码路径：
              <Typography.Paragraph copyable>{record.path}</Typography.Paragraph>
              中文路径：
              <Typography.Paragraph copyable>{record.pathName}</Typography.Paragraph>
            </>
          }
        >
          <span className={styles.dictPath}>{path}</span>
        </Popover>
      ),
    },
    {
      title: '字典编码',
      dataIndex: 'code',
      width: '15%',
    },
    {
      title: '父级字典编码',
      dataIndex: 'parentcode',
      width: '15%',
    },
    {
      title: '字典状态',
      dataIndex: 'status',
      width: '10%',
      render: text => dictStatus.$v_names[text],
    },
    {
      title: '字典序号',
      dataIndex: 'sort',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      align: 'center',
      render: (text, record) => {
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => this.onEdit(record, pageEnum.edit)}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={() => this.onDelete(record.id)}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.onEdit(record, pageEnum.view)}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchDictManage({});
  }

  fetchDictManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchDictManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'dictManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  handleCandel = () => {
    this.setState({ dictModalConfig: { pageStatus: -1 } });
  };

  onCreate = () => {
    this.setState({ dictModalConfig: { pageStatus: pageEnum.new } });
  };

  showErrrorDict = () => {
    DICT.getErrorDictUsingGET().then(data => {
      this.setState({ errorModalData: data });
    });
  };

  onErrorModalCancel = () => {
    this.setState({ errorModalData: null });
  };

  handelSubmit = (vas, id, rootId) => {
    const { parentId: ids = [] } = vas;
    const parentObj = ids[ids.length - 1] || {};
    const parentId = parentObj.value;
    const inputRootId = _.get(parentObj, 'parents[0].value') || parentObj.value;
    const recordRootId = rootId || inputRootId;
    if (id) {
      DICT.updateDictionaryUsingPOST({ body: { ...vas, id, parentId, rootId: recordRootId } }).then(
        () => {
          message.success('修改成功');
          this.handleCandel();
          this.fetchDictManageWithQuery({});
        },
      );
    } else {
      DICT.createDictionaryUsingPOST({ body: { ...vas, parentId, rootId: recordRootId } }).then(
        () => {
          message.success('新建成功');
          this.handleCandel();
          this.fetchDictManageWithQuery({});
        },
      );
    }
  };

  onEdit = (record, status) => {
    this.setState({
      dictModalConfig: { initData: record, pageStatus: status },
    });
  };

  onDelete = id => {
    DICT.deleteDictionaryUsingPOST(id, {}).then(() => {
      message.success('操作成功');
      this.fetchDictManageWithQuery({});
    });
  };

  reload = () => {
    const { pageNum, pageSize } = this.props;
    this.fetchDictManage({ page: pageNum, size: pageSize });
  };

  // 数据导出
  export = async () => {
    const { query } = this.state;
    message.loading('下载中');
    await commonDownload({
      url: dictExportUrl,
      name: '字典数据.xlsx',
      method: 'POST',
      condition: query,
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    message.loading('下载中');
    await commonDownload({ url: dictTemplateUrl, name: '字典导入模板.xlsx' });
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      DICT.asyncExportDictionariesUsingPOST({
        body: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const { dictModalConfig, errorModalData } = this.state;
    const { pageStatus: modalStatus } = dictModalConfig;
    return (
      <div>
        <DictManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create onClick={this.onCreate}>新增字典</TButton.Create>
              <TButton.List onClick={this.showErrrorDict}>异常字典</TButton.List>
              <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>

              <DataImport
                btnText="导入"
                action={dictImportUrl}
                refresh={() => this.fetchDictManageWithQuery({})}
              />

              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.dictionary}
                btnText="字典导出"
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchDictManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchDictManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <DictManageList
          columns={this.columns}
          className={styles.dictManageList}
          onPageSizeChange={this.fetchDictManage}
        />
        {modalStatus > -1 && (
          <DictFormModal
            onFinish={this.handelSubmit}
            modalConfig={dictModalConfig}
            onCancel={this.handleCandel}
          />
        )}
        {errorModalData && (
          <ErrorListModal onCancel={this.onErrorModalCancel} list={errorModalData} />
        )}
      </div>
    );
  }
}

export default Index;
