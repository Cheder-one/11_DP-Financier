import CardToolbar from "./cardToolbar";
import CardBody from "./cardBody";

const AccountCard = () => {
  return (
    <>
      <CardToolbar label={"Счет"} dropdownName={"Основной"} />
      <CardBody />
    </>
  );
};

export default AccountCard;
