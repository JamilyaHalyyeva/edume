import React from 'react'
import "./blog.css"
import { BlogCard } from './BlogCard'
import { Title } from '../title/Title'


export const Blog = () => {
  return (
    <>
        <section className="blog padding">
        <div className="container grid2">
       
            <BlogCard/>
        </div>
        </section>
    </>
  )
}
