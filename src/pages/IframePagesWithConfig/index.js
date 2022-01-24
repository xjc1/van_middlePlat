import React, { useEffect } from 'react';
import { Iframe } from '@/components/tis_ui';
import _ from 'lodash';
import { connect } from 'dva';
import Building from '../building';

function IframePages(props) {
  const {
    route: { target = '' },
    systemConfig,
    dispatch,
  } = props;
  const url = _.get(systemConfig, target);

  useEffect(() => {
    dispatch({
      type: 'systemParamsConfig/fetchConfig',
      code: target,
    });
  }, []);
  return url ? <Iframe src={url} key={url} /> : <Building />;
}

export default connect(({ systemParamsConfig }) => {
  return systemParamsConfig;
})(IframePages);
