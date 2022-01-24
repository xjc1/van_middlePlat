import React, { useEffect } from 'react';
import route from 'umi/router'

function RedirectPage(props) {
  useEffect(() => {
      const { query = {} } = props.location;
      const { token } = query;
      localStorage.setItem('token', token);
      localStorage.setItem('loginType', 'sso');
      route.push('/');
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
     {''}
    </div>
  );
}

export default RedirectPage;
