/* eslint-disable react/no-danger */
import React from 'react';
import { FormCard } from '@/components/tis_ui';
import { Descriptions, Divider } from 'antd';
import styles from '../infoLibrary.less';
import { BASEINFO } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import { implementationLevel, appUserType } from '@/utils/constantEnum';
import BaseInfoUtils from './baseInfoUtils';

function BasicInfo(props) {
  const { record, dictNames } = props;
  const {
    originalHandleDays,
    currentHandleDays,
    handleDecreaseDays,
    originalHandleNum,
    currentHandleNum,
    handleDecreaseNum,
    originalMaterialNum,
    currentMaterialNum,
    materialDecreaseNum,
    originalFormNum,
    currentFormNum,
    formDecreaseNum,
    reasons,
    fillNotice,
  } = record;

  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  const formatText = (day, text) => (
    <>
      {day}
      {day && text}
    </>
  );

  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('优化信息')} bordered className={styles.descriptionsLayout}>
        <Descriptions.Item label="原办理时间(工作日)">
          {formatText(originalHandleDays, '天')}
        </Descriptions.Item>

        <Descriptions.Item label="现办理时间(工作日)">
          {formatText(currentHandleDays, '天')}
        </Descriptions.Item>

        <Descriptions.Item label="减少时间(工作日)">
          {formatText(handleDecreaseDays, '天')}
        </Descriptions.Item>

        <Descriptions.Item label="原跑动次数">
          {formatText(originalHandleNum, '次')}
        </Descriptions.Item>

        <Descriptions.Item label="现跑动次数">
          {formatText(currentHandleNum, '次')}
        </Descriptions.Item>

        <Descriptions.Item label="减少跑动次数">
          {formatText(handleDecreaseNum, '次')}
        </Descriptions.Item>

        <Descriptions.Item label="原材料数">
          {formatText(originalMaterialNum, '份')}
        </Descriptions.Item>
        <Descriptions.Item label="现材料数">
          {formatText(currentMaterialNum, '份')}
        </Descriptions.Item>
        <Descriptions.Item label="减少材料数">
          {formatText(materialDecreaseNum, '份')}
        </Descriptions.Item>
        <Descriptions.Item label="原填表项">{formatText(originalFormNum, '个')}</Descriptions.Item>

        <Descriptions.Item label="现填表项">{formatText(currentFormNum, '个')}</Descriptions.Item>
        <Descriptions.Item label="减少填表项">
          {formatText(formDecreaseNum, '个')}
        </Descriptions.Item>

        <Descriptions.Item label="线下跑动原因和环节" span={3}>
          {reasons}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title={renderTitle('填报须知')} bordered>
        <Descriptions.Item>
          <div dangerouslySetInnerHTML={{ __html: fillNotice }} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default BasicInfo;
