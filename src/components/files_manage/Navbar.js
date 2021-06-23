/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import firestore from "../../firebase";
const Navbar =(props) =>{

  const Name=String(props.name).split(" ");
  const Fname=Name[0];
  const logMeOut=()=>{
      firestore.auth().signOut();
  }
  return(
      <nav>
         <div className="user">
         <img src={props.img} className="rounded-circle" style={{width:'45px',border:'3px solid white',borderRadius:'25px'}} align="middle"/>
              <span style={{padding:'1rem'}}>Bienvenue, {Fname}</span>
              <button className="logout" onClick={logMeOut}>
              Déconnexion
         </button>
         </div>
         <div>
               <button className="Profile">Profile</button>
           </div>
      
      </nav>
  )
}

export default Navbar;