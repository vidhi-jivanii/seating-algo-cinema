// eslint-disable-next-line no-unused-vars
import React, {createContext, useEffect, useState} from "react"
import "./login.css"
// eslint-disable-next-line no-unused-vars
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import TM from "./TM.png"
import {  useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { useContext } from "react";

// eslint-disable-next-line no-unused-vars
const loginContext = createContext(0);

const Login = () => {
    
    const Navigate = useNavigate();

    const [LoginUser,setLoginUser] = useState("");

    const login = () =>{
        Navigate('/auth/payment');
    }

    return (
        <div className="login">
            <div>
                <p id="title" style={{color:"black" , fontSize:"40px",fontFamily:"Impact"}}>ticketsnatcher</p>
                <p style={{color:"black",fontSize:"15px",fontFamily:"cursive",fontStyle:"italic"}}>snatch your tickets now</p>
            </div>
    
            <h1>Login</h1>
            <input type="email" name="email" id="email" value={LoginUser} onChange={(e) => {setLoginUser(e.target.value)}} placeholder="Enter your Username"></input>
            <input type="password" name="password" id="pass" placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => Navigate("/register")}>Register</div>
        </div>
    )
}

export {Login};
