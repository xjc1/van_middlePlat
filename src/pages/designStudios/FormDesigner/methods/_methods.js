// 本页面为自动生成, 不要修改
export default function() {
  return `{
  $hidden: function $hidden(params) {},
  $visible: function $visible(params) {},
  $remove: function $remove(params) {},
  $empty: function $empty(params) {},
  $reset: function $reset(params) {},
  preEvent: function preEvent(_ref) {
    var $http = _ref.$http,
        $ctx = _ref.$ctx,
        _ref$$preUrl = _ref.$preUrl,
        $preUrl = _ref$$preUrl === void 0 ? '' : _ref$$preUrl;
    $ctx.$http.request({
      url: $preUrl,
      method: 'GET'
    }).then(function (_ref2) {
      var data = _ref2.data;
      return {
        aaa: data.cdd,
        bbb: data.sscsc.ddt
      };
    });
  }
}`;
}

const methodConst = {
  $hidden: '$hidden',
  $visible: '$visible',
  $remove: '$remove',
  $empty: '$empty',
  $reset: '$reset',
  preEvent: 'preEvent',
};

export { methodConst };
