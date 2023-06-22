import { useState } from "react";
import { Table, DropdownButton, Dropdown, Button } from "react-bootstrap";

const data = [
  { id: 1, name: "Элемент 1", category: "Категория 1", action: "delete" },
  { id: 2, name: "Элемент 2", category: "Категория 2", action: "delete" },
  { id: 3, name: "Элемент 3", category: "Категория 1", action: "delete" },
  { id: 4, name: "Элемент 4", category: "Категория 3", action: "delete" }
];

const categories = ["Категория 1", "Категория 2", "Категория 3"];

const AccountCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDeleteClick = (id) => {
    // обработчик нажатия кнопки удаления
  };

  const filteredData =
    selectedCategory === ""
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <Table>
      <thead>
        <tr>
          <th>Название</th>
          <th>
            <DropdownButton
              title={
                selectedCategory === "" ? "Все категории" : selectedCategory
              }
            >
              <Dropdown.Item onClick={() => handleCategorySelect("")}>
                Все категории
              </Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleDeleteClick(item.id)}
              >
                Удалить
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AccountCard;
