import _ from 'lodash';

/*
 * 根据路由进行数据的缓存和回溯功能.
 * 功能: 能够识别出当前路由是否是上一次路由的子路由, 用于编辑页面回到上级页面时,能够恢复上级页面.
 * 原理: 全局维护一个两个长度的数据, 记录最近两次路由.根据路由indexOf对比判断是否是上次路由的子路由,
 *      并决定是否缓存数据和返回缓存数据.
 * */
class TrackTool {
  paths = new Array(2).fill('');

  trackQuery = [];

  setPath(path) {
    this.paths = _.tail([...this.paths, path]);
  }

  isTraceBack() {
    const [last, current] = this.paths;
    return last !== current && last.indexOf(current) > -1;
  }

  // 缓存查询条件
  cacheAndGetQuery(query) {
    const [lastPath, currentPath] = this.paths;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [path, lastQuery] = this.trackQuery;
    if (this.isTraceBack()) {
      this.trackQuery = [currentPath, lastQuery];
      this.setPath(currentPath);
      return lastQuery || query;
    }
    const nextQuery = lastPath === currentPath ? { ...lastQuery, ...query } : query;
    this.setPath(currentPath);
    this.trackQuery = [currentPath, nextQuery];
    return nextQuery;
  }

  getQueryParamsCache() {
    if (this.isTraceBack()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [path, lastQuery = {}] = this.trackQuery;
      const { params, body } = lastQuery;
      return { ...params, ...body };
    }
    return {};
  }
}

const trackToolInstance = new TrackTool();

export default trackToolInstance;
