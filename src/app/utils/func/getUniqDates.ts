import { chain } from "lodash";
import toReadableDate from "./date/toReadableDate";
import { Transaction } from "../../types";

interface UniqDateItem extends Transaction {
  name: string;
}

const getUniqDates = (data: Transaction[]): UniqDateItem[] => {
  return chain(data)
    .uniqBy("date")
    .map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }))
    .reverse()
    .value();
};

export default getUniqDates;
