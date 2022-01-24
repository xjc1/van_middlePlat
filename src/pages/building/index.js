import React from 'react';
import img from './undraw_data_processing_yrrv.png';
import { Typography } from 'antd';

const { Title } = Typography;

function Index(props) {
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
        <Title level={2} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
          建设中, 敬请期待....
        </Title>
      </div>
    </div>
  );
}

export default Index;
