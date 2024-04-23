import { PieChart } from "react-chartkick";
import "chartkick/chart.js";

const pieData = [
  ["1th Grade", 34],
  ["2ht Grade", 23],
  ["3th Grade", 20],
  ["4th Grade", 20],
];

const PieChartComponent = () => {
  return <PieChart data={pieData} />;
};

export default PieChartComponent;
