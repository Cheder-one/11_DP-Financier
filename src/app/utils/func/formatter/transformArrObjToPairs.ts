import { toPairs } from "lodash";

const transformArrObjToPairs = (data: []) => {
  return data.map((item) => toPairs(item));
};

export default transformArrObjToPairs;
