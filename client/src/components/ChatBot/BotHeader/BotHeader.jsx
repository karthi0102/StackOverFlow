import React from 'react'
import './BotHeader.css'
import logo from '../../../assets/icon.png'
const BotHeader = () => {
  return (
    <div className='bot-header'>
        <p>Stack Overflow Bot </p>
        <img src={logo} alt="logo" />
    </div>
  )
}

export default BotHeader