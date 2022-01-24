/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { generateId } from './createNode';

function cloneNode({ children = [], ...ohters }) {
  const nextNode = _.clone(ohters);
  nextNode.newNode = true;
  nextNode.cid = generateId();
  nextNode.children = _.map(children, item => cloneNode(item));
  return nextNode;
}

export default cloneNode;
