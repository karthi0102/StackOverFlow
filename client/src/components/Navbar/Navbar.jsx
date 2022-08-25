import React,{ useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link ,useNavigate} from 'react-router-dom'
import Avator from '../Avator/Avator'
import search from '../../assets/search.svg'
import {useSelector,useDispatch} from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'
const Navbar = () => {
    
    const User=useSelector((state)=>(state.currentUserReducer))
    const dispatch = useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        const token = User?.token
        if(token){
                const decodedToken = decode(token)
                if(decodedToken.exp *1000  < new Date().getTime()){
                    handleLogout()
                }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    },[dispatch])
    const handleLogout = () =>{
        dispatch({type:"LOGOUT"})
        navigate('/')
        dispatch(setCurrentUser(null))   
    }
  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt="logo" />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For teams</Link>
            <form>
                <input type="text" placeholder='Search...' />
                <img src={search} alt="search" width="18" className='icon' />
            </form>
            {!User ? <Link to='/auth' className='nav-item nav-links'>Login</Link>:
            <>
        
            <Avator backgroundColor="#009dff" px="10px" py="10px" borderRadius="50%" color="white"> <Link to={`/Users/${User.result._id}`} style={{textDecoration:"none",color:"white"}} >
            {User.result.name.charAt(0).toUpperCase()}</Link></Avator>
            <button className='nav-item nav-links' onClick={handleLogout}>Logout</button>
            </> }
        </div>
    </nav>
  )
}

export default Navbar