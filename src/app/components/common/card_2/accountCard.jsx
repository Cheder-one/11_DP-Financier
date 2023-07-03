import { useState } from "react";
import {
  Table,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Form,
  Card,
  Row,
  Col
} from "react-bootstrap";

const TableComponent = ({ title, itemOptions, data, defaultCategory }) => {
  const [selectedItem, setSelectedItem] = useState(defaultCategory || "Все");
  const [tableData, setTableData] = useState(data);
  // const [showModal, setShowModal] = useState(false);
  // const [newSum, setNewSum] = useState(0);
  // const [newCategory, setNewCategory] = useState("");

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleAddClick = () => {
    // setShowModal(true);
  };

  const handleDeleteClick = (index) => {
    const newTableData = [...tableData];
    newTableData.splice(index, 1);
    setTableData(newTableData);
  };

  // const handleModalClose = () => {
  //   setShowModal(false);
  //   setNewSum(0);
  //   setNewCategory("");
  // };

  // const handleModalSave = () => {
  //   const newItem = { sum: newSum, category: newCategory };
  //   const newTableData = [...tableData, newItem];
  //   setTableData(newTableData);
  //   setShowModal(false);
  //   setNewSum(0);
  //   setNewCategory("");
  // };

  const filteredData =
    selectedItem === "Все"
      ? tableData
      : tableData.filter((item) => item.category === selectedItem);

  return (
    <div>
      <Card>
        <Card.Body className="p-0">
          <Table className="w-100 overflow-hidden">
            <thead>
              <tr>
                <th className="col-4">{title}</th>
                <th className="col-6">
                  <DropdownButton
                    id="itemDropdown"
                    variant="null"
                    drop="down-centered"
                    title={selectedItem}
                  >
                    <Dropdown.Item onClick={() => handleItemSelect("Все")}>
                      Все
                    </Dropdown.Item>
                    {itemOptions.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        eventKey={item}
                        onClick={() => handleItemSelect(item)}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </th>
                <th className="col-2">
                  <Button variant="success" size="sm" onClick={handleAddClick}>
                    +
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.sum}</td>
                  <td>{item.category}</td>
                  <td className="">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Del
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить операцию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSum">
              <Form.Label>Сумма</Form.Label>
              <Form.Control
                type="number"
                value={newSum}
                onChange={(e) => setNewSum(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Категория</Form.Label>
              <Form.Control
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

const AccountCard = () => {
  const transactionDates = [
    "2021-01-01",
    "2021-01-02",
    "2021-01-03",
    "2021-01-04",
    "2021-01-05",
    "2021-01-06"
  ];
  const accountNames = [
    "Сбербанк",
    "Альфабанк",
    "Тинькофф",
    "Райффайзенбанк",
    "ВТБ",
    "Газпромбанк"
  ];

  const positiveTransactions = [
    { sum: 100, category: "2021-01-01" },
    { sum: 200, category: "2021-01-02" },
    { sum: 300, category: "2021-01-03" },
    { sum: 400, category: "2021-01-04" },
    { sum: 500, category: "2021-01-05" },
    { sum: 600, category: "2021-01-06" }
  ];

  const negativeTransactions = [
    { sum: -100, category: "2021-01-01" },
    { sum: -200, category: "2021-01-02" },
    { sum: -300, category: "2021-01-03" },
    { sum: -400, category: "2021-01-04" },
    { sum: -500, category: "2021-01-05" },
    { sum: -600, category: "2021-01-06" }
  ];

  const handleAddClick = () => {
    // Логика для добавления новой строки в таблицу
  };

  const handleDeleteClick = (index) => {
    // Логика для удаления строки из таблицы
  };

  return (
    <Row>
      <Col md="4">
        <TableComponent
          title="Доходы"
          itemOptions={transactionDates}
          data={positiveTransactions}
          defaultCategory="Все"
          // onAddClick={handleAddClick}
          // onDeleteClick={handleDeleteClick}
        />
      </Col>
      <Col md="4">
        <TableComponent
          title="Счета"
          itemOptions={accountNames}
          data={positiveTransactions}
          defaultCategory="Все"
          // onAddClick={handleAddClick}
          // onDeleteClick={handleDeleteClick}
        />
      </Col>
      <Col md="4">
        <TableComponent
          title="Расходы"
          itemOptions={transactionDates}
          data={negativeTransactions}
          defaultCategory="Все"
          // onAddClick={handleAddClick}
          // onDeleteClick={handleDeleteClick}
        />
      </Col>
    </Row>
  );
};

export default AccountCard;
