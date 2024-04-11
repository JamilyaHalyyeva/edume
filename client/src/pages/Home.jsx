import Hero from "../components/Home/Hero";

import { AboutCard } from "../components/Home/AboutCard";
import { CourseCard } from "../components/Home/CourseCard";
import { OnlineCourses } from "../components/Home/OnlineCourses";
import Price from "../components/Home/Price";
import { Contact } from "../components/Home/Contact";
import { Slogan } from "../components/Home/Slogan";
import { Info } from "../components/Home/Info";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";

const Home = () => {
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
};

export default Home;
