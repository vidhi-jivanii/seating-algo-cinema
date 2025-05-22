import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line no-unused-vars
import TM from "./TM.png"
const Register = () => {

    const history = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:3001/register", user)
            .then( res => {
                alert(res.data.message)
                history("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
               <div>
                <p id="title" style={{color:"black" , fontSize:"40px",fontFamily:"Impact"}}>ticketsnatcher</p>
                <p style={{color:"black",fontSize:"15px",fontFamily:"cursive",fontStyle:"italic"}}>snatch your tickets now</p>
         
    </div>
            {console.log("User", user)}
            <h2>Register</h2>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history("/login")}>Login</div>
        </div>
    )
}

export default Register