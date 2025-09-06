import React, { useEffect } from 'react'
import Home from './components/pages/Home/Home'
import { Routes , Route, useNavigate } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Player from './components/pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const App = () => {

  const navigate = useNavigate()

  // we want to go directly to the home page if we already have signed up
  useEffect (()=>{
    onAuthStateChanged(auth , async (user)=>{
      if (user) {
        console.log('logged in')
        navigate('/')
      } else {
        console.log('logged out')
        navigate('/login')
      }
    })
  },[])




  return (
    <div>
      {/* notification */}
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* we send the id throgh params not props , so we can share the address and it will open the same trailer without sending props */}
        <Route path='/player/:id?' element={<Player />} />
      </Routes>

    </div>
  )
}

export default App
