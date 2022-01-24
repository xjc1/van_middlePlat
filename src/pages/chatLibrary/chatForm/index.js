import React from 'react';
import EditChartForm from './EditChartForm';
import { connect } from 'dva';

@connect(({ chatLibrary }) => chatLibrary)
class Index extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    const { query = {} } = location;
    if (query.id) {
      dispatch({
        type: 'chatLibrary/fetchForm',
        payload: { id: query.id },
      });
    } else {
      dispatch({
        type: 'chatLibrary/newForm',
      });
    }
  }

  render() {
    return <EditChartForm />;
  }
}

export default Index;
