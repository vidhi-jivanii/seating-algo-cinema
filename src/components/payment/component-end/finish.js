import React, { Component } from 'react'
import video from "./Done.mp4";
import axios from 'axios';

let email="";
let total="";
let ticket=[];
let movie="";

const booking={
  email:"",
  tickets:[],
  totalamt:"",
  movie:"",
}

const Save=()=>{
    booking.email=email;
    booking.tickets=ticket;
    booking.totalamt=total;
    booking.movie=movie;
    console.log(booking)
    axios.post("http://127.0.0.1:3001/book",booking);
} 

class Finish extends Component{
  constructor(props){
    super(props);
    ticket=props.tickets;
    total=props.total;
    email=props.email;
    movie=props.movie;
    console.log(email)
    setTimeout(()=>{
        document.querySelector("p").style.display="block"; 
    },3000)
    Save();
  }
  render(){
    return(
      <div>
        <center>
            <video width="25%" src={video} autoPlay></video>
            <p onLoad={Save} style={{color:"green"}}>Transaction has been completed you may now close this page.</p>
        </center>
      </div>
    );
  }
}

export default Finish





