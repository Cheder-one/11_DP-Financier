import CardHeader from "./cardHeader";
import CardBody from "./cardBody";

const AccountCard = ({ name }) => {
  return (
    <>
      <CardHeader name={name} />
      <CardBody />
    </>
  );
};

export default AccountCard;
