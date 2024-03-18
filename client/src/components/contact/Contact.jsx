import React from 'react'
import { Title } from '../title/Title'
import "./contact.css"

export const Contact = () => {
  return (
    <>
    <section className="contact" id='contact'>
        <div className="container flexSB">
            <div className="left row">
                <img src="https://thepixelcurve.com/wp/edubin/language-school/wp-content/uploads/sites/53/2023/08/HR785234.png" alt="" />

            </div>
            <div className="right row">
           
                <form >
                <Title subtitle="Send us a message" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Subject" />

                   
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Submit</button>

                </form>
                

            </div>
    
        </div>

    </section>
    </>
  )
}
