import { Link } from "react-router-dom";



export const PricePlan = () => {

    const price = [
        {
            id: 1,
            type: "For Teachers",
            cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/tests/exercise_types/tests_people-a7e4bcce607cd070bb44017b2d0c8408d4226dff97a0d108cff69b4ce2b39157.svg",
            features: [
              { text: 'Access to select courses for specific grades', icon: 'fa fa-graduation-cap',iconColor: 'text-purple-500'},
              { text: 'Structured learning modules', icon: 'fa fa-book', iconColor: 'text-green-500'},
              { text: 'Limited live sessions with instructors', icon: 'fa fa-users',iconColor: 'text-blue-500' },
              { text: 'Basic progress tracking', icon: 'fa fa-chart-line',iconColor: 'text-pink-500' },
              { text: 'Standard support services', icon: 'fa fa-life-ring',iconColor: 'text-gray-500' },
              { text: 'Access to select courses for specific grades', icon: 'fa fa-play',iconColor: 'text-purple-500' },
             
             
            
            ],
            price: "199.99",
          },
          {
            id: 2,
            type: "Students Learning Plan",
            cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/tests/exercise_types/tests_help-d58e64de2bf5b49b951c4352adde96b00a8c6905a71682845d5f6280a43c0497.svg",
            features: [
              { text: 'Access to curated courses designed for specific grades', icon: 'fa fa-graduation-cap',iconColor:'text-purple-500' },
              { text: 'Structured learning modules for comprehensive understanding', icon: 'fa fa-book',iconColor: 'text-green-500' },
              { text: 'Participation in limited live sessions with expert instructors', icon: 'fa fa-users',iconColor: 'text-blue-500' },
              { text: 'Basic tools for tracking individual progress', icon: 'fa fa-chart-line' ,iconColor: 'text-pink-500'}
            ],
            price: "399.99",
          },
         
        ];
      
        return (
          <>
            <section className=" py-12 justify-center ml-10 mr-10 mt-14 md:ml-0 md:mr-0 md:mt-20 sm:mr-0 sm:mt-20 xs:ml-0 xs:mr-0 xs:mt-20 bg-white" >
            <div className="text-orange-500 text-center"  >
   
   <h1 className="text-4xl font-light mb-4">Pricing</h1>
   <h1 className="text-3xl text-gray-800 font-extralight mb-6">Our PricePlan For both Teachers and Students.</h1>

    </div>
              <div className=" max-w-screen-md mx-auto grid md:grid-cols-2 p-10">
                {price.map((item, index) => (
                  <div key={index} className="shadow-2xl py-8 px-8 text-center rounded-md mb-8 justify-center sm:w-80 bg-white md:w-62  flex-row">
                    <div className="bg-yellow-100">
                      <img src={item.cover} alt="" />
                    </div>
                    <h3 className="text-2xl font-semibold text-orange-500 md:text-2xl pt-6">{item.type}</h3>
                    <ul className="mt-6 space-y-4 ">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-start text-gray-800 border-b p-1 text-m md:text-md">
                          <i className={`${feature.icon} ${feature.iconColor} mr-2 text-2xl`}></i>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                    <h1 className="text-4xl font-semibold text-gray-800 my-8 md:text-xl">
                      <span className="text-2xl font-semibold md:text-lg">$</span>
                      {item.price}
                    </h1>
                  
                    <button className="border-orange-500 text-orange-500 border shadow-md font-semibold py-2 px-4 rounded-full transition duration-500 ease-in-out bg-orange-500 text-white  hover:bg-orange-600 ">
                      <Link to="/login">GET STARTED</Link>
                    </button>
                   
                  </div>


                ))}
              </div>
              <div className="text-gray-500 text-center"  >
   
   <h1 className="text-2xl font-light mb-4">These offers are only available to teachers, teacher trainees, and teaching interns. </h1>
   <h1 className="text-xl font-extralight mb-6 text-orange-500">To qualify, we require a current proof of status from you. What counts as proof of status?</h1>
   <div className="flex justify-center">
        <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/pricing/promote_app-19feb71a83caa5afcd81fbca9a404b2c7d6fd647da93bdbc3766d6dc6e0bab41.svg" alt="" className="item-center"/>
   
    </div>
    <h1 className="text-2xl font-light mb-4 mt-6">In browser or in App, </h1>
   <h1 className="text-xl font-extralight mb-6 text-orange-500">Learning Motivated anywhere....</h1>
    <div>

    </div>
    </div>
 
            </section>
  </>
  )
}