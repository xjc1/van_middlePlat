import React from 'react';
import EditServicePage from './EditServicePage';

function ViewServicePage(props) {
  return (
    <EditServicePage disabled {...props} />
  );
}

export default ViewServicePage;
