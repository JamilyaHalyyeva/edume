import React from 'react'
import price from "../../price"
import "./price.css"


export const PriceCard = () => {
  
  return (
    <>
    
    {price.map((item)=>(
        <div className="price shadow">
            <h3>{item.type}</h3>

            
            <ul>
        {item.features.map((feature, index) => (
          <li key={index }><i className='fa fa-check'></i>{feature}
          
          </li>
          
        ))}
      </ul>
      <h1>
            <span>$</span>
                {item.price}
            </h1>
          
            <button className="outline-btn">GET STARTED</button>

          
        </div>
    ))}

    </>
  
  )
}
