import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../libs/Redux/store';
import { deleteComment, fetchComments } from '../libs/Redux/CommentSlice';
import { Comments } from '../types/types';
import { FaTrash } from 'react-icons/fa6';

const AdminCommentList = () => {
    const [deleteModalVisibility, setDeleteModalVisibility] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("null");
    
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comments.entities);
    const handleDeleteModalVisibility = (id: string) => {
        setSelectedId(id);
        setDeleteModalVisibility(true);
    }
    const removeComment= () => {
        dispatch(deleteComment(selectedId));
        setSelectedId("null");
        setDeleteModalVisibility(false);
    }
    const deleteModalCancelBtn = () => {
        setSelectedId("null");
        setDeleteModalVisibility(false);
    }
    useEffect(() => {
        dispatch(fetchComments());
    }, [])
    return (
        <div className='w-full p-20'>
            {deleteModalVisibility && (
                <div className='bg-black bg-opacity-40 fixed top-0 left-0 w-full h-full flex items-center justify-center z-10'>
                    <div className='flex flex-col items-center justify-between w-[400px] h-[150px] bg-white px-10 py-5 rounded relative'>
                        <h3 className='font-bold text-xl mb-10'>Silmek istediğinize emin misiniz ?</h3>
                        <div className='flex gap-4'>
                            <Button
                                variant={"default"}
                                onClick={removeComment}
                            >
                                Onayla
                            </Button>
                            <Button
                                variant={"outline"}
                                onClick={deleteModalCancelBtn}
                            >
                                Vazgeç
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div>
            <h3 className='font-semibold text-4xl text-blue-900'>Yorumlar</h3>
                {comments && (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>İsim</th>
                                    <th>E-Posta</th>
                                    <th>Açıklama</th>
                                    <th>Yorum Tarihi</th>
                                    <th>Aksiyon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment: Comments) => (
                                    <tr key={comment.id}>
                                        <td>{comment.name}</td>
                                        <td>{comment.mail}</td>
                                        <td>{comment.content.slice(0, 120) + "..."}</td>
                                        <td>{comment.commentDate}</td>
                                        <td className='flex'>
                                            <Button
                                                className='text-lg text-red-600'
                                                variant={"ghost"}
                                                size={"sm"}
                                                onClick={() => handleDeleteModalVisibility(comment.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminCommentList