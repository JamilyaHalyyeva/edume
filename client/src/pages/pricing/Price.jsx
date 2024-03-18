import React from 'react'
import { Back } from '../../components/back/Back'
import { PriceCard } from './PriceCard'
import { Faq } from './Faq'
import { Title } from '../../components/title/Title'
import { Hfaq } from './Hfaq'



export const Price = () => {
  return (

    <>
    
    
   <section className="price padding" id='pricing'>
    <Title title='Pricing' subtitle='PricePlan'/>
   
 
    <div className="container grid">
        
    <PriceCard/>
    </div>
    
      
   </section>
    </>
  )
}
