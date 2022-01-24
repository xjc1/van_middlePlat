import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Styles from './golden.less';
import { CloseOutlined } from '@ant-design/icons';
import RegionsContext from '@/layouts/goldenLayout/RegionsContext';
import { EmptyFn } from '@/components/tis_ui';

function Regions({
  divider_r,
  divider_l,
  divider_t,
  divider_b,
  width,
  onRegionChange = EmptyFn,
  children,
}) {
  const [activeKey, setActiveKey] = useState(null);
  const regions = _.isArray(children) ? children : [children];
  const tabs = _.map(regions, ({ props }) => {
    const { name, id } = props;
    return {
      name,
      id,
    };
  });

  useEffect(() => {
    const [firstTab] = tabs;
    setActiveKey(firstTab.id);
  }, []);

  useEffect(() => {
    onRegionChange(activeKey);
  }, [activeKey]);

  return (
    <RegionsContext.Provider
      value={{
        activeKey,
        setActiveKey,
      }}
    >
      <div
        className={classNames(
          Styles.goldenRegions,
          divider_r && Styles.divider_r,
          divider_l && Styles.divider_l,
          divider_t && Styles.divider_t,
          divider_b && Styles.divider_b,
        )}
        style={{
          flex: width && 'none',
          width,
        }}
      >
        <div className={Styles.header}>
          <ul className={Styles.tabs}>
            {_.map(tabs, ({ name, id }) => {
              return (
                <li
                  key={id}
                  className={classNames(Styles.tab, id === activeKey && Styles.active)}
                  onClick={() => {
                    setActiveKey(id);
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>

          <ul className={Styles.controls}>
            <li className={Styles.control}>
              <CloseOutlined />
            </li>
          </ul>
        </div>
        <div className={Styles.content}>{regions}</div>
      </div>
    </RegionsContext.Provider>
  );
}

Regions.defaultProps = {
  divider_r: false,
  divider_l: false,
  divider_t: false,
  divider_b: false,
};

Regions.propTypes = {
  divider_r: PropTypes.bool,
  divider_l: PropTypes.bool,
  divider_t: PropTypes.bool,
  divider_b: PropTypes.bool,
};

export default Regions;
