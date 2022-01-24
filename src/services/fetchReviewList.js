import { PORTRAIT } from '@/services/api';
import { conditionReviewType } from '@/utils/constantEnum';

const getListRequestMapper = {
  [conditionReviewType.NEED_REVIEW]: PORTRAIT.getReviewPageUsingGET,
  [conditionReviewType.CURRENT_DEPT]: PORTRAIT.getReviewAppliesUsingGET,
};

const emptyRequest = () => Promise.resolve({});

export default condition => {
  return getListRequestMapper[condition] || emptyRequest;
};
