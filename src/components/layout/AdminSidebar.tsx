import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/Button'
import { RiDashboard3Fill } from "react-icons/ri";
import { LuBook, LuBookPlus } from "react-icons/lu";
import { FaComments, FaHouse } from "react-icons/fa6";
const AdminSidebar = () => {
  return (
    <aside className='w-[250px] min-h-screen flex flex-col items-center bg-white relative'>
        <Link to={'/admin'}>
          <p className="font-bold text-blue-900 text-2xl my-20">
            BLOG <span className="text-pink-600">APP</span>
          </p>
        </Link>
        <div className='flex flex-col items-center gap-4'>
            <Link to={'/admin'}>
            <Button
             variant={"outline"}
             size={"lg"}
            >
                <p className='flex gap-1 items-center justify-center'><RiDashboard3Fill /> Panel</p>
            </Button>
            </Link>
            <Link to={'/admin/blogs'}>
            <Button
             variant={"outline"}
             size={"lg"}
            >
               <p className='flex gap-1 items-center justify-center'><LuBook /> Blog</p>
            </Button>
            </Link>
            <Link to={'/admin/comments'}>
            <Button
             variant={"outline"}
             size={"lg"}
            >
                <p className='flex gap-1 items-center justify-center'><FaComments /> Yorum</p>
            </Button>
            </Link>
        </div>
            <Link to={'/'}>
            <Button
             variant={"outline"}
             size={"lg"}
             className='absolute bottom-2 left-6'
            >
                <p className='flex gap-1 items-center justify-center'><FaHouse />Ana Sayfa</p>
            </Button>
            </Link>
    </aside>
  )
}

export default AdminSidebar