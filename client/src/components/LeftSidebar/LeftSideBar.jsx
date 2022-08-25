import React from 'react'
import './LeftSideBar.css'
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMessage} from '@fortawesome/free-solid-svg-icons'
const LeftSideBar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
         <NavLink to='/' className="side-nav-links" activeClassName="active">
          <p>Home</p>
         </NavLink>
        <div className="side-nav-div">
          <div><p>PUBLIC</p>
          <NavLink to='/Questions' className="side-nav-links" activeClassName="active" >
            <img src={Globe} alt="Globe" />
            <p style={{paddingLeft:"10px"}}>Questions</p>
            </NavLink>
            <NavLink to='/Tags' className="side-nav-links" activeClassName="active" style={{paddingLeft:"40px"}}>
              <p>Tages</p>
            </NavLink>
            <NavLink to='/Users' className="side-nav-links" activeClassName="active" style={{paddingLeft:"40px"}}>
              <p>Users</p>
            </NavLink>
            <NavLink to='/ChatBot' className='side-nav-links' activeClassName='actice' style={{paddingLeft:"40px"}}>
              <p>ChatBot  <FontAwesomeIcon icon={faMessage} /></p>
            </NavLink>
    
            </div>
        </div>
      </nav>
    </div>
  )
}

export default LeftSideBar