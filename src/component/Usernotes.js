import React from "react";
import { useContext,useEffect } from "react";
import notecontext from "../context/notecontex";
import Noteitem from "./Noteitem";
import "./css/notedata.css"
import { useHistory } from "react-router-dom";
// import Noteitem from "./Noteitem";
const Usernotes = () => {
  let history=useHistory();
  let notesdata = useContext(notecontext);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      notesdata.Getnotes();
    }
    else{
      history.push("/login");
    }
  },[])

  return (
    <div>
      <h2>View notes</h2>
      <div className="alldetails">

      {/* important  sends all the elements of array one-by-one in data  using map function*/}

      {notesdata.state1.length===0 && <h4>No notes available</h4>}
      {notesdata.state1.map((data) => {
        return <Noteitem key={data._id} note={data} />;
      })}

      </div>
    </div>
  );
};

export default Usernotes;
