import React, { useEffect } from 'react';
import img from './undraw_content_vbqo.png';
import { SYS } from '@/services/api';

function Index() {
  useEffect(() => {
    SYS.getSystemConfigUsingGET({ params: { code: 'onefomrmanager' } }).then(
      ({ onefomrmanager }) => {
        console.info(onefomrmanager);
        window.open(onefomrmanager);
      },
    );
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'block',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <img
          src={img}
          alt=""
          style={{
            width: 400,
          }}
        />
      </div>
    </div>
  );
}

export default Index;
