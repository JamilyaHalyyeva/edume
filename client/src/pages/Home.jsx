
import Hero from "../components/Hero"

import { AboutCard } from '../components/AboutCard'
import { CourseCard } from '../components/CourseCard'
import { OnlineCourses } from '../components/OnlineCourses'
import  Price  from '../components/Price'
import { Contact } from '../components/Contact'
import { Slogan } from '../components/Slogan'
import { Info } from '../components/Info'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'




 const Home = () => {
  return (
    <div className="font-sans bg-gray-100">
      <Header/>
    
        <Hero/>
        <CourseCard/>
       <AboutCard/>
       <Price/>
       <OnlineCourses/>
       <Slogan/>
       <Info/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home