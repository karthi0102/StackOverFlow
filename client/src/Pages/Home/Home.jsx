import React from 'react'
import '../../App.css'
import LeftSideBar from '../../components/LeftSidebar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import HomeMainBar from '../../components/HomeMainBar/HomeMainBar'
const Home = () => {
  return (
    <div className='home-container-1'>
      <LeftSideBar />
      <div class="home-container-2">
        <HomeMainBar />
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Home