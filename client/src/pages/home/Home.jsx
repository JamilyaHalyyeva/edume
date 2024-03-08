import React from 'react'
import Hero from "../hero/Hero"

import { AboutCard } from '../about/AboutCard'
import { CourseCard } from '../../coursecard/CourseCard'
import { OnlineCourses } from '../../coursecard/OnlineCourses'
import { Test } from '../../components/testimonial/Test'
import { Blog } from '../../components/blog/Blog'
import { Hblog } from '../../components/blog/Hblog'


 const Home = () => {
  return (
    <div>
        <Hero/>
        <AboutCard/>
        <CourseCard/>
        <OnlineCourses/>
        <Hblog/>
        <Blog/>
        <Test/>
    
        
   
      
    </div>
  )
}

export default Home