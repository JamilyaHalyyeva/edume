import { Title } from "../Title";
import MAN from "../../../public/man.png";

export const Contact = () => {
  return (
    <>
      <section
        className="mt-50 mb-10  h-auto mx-50  md:mx-20  sm:mx-10 xs:mx-5  bg-transparent pr-4 pb-4 rounded-2xl md:bg-orange-500"
        id="contact"
      >
        <div className="max-w-screen-lg mx-auto flex justify-center items-center ">
          <div className="w-2/5 mr- ">
            <img src={MAN} alt="" className=" hidden md:block " />
          </div>
          <div className="right ml-8 md:ml-10">
            <form className="w-72 max-w-md p-4 border md:w-80 border-gray-300 mr-8 rounded bg-white">
              <Title subtitle="Send us a message" />
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Message"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded resize-none h-40"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
