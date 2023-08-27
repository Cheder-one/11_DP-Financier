import { fromPairs } from "lodash";

const transformArrFromPairs = (data: []) => {
  return data.map((item) => fromPairs(item));
};
export default transformArrFromPairs;
