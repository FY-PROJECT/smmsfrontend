import React from 'react'
// Components
import Home from './Home'
import Solution from './Solution'
import Testimonials from './Testimonials'
import Footer from './Footer'
import Navbar from '../Navbar'

const Landing = () => {
  return (
    <>
      <Navbar/>
      <Home/> 
      <Solution/>
      <Testimonials/>
      <Footer/>
    </>
  )
}

export default Landing