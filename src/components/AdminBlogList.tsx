import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../libs/Redux/store';
import { addBlog, deleteBlog, fetchBlogs, updateBlog } from '../libs/Redux/BlogSlice';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { Blog } from '../types/types';

const AdminBlogList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: RootState) => state.blogs.entities);
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [deleteModalVisibility, setDeleteModalVisibility] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("null");
    const [name, setName] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [metaExplanation, setMetaExplanation] = useState<string>("");
    const [minute, setMinute] = useState<number>(1);
    const [keywordInput, setKeywordInput] = useState<string>("");


    const updateOrNewBlog = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedId === "null") {
            const newData = {
                name,
                img,
                explanation,
                keywords,
                metaExplanation,
                minute
            };
            dispatch(addBlog(newData)).then(() => {
                setModalVisibility(false);
                setName("");
                setImg("");
                setExplanation("");
                setKeywords([]);
                setMetaExplanation("");
                setMinute(1);
                setKeywordInput("");
                setSelectedId("null");
            })
        } else {
            const updatedData = {
                id: selectedId,
                name,
                img,
                explanation,
                keywords,
                metaExplanation,
                minute
            };
            dispatch(updateBlog(updatedData)).then(() => {
                setModalVisibility(false);
                setName("");
                setImg("");
                setExplanation("");
                setKeywords([]);
                setMetaExplanation("");
                setMinute(1);
                setKeywordInput("");
                setSelectedId("null");
            })
        };
    };
    const handleUpdateModalVisibility = (selectedId: string, name: string, explanation: string, keywords: string[], metaExplanation: string, minute: number, img: string) => {
        setSelectedId(selectedId);
        setName(name);
        setExplanation(explanation);
        setKeywords(keywords);
        setMetaExplanation(metaExplanation);
        setMinute(minute);
        setImg(img);
        setModalVisibility(true)
    }
    const modalCancelBtn = () => {
        setModalVisibility(false);
        setName("");
        setImg("");
        setExplanation("");
        setKeywords([]);
        setMetaExplanation("");
        setMinute(1);
        setKeywordInput("");
        setSelectedId("null");
    }
    const handleAddKeyword = () => {
        if (keywordInput.trim() !== '') {
            setKeywords([...keywords, keywordInput]);
            setKeywordInput('');
        }
    };
    const handleDeleteKeyword = (key: string) => {
        setKeywords(keywords.filter((keyword) => keyword !== key))
    }
    const handleFileChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result as string;
                setImg(image);
            };
            reader.readAsDataURL(file);
        }
    };
    const removeBlog = () => {
        dispatch(deleteBlog(selectedId));
        setSelectedId("null")
        setDeleteModalVisibility(false);
    };
    const handleDeleteModalVisibility = (id: string) => {
        setSelectedId(id);
        setDeleteModalVisibility(true);
    }
    const deleteModalCancelBtn = () => {
        setSelectedId("null");
        setDeleteModalVisibility(false);
    }
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [])
    return (
        <div className='w-full p-20'>
            {modalVisibility && (
                <div className='bg-black bg-opacity-40 fixed top-0 left-0 w-full h-full flex items-center justify-center z-10'>
                    <div className='flex items-center justify-between w-[80%] h-[80%] bg-white p-10 rounded relative'>
                        <form
                            className='flex w-[50%] h-full flex-col gap-4 bg-white p-10 rounded'
                            onSubmit={updateOrNewBlog}
                        >
                            <h3 className='font-semibold text-xl'>{selectedId !== "null" ? "Update Blog" : "Add Blog"}</h3>
                            <Input
                                value={name}
                                placeholder='Blog Name'
                                onChange={(e) => setName(e.target.value)}
                                className='w-full'
                                required
                            />
                            <textarea
                                className='px-4 py-2 font-medium text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-40 max-h-40 min-w-full max-w-full'
                                name=""
                                id=""
                                placeholder='Explanation'
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                required
                            ></textarea>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='flex items-center justify-between gap-2'>
                                    <Input
                                        placeholder='Keywords'
                                        className='w-[70%]'
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                    />
                                    <Button onClick={handleAddKeyword} className='w-[20%] h-10'>Ekle</Button>
                                </div>
                                <div className='w-full flex flex-wrap gap-2'>
                                    {keywords.length > 0 && keywords.map(keyword => (
                                        <p
                                            className='flex items-center justify-center m-2 '
                                        >
                                            {keyword}
                                            <Button
                                                variant={"ghost"}
                                                size={"sm"}
                                                className='border-none w-5 py-0 px-0 h-5 flex items-center justify-center'
                                                onClick={() => handleDeleteKeyword(keyword)}
                                            >
                                                x
                                            </Button>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <Input
                                placeholder='Minute'
                                type='number'
                                value={minute}
                                onChange={(e) => setMinute(parseFloat(e.target.value))}
                                className='w-full'
                                required
                            />
                            <Input
                                type='file'
                                variant={"file"}
                                onChange={handleFileChanges}
                                className='w-full px-2 py-4'
                            />
                            <textarea
                                className='px-4 py-2 font-medium text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-20 max-h-20 min-w-full max-w-full'
                                name=""
                                id=""
                                placeholder='Explanation'
                                value={metaExplanation}
                                onChange={(e) => setMetaExplanation(e.target.value)}
                                required
                            />
                            <div className='flex justify-between w-full'>
                                <Button size={"lg"}>{selectedId !== "null" ? "Güncelle" : "Ekle"}</Button>

                            </div>
                        </form>
                        <div className='w-[50%] h-full flex flex-col justify-center items-center'>
                            <h3 className='font-semibold text-xl mb-10'>Prewiew</h3>
                            <Card
                                imgSrc={img}
                                title={name}
                                description={explanation.slice(0, 120) + "..."}
                                variant="default"
                                size="lg"
                                minute={minute}
                            />
                        </div>
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            onClick={modalCancelBtn}
                            className='absolute top-5 right-5'
                        >
                            Vazgeç
                        </Button>
                    </div>
                </div>
            )}
            {deleteModalVisibility && (
                <div className='bg-black bg-opacity-40 fixed top-0 left-0 w-full h-full flex items-center justify-center z-10'>
                    <div className='flex flex-col items-center justify-between w-[400px] h-[150px] bg-white px-10 py-5 rounded relative'>
                        <h3 className='font-bold text-xl mb-10'>Silmek istediğinize emin misiniz ?</h3>
                        <div className='flex gap-4'>
                            <Button
                                variant={"default"}
                                onClick={removeBlog}
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
            <div className='flex justify-between'>
                <h3 className='font-semibold text-4xl text-blue-900'>Bloglar</h3>
                <Button
                    size={"lg"}
                    variant={"outline"}
                    onClick={() => setModalVisibility(true)}
                >
                    Blog Ekle
                </Button>
            </div>
            <div>
                {blogs && (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Resim</th>
                                    <th>İsim</th>
                                    <th>Açıklama</th>
                                    <th>Meta</th>
                                    <th>Zaman(dk)</th>
                                    <th>Aksiyon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog: Blog) => (
                                    <tr key={blog.id}>
                                        <td><img src={blog.img} alt={blog.name} className='w-20' /></td>
                                        <td>{blog.name}</td>
                                        <td>{blog.explanation.slice(0, 120) + "..."}</td>
                                        <td>{blog.metaExplanation}</td>
                                        <td>{blog.minute}</td>
                                        <td className='flex'>
                                            <Button
                                                className='text-lg text-red-600'
                                                variant={"ghost"}
                                                size={"sm"}
                                                onClick={() => handleDeleteModalVisibility(blog.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                            <Button
                                                className='text-lg text-blue-600'
                                                variant={"ghost"}
                                                size={"sm"}
                                                onClick={() => handleUpdateModalVisibility(blog.id, blog.name, blog.explanation, blog.keywords, blog.metaExplanation, blog.minute, blog.img)}
                                            >
                                                <FaPen />
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

export default AdminBlogList