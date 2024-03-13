import { useState } from 'react'
import aboutCourse from '../courseCard'
import "./coursecard.css"
import { Title } from '../components/title/Title'

export const CourseCard = () => {
   
  return (
    <>
    <section className="courseCard" id='courses'>
    <Title subtitle='CLASSES' title='Our Lessons'/>
        <div className="container grid2">
            {aboutCourse.map((item)=>(
                <div className="box ">
                    <div className="img">
                        <img src={item.cover} alt="" />
                        
                    </div>
                    <h1>{item.courseName}</h1>

                   
                </div>
                

               
            ))}
           
        </div>
        
    </section>
    </>
  )
}

