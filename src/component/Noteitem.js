import React from "react";
import "./css/notedata.css";
import { useContext } from "react";
import notecontext from "../context/notecontex";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Noteitem = (props) => {
  const notedatacontext=useContext(notecontext);
  const clickfunction= ()=> {
    alert("You can edit now.");
    notedatacontext.setidstate({id:props.note._id,title:props.note.title,description:props.note.description,tag:props.note.tag});
  }

  function deletealrt() {
    let ans=window.confirm("Are you sure to delete this note.");
    
    if(ans===true){
        notedatacontext.deletenote(props.note._id);
        notedatacontext.Getnotes();
    }
    
  }
  return (
    <div>
      <div className="card">
        <h3 className="carddetails">{props.note.title}</h3>
        <p>{props.note.description}</p>
        <p id="date">{props.note.date}</p>
        <div className="icons">
        
        <Link to="/editpage"><box-icon onClick={clickfunction} name="edit" id="editicon" ></box-icon></Link>
          <box-icon onClick={deletealrt} name="trash" style={{cursor:"pointer"}}></box-icon>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
