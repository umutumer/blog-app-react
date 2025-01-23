import React, { useEffect } from 'react'
import { Button } from './ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../libs/Redux/store';
import { fetchComments } from '../libs/Redux/CommentSlice';
import { fetchBlogs } from '../libs/Redux/BlogSlice';
import { Blog, Comments } from '../types/types';
import { Link } from 'react-router';

const DashboardContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: RootState) => state.blogs.entities);
    const comments = useSelector((state: RootState) => state.comments.entities);

    useEffect(() => {
        dispatch(fetchComments());
        dispatch(fetchBlogs());
    }, [])
    return (
        <main className='flex w-full min-h-screen gap-20 justify-between px-20'>
            <div className='bg-white w-[500px] h-[600px] rounded-xl p-2 mt-20 relative shadow-xl'>
                <h3 className='text-xl font-bold mb-10 text-center mt-5 '>Son Yorumlar</h3>
                {comments && comments.slice().reverse().slice(0,3).map((comment: Comments) => (
                    <div className='w-full flex items-center border-b' key={comment.id}>
                        <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png" alt="" className='rounded-full w-28 h-28 m-2' />
                        <div className='my-2'>
                            <p className='font-bold text-lg'>{comment.name}</p>
                            <p className='text-base'>{comment.mail}</p>
                            <p className='text-sm'>{comment.content}</p>
                        </div>
                    </div>
                ))}
                <Link to={'/admin/comments'}>
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        className='absolute bottom-5 right-5'
                    >
                        Devamını Gör
                    </Button>
                </Link>
            </div>
            <div className='bg-white w-[900px] h-[600px] rounded-xl p-4 mt-20 relative shadow-xl'>
                <h3 className='text-xl font-bold mb-10'>Son Bloglar</h3>
                {blogs && blogs.slice().reverse().slice(0,3).map((blog: Blog) => (
                    <div key={blog.id} className='w-full flex items-center border-b py-2 gap-4'>
                        <img src={blog.img} alt={blog.name} className='w-32 h-32 object-cover rounded' />
                        <div>
                            <h3 className='font-bold'>{blog.name}</h3>
                            <p>{blog.explanation.slice(0, 200) + "..."}</p>
                        </div>
                    </div>
                ))}
                <Link to={'/admin/blogs'}>
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        className='absolute bottom-5 right-5'
                    >
                        Devamını Gör
                    </Button>
                </Link>
            </div>
        </main>
    )
}

export default DashboardContainer