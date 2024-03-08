import React from 'react'
import aboutCourse from '../courseCard'
import "./coursecard.css"
import { Title } from '../components/title/Title'
import { Link } from 'react-router-dom';

export const CourseCard = () => {
  return (
    <>
    <section className="courseCard">
    <Title subtitle='CLASSES' title='Our Lessons'/>
        <div className="container grid2">
        
            {aboutCourse.map((item)=>{
                return(
                <div className="items">
                    <div className="content flex">
                        <div className="left">
                            <div className="img">
                                <img src={item.cover} alt="" />
                            </div>
                        </div>
                        <div className="text">
                            <h1>{item.courseName}</h1>
                            <div className="rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <label htmlFor="">(5.0)</label>

                            </div>
                            <div className="details">
                                {item.courseTeacher.map((details)=>(
                                    <>
                                    <div className="box">
                                        <div>
                                        <div className="dimg">
                                            <img src={details.dCover} alt="" />
                                        </div>
                                        <div className="para">
                                            <h4>{details.name}</h4>
                                        </div>
                                        </div>
                                        </div>
                                    
                                    <span>{details.totalTime}</span>
                                    </>
                                 
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        
                        <h3>{item.priceAll} /{item.pricePer} </h3>
                       

                    </div>
                    <Link to="/pricing">
                    <button className='outline-btn'>ENROLL NOW !</button>
                    </Link>

                </div>
                )
            })}
        </div>
    </section>
        
    </>
  )
}
