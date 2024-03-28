

import price from "../json/price";

const PriceCard = () => {
  return (
    <>
  
      {price.map((item, index) => (
        <div key={index}  className=" shadow-2xl py-8 px-8 text-center rounded-md mb-8  justify-center lg:w-96 xl:w-80 2xl:w-72 sm:w-80 bg-white  md:w-62 flex-row"> {/* Added mb-8 for margin-bottom */}
        <div className="img">
        <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/pricing/promote_app-19feb71a83caa5afcd81fbca9a404b2c7d6fd647da93bdbc3766d6dc6e0bab41.svg" alt="" />
        </div>
          <h3 className="text-2xl font-semibold text-orange-500 md:text-lg pt-6">{item.type}</h3>
          <ul className="mt-6 space-y-4 "> {/* Replaced gap with space-y for spacing between list items */}
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-start text-gray-800 border-b p-1 text-m md:text-m">
                <i className="fas fa-check text-orange-500 mr-2 "></i> {/* Updated to fas for solid check icon */}
                {feature}
              </li>
            ))}
          </ul>
          <h1 className="text-4xl font-semibold text-orange-500 my-8 md:text-xl">
            <span className="text-2xl font-semibold md:text-lg">$</span>
            {item.price}
          </h1>
          <button className=" bg-white border-orange-500 text-orange-500 border shadow-md font-semibold py-2 px-4 rounded-full transition duration-500 ease-in-out hover:bg-orange-500 hover:text-white">GET STARTED</button>
        </div>
      ))}
      
    </>
  );
}

export default PriceCard;



