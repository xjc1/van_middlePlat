import { useEffect, useState } from 'react';
import { ARTICLE } from '@/services/api';
import moment from 'moment';
import { utils } from '@/components/tis_ui';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const { Base64 } = utils;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const fileIDGenerator = new IDGenerator('f');

function useArticleDetail(id) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    ARTICLE.getArticleDetailUsingGET(id).then((res = {}) => {
      const {
        content = '',
        releaseTime = '',
        category = [],
        department = [],
        threeType = [],
        personalPortraitTag = [],
        legalPersonPortraitTag = [],
        personalOrPortraitTag = [],
        legalPersonOrPortraitTag = [],
        files = [],
      } = res;
      setDetail({
        ...res,
        content: content && Base64.decodeBase64(content),
        releaseTime: releaseTime && moment(new Date(res.releaseTime), dateFormat),
        category: category.map(({ code }) => [code]),
        department: department.map(({ code }) => code),
        threeType: threeType.map(({ code }) => [code]),
        personalPortraitTag: personalPortraitTag.map(({ tagId }) => tagId),
        legalPersonPortraitTag: legalPersonPortraitTag.map(({ tagId }) => tagId),
        personalOrPortraitTag: personalOrPortraitTag.map(({ tagId }) => tagId),
        legalPersonOrPortraitTag: legalPersonOrPortraitTag.map(({ tagId }) => tagId),
        files: _.reduce(
          files,
          (result, { url, name }) => {
            result[fileIDGenerator.next()] = {
              downloadUrl: [url, name],
            };
            return result;
          },
          {},
        ),
      });
    });
  }, []);
  return detail;
}

export default useArticleDetail;
