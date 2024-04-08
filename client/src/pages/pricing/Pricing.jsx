


import { OurTutors } from "./OurTutors";
import { PricePlan } from "./PricePlan";


export const Pricing = () => {
    
   
    const homeAbout = [
        {
          id: 1,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/teachers/header_infos_list_image_1-9eecb8391d360fb355bdb8284f93bba45dcd230dcf8d71c42a64156742ae84b9.png",
          title: "Diversity and Motivation",
          description: "With videos and innovative exercise formats. ",
        },
        {
          id: 2,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/teachers/header_infos_list_image_2-708ea33a6a7bdd703db87dfa7c520bebd02018c1eef861ab617c08ebb214385d.png",
          title: "The right thing for everyone",
          description: "Assign content in a differientiated and targeted Manner.",
        },
        {
          id: 3,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/teachers/header_infos_list_image_3-a8d245bd816e09f77e3312f5ce74a581da986598004da100a6c98d6f4b6ba882.png",
          title: "Save work and time.",
          description: "More time for the essential.",
        }
      ];

    
  return (
    <>
<section className=" bg-green-200 pb-10 py-10">
    <div className="text-orange-500 text-center"  >
   <h1 className="text-5xl font-extrabold mb-4">Teaching Successful</h1>
   <h1 className="text-4xl text-gray-800 font-extralight">With Digital Materials</h1>

    </div>
     

    <div className="flex justify-around w-70 max-w-screen-lg mx-auto ">
        <div className="w-full ml-20 p-6 items-center"> {/* Adjusted width of the grid container */}
            <div className="justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mr-6 space-x-3 ">
                {homeAbout.map((item, index) => (
                    <div key={index} className=" ">
                        <div className="flex flex-col items-center w-70 ">
                            <img src={item.cover} alt="" className="w-42 h-40 mb-2 md:full object-contain" />
                            <h2 className="font-semibold text-lg text-gray-700 mt-4 mb-2">{item.title}</h2>
                            <h3 className="text-sm font-light text-gray-600 ">{item.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
    <PricePlan/>
    <OurTutors/>
    </section>


    </>
  )
}
