import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { Button } from 'antd';
import Styles from './index.less';
import SubSystemConfig from "@/pages/subsystem/SubSystemConfig";
import SubSystemEdit from "@/pages/subsystem/SubSystemEdit";
import SubPageEdit from "@/pages/subsystem/SubPageEdit";

@connect(({ subsystem }) => subsystem)
class Index extends PureComponent {
  queryForm = null;

  state = {
    editSystem: null,
    editSubPage: null,
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'subsystem/fetchList'
    });
  }

  render() {
    const { editSystem, editSubPage } = this.state;
    const { systems = [] } = this.props;
    return (
      <div className={Styles.subsystem}>
        <div className={Styles.subsystemHeader}>
          <Button type="primary" onClick={() => {
            this.setState({ editSystem: {} });
          }}>添加子系统</Button>
        </div>
        {
          _.map(systems, (system) => {
            return <SubSystemConfig key={system.id}
                                    system={system}
                                    onPageEdit={(nextPage) => {
                                      this.setState({ editSubPage: nextPage });
                                    }}
                                    onEdit={(nextEditSystem) => {
                                      this.setState({ editSystem: nextEditSystem });
                                    }} />;
          })
        }
        {editSystem && <SubSystemEdit system={editSystem}
                                      onCancel={() => {
                                        this.setState({ editSystem: null });
                                      }} />}

        {
          editSubPage && <SubPageEdit page={editSubPage.page}
                                      system={editSubPage.system}
                                      onCancel={() => {
                                        this.setState({ editSubPage: null });
                                      }} />
        }
      </div>
    );
  }
}

export default Index;

