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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias tempore consectetur nulla? Illum aut cumque at molestiae esse, nisi et necessitatibus magnam similique repellat, modi, dolores dolorem minus facilis atque.</p>
                <div className="button">
                    <button className="primary-btn">
                        Get Started now <icon className="fas fa-arrow-right"></icon>
                    </button>
                    <button onClick={scrollToCourses}>
                        view courses <icon className="fas fa-arrow-right"></icon>
                    </button>
                </div>

            </div>
        </div>

        </section>
        <div className="margin">

        </div>
    </>
  )
}

export default Hero