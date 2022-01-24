import React, { useContext } from 'react';
import Styles from './styles.less';
import NoDataImg from './nodata.png';
import RegionsContext from '@/layouts/goldenLayout/RegionsContext';

function EmptyPage() {
  const { setActiveKey } = useContext(RegionsContext);

  return (
    <div className={Styles.emptyPages}>
      <div>
        <img src={NoDataImg} alt="无数据" />
      </div>
      <p className={Styles.noDataText}>
        请先从
        <a
          onClick={() => {
            setActiveKey('formDefinition');
          }}
        >
          表单列表
        </a>
        建立或者选择您要设计的表单
      </p>
    </div>
  );
}

export default EmptyPage;
