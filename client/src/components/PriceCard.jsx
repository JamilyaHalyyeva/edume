import {Link} from "react-router-dom"



const PriceCard = () => {
  const price = [
    {
      id: 1,
      type: "Plan For Teachers",
      cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/chat/chat_laptop-93ef6a03e7e2028a21af036405d1aeddd305609cf4447e482a4c41734d658bba.svg",
      features: [
        { text: 'Access to select courses for specific grades', icon: 'fa fa-graduation-cap', iconColor: 'text-purple-500' },
        { text: 'Structured learning modules', icon: 'fa fa-book', iconColor: 'text-green-500' },
        { text: 'Limited live sessions with instructors', icon: 'fa fa-users', iconColor: 'text-blue-500' },
        { text: 'Basic progress tracking', icon: 'fa fa-chart-line', iconColor: 'text-pink-500' },
        { text: 'Standard support services', icon: 'fa fa-life-ring', iconColor: 'text-red-500' },
        { text: 'Access to select courses for specific grades', icon: 'fa fa-play', iconColor: 'text-purple-500' },
        
       
      ],
      price: "199.99",
    },
    {
      id: 2,
      type: "Students Learning Plan",
      cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/teachers/feature_study-0a7a5bce002aeacbbb91d6b9b517eb61c214a97b401ca0d6ac720aee19f2e3ba.png",
      features: [
        { text: 'Access to curated courses designed for specific grades', icon: 'fa fa-graduation-cap', iconColor: 'text-purple-500' },
        { text: 'Structured learning modules for comprehensive understanding', icon: 'fa fa-book', iconColor: 'text-green-500' },
        { text: 'Participation in limited live sessions with expert instructors', icon: 'fa fa-users', iconColor: 'text-blue-500' },
        { text: 'Basic tools for tracking individual progress', icon: 'fa fa-chart-line', iconColor: 'text-pink-500' },
        { text: 'Access to curated courses designed for specific grades', icon: 'fa fa-play', iconColor: 'text-purple-500' },
       
      ],
      price: "399.99",
    }
  ];
  return (
    <>
  
      {price.map((item, index) => (
        <div key={index}  className=" shadow-2xl py-8 px-8 text-center rounded-2xl mb-8  justify-center lg:w-92 xl:w-80 2xl:w-72 sm:w-80 bg-white  md:w-62 flex-row"> {/* Added mb-8 for margin-bottom */}
        <div className="bg-yellow-100">
        <img src={item.cover} alt="" className="" />
        </div>
          <h3 className="text-2xl font-semibold text-orange-500 md:text-lg pt-6">{item.type}</h3>
          <ul className="mt-6 space-y-4 "> {/* Replaced gap with space-y for spacing between list items */}
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-start text-gray-800 border-b p-1 text-m md:text-m">
                <i className={`${feature.icon} ${feature.iconColor} mr-2 text-2xl`}></i> {/* Updated to fas for solid check icon */}
                {feature.text}
              </li>
            ))}
          </ul>
          <h1 className="text-4xl font-semibold text-gray-800 my-8 md:text-xl">
            <span className="text-2xl font-semibold md:text-lg">$</span>
            {item.price}
          </h1>
          <button className="border-orange-500 text-orange-500 border shadow-md font-semibold py-2 px-4 rounded-full transition duration-500 ease-in-out bg-orange-500 text-white  hover:bg-orange-600 ">
            <Link to="/pricePage">GET STARTED</Link>
          </button>
        </div>
      ))}
      
    </>
  );
}

export default PriceCard;



