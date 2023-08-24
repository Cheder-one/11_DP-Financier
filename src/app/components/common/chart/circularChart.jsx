import PropTypes from "prop-types";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const CircularChart = ({ chartData, categories, width, height }) => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 500 },
    { name: "Other", value: 100 }
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A83279",
    "#5F5A8D"
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // <PieChart width={800} height={400}>
  //   <Pie
  //     data={data}
  //     cx={120}
  //     cy={200}
  //     innerRadius={60}
  //     outerRadius={80}
  //     fill="#8884d8"
  //     paddingAngle={5}
  //     dataKey="value"
  //   >
  //     {data.map((entry, index) => (
  //       <Cell
  //         key={`cell-${index}`}
  //         fill={COLORS[index % COLORS.length]}
  //       />
  //     ))}
  //   </Pie>
  //   <Pie
  //     data={data}
  //     cx={420}
  //     cy={200}
  //     startAngle={180}
  //     endAngle={0}
  //     innerRadius={60}
  //     outerRadius={80}
  //     fill="#8884d8"
  //     paddingAngle={5}
  //     dataKey="value"
  //   >
  //     {data.map((entry, index) => (
  //       <Cell
  //         key={`cell-${index}`}
  //         fill={COLORS[index % COLORS.length]}
  //       />
  //     ))}
  //   </Pie>
  // </PieChart>;

  const cx = width / 2.1;
  const cy = height / 3.3;

  return (
    <PieChart width={width} height={height / 1.5}>
      <Pie
        data={data}
        cx={cx}
        cy={cy}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        marg
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      {/* <Legend /> */}
      <Tooltip />
    </PieChart>
  );
};

export default CircularChart;
