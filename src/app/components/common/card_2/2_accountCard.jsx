import { useState } from "react";
import { Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import Dropdown from "../form/dropdown";

const AccountCard = ({ md, title, dropItems, data, defaultCategory }) => {
  const [tableData, setTableData] = useState(data);

  // const [selectedItem, setSelectedItem] = useState(defaultCategory || "Все");

  // const handleItemSelect = (item) => {
  //   setSelectedItem(item);
  // };

  // const handleAddClick = () => {};

  // const handleDeleteClick = (index) => {
  //   const newTableData = [...tableData];
  //   newTableData.splice(index, 1);
  //   setTableData(newTableData);
  // };

  // const filteredData =
  //   selectedItem === "Все"
  //     ? tableData
  //     : tableData.filter((item) => item.category === selectedItem);

  return (
    <Card className="p-0">
      <Card.Body className="p-0">
        <Row className="card-header mx-auto border p-0">
          <Col md={md[0]} className="flex justify-center items-center">
            {title}
          </Col>
          <Col md={md[1]} className="mx-auto p-0">
            <Dropdown items={dropItems}>
              <OverlayTooltip text={"Dropdownnnnnnn"} />
            </Dropdown>
          </Col>
          <Col md={md[2]} className="flex justify-center items-center">
            {"+"}
          </Col>
        </Row>

        <ListGroup className="card-body list-group-flush overflow-auto border-gray-400 vh-25 me-0">
          <ListGroupItem className="p-0">
            {data.map((item) => (
              <Row key={item} className="mx-auto">
                <Col md={md[0]}>1</Col>
                <Col md={md[1]}>2</Col>
                <Col md={md[2]}>3</Col>
              </Row>
            ))}
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>

    // className="flex justify-center items-center border px-0 py-0.5"

    // <div>
    //   <Card>
    //     <Card.Body className="p-0">
    //       <Table className="w-100 overflow-hidden">
    //         <thead>
    //           <tr>
    //             <th className="col-4">{title}</th>
    //             <th className="col-6">
    //               <DropdownButton
    //                 id="itemDropdown"
    //                 variant="null"
    //                 drop="down-centered"
    //                 title={selectedItem}
    //               >
    //                 <Dropdown.Item onClick={() => handleItemSelect("Все")}>
    //                   Все
    //                 </Dropdown.Item>
    //                 {dropItems.map((item, index) => (
    //                   <Dropdown.Item
    //                     key={index}
    //                     eventKey={item}
    //                     onClick={() => handleItemSelect(item)}
    //                   >
    //                     {item}
    //                   </Dropdown.Item>
    //                 ))}
    //               </DropdownButton>
    //             </th>
    //             <th className="col-2">
    //               <Button variant="success" size="sm" onClick={handleAddClick}>
    //                 +
    //               </Button>
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {filteredData.map((item, index) => (
    //             <tr key={index}>
    //               <td>{item.sum}</td>
    //               <td>{item.category}</td>
    //               <td className="">
    //                 <Button
    //                   size="sm"
    //                   variant="danger"
    //                   onClick={() => handleDeleteClick(index)}
    //                 >
    //                   Del
    //                 </Button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </Card.Body>
    //   </Card>
    // </div>
  );
};

// const AccountCard = () => {
//   const transactionDates = [
//     "2021-01-01",
//     "2021-01-02",
//     "2021-01-03",
//     "2021-01-04",
//     "2021-01-05",
//     "2021-01-06"
//   ];
//   const accountNames = [
//     "Сбербанк",
//     "Альфабанк",
//     "Тинькофф",
//     "Райффайзенбанк",
//     "ВТБ",
//     "Газпромбанк"
//   ];

//   const positiveTransactions = [
//     { sum: 100, category: "2021-01-01" },
//     { sum: 200, category: "2021-01-02" },
//     { sum: 300, category: "2021-01-03" },
//     { sum: 400, category: "2021-01-04" },
//     { sum: 500, category: "2021-01-05" },
//     { sum: 600, category: "2021-01-06" }
//   ];

//   const negativeTransactions = [
//     { sum: -100, category: "2021-01-01" },
//     { sum: -200, category: "2021-01-02" },
//     { sum: -300, category: "2021-01-03" },
//     { sum: -400, category: "2021-01-04" },
//     { sum: -500, category: "2021-01-05" },
//     { sum: -600, category: "2021-01-06" }
//   ];

//   return (
//     <Row>
//       <Col md="4">
//         <AccountCard
//           title="Доходы"
//           dropItems={transactionDates}
//           data={positiveTransactions}
//           defaultCategory="Все"
//         />
//       </Col>
//       <Col md="4">
//         <AccountCard
//           title="Счета"
//           dropItems={accountNames}
//           data={positiveTransactions}
//           defaultCategory="Все"
//         />
//       </Col>
//       <Col md="4">
//         <AccountCard
//           title="Расходы"
//           dropItems={transactionDates}
//           data={negativeTransactions}
//           defaultCategory="Все"
//         />
//       </Col>
//     </Row>
//   );
// };

AccountCard.defaultProps = {
  md: [4, 6, 2]
};

export default AccountCard;
