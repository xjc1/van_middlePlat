import _ from 'lodash';

function initData({
                    relatedMatter = [],
                    relatedPolicy = [],
                    relatedScene = [],
                    relatedProject = [],
                    relatedService = [],
                    relatedDataService,
                    relatedMaterial,
                    ...others
                  }) {
  return {
    relatedMaterial: relatedMaterial && [relatedMaterial],
    relatedDataService: relatedDataService && [relatedDataService],
    relatedMatter: _.filter(relatedMatter, ({ source }) => source === 1).map(({ itemId }) => itemId),
    relatedPolicy: _.filter(relatedPolicy, ({ source }) => source === 1).map(({ itemId }) => itemId),
    relatedScene: _.filter(relatedScene, ({ source }) => source === 1).map(({ itemId }) => itemId),
    relatedProject: _.filter(relatedProject, ({ source }) => source === 1).map(({ itemId }) => itemId),
    relatedService: _.filter(relatedService, ({ source }) => source === 1).map(({ itemId }) => itemId),
    ...others
  };
}

export default initData;
