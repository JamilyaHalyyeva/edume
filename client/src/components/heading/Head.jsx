import { useEffect, useState,  } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';

export const Head = () => {
  const[click, setClick] = useState(false)

  const[courses, setCourses] =useState("")
  const[data, setData] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([]);


useEffect(()=>{

  const fetchCourses = async () =>{
    const res = await axios.get("http://localhost:3000")
    setData(res.data)
  }
  fetchCourses()

}, [])



// Filter courses based on user input
useEffect(() => {
  setFilteredCourses(
    data.filter(course => course.courseName.toLowerCase().includes(courses.toLowerCase()))
  );
}, [courses, data]);




  //const search = (data)=>{
   // return data.filter(course => course.courseName.toLowerCase().includes(courses.toLowerCase()))
  //}
  //const filteredCourses = search(aboutCourses)
 
  
  
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
                    <li><Link to="/">Home</Link></li>
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
       {/* Display the filtered courses only if search is performed */}
       {courses !== "" && (
        <div className="containerSearch">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-item">
              {/* Display course information with a link to the course details */}
              <Link to={`/courses/${course.id}`}>
                <h2>{course.courseName}</h2>
              </Link>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div>No results found.</div>
          )}
        </div>
      )}
    </>
  )
}
