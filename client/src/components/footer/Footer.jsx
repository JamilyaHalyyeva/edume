import React from 'react'
import "./footer.css"

export const Footer = () => {
  return (
    <>
    <section className="newsletter">
        <div className="container flexSB">
            <div className="left row">
                <h1>Newsletter -Stay tune and get the latest update</h1>
                <span>Far far away, behind the word mountains</span>
            </div>
            <div className="right row">
                <input type="text" placeholder="Enter your email address"/>
                <i className='fa fa-paper-plane '></i>
               
                
            </div>
        </div>
    </section>
    <footer>
        <div className="container padding">
            <div className="box logo">
                <h1>EDUME</h1>
                <span>online education & learning</span>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                <i className='fab fa-facebook-f icon'></i>
                   <i className='fab fa-instagram icon'></i>
                   <i className='fab fa-twitter icon'></i>
                   <i className='fab fa-youtube icon'></i>
            </div>
            <div className="box link">
                <h3>Explore</h3>
                <ul>
                    <li>About Us</li>
                    <li>Courses</li>
                    <li>Blog</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>
            <div className="box link">
                <h3>Useful Links</h3>
                <ul>
                    <li>About Us</li>
                    <li>Courses</li>
                    <li>Blog</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>
       <div className="box last">
        <h3>Have a Question?</h3>
        <ul>
            <li>
                <i className='fa fa-map'></i>
                203 fake st, San Francisco, CA 94101
            </li>
            <li>
                <i className='fa fa-phone-alt'></i>
                (123) 456-7890
               
            </li>
            <li>
                <i className='fa fa-envelope'></i>
                example@example.com
                
            </li>
        </ul>

       </div>
        </div>
    </footer>
    <div className="legal">
        <p>Copyright @2024 All rights reserved</p>
    </div>
    </>
  )
}

