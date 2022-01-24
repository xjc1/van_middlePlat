import React, { PureComponent } from 'react';
import { connect } from "dva";
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined, RollbackOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import router from "umi/router";
import { commonYesNo, appUserType, policyUpDownStatus } from '@/utils/constantEnum';
import EllipsisToolTip from './EllipsisToolTip';

@connect(({ projectView, loading }) => ({
  ...projectView,
  loading: loading.effects["projectView/fetchList"]
}))
class ProjectViewList extends PureComponent {

  render() {
    const { list, total, pageSize, pageNum, dispatch, onPageSizeChange = EmptyFn, className, dictList = {}, loading }
      = this.props;
    const columns = [
      {
        title: '项目一览名称',
        dataIndex: 'name',
        width: "15%",
        onCell: () => ({ style: { whiteSpace: 'nowrap', maxWidth: 150 } }),
        render: text => <EllipsisToolTip title={text}>{text}</EllipsisToolTip>
      },
      {
        title: '项目一览分类',
        dataIndex: 'classification',
        width: "20%",
        onCell: () => ({ style: { whiteSpace: 'nowrap', maxWidth: 200 } }),
        render: text => {
          if (text && text.length > 0) {
            const { id } = text[0];
            const result = dictList[id] && dictList[id].map(({ name }) => name).join('/');
            return <EllipsisToolTip title={result}>{result}</EllipsisToolTip>;
          }
        }
      },
      {
        title: '实施机关',
        dataIndex: 'departments',
        width: "15%",
        render: text => {
          return text && text.length > 0 && text[0]["deptName"];
        }
      },
      {
        title: '关联体检',
        dataIndex: 'configExam',
        render: text => commonYesNo.$v_names[text]
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        render: text => appUserType.$v_names[text]
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        render: text => policyUpDownStatus.$v_names[text]
      },
      {
        title: '操作',
        dataIndex: 'operator',
        align: 'center',
        width: 200,
        render: (text, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    //  router.push(`/content/policyKnowledgeLib/projectView/edit/${record.id}`)
                  }}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="警告"
                  onClick={() => {
                    const { status, id } = record;
                    dispatch({
                      type: status && status === 1 ? "projectView/down" : "projectView/publish",
                      id
                    });
                  }
                  }
                  confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                >
                  {record.status === 1 ? '下架' : '上架'}
                </OperateBar.Button>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    /*
                    router.push(
                      `/content/policyKnowledgeLib/projectView/projectExam/${record.id}`,
                    )
                    * */
                  }}
                >
                  体检
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={
                    () => dispatch({ type: "projectView/deleteProjectView", id: record.id })
                  }
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                // router.push(`/content/policyKnowledgeLib/projectView/view/${record.id}`)
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize });
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default ProjectViewList;

