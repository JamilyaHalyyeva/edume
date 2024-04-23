import { Radar } from "react-chartjs-2";

const studentSkills = {
  labels: ["Math", "Science", "History", "Music", "Art"],
  datasets: [
    {
      label: "Skill Level",
      data: [80, 70, 90, 60, 50], // Sample data for skill levels
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const RadarChart = () => {
  return <Radar data={studentSkills} />;
};

export default RadarChart;
