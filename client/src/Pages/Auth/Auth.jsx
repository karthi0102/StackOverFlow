import React,{useState} from 'react'
import './Auth.css'
import AboutAuth from './AboutAuth'
import icon from '../../assets/icon.png'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { signup,login,verifyOtp } from '../../actions/auth'
const Auth = () => {
    const generateOTP = () => {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
  const [isSignup,setIsSignUp]=useState(false) 
  const [disOtp,setDisOtp]=useState(false)
  const [gotp,setgotp]=useState(generateOTP())
  const handleSwitch = () =>{
    setIsSignUp(!isSignup)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp,setOtp] =useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(verifyOtp(gotp,email))
        setDisOtp(!disOtp)
  }

  const verify = (e) =>{
    e.preventDefault()
        
        if(!email && !password){
            alert('Enter enail and password')
        }
        if(isSignup){
            if(!name){
                alert('Enter a name to continue')
            }
            if(gotp!=otp){
                alert('otp not match')
            }
            dispatch(signup({name,email,password},navigate))
            
        }else{
            dispatch(login({email,password},navigate))
        }
        
  }

  return (
    <section className='auth-section'>
    {!disOtp ?
    <>
    {isSignup && <AboutAuth />}
    <div className='auth-container-2'>
        { !isSignup && <img src={icon} alt='stack overflow' className='login-logo'/>}
        <form onSubmit={isSignup ?handleSubmit:verify}>
            {
                isSignup && (
                    <label htmlFor='name'>
                        <h4>Display Name</h4>
                        <input type="text" id='name' name='name' value={name} onChange={(e) => {setName(e.target.value)}} />
                    </label>
                )
            }
            <label htmlFor="email">
                <h4>Email</h4>
                <input type="email" name='email' id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <h4>Password</h4>
                    { !isSignup && <p style={{ color: "#007ac6", fontSize:'13px'}}>forgot password?</p> }
                </div>
                <input type="password" name='password' id='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                { isSignup && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> }
            </label>
            {
                isSignup && (
                    <label htmlFor='check'>
                        <input type="checkbox" id='check'/>
                        <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br />product updates, user research invitations,<br />company announcements, and digests.</p>
                    </label>
                )
            }
            <button type='submit'  className='auth-btn'>{ isSignup ? 'Sign up': 'Log in'}</button>
            {
                isSignup && (
                    <p style={{ color: "#666767", fontSize:"13px"}}>
                        By clicking “Sign up”, you agree to our 
                        <span style={{ color: "#007ac6"}}> terms of<br /> service</span>,
                        <span style={{ color: "#007ac6"}}> privacy policy</span> and 
                        <span style={{ color: "#007ac6"}}> cookie policy</span>
                    </p>
                )
            }
        </form>
        <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? "Log in" : 'sign up'}</button>
        </p>
    </div>
    </>
    :
    <div className="auth-container-2">
        <form onSubmit={verify}>
          <label htmlFor='otp'>
                        <h4>Enter Otp</h4>
                        <input type="text" name="otp" id="otp"  value={otp} onChange={(e) => {setOtp(e.target.value)}} />
                    </label>
                
    <button className='auth-btn' type='submit' >VERIFY</button>
    </form>
    </div>
    
}
</section>
  )
}

export default Auth

