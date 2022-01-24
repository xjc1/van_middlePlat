import { useState, useEffect } from 'react';
import { SCENEDATA } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';

function useSceneDataDetail(id) {
  const [detail, setDetail] = useState();
  const initialValues = {};

  const getDetail = async recordId => {
    // 没有recordId为新增
    if (!recordId) {
      setDetail(initialValues);
      return;
    }
    const record = await SCENEDATA.findDetailsUsingGET(recordId);
    const { sceneDataFields = [], sceneDataMaterials = [] } = record;
    const { dictNames = {} } = await Code2Name(
      Promise.resolve({
        content: sceneDataMaterials.map(({ standardMaterialDTO }) => standardMaterialDTO),
      }),
      ['CLLX', 'type'],
      ['CLLY', 'source'],
    );

    setDetail({
      ...record,
      sceneDataFields: sceneDataFields.map(({ standardField, ...others }) => {
        const tableName = _.get(standardField, 'useField.tableAlias');
        const fieldName = _.get(standardField, 'useField.field');
        return {
          ...others,
          ...standardField,
          tableName,
          fieldName,
          isError: !(tableName && fieldName),
          standardFieldName: standardField.name,
        };
      }),
      sceneDataMaterials: sceneDataMaterials.map(({ standardMaterialDTO, ...others }) => ({
        ...others,
        ...standardMaterialDTO,
        typeCn: dictNames.CLLX[standardMaterialDTO.type],
        sourceCn: dictNames.CLLY[standardMaterialDTO.source],
      })),
    });
  };
  useEffect(() => {
    getDetail(id);
  }, []);

  return { detail };
}

export default useSceneDataDetail;
