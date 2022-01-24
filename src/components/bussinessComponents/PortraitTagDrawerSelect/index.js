/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import { DrawerSelect } from '@/components/tis_ui';
import { KERNEL, TRANSLATE } from '@/services/api';
import { appUserType } from '@/utils/constantEnum';
import _ from 'lodash';

function transformCategories(categories, open = false) {
  return _.map(categories, ({ category, tagCount, tagInfos = [] }) => {
    return {
      id: category,
      name: `${category} [${tagCount}]`,
      open,
      children: _.map(tagInfos, ({ tagId, name }) => {
        return {
          id: tagId,
          name,
        };
      }),
    };
  });
}

function Index({ type = appUserType.self, value = [],customTranslate, ...others }) {
  const [groups, setGroups] = useState([]);
  const queryCategories = () => {
    KERNEL.getAllCategoriesUsingGET({ params: { objectType: type } }).then(categories => {
      setGroups(transformCategories(categories));
    });
  };

  const addCategory = id => {
    KERNEL.getAllCategoriesWithCategoryUsingGET({
      params: {
        objectType: type,
        category: id,
      },
    }).then(tags => {
      setGroups(
        _.map(groups, group => {
          if (id === group.id) {
            return {
              ...group,
              children: _.map(tags, ({ tagId, name }) => {
                return {
                  id: tagId,
                  name,
                };
              }),
            };
          }
          return group;
        }),
      );
    });
  };

  const onCleanGroup = id => {
    setGroups(
      _.map(groups, group => {
        if (group.id === id) {
          return {
            ...group,
            open: false,
            children: [],
          };
        }
        return group;
      }),
    );
  };

  const queryTags = text => {
    KERNEL.getAllCategoriesWithNameUsingGET({
      params: {
        objectType: type,
        name: text,
      },
    }).then(categories => {
      setGroups(transformCategories(categories, true));
    });
  };

  const translate = words => {
    return TRANSLATE.portraitTagTranslateUsingPOST({ body: words }).then(translateResult => {
      return _.map(words, id => {
        return {
          id,
          name: translateResult[id] || id,
        };
      });
    });
  };

  useEffect(() => {
    queryCategories();
  }, []);

  return (
    <DrawerSelect
      onCleanGroup={onCleanGroup}
      onQueryAllGroup={queryCategories}
      onAddGroup={addCategory}
      onQueryItems={queryTags}
      translate={customTranslate || translate}
      groups={groups}
      value={value}
      {...others}
    />
  );
}

export default Index;
