
import React from 'react'
import "./hero.css"
import { Title } from '../../components/title/Title'

export const Hero = () => {
  return (
    <>
        <section className='hero'> 
        <div className="container">
            <div className="row">
                <Title subtitle='WELCOME TO EDUTUTOR' title='best Online Education'/>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias tempore consectetur nulla? Illum aut cumque at molestiae esse, nisi et necessitatibus magnam similique repellat, modi, dolores dolorem minus facilis atque.</p>
                <div className="button">
                    <button className="primary-btn">
                        Get Started now <icon className="fas fa-arrow-right"></icon>
                    </button>
                    <button >
                        view courses <icon className="fas fa-arrow-right"></icon>
                    </button>
                </div>

            </div>
        </div>

        </section>
        <div className="margin">

        </div>
    </>
  )
}