import React, { useContext, useState } from "react";
import "./css/navbar.css";
import { useEffect } from "react";
import notecontext from "../context/notecontex"
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  let history=useHistory();
  const host="http://localhost:4000";
  const [toshow,settoshow]=useState(false);
  const [details,setdetails]=useState({name:"",email:"",date:""});
  const notecontextdata=useContext(notecontext);
  const logouthandle=()=>{
    localStorage.removeItem("token");
    history.push("/login");
    settoshow(false);
  }

  let location = useLocation();
  useEffect(() => {
    // console.log(location);
  }, [location]);
  const userdetails=async()=>{
    if(toshow){
      settoshow(false);
    }
    else{
      settoshow(true);
    }
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth_token":localStorage.getItem("token"),
        
      },
      // body: JSON.stringify(data),
    });
    const data=await response.json();
    setdetails({name:data.userdetails.name,email:data.userdetails.email,date:data.userdetails.date});
    console.log(data);
  }
  return (
    <div>
    <div className="navbar">
      <ul>
        <div className="firstblock">
        <Link to="/" id="brandname">
          MyNotebook
        </Link>
        <Link  className={`${location.pathname==="/"?"active":""}`} to="/">Home</Link>
        <Link to="/about" className={`${location.pathname==="/about"?"active":""}`}>About</Link>
        </div>
        {(!localStorage.getItem("token")?<div className="secondblock">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signin"><button>Signin</button></Link>
        </div>:
          <box-icon id="usericon" onClick={userdetails} type='solid' name='user-circle'></box-icon>
          )}
      </ul>
    </div>
          <div style={{display:toshow?'flex':'none'}} id="detailsinterface">
              <h3>Username:{details.name}</h3>
              <h3>Email:{details.email}</h3>
              <h3>Date:{details.date}</h3>
              <button id="logoutbtn" onClick={logouthandle}>Logout</button>
          </div>
    </div>
  );
};

export default Navbar;
