import React, { useEffect } from 'react';
import img from '../jumpPage/undraw_content_vbqo.png';

function Index({ route }) {
  useEffect(() => {
    const { url } = route;
    window.open(url);
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
