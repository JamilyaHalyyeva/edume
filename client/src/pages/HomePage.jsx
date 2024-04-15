import { AboutCard } from "../components/Home/AboutCard.jsx";
import { Contact } from "../components/Home/Contact.jsx";
import { CourseCard } from "../components/Home/CourseCard.jsx";
import { Footer } from "../components/Home/Footer.jsx";
import { Header } from "../components/Home/Header.jsx";
import Hero from "../components/Home/Hero.jsx";
import { Info } from "../components/Home/Info.jsx";
import { OnlineCourses } from "../components/Home/OnlineCourses.jsx";
import Price from "../components/Home/Price.jsx";
import { Slogan } from "../components/Home/Slogan.jsx";

// import { useNavigate } from "react-router-dom";
function HomePage() {
  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <Hero />
      <CourseCard />
      <AboutCard />
      <Price />
      <OnlineCourses />
      <Slogan />
      <Info />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;

// const navigate = useNavigate();

//   const handleButtonClick = (prm) => {
//     if (prm === "teacher") {
//       localStorage.setItem("role", "teacher");
//     } else {
//       localStorage.setItem("role", "student");
//     }
//     navigate("/register");
//   };
//   const handleLoginClick = () => {
//     navigate("/login");
//   };
//   return (
//     <div className="bg-gray-100 h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Welcome to My Homepage
//         </h1>
//         <p className="text-lg text-gray-600">
//           This is a simple homepage using React and Tailwind CSS.
//         </p>
//         <button
//           onClick={() => handleButtonClick("teacher")}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Teacher
//         </button>
//         <button
//           onClick={() => handleButtonClick("student")}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Student
//         </button>
//         <button
//           onClick={handleLoginClick}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
