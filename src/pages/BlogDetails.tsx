import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { AppDispatch, RootState } from '../libs/Redux/store';
import { fetchBlogs } from '../libs/Redux/BlogSlice';
import { Blog } from '../types/types';
import Header from '../components/layout/Header';
import Comment from '../components/Comment';
import { Helmet } from 'react-helmet';
import FavIcon from '../blog-fav-icon.png'
const BlogDetails = () => {
    const { title } = useParams();
    console.log(title);

    const blogs = useSelector((state: RootState) => state.blogs.entities);
    const selectedBlog = title && blogs && blogs.find((blog: Blog) => blog.name.toLowerCase() === title.toLowerCase());
    const selectedBlogId = selectedBlog && selectedBlog.id || "null"
    const lines = selectedBlog && selectedBlog.explanation.trim().split("\n").filter(line => line.trim() !== "");
    const dispatch = useDispatch<AppDispatch>();
    const keywords = selectedBlog && selectedBlog.keywords || ['teknoloji', 'yazılım', 'blog'];

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <div className='w-full flex flex-col items-center'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{selectedBlog ? `${selectedBlog.name} | SPEK BLOG` : "SPEK BLOG"}</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={FavIcon} />
                <meta
                    name="description"
                    content={selectedBlog ? selectedBlog.metaExplanation : ""}
                />
                <meta
                    name="keywords"
                    content={keywords.join(', ')}
                />
            </Helmet>
            <Header />
            {selectedBlog && (
                <div className='w-[70%]'>
                    <img src={selectedBlog.img} alt={selectedBlog.name} className='w-full md:h-[500px] h-[200px] object-cover rounded-xl' />
                    <h2 className='md:text-3xl text-xl font-bold text-center my-10'>{selectedBlog.name}</h2>
                    {lines && lines.map((line, index) => {
                        if (line.startsWith("# ")) {
                            return <h3 key={index} className="my-5 font-bold md:text-xl text-lg">{line.slice(2)}</h3>;
                        } else {
                            return <p key={index} className="my-2 md:text-base text-sm">{line}</p>;
                        }
                    })}
                </div>
            )}
            <Comment blogId={selectedBlogId} />
        </div>
    )
}

export default BlogDetails;
