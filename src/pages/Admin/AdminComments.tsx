import React from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import AdminCommentList from '../../components/AdminCommentList'
import { Helmet } from 'react-helmet'
import FavIcon from '../../blog-fav-icon.png'
const AdminComments = () => {
  return (
    <div className='bg-gray-200 flex '>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Yorum | SPEK BLOG</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" href={FavIcon} />
        <meta
          name="description"
          content="Spek Blog,Admin Anasayfa"
        />
      </Helmet>
        <AdminSidebar />
        <AdminCommentList />
    </div>
  )
}

export default AdminComments