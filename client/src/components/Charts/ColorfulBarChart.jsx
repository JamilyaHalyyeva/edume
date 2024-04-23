import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Low score",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: "rgba(255, 99, 132, 0.5)", // Red with transparency
      borderColor: "rgba(255, 99, 132, 1)", // Solid red border
      borderWidth: 1,
    },
    {
      label: "Average score",
      data: [10, 14, 6, 4, 7, 8, 11],
      backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue with transparency
      borderColor: "rgba(54, 162, 235, 1)", // Solid blue border
      borderWidth: 1,
    },
    {
      label: "High score",
      data: [3, 7, 8, 12, 10, 9, 15],
      backgroundColor: "rgba(255, 206, 86, 0.5)", // Yellow with transparency
      borderColor: "rgba(255, 206, 86, 1)", // Solid yellow border
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: true, // Display the legend with labels for each dataset
      position: "top", // Position the legend at the top
    },
    tooltip: {
      backgroundColor: "white", // Dark background for tooltips
      titleColor: "#fff", // White title color in tooltips
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide grid lines on the x-axis
      },
    },
    y: {
      beginAtZero: true, // Start the y-axis at zero
    },
  },
};

const ColorfulBarChart = () => {
  return (
    <div style={{ background: "white", padding: "1rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ColorfulBarChart;
