import React, { PureComponent } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { qaSettingName } from '@/utils/constantEnum';
import SynonymsSettingList from './SynonymsSettingList';
import styles from './synonymsSetting.less';

const settingList = _.map(qaSettingName, (v, k) => ({
  id: v,
  code: v,
  name: qaSettingName.$names[k],
}));

@connect(({ synonymsSetting }) => synonymsSetting)
class Index extends PureComponent {
  queryForm = null;

  state = {
    list: settingList,
  };

  filterList = (query = {}) => {
    const { list = [] } = this.state;
    const filtered = _.filter(list, query);
    this.setState({ list: filtered });
  };

  render() {
    return (
      <div>
        <SynonymsSettingList className={styles.synonymsSettingList} dataSource={this.state.list} />
      </div>
    );
  }
}

export default Index;
