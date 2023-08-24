import PropTypes from "prop-types";

const ChartLegend = ({ data, containerClass }) => {
  // data = [
  //   {
  //     id: "account-id-1",
  //     name: "Сбербанк",
  //     unit: "₽",
  //     color: "#82ca9d"
  //   },
  //   {
  //     id: "account-id-2",
  //     name: "Альфа-банк",
  //     unit: "$",
  //     color: "#FF6F61"
  //   },
  //   {
  //     id: "account-id-3",
  //     name: "Тинькофф",
  //     unit: "₽",
  //     color: "#008080"
  //   },
  //   {
  //     id: "account-id-4",
  //     name: "Газпромбанк",
  //     unit: "₽",
  //     color: "#FFD700"
  //   },
  //   { id: "account-id-5", name: "ВТБ", unit: "₽", color: "#4682B4" },
  //   {
  //     id: "account-id-6",
  //     name: "Россельхозбанк",
  //     unit: "₽",
  //     color: "#228B22"
  //   },
  //   {
  //     id: "account-id-7",
  //     name: "Райффайзенбанк",
  //     unit: "₽",
  //     color: "#FF1493"
  //   },
  //   {
  //     id: "account-id-8",
  //     name: "ЮниКредит Банк",
  //     unit: "₽",
  //     color: "#4B0082"
  //   },
  //   {
  //     id: "account-id-9",
  //     name: "Совкомбанк",
  //     unit: "₽",
  //     color: "#800000"
  //   },
  //   {
  //     id: "account-id-10",
  //     name: "Ситибанк",
  //     unit: "$",
  //     color: "#0000FF"
  //   },
  //   {
  //     id: "account-id-11",
  //     name: "Росбанк",
  //     unit: "₽",
  //     color: "#8B0000"
  //   },
  //   {
  //     id: "account-id-12",
  //     name: "Банк Москвы",
  //     unit: "₽",
  //     color: "#00CED1"
  //   }
  // ];

  const getContainerClass = () => {
    return (
      containerClass + " gap-1 flex flex-wrap justify-center pb-3"
    );
  };

  return (
    <div className={getContainerClass()}>
      {data.map((item) => (
        <div key={item.id} className="flex items-center mx-1">
          <div
            className="w-4 h-2.5"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm pl-1">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

ChartLegend.propTypes = {
  data: PropTypes.array.isRequired,
  containerClass: PropTypes.string
};

export default ChartLegend;
