import { Pie } from "react-chartjs-2";

const assignmentCompletion = {
  labels: ["Completed", "Pending"],
  datasets: [
    {
      data: [65, 35], // Sample data for completed vs. pending assignments
      backgroundColor: ["#4caf50", "#ff9800"], // Colors for pie segments
    },
  ],
};

const PieChart = () => {
  return <Pie data={assignmentCompletion} />;
};

export default PieChart;
