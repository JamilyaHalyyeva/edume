import { useEffect, useState,  } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';

export const Head = () => {
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
    <div>
         <section className='head'>
            <div className="container flexSB">
                <div className="logo">
                    <h1>EDUME</h1>
                    <span>ONLINE EDUCATION & LEARNING</span>
                </div>
                <div className='search'>
                  
                    <input type="text" placeholder="Search..." onChange={e=>setCourses(e.target.value)}/>
                
                    
                 
                </div>
                
                <div className='social'>
                  
                   <i className='fab fa-facebook-f icon'></i>
                   <i className='fab fa-instagram icon'></i>
                   <i className='fab fa-twitter icon'></i>
                   <i className='fab fa-youtube icon'></i>
                  
                   <i className='fa fa-user-plus icon'></i>




                </div>
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
    </div>
  )
}
