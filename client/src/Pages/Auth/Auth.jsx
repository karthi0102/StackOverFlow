import { getAuth,signOut, getUser,RecaptchaVerifier,signInWithPhoneNumber  } from "firebase/auth";
import firebase from "../../Firebase/index";
import React,{useState} from 'react'
import './Auth.css'
import AboutAuth from './AboutAuth'
import icon from '../../assets/icon.png'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { signup,login } from '../../actions/auth'
const Auth = () => {


    const configureCaptcha = ()=>{
        const auth = getAuth();
          window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
        'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
            console.log("Recaptcha verifed");
         },
         defaultCountry:"IN"
    }, auth);
    }

    


  const [isSignup,setIsSignUp]=useState(false) 
  const [disOtp,setDisOtp]=useState(false)
  const handleSwitch = () =>{
    setIsSignUp(!isSignup)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile,setMobile]=useState('')
  const [password, setPassword] = useState('')
  const [otp,setOtp] =useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  const handleSubmit = async(e) => {
        e.preventDefault()
        onSignInSubmit()
        setDisOtp(!disOtp)
  }

  const verify =(e) =>{
    e.preventDefault()
    if(!email && !password){
        alert('Enter enail and password')
    }
    if(isSignup){
        if(!name){
            alert('Enter a name to continue')
        }
       
        dispatch(signup({name,email,password},navigate))
        
    }else{
        dispatch(login({email,password},navigate))
    }
  }
  


const onSignInSubmit=()=> {
   
    configureCaptcha()
    const phoneNumber ="+91"+ mobile;
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          
          window.confirmationResult = confirmationResult;
          console.log('otp send')
          
        }).catch((error) => {
          console.log(error)
          
        });
    
  };


  const onSubmitOtp = (e) =>{
    e.preventDefault()
    const code = otp;
    window.confirmationResult.confirm(code).then((result) => {
        console.log('signed in')
 
        if(!email && !password){
            alert('Enter enail and password')
        }
        if(isSignup){
            if(!name){
                alert('Enter a name to continue')
            }
            dispatch(signup({name,email,password},navigate))
            
        }else{
            dispatch(login({email,password},navigate))
        }

  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
 
});
  }



  return (
    <section className='auth-section'>
        <div id="sign-in-button"></div>
    {!disOtp ?
    <>
    {isSignup && <AboutAuth />}
    <div className='auth-container-2'>
        { !isSignup && <img src={icon} alt='stack overflow' className='login-logo'/>}
        <form onSubmit={isSignup ?handleSubmit:verify}>
            {
                isSignup && (
                    <div>
                    <label htmlFor='name'>
                        <h4>Display Name</h4>
                        <input type="text" id='name' name='name' value={name} onChange={(e) => {setName(e.target.value)}} />
                    </label>
               
                     <label htmlFor='phone'>
                         <h4>Phone Number</h4>
                         <input type="tel" id='mobile' name='mobile' value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
                     </label>
                     </div>
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
        <form onSubmit={onSubmitOtp}>
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

