import React from 'react';

function DetailPanel({ width, children, className }) {
  return (
    <div className={className} style={{ width }}>
      {children}
    </div>
  );
}

export default DetailPanel;
