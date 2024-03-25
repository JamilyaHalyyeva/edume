

import price from "../json/price";

const PriceCard = () => {
  return (
    <>
    
      {price.map((item, index) => (
        <div key={index}  className=" shadow py-6 px-6 text-center rounded-md mb-8 justify-center lg:w-96 xl:w-80 2xl:w-72 sm:w-80   md:w-72 flex-row"> {/* Added mb-8 for margin-bottom */}
          <h3 className="text-2xl font-semibold text-orange-500 md:text-lg">{item.type}</h3>
          <ul className="mt-6 space-y-4 "> {/* Replaced gap with space-y for spacing between list items */}
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-center text-gray-500 border-b p-2 md:text-sm">
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



