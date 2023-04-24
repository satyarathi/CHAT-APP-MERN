import React from "react";
import './Welcome.css';
import background from "../../image/Background.jpg";
import { useNavigate } from "react-router-dom";

function Welcome(){

    const navigate=useNavigate();

    const HandlePage=()=>{
        navigate('/login')
    }
    return(
        <div className="container">
            <div className="item">
            <img  className="left" src={background} alt=""/>
           </div>
           <div className="right">
            <div style={{marginTop:'180px',marginRight:'0%'}}>
            <div style={{marginRight:'60px'}}>
            <h1>Welcome<br /> To <br /> Chat<br /> App</h1>
            <div style={{width:'100%',height:'20%'}}>
            <button style={{width:'180px',height:'50px',fontFamily:'cursive',cursor:'pointer',borderRadius:'5px'}} onClick={HandlePage}>Start chat with a friend...</button>
            </div>
            </div>
            
            </div>
            </div>
           
        </div>
    )
}

export default Welcome;