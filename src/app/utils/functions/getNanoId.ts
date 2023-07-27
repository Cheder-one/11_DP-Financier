import { customAlphabet } from "nanoid";

const getNanoId = (num = 10) => {
  const nanoid = customAlphabet("1234567890abcdef", num);

  return nanoid();
};

export default getNanoId;
