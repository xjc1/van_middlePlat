import Mock from 'mockjs';

const data = Mock.mock({
  'list|15-30': [
    {
      name: '@cname(2, 5)',
      age: '@integer(1, 100)',
      'key|+1': 1,
    },
  ],

  'select|1-5': [
    {
      key: '@string(4, 10)',
      label: '@name()'
    }
  ]
});

export default data;
