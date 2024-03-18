import React from 'react'
import Hero from "../hero/Hero"

import { AboutCard } from '../about/AboutCard'
import { CourseCard } from '../../coursecard/CourseCard'
import { OnlineCourses } from '../../coursecard/OnlineCourses'
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
       <Price/>
       <OnlineCourses/>
       <Slogan/>
       <Info/>
        <Contact/>
    </div>
  )
}

export default Home