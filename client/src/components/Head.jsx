import  { useState } from 'react';
import { Link } from 'react-router-dom';


const SmallScreenNavbar = ()=>{

  return <nav className='bg-gray-300  h-[50vh] w-[100vw] fixed top-[75px] left-0'>
         <ul className=" block gap-10 space-y-6 px-4 ">
                <li><a href="#home" className="text-gray-800 hover:text-orange-600"></a></li>
                <li><a href="#courses" className="text-gray-800 hover:text-orange-600">Courses</a></li>
                <li><a href="#info" className="text-gray-800 hover:text-orange-600">About</a></li>
                <li><a href="#pricing" className="text-gray-800 hover:text-orange-600">Pricing</a></li>
                <li><a href="#lessons" className="text-gray-800 hover:text-orange-600">Lessons</a></li>
                <li><a href="#contact" className="text-gray-800 hover:text-orange-600">Contact</a></li>
                <li>
                  <button className="btn bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full text-white px-4 py-2 mb-1 transition duration-500 ease-in-out text-xs">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
              </ul>
  </nav>
}

const MainNavbar = ()=>{

  return      <nav className='hidden lg:flex'>
              <ul className=" flex justify-between space-x-8 pt-8">
                <li><a href="#home" className="text-gray-800 hover:text-orange-600"></a></li>
                <li><a href="#courses" className="text-gray-800 hover:text-orange-600">Courses</a></li>
                <li><a href="#info" className="text-gray-800 hover:text-orange-600">About</a></li>
                <li><a href="#pricing" className="text-gray-800 hover:text-orange-600">Pricing</a></li>
                <li><a href="#lessons" className="text-gray-800 hover:text-orange-600">Lessons</a></li>
                <li><a href="#contact" className="text-gray-800 hover:text-orange-600">Contact</a></li>
                <li>
                  <button className="btn bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full text-white px-4 py-2 mb-1 transition duration-500 ease-in-out text-xs">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
              </ul>
            </nav>
}

export const Head = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <section className='head font-poppins  bg-gray-200'>
        <div className="container max-w-5xl mx-auto flex justify-between items-center py-2">
          <div className="logo">
          
            <h1 className="text-2xl font-semibold text-orange-500">EDUME</h1>
            <span className="text-yellow-500">ONLINE EDUCATION & LEARNING</span>
          </div>

           <MainNavbar/>
          <button className={`toggle md:block bg-transparent text-orange-600 text-xl absolute right-10 top-4${click ? 'block' : 'hidden'} lg:hidden `} onClick={() => setClick(!click)}>
            {click ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
          </button>

         {click && <SmallScreenNavbar/>}
        </div>
      </section>
    </>
  );
};





// import  { useState } from 'react';
// import { Link } from 'react-router-dom';

// export const Head = () => {
//   const [click, setClick] = useState(false);

//   return (
//     <>
//       <section className='head font-poppins  bg-gray-200'>
//         <div className="container max-w-5xl mx-auto flex justify-between items-center py-2">
//           <div className="logo">
//             <h1 className="text-2xl font-semibold text-orange-500">EDUME</h1>
//             <span className="text-yellow-500">ONLINE EDUCATION & LEARNING</span>
//           </div>
// {/** nav className={`block md:hidden s:hidden ${click ? ' absolute top-7vh left-0 w-full h-screen bg-yellow-300' : 'hidden'} lg:flex`}>*/}
// <nav className={`${click ? '  absolute top-7vh left-0 w-full h-screen bg-gray-200' : 'hidden'}  lg:flex`}>
//             <ul className=" flex justify-between space-x-8 pt-8">
//               <li><a href="#home" className="text-gray-800 hover:text-orange-600"></a></li>
//               <li><a href="#courses" className="text-gray-800 hover:text-orange-600">Courses</a></li>
//               <li><a href="#info" className="text-gray-800 hover:text-orange-600">About</a></li>
//               <li><a href="#pricing" className="text-gray-800 hover:text-orange-600">Pricing</a></li>
//               <li><a href="#lessons" className="text-gray-800 hover:text-orange-600">Lessons</a></li>
//               <li><a href="#contact" className="text-gray-800 hover:text-orange-600">Contact</a></li>
//               <li>
//                 <button className="btn bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full text-white px-4 py-2 mb-1 transition duration-500 ease-in-out text-xs">
//                   <Link to="/login">Login</Link>
//                 </button>
//               </li>
//             </ul>
//           </nav>

//           <button className={`toggle md:block bg-transparent text-orange-600 text-xl absolute right-10 top-4${click ? 'block' : 'hidden'} lg:hidden `} onClick={() => setClick(!click)}>
//             {click ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };


