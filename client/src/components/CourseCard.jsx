import aboutCourse from '../json/courseCard';
import { Title } from './Title';

export const CourseCard = () => {
    return (
        <>
          <section className="courseCard " id="courses">
            <Title subtitle="CLASSES" title="Our Lessons" />
            <div className="max-w-screen-lg mx-auto grid grid-cols-2 px-2 gap-6 sm:grid-cols-2 md:grid-cols-4 mb-20 ">
                {aboutCourse.map((item) => (
                    <div key={item.id} className="box w-full sm:w-70 p-6 rounded-md shadow-xl bg-white transition duration-300 flex flex-col items-center justify-center cursor-pointer">
                        <div className="img w-20 h-20 flex items-center justify-center">
                            <img src={item.cover} alt="" className="w-full h-full object-cover align" />
                        </div>
                        <h1 className="text-lg font-medium text-orange-500 mt-4">{item.courseName}</h1>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
};

