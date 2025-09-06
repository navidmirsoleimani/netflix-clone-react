import React from 'react'
import './Home.css'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import TitleCards from '../../TitleCards/TitleCards'
import hero_banner from '../../../assets/hero_banner.jpg'
import hero_title from '../../../assets/hero_title.png'
import play_icon from '../../../assets/play_icon.png'
import info_icon from '../../../assets/info_icon.png'


const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        {/* movie description section */}
        <div className="hero-caption">
          {/* n series the protector */}
          <img src={hero_title} alt="" className='caption-img' />
          <p>Discovering his ties to a secret ancient order, a young man
            living in modern Istanbul embarks on a quest to save the city
            from an immortal enemy
          </p>
          <div className="hero-btns">
            <button className='btn'>
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          {/* it is placed in hero caption sec */}
          {/* it will get the default values of title and category */}
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        {/* we know the category names from the api site */}
      <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
      <TitleCards title={'Only on Netflix'} category={'popular'} />
      <TitleCards title={'Upcoming'} category={'upcoming'} />
      <TitleCards title={'Top Picks for You'} category={'now_playing'} />
      </div>
      <Footer />
    </div>
  )
}

export default Home