import React from 'react'
import "./info.css"
import homeAbout from "../../Dummydata"
import { Title } from '../title/Title'

export const Info = () => {
  return (
    <>
<section className="containerInfo" id='info'>
    <Title  title='Why Involve with Edume'/>
    
   
    <div className="grid">
       <div>
        
       </div>
        {homeAbout.map((item)=>(
            
            <div className="boxInfo">
                
                <div className="img">
                    <img src={item.cover} alt="" />
                    <h2>{item.title}</h2>
                    <h3>{item.description}</h3>
                </div>
               
            </div>
        ))}
    </div>



</section>
    </>
  )
}
