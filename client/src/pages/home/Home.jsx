import React from 'react'
import Hero from "../hero/Hero"

import { AboutCard } from '../about/AboutCard'
import { CourseCard } from '../../coursecard/CourseCard'
import { OnlineCourses } from '../../coursecard/OnlineCourses'
import { Test } from '../../components/testimonial/Test'
import { Blog } from '../../components/blog/Blog'
import { Hblog } from '../../components/blog/Hblog'
import { PriceCard } from '../pricing/PriceCard'
import { Price } from '../pricing/Price'
import { Contact } from '../../components/contact/Contact'
import { Slogan } from '../../components/slogan/Slogan'
import { Info } from '../../components/info/Info'


 const Home = () => {
  return (
    <div>
        <Hero/>
        <CourseCard/>
       <AboutCard/>
       <Slogan/>
       <Info/>
        <Price/>
        <OnlineCourses/>
        
       
        <Contact/>
    
        
   
      
    </div>
  )
}

export default Home