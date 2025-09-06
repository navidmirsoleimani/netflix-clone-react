import React, { useEffect, useRef } from 'react'
import "./Navbar.css"
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'



const Navbar = () => {

  // we want navbar to get a dark background when the page scrolls , so it doesn't overlap other element
  // getting the navbar div element without using document.getelement
  const navRef = useRef()

  // we put them in useEffect
  useEffect(()=>{
    window.addEventListener('scroll' , ()=>{
      if (window.scrollY >= 80) {
        // attention to current | document
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  } , [])




  return (
    <div ref={navRef} className='navbar'>

      {/* divided into two columns => left : logo + links , right : icons */}

      <div className='navbar-left'>
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>


      <div className='navbar-right'>
        <img src={search_icon} className='icons' alt="" />
        <p>Children</p>
        <img src={bell_icon} className='icons' alt="" />
        {/* profile img + drop down icon */}
        <div className="navbar-profile">
        <img src={profile_img} className='profile' alt="" />
        <img src={caret_icon} alt="" />
        {/* hidden hover part */}
        <div className="dropdown">
          <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
        </div>
        </div>

      </div>


    </div>
  )
}

export default Navbar
