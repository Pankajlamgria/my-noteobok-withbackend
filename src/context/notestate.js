import React from "react";
import { useState } from "react";
import notecontext from "./notecontex";

const Notestate = (props) => {
  // IMPORTANT THE CONNECT TO THE DATABASE ("http://")
  const host = "http://localhost:4000";
  const [idstate,setidstate]=useState({id:"234",title:"",description:"",tag:""});
  
  let s1 = [];
  const [state1, setstate1] = useState(s1);

  const update = () => {
    setstate1();
  };
  // Get all notes
  const Getnotes = async() => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        auth_token:localStorage.getItem("token"),
      },
      // body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    // console.log(json);
    setstate1(json); 
  };


  // Add note
  const addnote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth_token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
  };

  // Edit note
  const editnote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth_token:localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

    for (let i = 0; i < s1.length; i++) {
      const element = s1[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // delete function note
  const deletenote = async (id) => {
    // TO DO  delete in database
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth_token:localStorage.getItem("token"),
      },
    });


    // filter function only return the values full filling the condition syntax like map function.
    const newnote = state1.filter((note) => {
      return note._id !== id;
    });
    setstate1(newnote);
  };

  return (
    <notecontext.Provider
      value={{ state1, update, addnote, deletenote, editnote,Getnotes,idstate,setidstate }}
    >
      {props.children}
    </notecontext.Provider>
  );
};
export default Notestate;
