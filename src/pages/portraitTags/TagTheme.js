import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tree, Input } from 'antd';
import { TButton, confirmAble } from '@/components/tis_ui';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ThemeTagForm from './themeTagForm';
import styles from '@/pages/menuSetting/components/index.less';
import { TAGTHEME } from '@/services/api';
import _ from 'lodash';

@connect(({ tagTheme, portraitTags, portraitTagBulk }) => ({
  ...tagTheme,
  ...portraitTags,
  ...portraitTagBulk,
}))
class tagTheme extends PureComponent {
  queryForm = null;

  state = {
    themeTag: null,
    filterList: [],
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'tagTheme/fetchList' });
  };

  editThemeTag = item => {
    TAGTHEME.getTagThemeDetailUsingGET(item.id).then(data => {
      this.setState({ themeTag: data });
    });
  };

  deleteThemeTag = item => {
    const { dispatch } = this.props;
    const { name, id } = item;
    const warning = confirmAble({
      confirmText: '警告',
      confirmContent: `您确定要删除[${name}]吗?`,
      onClick: () => {
        dispatch({ type: 'tagTheme/deleteThemeTag', id });
      },
    });
    warning();
  };

  onChange = value => {
    const { treeData = [] } = this.props;
    const filterList = treeData
      .map(item => {
        const { children = [], name, id } = item;
        const filterData = children.filter(({ categoryName }) =>
          categoryName.match(new RegExp(value)),
        );
        if (filterData && filterData.length > 0) {
          const total = _.reduce(filterData, (result, { count }) => result + count, 0);
          return {
            ...item,
            id,
            themeId: id,
            children: filterData.map(it => ({ ...it, themeId: id })),
            title: `${name}(${total})`,
          };
        }
        return null;
      })
      .filter(item => item);
    this.setState({ filterList });
  };

  onSelect = (key, { node }) => {
    const { categoryName, themeId } = node;
    const { dispatch } = this.props;
    const params = { page: 0, size: 10 };
    dispatch({
      type: 'portraitTags/setQuery',
      query: { category: categoryName, themeId },
    });
    dispatch({
      type: 'portraitTags/fetchList',
      params,
      body: { category: categoryName, themeId },
    });
  };

  treeNote = list => {
    return list.map(item => {
      if (item.name !== '全部') {
        return {
          ...item,
          title: (
            <span className={styles.tree_item}>
              <span>{item.title}</span>
              <div
                style={{
                  float: 'right',
                  lineHeight: '24px',
                }}
              >
                <EditOutlined
                  title="编辑主题标签"
                  style={{ position: 'absolute', right: 30 }}
                  onClick={() => this.editThemeTag(item)}
                />
                <DeleteOutlined
                  title="删除主题标签"
                  style={{ position: 'absolute', right: 10, color: 'red' }}
                  onClick={() => this.deleteThemeTag(item)}
                />
              </div>
            </span>
          ),
        };
      }
      return item;
    });
  };

  render() {
    const { themeTag, filterList } = this.state;
    const { treeData = [] } = this.props;
    return (
      <div>
        <Input.Search placeholder="请输入要搜索的标签" allowClear onSearch={this.onChange} />
        <TButton.Create
          onClick={() => this.setState({ themeTag: {} })}
          style={{ margin: '10px 0' }}
        >
          新增主题标签
        </TButton.Create>
        <Tree
          height={800}
          showLine
          blockNode
          defaultExpandedKeys={['0-0-0']}
          onSelect={this.onSelect}
          treeData={this.treeNote(filterList.length > 0 ? filterList : treeData)}
        />
        {themeTag && (
          <ThemeTagForm initialValues={themeTag} close={() => this.setState({ themeTag: null })} />
        )}
      </div>
    );
  }
}

export default tagTheme;
