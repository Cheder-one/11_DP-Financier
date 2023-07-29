import { chain } from "lodash";
import toReadableDate from "./toReadableDate";

interface DataItem {
  date: string;
}

interface UniqDateItem extends DataItem {
  name: string;
}

const getUniqDates = (data: DataItem[]): UniqDateItem => {
  return chain(data)
    .uniqBy("date")
    .map((uniq: DataItem) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }))
    .reverse()
    .value();
};

export default getUniqDates;
