
import { Title } from './Title';
import MAN from '../../public/man.png'

export const Contact = () => {
  return (
    <>
      <section className="mt-50 mb-10 pt-100 h-auto mx-50 md:mx-20 sm:mx-10 xs:mx-5  bg-transparent pr-4 pb-4 rounded-2xl md:bg-orange-500" id='contact'>
        <div className="max-w-screen-lg mx-auto flex justify-center items-center ">
          <div className="w-2/5 mr-24 ">
          
            <img src={MAN} alt="" className=' hidden md:block '/>
          </div> 
          <div className="right">
            <form className="w-80 max-w-md p-4 border border-gray-300 mr-4 rounded bg-white">
              <Title subtitle="Send us a message" />
              <input type="text" placeholder="Name" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <input type="text" placeholder="Email" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <input type="text" placeholder="Subject" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <textarea placeholder="Message" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded resize-none h-40"></textarea>
              <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

