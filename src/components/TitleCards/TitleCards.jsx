import React, { useEffect, useReducer, useRef, useState } from 'react'
import './TitleCards.css'
// we have made a list of movies with two properties in assets/cards/js and we are importing the *list*
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'





// we need props to reuse this component multiple times
// also we have multiple scrollable lists with different categories , we will get different data for each category by changing the fetch link

const TitleCards = ({title , category}) => {

  // creating a state to store the data we have got from the API
  const [apiData , setApiData] = useState([])


  const cardsRef = useRef()

  // getting real data code
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDgxOTJhMmZmMmMyNzM4ZjFiZjY1NWUzNDY4ZTI0NCIsIm5iZiI6MTc1MzM4NDM1My4xNjgsInN1YiI6IjY4ODI4NWExNTFiMjJjNzc3ODE2YjU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGAzEZ8W-J7mh0cByl_XCgsOoG6VIXPhiSZ8zC38s3A'
    }
  };
  
  




  // *** , wheel event , now we can scroll horizontaly without holding shift key
  // we also want to refetch the data everytime we refresh the site , so we move the fetch part of the real data code in useEffect section
  useEffect(()=>{

    // instead of console log in second .then we store the data in our state (attention to .results , becuase according to the reference site the returning value of api has a property named results that the data we need is in it in list form (but if we didn't know the names of properties we can simply use console log res))
    // we get the category section of the link by props
    // the ? sign before the language is also needed because in the api site it is supposed to be a param so it should has a ?
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel' , (e)=>{
      e.preventDefault()
      cardsRef.current.scrollLeft += e.deltaY
    })
  },[])



  // displaying the movies through api
  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card , index)=>{
          // we send the movie id through parameter to player page
          return <Link to={`/player/${card.id}`} className="card" key={index} >
            {/* the backdrop_path provides the file path but we need to get it from the site , so according to the website instructions we should parts of a link before that property to get the image online */}
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="failed" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
