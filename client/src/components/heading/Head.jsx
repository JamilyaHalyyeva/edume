
import {  useState } from 'react';
import { Link } from 'react-router-dom';

export const Head =() =>{
  const[click, setClick] = useState(false)
  

  
  
  return (
    <>
         <section className='head'>
            <div className="container flexSB">
                <div className="logo">
                    <h1>EDUME</h1>
                    <span>ONLINE EDUCATION & LEARNING</span>
                </div>
                
                <nav className="flexSB">
                <ul className={click ? "mobile-nav" : "flexSB"} onClick={()=> setClick(false)}>
                <li><a href="#home">Home</a></li>
                    <li><a href="#courses">Courses</a></li>
                   
                    <li><a href="#info">About</a></li>
                   
                   <li><a href="#pricing">Pricing</a></li>
                   <li><a href="#lessons">Lessons</a></li>
                   
                    <li><a href="#contact">Contact</a></li>
                  
                    <button className='btn'>
                    <Link>Login</Link>
                    </button>
                  

                  </ul>
                  

                  <button className='toggle' onClick={()=> setClick(!click)}>
                    {click ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
                </button>
                </nav>
                
             
                
              
            </div>


        </section>
    
    </>
  )
}
