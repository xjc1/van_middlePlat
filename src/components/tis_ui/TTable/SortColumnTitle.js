/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Styles from './SortColumnTitle.less';
import classNames from 'classnames';
import EmptyFn from '../utils/EmptyFn';

const SORT_TYPE = {
  ascend: 1, // 上升
  descend: 0, // 下降
};

function SortColumnTitle({ title, defaultSort, onSort = EmptyFn, onCancel = EmptyFn }) {
  const [sort, setSort] = useState(defaultSort);

  return (
    <div className={Styles.SortColumnTitle}>
      <span className={Styles.title}>{title}</span>
      <CaretUpOutlined
        onClick={() => {
          if (sort !== SORT_TYPE.ascend) {
            onSort(SORT_TYPE.ascend);
            setSort(SORT_TYPE.ascend);
            return;
          }
          setSort(null);
          onCancel();
        }}
        className={classNames(Styles.arrowIcon, sort === SORT_TYPE.ascend && Styles.active)}
      />
      <CaretDownOutlined
        onClick={() => {
          if (sort !== SORT_TYPE.descend) {
            onSort(SORT_TYPE.descend);
            setSort(SORT_TYPE.descend);
            return;
          }
          setSort(null);
          onCancel();
        }}
        className={classNames(Styles.arrowIcon, sort === SORT_TYPE.descend && Styles.active)}
      />
    </div>
  );
}

SortColumnTitle.defaultProps = {
  defaultSort: {}
};

export default SortColumnTitle;
