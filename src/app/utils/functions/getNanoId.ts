import { customAlphabet } from "nanoid";

const useNanoId = (num = 10) => {
  const nanoid = customAlphabet("1234567890abcdef", num);

  return nanoid();
};

export default useNanoId;
