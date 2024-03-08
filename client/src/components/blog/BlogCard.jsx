import React from 'react'
import blog from "../../blog"
import { Title } from '../title/Title'

export const BlogCard = () => {
  return (
    <>
   
{blog.map((item)=>{
    return(
        <div className="items shadow">
            <div className="img">
                <img src={item.cover} alt="" />
               
                
            </div>
            <div className="text">
                <div className="admin flexSB">
                    <span>
                        <i className="fas fa-user"></i>
                        <label htmlFor="">{item.type}</label>
                    </span>
                    <span>
                        <i className="fa fa-calendar-alt"></i>
                        <label htmlFor="">{item.date}</label>
                    </span>
                    <span>
                        <i className="fa fa-comments"></i>
                        <label htmlFor="">{item.comment}</label>
                    </span>
                </div>
                <h1>{item.title}</h1>
                <p>{item.name}</p>
                <p>{item.desc}</p>
                
            </div>
        </div>
    )
})}
   
    </>
  )
}
