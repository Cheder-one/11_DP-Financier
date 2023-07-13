import TableCard from "../../common/card/tableCard";
import CardDropdown from "./cardDropdown/cardDropdown";

const AccountCard = () => {
  return (
    <TableCard
      route="/"
      title={{
        first: "Доход",
        second: (
          <CardDropdown
            items={income.uniqDates}
            type="income"
            onSelect={handleDropdownSelect}
            reset={resetDropTitle}
          />
        ),
        third: (
          <Button variant="" className="p-0" onClick={handleAddButtonClick}>
            <PlusSquare style={{ color: "yellowgreen" }} size={25} />
          </Button>
        )
      }}
      body={transformedBodyItems.income}
      bodyCol={{
        third: (
          <Button variant="" size="sm" className="p-0">
            <CloseX style={{ color: "red" }} size={19} />
          </Button>
        )
      }}
    />
  );
};

export default AccountCard;
