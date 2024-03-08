import React from 'react'
import { Title } from '../../components/title/Title'
import testimonials from "../../testimonials"
import "./test.css"

export const Test = () => {
  return (
    <>
    <section className="testimonial padding">
        <div className="container">
            <Title subtitle='TESTIMONIALS' title='Our Sucessful Students'/>
            <div className="content grid2">
                {testimonials.map((item)=>{
                    return (
                    <div className="items shadow">
                        <div className="box flex">
                            <div className="img">
                                <img src={item.cover} alt="" />
                                <i className='fa fa-quote-left icon'></i>
                            

                            </div>
                            <div className="name">
                                <h2>{item.name}</h2>
                                <span>{item.post}</span>

                            </div>
                        </div>
                        <p>{item.desc}</p>
                    </div>
                    )
                })}

            </div>
         
        </div>

    </section>

    </>
  )
}
