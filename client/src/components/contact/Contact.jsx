import React from 'react'
import { Title } from '../title/Title'
import "./contact.css"

export const Contact = () => {
  return (
    <>
    <section className="contact" id='contact'>
        <div className="container1 flexSB">
            <div className="left1 row">
                <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/characters/pgt_bubble-8566814cd7e5b5c0abe993502a63b1ecd3960a1cc8e69ee1d7c6809e087998d5.svg" alt="" />

            </div>
            <div className="right row">
                <form action="">
                    <Title subtitle="Send us a message" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                   
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Submit</button>

                </form>
                

            </div>
    
        </div>

    </section>
    </>
  )
}
