
import { Title } from './Title';
import homeAbout from  '../json/Dummydata'

export const Info = () => {
  return (
    <>
<section className="container w-screen-lg mx-auto my-20 p-6 " id='info'>
    <Title title='Why Involve with Edume' />

    <div className="flex justify-around w-70  ">
        <div className="w-full ml-20 p-6 items-center"> {/* Adjusted width of the grid container */}
            <div className="justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mr-6 space-x-3 ">
                {homeAbout.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-2xl shadow-lg  ">
                        <div className="flex flex-col items-center w-70 ">
                            <img src={item.cover} alt="" className="w-full object-contain h-40 mb-2 md:full " />
                            <h2 className="font-semibold text-lg text-gray-700">{item.title}</h2>
                            <h3 className="text-sm font-normal hidden text-gray-600 md:block">{item.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</section>




    </>
  )
}
