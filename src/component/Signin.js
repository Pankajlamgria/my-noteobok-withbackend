import React from 'react'
import "./css/auth.css"
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Signin = () => {
  let history = useHistory();
  const host = "http://localhost:4000";
  const [authstate,setauthstate]=useState({name:"",email:"",password:"",confirmpassword:""});
  const enterdata = (e) => {
    setauthstate({...authstate,[e.target.name]:e.target.value});


  };
  const loginuser = async (e) => {
    
    e.preventDefault();
    
    if(authstate.password===authstate.confirmpassword){
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:authstate.name,email:authstate.email,password:authstate.password,confirmpassword:authstate.confirmpassword}),
      });
      const json = await response.json();
      // console.log(json);
      if(json.success){
        // redirect to home page
        localStorage.setItem("token",json.authtoken);
        history.push("/");
  
      }
      else{
        alert(json.error);
      }
    }
    else{
      alert("Password Error.");
    }
  }
  return (
    <div className='logincomponent'>
        <form action="/post" id='loginform'>
            <h2>Create new account to continue</h2>
            <div className='authenticationinput'>
                <label htmlFor="name">Username</label>
                <input type="text" id='name' name='name' value={authstate.name}  onChange={enterdata}/>
            </div>
            <div className='authenticationinput'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' value={authstate.email}  onChange={enterdata}/>
            </div>
            <div className='authenticationinput' >
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={authstate.password} minLength={5} onChange={enterdata}/>
            </div>
            <div className='authenticationinput' >
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" id='confirmpassword' name='confirmpassword'  value={authstate.confirmpassword} minLength={5}  onChange={enterdata}/>
            </div>
            <div className="btncover">
            <button id='loginbtn' onClick={loginuser}>Submit</button>
            </div>
        </form>
    </div>
  )
  }


export default Signin