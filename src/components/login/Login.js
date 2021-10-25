import React from "react";
import { MDBInput } from "mdbreact";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import {FaUserAlt} from 'react-icons/fa'
import './login.css'
const Login = (props) => {
  //Object array made to store the different values that were passed on calling component
  const {   
    email,
    password,
    setPassword,
    setEmail,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError
  } = props;

  //Function used for authentication on login through google accounts
  return (
    //Login Front-end design with left and right side component.
    //Having an input field for user ID and password
    //using hasAccount to detect whether acoount is already present or not for sin-in and sign-up verification using setHasAccount function
    <div className="main-login">
      <div className="login-left">
      </div>
      <div className="login-right">
        <center>
          <FaUserAlt size="15%"  style={{ marginRight: '1rem' ,color:'#242121',paddingBottom:'17px'}} />
        </center>
        <div className="email">
          <MdEmail  size="10%" style={{ marginRight: '1rem' ,color:'white' }}  /> 
          <MDBInput size="lg" validate type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <p>{emailError}</p>
        </div>
        <div className="pass">
          <RiLockPasswordFill  size="10%" style={{ marginRight: '1rem',color:"white" }}/>
          <MDBInput  size="lg" validate type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />   
          <p>{passwordError}</p>        
        </div> 
        {hasAccount ? (
          <div>
            <center>
              <button  className="btn btn-primary btn-rounded" onClick={handleLogin}> Sign-in</button>
              <p><br/>Create an account? <span onClick={()=>setHasAccount(!hasAccount)}>
                sign-up
                </span>
              </p>
            </center>
          </div>           
         ) : (
          <div>
            <center>
              <button  className="btn btn-primary btn-rounded" onClick={handleSignup} >Sign-up</button>
              <p><br/>Already have an account? <span onClick={()=>setHasAccount(!hasAccount)}>
                  sign-in
                </span>
              </p>
            </center>
          </div>)
        }
      </div>
    </div>
  )
};

//exported as Login
export default Login;