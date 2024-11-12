import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDriver, setDriver] = useState(false);
  const toggleForm = (e) => {
    setIsActive(!isActive);
    setDriver(false);
    
  };
  const LoginAsDriver = (e) => {
    setDriver(!isDriver);
    // setIsActive(!isActive);
    // alert(isDriver);
    // DriverLogin()
  };
  const navigate = useNavigate();
  const signIn = async (e) => {
   if(!isDriver){
    
    e.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(e.target)
    const data = {
        email: formData.get('email_signin'), // Accessing the email from the form
        password: formData.get('password_signin'), // Accessing the password from the form
      };
  
      console.log('Sign In Data:', data); // Log the form values
      try {
        const response = await axios.post('http://localhost:8001/url/login', data);
        let res = response && response.data && response.data.EncryptedResponse && response.data.EncryptedResponse.status_code ? response.data.EncryptedResponse.status_code :"";
       let user = response && response.data && response.data.EncryptedResponse && response.data.EncryptedResponse.data ? response.data.EncryptedResponse.data :"";
        if(res && res==200){
          localStorage.setItem("localData",JSON.stringify(user));
          navigate('/dashboard')
        } 
        
        console.log('response',response)
        // alert('login successfully','ae');
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Sign In failed: ' + error.response.data.message);
      }
   }else{
    alert('Driver')
    DriverLogin(e)
   }
      
    
    
  };
  const DriverLogin = async (e) => {
   
    const formData = new FormData(e.target)
    const data = {
        email: formData.get('email_signin'), // Accessing the email from the form
        password: formData.get('password_signin'), // Accessing the password from the form
      };
      e.preventDefault(); // Prevents the default form submission behavior
      console.log('Sign In Data:', data); // Log the form values
      try {
        const response = await axios.post('http://localhost:8001/url/login-driver', data);
        let res = response && response.data && response.data.EncryptedResponse && response.data.EncryptedResponse.status_code ? response.data.EncryptedResponse.status_code :"";
       let user = response && response.data && response.data.EncryptedResponse && response.data.EncryptedResponse.data ? response.data.EncryptedResponse.data :"";
        if(res && res==200){
          localStorage.setItem("localData",JSON.stringify(user));
          navigate('/driverdashboard')
        } 
        
        console.log('response',response)
        // alert('login successfully','ae');
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Sign In failed: ' + error.response.data.message);
      }
      
    
    
  };
  const signUp = async (e) => {
   
    e.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(e.target)
    let data = {
        full_name:formData.get('full_name'),
        phone_no:formData.get('phone_no'),
        role:"admin",
        email: formData.get('email_signup'), // Accessing the email from the form
        password: formData.get('password_signup'), // Accessing the password from the form
      };
  
      try {
        const response = await axios.post('http://localhost:8001/url/signup', data);
        
        console.log('Sign In Response:', response.data);
        // setSignUpData({ full_name: '', phone_no: '', email: '', password: '' });
       
    
        setIsActive(!isActive);
        alert("Signup done successfully");
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Sign In failed: ' + error.response.data.message);
      }
    //   console.log('Sign In Data:', data); // Log the form values
    
    
    
  };
  return (
    <>
      <div className="login-form">
      <div className={`container ${isActive ? 'active' : ''}`} id="container-login">
        <div className={`form-container sign-up ${isActive ? '' : 'hidden'}`}>
          <form onSubmit={signUp}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Full Name" name="full_name" id="full_name"/>
            <input type="text" placeholder="phone No" name="phone_no" id="phone_no"/>
            <input type="email" placeholder="Email " name="email_signup" id="email_signup" autoComplete="email" />
            <input type="password" placeholder="Password" name="password_signup" id="password_signup" autoComplete="current-password"/>
            <button type='submit'>Sign Up</button>
           
          </form>
        </div>

        <div className={`form-container sign-in ${isActive ? 'hidden' : ''}`}>
          <form onSubmit={signIn}>
            <h1>{`${isDriver ? 'Login as a Driver':'Sign in'}`}</h1>
            <input type="email" placeholder="Email" name="email_signin" id="email_signin" autoComplete="email" />
            <input type="password" placeholder="Password" name="password_signin" id="password_signin" autoComplete="current-password"/>
            <a >Forgot Password?</a>
            <button type='submit' >Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1 className='txt'>Welcome Back!</h1>
              <p>Enter your personal details to use all site features.</p>
              <button className="toggle-button" onClick={toggleForm}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1 className="txt">{`${isDriver ? 'Login as a Driver':'Hello, Subscriber!'}`}</h1>
              <p>Register with your personal details to use all site features.</p>
              <button className="toggle-button" onClick={toggleForm}>
                Sign Up
              </button>
              <button className="toggle-button" onClick={LoginAsDriver}>
                {`${isDriver ? 'Sign in':'Login as a Driver'}`}
              </button>
             
             
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
