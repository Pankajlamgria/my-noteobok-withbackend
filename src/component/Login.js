import React from 'react'
import "./css/auth.css"
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Login = () => {
  let history = useHistory();
  const host = "http://localhost:4000";
  const [authstate,setauthstate]=useState({email:"",password:""});
  const enterdata = (e) => {
    // this is important as it works only to those input type whoes value is changing.
    setauthstate({...authstate,[e.target.name]:e.target.value});


  };
  const loginuser = async (e) => {
    
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:authstate.email,password:authstate.password}),
    });
    const json = await response.json();
    // console.log(json);
    if(json.success){
      // redirect to home page
      // console.log(json.authtoken);
      localStorage.setItem("token",json.authtoken);
      history.push("/");

    }
    else{
      alert(json.error);
    }
  }; 

  return (
    <div className='logincomponent'>
        <form action="/post" id='loginform'>
        <h2>Login to continue</h2>
            <div className='authenticationinput'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' value={authstate.email}  onChange={enterdata}/>
            </div>
            <div className='authenticationinput' >
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={authstate.password} onChange={enterdata}/>
            </div>
            <div className="btncover">
            <button id='loginbtn' onClick={loginuser}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login
