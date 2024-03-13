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
   
   <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/welcome/ugc_ads_fb_comments/kids_images-4cbf5b969f055d821b944f9c44b221fd309ea7ab0dc04e381ec003950d2e2cdd.png" alt="" />
    <div className="container grid">
        
    <PriceCard/>
    </div>
    
      
   </section>
    </>
  )
}
