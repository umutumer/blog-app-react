import React, { useEffect } from 'react'
import { Card } from './ui/Card'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../libs/Redux/store'
import { fetchBlogs } from '../libs/Redux/BlogSlice'
import { Blog } from '../types/types'

const CardList = () => {
    const blogs = useSelector( (state : RootState) =>state.blogs.entities); 
    const dispatch = useDispatch<AppDispatch>();


    useEffect(()=>{
        dispatch(fetchBlogs());
    },[])
    return (
        <main className='w-full flex justify-center'>
          <div className='w-[70%] flex justify-center flex-wrap gap-12'>
            {blogs && blogs.map((blog :Blog,index) =>(
                <Card
                imgSrc={blog.img}
                title={blog.name}
                description={blog.explanation.slice(0,120) + "..."}
                variant={"default"}
                size={"lg"}
                minute={blog.minute}
                keywords={blog.keywords}
                key={index}
                 />
            ))}
          </div>
        </main>
    )
}

export default CardList