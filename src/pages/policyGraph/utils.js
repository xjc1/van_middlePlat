import { POLICYATLAS } from '@/services/api';
import _ from 'lodash';
import { CATEGORIES_KEYS, LAYER_SIZE } from '@/pages/policyGraph/consts';

async function getPolicyAtlasUsingGET(item) {
  const { id } = item;
  const { nodes = [], edges = [] } = await POLICYATLAS.getPolicyAtlasUsingGET(id);
  return {
    ...item,
    nodes: _.map(nodes, node => {
      return {
        ...node,
        category: node.policyId ? CATEGORIES_KEYS.collected : CATEGORIES_KEYS.not_collected,
        id: String(node.id),
        symbolSize: LAYER_SIZE[node.layer] || 10,
      };
    }),
    edges: _.map(edges, ({ startId, endId }) => {
      return {
        source: String(startId),
        target: String(endId),
      };
    }),
  };
}

async function getPolicyNodeDetailUsingGET(id) {
  const nextDetail = await POLICYATLAS.getPolicyNodeDetailUsingGET(id);
  return {
    ...nextDetail,
    nodeId: id,
  };
}

export { getPolicyAtlasUsingGET, getPolicyNodeDetailUsingGET };
