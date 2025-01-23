import React from 'react'
import Header from '../components/layout/Header'
import CardList from '../components/CardList'
import { Helmet } from 'react-helmet'
import FavIcon from '../blog-fav-icon.png'

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ana Sayfa | SPEK BLOG</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" href={FavIcon} />
        <meta
          name="description"
          content="Spek Blog, teknoloji ve tasarım dünyasından güncel yazılar, yazılım rehberleri ve ilham verici içeriklerle bilgiye hızlı ve keyifli bir yolculuk sunar!"
        />
      </Helmet>
      <Header />
      <CardList />
    </>
  )
}

export default Home
