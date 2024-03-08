import React from 'react'
import { Title } from '../../components/title/Title'
import homeAbout from '../../Dummydata.js'
import { AWrapper } from './AWrapper'
import "./about.css"

export const AboutCard = () => {
  return (
    <>
<section className='aboutHome'>
    <div className="container flexSB">
        <div className="left row">
            <img src="/beauty.jpg" alt="" />
        </div>
        <div className="right row">
            <Title subtitle="LEARN ANYTHING" title="Benefits About Online Learning"/>
         <div className="items">
           {homeAbout.map((item)=>(
            <div className="item flexSB">
                <div className="img">
                    <img src={item.cover} alt="" />
                    
                </div>
                <div className="text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
           ))}
         </div>
        </div>
    </div>

</section>
<AWrapper/>
    </>
  )
}