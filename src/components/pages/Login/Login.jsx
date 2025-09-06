import React, { useState } from 'react'
import './Login.css'
import logo from '../../../assets/logo.png'
import { login , signup } from '../../../firebase'
import netflix_spinner from '../../../assets/netflix_spinner.gif'


const Login = () => {
  // wheter displaying new to netflix or already have an account
  // we set the value to their names so we can easily use the names by signState
  const [signState , setSignState] = useState('Sign In')



  // storing the form data in a state for authenticating through firebase
  // then we connect these to the input fields via onchange
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')




  // we want to display loading gif instead of the whole login page when sign up or sign in buttons are clicked , and we will stop displaying it when we have logged in
  // when we click the loading will be true and when we have logged in it will be false again
  const [loading , setLoading] = useState(false)





  // creating a function for user authentication
  const user_auth = async (event)=>{
    // so when we click on submit button the page won't reload
    event.preventDefault()
    setLoading(true)
    if (signState==='Sign In') {
      await login(email , password)
    } else {
      await signup(name , email , password)
    }
    setLoading(false)
  }






  return (
    // if loading is true just display the gif , else display the login page
    loading?
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
    :
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        {/* we use form , not just inputs , because they are all related and by the time they are filled we use a button to send the whole data */}
        <form action="">
          {/* displayin the name input only for sign up */}
          {/* the value property is for accsessing the input values when we want to authenticate a user */}
          {signState == "Sign Up" && <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your name' />}
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
          {/* connecting the functions */}
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {/* span is inside the paragraph */}
          {signState == "Sign In" ?
          <p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>
          :
          <p>Already have an account? <span onClick={()=>{setSignState('Sign In')}}>Sign in Now</span></p>
          }
          
          
        </div>
      </div>
    </div>
  )
}

export default Login
