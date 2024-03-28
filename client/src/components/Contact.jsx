
import { Title } from './Title';

export const Contact = () => {
  return (
    <>
      <section className="mt-50 pt-100 h-auto mx-50 md:mx-20 sm:mx-10 xs:mx-5 bg-orange-500 rounded-lg" id='contact'>
        <div className="max-w-screen-lg mx-auto flex justify-center items-center ">
          <div className="w-2/4 mr-10 ">
          
            <img src="https://thepixelcurve.com/wp/edubin/language-school/wp-content/uploads/sites/53/2023/08/HR785234.png" alt="" className=' hidden md:block'/>
          </div>
          <div className="right">
            <form className="w-80 max-w-md p-4 border border-gray-300 rounded bg-white">
              <Title subtitle="Send us a message" />
              <input type="text" placeholder="Name" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <input type="text" placeholder="Email" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <input type="text" placeholder="Subject" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded" />
              <textarea placeholder="Message" className="w-full px-3 py-2 mb-3 border border-gray-300 rounded resize-none h-40"></textarea>
              <button type="submit" className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

