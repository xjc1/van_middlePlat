import React, { useState, useEffect } from 'react';
import { Iframe } from '@/components/tis_ui';
import Building from '../building';

function iframeSystemPage({ route }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    setSrc(`${route.url}?token=${localStorage.token}`);
  }, []);

  return src ? <Iframe src={src} key={route.rName} /> : <Building />;
}

export default iframeSystemPage;
