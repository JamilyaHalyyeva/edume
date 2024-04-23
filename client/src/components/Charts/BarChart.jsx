import { BarChart } from "react-chartkick";
import "chartkick/chart.js";

const barData = [
  ["Work", 32],
  ["Play", 1492],
  ["Sleep", 30],
];

const BarChartComponent = () => {
  return <BarChart data={barData} />;
};

export default BarChartComponent;
