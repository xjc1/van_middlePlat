import React, { useContext } from 'react';
import Styles from './golden.less';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RegionsContext from './RegionsContext';

function Region({ id, children }) {
  const { activeKey } = useContext(RegionsContext);
  return (
    <div className={classNames(Styles.goldenRegion, id === activeKey && Styles.active)}>
      {children}
    </div>
  );
}

Region.defaultProps = {};

Region.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Region;
