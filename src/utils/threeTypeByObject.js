import { objectDict } from '@/constants';

const personType = '1000';
const legalType = 'FRSJFL1000';

function getDictType(objectType) {
  switch (objectType) {
    case objectDict.person:
      return personType;
    case objectDict.legalPerson:
      return legalType;
    default:
      return [personType, legalType];
  }
}
export default getDictType;
