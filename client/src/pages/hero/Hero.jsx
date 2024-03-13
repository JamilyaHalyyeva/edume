import React from 'react'

import "./hero.css"
import { Title } from '../../components/title/Title'

const Hero = () => {

    const scrollToCourses = () => {
        const onlineCourses = document.getElementById('online-courses');
        if (onlineCourses) {
            onlineCourses.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <>
   
        <section className='hero'> 
        <div className="container">
            <div className="row">
            <Title subtitle='WELCOME TO EDUME' title='best Online Education'/>
           
             

            </div>
        </div>

        </section>
        <div className="margin">

        </div>
    </>
  )
}

export default Hero