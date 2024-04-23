import { ScatterChart } from "react-chartkick";
import "chartkick/chart.js";

const scatterData = [
  [174.0, 80.0],
  [176.5, 82.3],
  [180.0, 90.0],
];

const ScatterChartComponent = () => {
  return <ScatterChart data={scatterData} />;
};

export default ScatterChartComponent;
