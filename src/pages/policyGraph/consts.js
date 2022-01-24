import { policyCollectStatus } from '@/utils/constantEnum';

const CATEGORIES_KEYS = {
  not_collected: 0,
  collected: 1,
};

const LAYER_SIZE = {
  1: 100,
  2: 40,
  3: 30,
  4: 10,
};

const CATEGORIES = [
  { name: policyCollectStatus.$v_names[policyCollectStatus.not_collected] },
  { name: policyCollectStatus.$v_names[policyCollectStatus.collected] },
];

export { CATEGORIES_KEYS, CATEGORIES, LAYER_SIZE };
