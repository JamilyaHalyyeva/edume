import React from 'react'
import { Title } from '../../components/title/Title'

import "./about.css"

export const AboutCard = () => {
  return (
    <>
<section className='aboutHome'>
    <div className="container flexSB">
        <div className="left row">
            <img src="https://dkckbwr4t7ug6.cloudfront.net/assets/application/layouts/welcome_banner_blobby-50966447b463d5608a2fb27ae8eae0eab091cc1e2f881408166bd6086492c953.svg" alt="" />
        </div>
        <div className="right row">
            <Title subtitle="LEARN ANYTHING" title="Benefits About Online Learning"/>
         <div className="items">
         <ul>
  {[
    { text: "Flexibility: Learn at your own pace, anytime, anywhere.", icon: "fa fa-clock" },
    { text: "Accessibility: Access quality education globally, regardless of location or ability.", icon: "fa fa-globe" },
    { text: "Cost-Effectiveness: Save on commuting and materials with digital resources.", icon: "fa fa-money-bill" },
    { text: "Variety of Courses: Choose from diverse subjects and niche topics.", icon: "fa fa-book" },
    { text: "Interactive Learning: Engage through quizzes, discussions, and multimedia.", icon: "fa fa-comments" },
    { text: "Skill Development: Acquire new skills for career growth and adaptation.", icon: "fa fa-cogs" }
  ].map((item, index) => (
    <li key={index}>
      <i className={item.icon}></i> {item.text}
    </li>
  ))}
</ul>
         </div>
        </div>
    </div>

</section>

    </>
  )
}