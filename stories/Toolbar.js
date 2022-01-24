import React, { useEffect, useState } from 'react';
import { EXButton } from '@/components/tis_ui';
import { AUTH } from '@/services/api';

function Toolbar(props) {
  const [login, setLogin] = useState(() => () => {
    AUTH.loginUsingPOST({ body: { username: 'admin', password: '123456' } }).then(
      ({ token, user }) => {
        localStorage.setItem('token', token);
      },
    );
  });

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <EXButton
        style={{
          display: 'block',
        }}
        onClick={() => {
          login();
        }}
      >
        {' '}
        模拟登陆{' '}
      </EXButton>
    </div>
  );
}

export default Toolbar;
