import React from 'react';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import { Card, Col, List, Row } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';

const projectGroups = [
  { id: 0, name: '独立项目' },
  { id: 1, name: '运营工具类' },
];
const projectList = [
  { id: 0, name: '运营中台' },
  { id: 1, name: '居民码' },
];

function Index(props) {
  const { dispatch } = props;

  function handleSelectGroup(groupId) {
    dispatch({
      type: 'apiManage/saveGroup',
      group: groupId,
    });
  }

  function handleSelectProject(projectId) {
    dispatch({
      type: 'apiManage/saveProject',
      project: projectId,
    });
  }

  return (
    <div className={layoutStyles.twoGridPage}>
      <div className={layoutStyles.leftGrid}>
        <h1>项目分组</h1>
        <List>
          {projectGroups.map((group = {}) => (
            <List.Item
              key={group.id}
              className={styles.linkBtn}
              onClick={() => handleSelectGroup(group.id)}
            >
              {group.name}
            </List.Item>
          ))}
        </List>
      </div>
      <div className={layoutStyles.rightGrid} style={{ padding: '10px', background: '#fff' }}>
        <h1>项目列表</h1>
        <Row gutter={16}>
          {projectList.map((project = {}) => (
            <Col key={project.id} span={6}>
              <Card
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => handleSelectProject(project.id)}
              >
                {project.name}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default connect(({ apiManage }) => apiManage)(Index);
