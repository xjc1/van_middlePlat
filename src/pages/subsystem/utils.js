import { treeMethods } from "@tong/datastructure";
import _ from "lodash";

const { currentRoutes } = require('@/../scripts/cook/project/Setting');

function digSubMenus(pages) {
  const validPages = [];
  treeMethods.forEachTree(pages, ({ name, rName, icon, hideInMenu }) => {
    if (!hideInMenu && rName && icon) {
      validPages.push({
        title: name,
        value: rName,
        selectable: true,
      });
    }
  }, 'routes');
  return validPages;
}

function digRnames(pages) {
  const rNames = new Set();
  treeMethods.forEachTree(pages, ({ rName }) => {
    if (rName) {
      rNames.add(rName);
    }
  }, 'routes');
  return rNames;
}

const validMenus = _.chain(currentRoutes)
  .filter(({ header }) => header)
  .map((menu) => {
    const { routes = [], name, rName } = menu;
    return {
      title: name,
      value: rName,
      selectable: false,
      children: digSubMenus(routes)
    };
  }).value();

const rNames = digRnames(currentRoutes);

export {
  validMenus,
  rNames,
};
