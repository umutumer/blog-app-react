import React from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import DashboardContainer from '../../components/DashboardContainer'
import { Helmet } from 'react-helmet'
import FavIcon from '../../blog-fav-icon.png' 
const AdminHome = () => {
  return (
    <main className='bg-gray-200 flex '>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Ana Sayfa | SPEK BLOG</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" href={FavIcon} />
        <meta
          name="description"
          content="Spek Blog,Admin Anasayfa"
        />
      </Helmet>
        <AdminSidebar />
        <DashboardContainer />
    </main>
  )
}

export default AdminHome