import React from "react";
import { useContext,useState } from "react";
import "./css/home.css"

import notecontext from "../context/notecontex";
import { Link } from "react-router-dom/cjs/react-router-dom";
const Editpage = () => {
  const notecontextdata = useContext(notecontext);
  const [newnote, setnewnote] = useState({title: "",description: "",tag: ""});
  // console.log(notecontextdata.idstate);
  const Editnote = (e) => {

    // this e is used to stop the page from refreshing by clicking the submit button.
    // e.preventDefault();

    notecontextdata.editnote(notecontextdata.idstate.id,newnote.title, newnote.description, newnote.tag);
    notecontextdata.Getnotes();
    alert("Your note has been updated");
  };
  const appendnnotedetail = (e) => {
    // this is important as it works only to those input type whoes value is changing.
    setnewnote({ ...newnote, [e.target.name]: e.target.value });
  };
  return (
    <div className="form">
    <div className="inputform">
      <form action="/post">
        <div>
          <label htmlFor="topicinput">Topic</label>
          <input
            onChange={appendnnotedetail}
            className="addnoteinput"
            value={notecontextdata.idstate.title}
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
            name="description"
            id="description"
            cols="30"
            rows="5"
          >{notecontextdata.idstate.description}</textarea>
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <input
            className="addnoteinput"
            onChange={appendnnotedetail}
            value={notecontextdata.idstate.tag}
            type="text"
            name="tag"
            id="tag"
          />
        </div>
        <Link to="/"><button id="submitbtn" onClick={Editnote}>
          Edit Note
        </button></Link>
        
        
      </form>
    </div>
    </div>
  );
};

export default Editpage;
