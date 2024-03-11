import React from 'react'
import price from "../../price"
import "./price.css"


export const PriceCard = () => {
  
  return (
    <>
    
    {price.map((item)=>(
        <div className="price shadow">
            <h4>{item.type}</h4>

            <h1>
            <span>$</span>
                {item.price}
            </h1>
            <ul>
        {item.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
           
          
            <button className="outline-btn">GET STARTED</button>

          
        </div>
    ))}

    </>
  
  )
}
