import React from 'react';
import { TItem } from '@/components/tis_ui';
import SceneDataFields from './components/RelatedLetter';
import RelatedMaterial from './components/RelatedMaterial';

function Sociology(props) {
  const { disabled, currentDataType, selectMatters } = props;
  return (
    <>
      <TItem name="sceneDataFields" label="场景字段">
        <SceneDataFields
          currentDataType={currentDataType}
          selectMatters={selectMatters}
          disabled={disabled}
        />
      </TItem>
      <TItem name="sceneDataMaterials" label="场景材料">
        <RelatedMaterial
          currentDataType={currentDataType}
          selectMatters={selectMatters}
          disabled={disabled}
        />
      </TItem>
    </>
  );
}

export default Sociology;
