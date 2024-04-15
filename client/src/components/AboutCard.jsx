
import { Title } from './Title';

export const AboutCard = () => {
  return (
    <>
      <section className="bg-purple-100 pt-4">
        <div className="max-w-screen-lg flex flex-col px-2 md:flex-row justify-between mx-auto">
          <div className="md:w-1/2">
            <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/layouts/welcome_banner_blobby-50966447b463d5608a2fb27ae8eae0eab091cc1e2f881408166bd6086492c953.svg" alt="" className="w-full object-contain" />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <Title subtitle="LEARN ANYTHING" title="Benefits About Online Learning" />
            <div className="items mt-10 mb-10 shadow-lg ">
              <ul className="bg-white  py-6 px-6 rounded-2xl transition duration-500 sm:mt-5 md:mt-10 lg:mt-15">
                {[
                  { text: "Flexibility: Learn at your own pace, anytime, anywhere.", icon: "fa fa-clock", iconColor: 'text-pink-500'},
                  { text: "Accessibility: Access quality education globally, regardless of location or ability.", icon: "fa fa-globe", iconColor: 'text-blue-500'},
                  { text: "Cost-Effectiveness: Save on commuting and materials with digital resources.", icon: "fa fa-money-bill", iconColor: 'text-green-500'},
                  { text: "Variety of Courses: Choose from diverse subjects and niche topics.", icon: "fa fa-book" , iconColor: 'text-purple-500'},
                  { text: "Interactive Learning: Engage through quizzes, discussions, and multimedia.", icon: "fa fa-comments", iconColor: 'text-red-500'},
                  { text: "Skill Development: Acquire new skills for career growth and adaptation.", icon: "fa fa-cogs", iconColor: 'text-orange-500'},
                ].map((item, index) => (
                  <li key={index} className="text-gray-600 flex items-center mt-2 gap-2 p-2">
                    <i className={`${item.icon} ${item.iconColor} mr-2 text-2xl`}></i> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


