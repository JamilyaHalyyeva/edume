import React, { useState } from 'react'
import { Title } from '../../components/title/Title'
import  faq  from '../../faq'

export const Faq = () => {
    const [click, setClick] = useState(false)

    const toggle =(index)=>{
        if(click===index){
            return setClick(null)
        }
        setClick(index)
    }
  return (
    
    <>
       
        <section className="faq">
            <div className="container">
                {faq.map((item, index)=>(
                    <div className="box">
                        <button  className='accordion'  onClick={()=> toggle(index)} key={index}>
                            <h2>{item.title}</h2>
                            <span>{click === index? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-right'></i>}</span>
                        </button>
                        {click === index ?(
                            <div className="text">
                            <p>{item.desc}</p>
                        </div>
                        ): null}
                        
                    </div>
                ))}


            </div>
        </section>
        </>
  )
}
