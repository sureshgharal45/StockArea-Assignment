import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
   <div className="spinner-container">
     <div className="spinner-grow text-secondary" style={{width:'6rem', height:"6rem"}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
   </div>
  );
};

export default Spinner;
