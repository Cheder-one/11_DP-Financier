import { useState } from "react";

const useModal = (initState) => {
  const [showModal, setShowModal] = useState(initState);

  return [showModal, setShowModal];
};

export default useModal;
