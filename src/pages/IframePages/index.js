import React, { useState, useEffect } from 'react';
import { Iframe } from '@/components/tis_ui';
import Building from '../building';

function IframePages(props) {
  const { location = { pathname: '/' }, route: { target = '' } } = props;
  const [src, setSrc] = useState(null);

  useEffect(() => {
    setSrc(`${target}?token=${localStorage.token}`);
  }, [location.pathname]);
  return src ? <Iframe src={src} key={src} /> : <Building />;
}

export default IframePages;
