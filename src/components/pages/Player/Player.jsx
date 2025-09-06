import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  // getting the movie id from parameter
  const {id} = useParams();

  // navigating via back arrow icon
  const navigate = useNavigate()





  // storing the data coming from api
  // we write the names so we can remember without looking at api site
  // but does it mean we are getting only these properties from first object in api ??
  const [apiData , setApiData] = useState({
    name : '' ,
    key : '' ,
    published_at : '' ,
    type : '' ,
  })

  // getting youtube trailer id , name and published date from api
  // and we put the fetch section inside useEffect hook so it loads everytime we refresh the site
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDgxOTJhMmZmMmMyNzM4ZjFiZjY1NWUzNDY4ZTI0NCIsIm5iZiI6MTc1MzM4NDM1My4xNjgsInN1YiI6IjY4ODI4NWExNTFiMjJjNzc3ODE2YjU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGAzEZ8W-J7mh0cByl_XCgsOoG6VIXPhiSZ8zC38s3A'
    }
  };
  
  useEffect(()=>{
    // we have to store the data instead of loging it in second .then
    // we get the movie id from the parameter
    // the data we need is stored in a property named results in api which is a list of objects and we only need the first child
    fetch(`https://api.themoviedb.org/3/movie/${id?id:''}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]) )
    .catch(err => console.error(err));
  },[])



  return (
    <div className='player'>
      <img onClick={()=>{navigate('/')}} src={back_arrow_icon} alt="" />
      {/* displaying the video , src comes from youtube by using embed command and then video id*/}
      {/* in the api site we get a data from videos section which is object and has a property named result again which is a list , in this list we have two properties named : name and key which is trailer id on youtube */}
      <iframe src={`https://www.youtube.com/embed/${apiData?.key}`} frameborder="0" allowFullScreen width='90%' height='90%' title='trailer'></iframe>
      <div className="player-info">
        {/* we just need the date value so we slice it out */}
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
