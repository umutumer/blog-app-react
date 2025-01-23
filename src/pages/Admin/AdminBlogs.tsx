import React from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import AdminBlogList from '../../components/AdminBlogList'
import { Helmet } from 'react-helmet'
import FavIcon from '../../blog-fav-icon.png'
const AdminBlogs = () => {
  return (
    <div className='bg-gray-200 flex '>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Blog | SPEK BLOG</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" href={FavIcon} />
        <meta
          name="description"
          content="Spek Blog,Admin Blog"
        />
      </Helmet>
      <AdminSidebar />
      <AdminBlogList />
    </div>
  )
}

export default AdminBlogs