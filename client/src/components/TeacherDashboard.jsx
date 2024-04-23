import CalendarChart from "./Charts/CalendarChart.jsx";
import ColorfulBarChart from "./Charts/ColorfulBarChart.jsx";
import ColumnChartComponent from "./Charts/ColumnChart.jsx";
import PieChartComponent from "./Charts/PieChart";
// import LineChartComponent from "./Charts/LineChart.jsx";
// import BarChartComponent from "./Charts/BarChart.jsx";
// import PieChart from "./Charts/PieChart2.jsx";
// import RadarChart from "./Charts/RadarChart.jsx";

const TeacherDashboard = () => {
  return (
    <div className=" w-full h-screen overflow-y-auto gap-5 grid grid-cols-2 pb-[10rem] justify-center items-center ">
      <div className="p-5 border-2 rounded-2xl shadow-xl ">
        <p className="text-2xl font-bold text-start text-orange-400 mb-3">
          Student Grades
        </p>
        <PieChartComponent />
      </div>

      <div className="p-5 border-2 rounded-2xl shadow-xl">
        <p className="text-2xl font-bold text-start text-orange-400 mb-3">
          Lesson Participation
        </p>
        <ColumnChartComponent />
      </div>
      {/* <div className=" p-5 border-2 rounded-2xl shadow-xl">
        <p className="text-2xl font-bold  text-orange-400 mb-3">
          Monthly Attendance
        </p>
        <ColorfulBarChart />
      </div> */}
      {/* <div className="p-5 border-2">
        <BarChartComponent />
      </div> */}
      {/* <div className="p-5 border-2">
        <LineChartComponent />
      </div> */}
      <div className="p-5 border-2 rounded-2xl shadow-xl">
        <p className="text-2xl font-bold text-start text-orange-400 mb-3">
          Monthly Attendance
        </p>
        <ColorfulBarChart />
      </div>

      <div className="p-5 border-2  rounded-2xl shadow-xl">
        <p className="text-2xl font-bold text-start text-orange-400 mb-3">
          Event Calendar
        </p>
        <CalendarChart />
      </div>
    </div>
  );
};

export default TeacherDashboard;
