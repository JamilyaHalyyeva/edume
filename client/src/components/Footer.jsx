

export const Footer = () => {
  return (
    <>
      <section className="bg-orange-100 py-12">
        <div className="max-w-screen-lg mx-auto grid grid-col-1 px-2 items-center md:flex justify-between">
          <div className="pr-12">
            <h1 className="text-orange-500 text-2xl font-semibold mb-2">Newsletter - Stay tuned and get the latest update</h1>
            <span className="text-orange-400">Far far away, behind the word mountains</span>
          </div>
          <div className="flex pr-12">
            <input type="text" placeholder="Enter your email address" className="w-full px-4 py-2 border border-gray-300 rounded" />
            <i className="fa fa-paper-plane px-4 py-2 rounded bg-orange-500 text-white"></i>
          </div>
        </div>
      </section>
      <footer className="bg-gray-200 py-12">
        <div className="max-w-screen-lg mx-auto px-2 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="w-full md:w-70">
            <h1 className="text-3xl font-bold text-orange-500">EDUME</h1>
            <span className="text-orange-500">online education & learning</span>
            <p className="text-gray-600 leading-7 text-base mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <div className="flex mt-4 space-x-3">
              <i className="fab fa-facebook-f text-orange-500 hover:text-orange-400 text-xl"></i>
              <i className="fab fa-instagram text-orange-500 hover:text-orange-400 text-xl"></i>
              <i className="fab fa-twitter text-orange-500 hover:text-orange-400 text-xl"></i>
              <i className="fab fa-youtube text-orange-500 hover:text-orange-400 text-xl"></i>
            </div>
          </div>
          <div className="w-full md:w-70">
            <h3 className="font-semibold mb-6 text-orange-500">Explore</h3>
            <ul className="text-gray-600">
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">About Us</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Courses</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Blog</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Contact</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Privacy Policy</li>
            </ul>
          </div>
          <div className="box w-full md:w-70 link">
            <h3 className="font-semibold mb-6 text-orange-500">Useful Links</h3>
            <ul className="text-gray-600">
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">About Us</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Courses</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Blog</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Contact</li>
              <li className="relative before:inline-block before:content-['→'] before:text-orange-500 before:mr-1">Privacy Policy</li>
            </ul>
          </div>
          <div className="w-full md:w-70">
            <h3 className="font-semibold mb-6 text-orange-500">Have a Question?</h3>
            <ul className="text-gray-600">
              <li className="flex items-center mb-4">
                <i className="fa fa-map mr-3 text-orange-500"></i>
                <span>203 fake st, San Francisco, CA 94101</span>
              </li>
              <li className="flex items-center mb-4">
                <i className="fa fa-phone-alt mr-2 text-orange-500"></i>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-envelope mr-2 text-orange-500"></i>
                <span>ex@example.com</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="bg-gray-300 py-8">
        <p className="text-center leading-7 text-base text-gray-600">Copyright @2024 All rights reserved</p>
      </div>
    </>
  )
}


