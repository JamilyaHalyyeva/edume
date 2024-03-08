
import { Title } from '../components/title/Title'
import onlineLessons from "../online"

export const OnlineCourses = () => {
  return (
    <>
    <section className="online" id="online-courses">
        <div className="container">
            <Title subtitle='CLASSES' title='Browse Our Online classes'/>
            <div className="content grid3">
                {onlineLessons.map((item)=>(
                    <div className="box">
                        <div className="img">
                            <img src={item.cover} alt="" />
                            
                        </div>
                        <h1>{item.courseName}</h1>

                        <span>{item.courses}</span>
                    </div>
                    

                   
                ))}

                
            </div>
        </div>
    </section>

    </>
  )
}