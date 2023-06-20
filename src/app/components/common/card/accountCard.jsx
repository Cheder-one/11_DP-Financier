import { Container } from "react-bootstrap";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";

const AccountCard = () => {
  return (
    <>
      <CardHeader label={"Счет"} dropdownName={"Основной"} />
      <CardBody />
    </>
  );
};

export default AccountCard;
