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
            <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/layouts/welcome_banner_blobby-50966447b463d5608a2fb27ae8eae0eab091cc1e2f881408166bd6086492c953.svg" alt="" />
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