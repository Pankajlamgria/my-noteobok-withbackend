import React from "react";
import "./css/home.css";
import { useState, useContext } from "react";
import notecontext from "../context/notecontex";
const Addnote = () => {
const notestatecontext=useContext(notecontext);

  const [newnote, setnewnote] = useState({title: "",description: "",tag: ""});
  const Addnote = (e) => {
    // this e is used to stop the page from refreshing by clicking the submit button.
    e.preventDefault();

    console.log(newnote);
    notestatecontext.addnote(newnote.title,newnote.description,newnote.tag);
    notestatecontext.Getnotes();
    setnewnote({title: "",description: "",tag: ""});
  };
  const appendnnotedetail = (e) => {
    
    // this is important as it works only to those input type whoes value is changing.
    setnewnote({...newnote,[e.target.name]:e.target.value});

  };
  return (
    <div className="inputform">
      <form action="/post">
        <div>
          <label htmlFor="topicinput">Topic</label>
          <input
            onChange={appendnnotedetail}
            className="addnoteinput"
            value={newnote.title}
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={appendnnotedetail}
            className="addnoteinput"
            type="text"
            value={newnote.description}
            name="description"
            id="description"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <input
            className="addnoteinput"
            onChange={appendnnotedetail}
            value={newnote.tag}
            type="text"
            name="tag"
            id="tag"
          />
        </div>
        <button  id="submitbtn"  onClick={Addnote} >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
