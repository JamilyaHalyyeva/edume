import React from 'react'
import aWrapper from '../../aWrapper'

export const AWrapper = () => {
  return (
    <>
<section className="aWrapper">
<div className="container grid">
    {aWrapper.map((item)=>(
        <div className="box flex">
            <div className="img">
                <img src={item.cover} alt="" />
            </div>
            <div className="text">
                <h1>{item.data}</h1>
                <h3>{item.title}</h3>
            </div>
        </div>
    ))}

</div>
</section>
    </>
  )
}
