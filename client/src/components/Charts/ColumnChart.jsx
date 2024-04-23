import { ColumnChart } from "react-chartkick";
import "chartkick/chart.js";

const columnData = [
  ["Sun", 32],
  ["Mon", 46],
  ["Tue", 28],
  ["Wen", 38],
  ["Thu", 18],
  ["Fri", 48],
];

const ColumnChartComponent = () => {
  return <ColumnChart data={columnData} />;
};

export default ColumnChartComponent;
