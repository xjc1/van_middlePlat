import React, { useState, useEffect } from 'react';
import { BASEINFO } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import CreateInfoLibrary from './createInfoLibrary';

function EditInfoLibrary(props) {
  const [record, setRecord] = useState(null);
  const [dictNames, setDictNames] = useState({});
  const { query = {} } = props.location;
  const { id } = query;
  useEffect(() => {
    BASEINFO.getOneSceneBaseInfoUsingGET(id).then(async items => {
      const {
        regions,
        lifecycle = {},
        headDept,
        netHandleExtent,
        executiveSubject,
        matterBaseInfos = [],
      } = items;
      const { key: lifecycleKey, value: lifecycleVal } = lifecycle;
      const { dictNames: dictObj = {} } = await Code2Name(
        Promise.resolve({
          content: [
            {
              regions,
              lifecycle: lifecycleVal,
              headDept,
              netHandleExtent,
              executiveSubject,
              matterBaseInfos,
            },
          ],
        }),
        ['SH00XZQH', 'regions'],
        ['SHSSBMSH', 'headDept'],
        ['SHSSBMSH', 'executiveSubject'],
        ['WBCD', 'netHandleExtent'],
        [lifecycleKey || '1000', 'lifecycle'],
        ['SHSSBMSH', 'matterBaseInfos.department'],
        ['SH00XZQH', 'matterBaseInfos.regions'],
      );
      setDictNames(dictObj);
      setRecord({...items, matterBaseInfo: matterBaseInfos });
    });
  }, []);

  return record && <CreateInfoLibrary initialValues={record} dictNames={dictNames} />;
}

export default EditInfoLibrary;
