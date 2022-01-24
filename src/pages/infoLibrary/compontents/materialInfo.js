import {Descriptions, Divider, Empty} from "antd";
import styles from "../infoLibrary.less";
import React from "react";
import BaseInfoUtils from './baseInfoUtils'
import { TTable, OperateBar } from '@/components/tis_ui';

function materialInfo(props) {
  const {record,dictNames} = props;
  const { materialBaseInfo } = record;
  const renderTitle = title => <Divider orientation="left">{title}</Divider>;

  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('材料信息')} className={styles.descriptionsLayout} />
      {(materialBaseInfo || []).length===0?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:
        materialBaseInfo.map((item)=>(
        <>
          <Descriptions bordered className={styles.descriptionsLayout} >
            <Descriptions.Item label="材料标准简称(拆解材料)" span={1.5} >{item.materialSimpleName}</Descriptions.Item>
            <Descriptions.Item label="或材料" span={1.5} >{item.orMaterial}</Descriptions.Item>
            <Descriptions.Item label="适用情形" span={1.5} >{item.materialSituation}</Descriptions.Item>
            <Descriptions.Item label="材料来源渠道" span={1.5} >{item.source}</Descriptions.Item>
            <Descriptions.Item label="材料来源渠道子类" span={1.5}>{item.sonSource}</Descriptions.Item>
            <Descriptions.Item label="来源渠道说明(出具部门)" span={1.5}>{item.sourceExplain}</Descriptions.Item>
            <Descriptions.Item label="电子证照类型编码" span={1.5}>{item.certTypeCode}</Descriptions.Item>
            <Descriptions.Item label="电子证照类型名称" span={1.5}>{item.certTypeName}</Descriptions.Item>
            <Descriptions.Item label="纸质材料份数" span={1.5}>{item.paperMaterialNum}</Descriptions.Item>
            <Descriptions.Item label="纸质材料规格" span={1.5}>{item.paperMaterialSpecifications}</Descriptions.Item>
            <Descriptions.Item label="纸质材料范例" span={1.5}>{item.paperMaterialExample}</Descriptions.Item>
            <Descriptions.Item label="纸质材料空表" span={1.5}>{item.paperMaterialEmptyTable}</Descriptions.Item>
            <Descriptions.Item label="材料受理标准(形式审查要点)" span={1.5}>{item.materialAcceptanceStandard}</Descriptions.Item>
            <Descriptions.Item label="电子材料格式要求" span={1.5}>{item.materialFormat}</Descriptions.Item>
            <Descriptions.Item label="备注" span={3}>{item.remark}</Descriptions.Item>
          </Descriptions><br /><br />
        </>
      ))}
    </>
  );
}
export default materialInfo
