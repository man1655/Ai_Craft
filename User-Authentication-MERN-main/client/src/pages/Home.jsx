import React from 'react'
import Header from '../components/Header'
import Homepage2 from '../components/Homepage2'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center' >
      <Homepage2/>
    </div>
  )
}

export default Home
