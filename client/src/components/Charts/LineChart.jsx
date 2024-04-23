import { LineChart } from "react-chartkick";
import "chartkick/chart.js";

const lineData = {
  "2023-01-01": 10,
  "2023-01-02": 20,
  "2023-01-03": 15,
  "2023-01-04": 25,
};

const LineChartComponent = () => {
  return <LineChart data={lineData} />;
};

export default LineChartComponent;
