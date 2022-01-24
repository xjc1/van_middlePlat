import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import { utils } from '@/components/tis_ui';
import { CONVENIENCE } from '@/services/api';
import EditService from './editService';

const { Base64 } = utils;

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);

function EditScenePage(props) {
  const {
    match: {
      params: { serviceid },
    },
    disabled = false,
  } = props;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (serviceid) {
      getDetail(serviceid);
    }

    async function getDetail(id) {
      const res = await CONVENIENCE.getConvenienceDetailUsingGET(id);

      const {
        relationMatchMatters = [],
        relationMatchScene = [],
        relationMatchPolicy = [],
        relationMatchProject = [],
        recommendTag = [],
        pictture = '',
        personalPortraitTag = [],
        legalPersonPortraitTag = [],
      } = res;

      const handledInfo = {
        ...res,
        relationMatchMatters: flatBy(relationMatchMatters, 'aid'),
        relationMatchScene: flatBy(relationMatchScene, 'aid'),
        relationMatchPolicy: flatBy(relationMatchPolicy, 'aid'),
        relationMatchProject: flatBy(relationMatchProject, 'aid'),
        recommendTag: flatBy(recommendTag, 'code'),
        pictture: pictture.slice(0, 10) === 'data:image' ? pictture : Base64.decodeBase64(pictture),
        personalPortraitTag: flatBy(personalPortraitTag, 'tagId'),
        legalPersonPortraitTag: flatBy(legalPersonPortraitTag, 'tagId'),
      };

      setInfo(handledInfo);
    }
  }, []);

  return (
    <>
      {info && info.id ? (
        <EditService {...props} serviceInfo={info} disabled={disabled} />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default connect(({ service }) => ({ ...service }))(EditScenePage);
