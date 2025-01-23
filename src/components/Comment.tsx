import React, { useEffect, useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../libs/Redux/store';
import { addComment, fetchComments } from '../libs/Redux/CommentSlice';
import { Comments } from '../types/types';

interface CommentProps {
    blogId: string
}

const Comment: React.FC<CommentProps> = ({ blogId }) => {
    const [fullName, setFullName] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const currentDate = new Date
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const numericDate = day.toString().padStart(2, '0') + "." + month.toString().padStart(2, '0') + "." + year;
    const stringDate = numericDate.toString();
    const comments = useSelector((state: RootState) => state.comments.entities);
    const filteredComments = comments && comments.filter((comment: Comments) => comment.blogId === blogId);



    const newComment = (e: React.FormEvent) => {
        e.preventDefault();
        const commentData = {
            name: fullName,
            mail: mail,
            content: content,
            commentDate: stringDate,
            blogId: blogId
        }
        dispatch(addComment(commentData));
        dispatch(fetchComments());
        setFullName("");
        setMail("");
        setContent("");
    }

    useEffect(() => {
        dispatch(fetchComments());
    }, [])
    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='mt-10 mb-5 md:text-2xl text-xl font-bold'>Yorumlar</h2>
            <div className='w-[70%]'>
                <form onSubmit={newComment}>
                    <div className='w-full flex justify-between mb-2'>
                        <Input
                            className='w-[49%]'
                            placeholder='İsim Soyisim'
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                            className='w-[49%]'
                            placeholder='ornek@gmail.com'
                            type='email'
                            required
                            value={mail} 
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <textarea
                        className='px-4 py-2 font-medium text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-52 max-h-52 min-w-full max-w-full'
                        placeholder='Yorumunuzu Yazınız...'
                        required
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <Button className='w-full mt-2 mb-10'>Ekle</Button>
                </form>
                {comments && filteredComments.map((comment: Comments) => (
                    <div className='flex md:flex-row flex-col w-full md:h-40 h-full shadow rounded-xl items-center p-5 my-5 relative'>
                        <div className='flex md:flex-row flex-col items-center w-96 md:gap-2 gap-1 md:mb-0 mb-2'>
                            <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png" alt="" className='rounded-full md:w-28 w-16 md:h-28 h-16' />
                            <div>
                                <p className='md:font-bold font-normal md:text-lg text-sm'>{comment.name}</p>
                                <p className='text-sm md:font-normal font-thin'>{comment.mail}</p>
                            </div>
                        </div>
                        <p className='md:text-base text-sm'>{comment.content}</p>
                        <p className='absolute md:text-base text-sm md:top-5 top-2 md:right-5 right-2'>{comment.commentDate}</p>
                    </div>
                ))}
                {filteredComments.length < 1 && (
                    <p className='text-center mb-5 underline'>Henüz hiç yorum yok</p>
                )}
            </div>

        </div>
    )
}

export default Comment