/**/
export default {
  $hidden(params) {},

  $visible(params) {},

  $remove(params) {},

  $empty(params) {},

  $reset(params) {},

  preEvent({ $http, $ctx, $preUrl = '' }) {
    $ctx.$http
      .request({
        url: $preUrl,
        method: 'GET',
      })
      .then(function({ data }) {
        return {
          aaa: data.cdd,
          bbb: data.sscsc.ddt,
        };
      });
  },
};
/**/
