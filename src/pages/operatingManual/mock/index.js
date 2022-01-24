/* eslint-disable import/no-extraneous-dependencies */
import Mock from 'mockjs';

export default Mock.mock({
  'list|20-100': [
    {
      'id|+1': 111111, 
      name: '@ctitle(2, 40)',
      createTime: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
})
