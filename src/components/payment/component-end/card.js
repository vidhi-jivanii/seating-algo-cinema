import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Finish from './finish';
import { version } from 'mongoose';
let btn={fontSize:"20px",padding:"5px",marginLeft:"160px",marginTop:"0px"
          ,width:"80px",border:"4px solid black",cursor:"pointer"
          ,borderRadius:"10px",backgroundColor:"lightgreen"
        }
let base={margin:"30px",fontSize:"30px"}; 
let tcopy={"name":"","type":"","cardn":"",show:"",total:"",email:""};
let shw="RRR(Hindi)";
let imgst={height:"100px",width:"200px"};
let email="";
let total="";
let tickets=[];
let ticketno="";
let movie="";

const Verify=()=>{
    email=document.getElementById("email").value;
    const verify={
      email:email
    }
    csub(1);
    // axios.post("http://127.0.0.1:3001/info",verify).then(resp=>{
    //   console.log(resp.data.length)
    //   if(resp.data.length===1){
    //     csub(1);
    //   }else{
    //     csub(0);
    //   }
    // })
}


const root = ReactDOM.createRoot(document.getElementById("root"));

class Card extends React.Component{
    constructor(props){
      super(props);
      tickets=props.tickets;
      total=props.total; 
      ticketno=props.ticketno;
      movie=props.movie;
    }
    render(){
      return(  
        <div style={base}>
          <img style={imgst} src="https://www.investopedia.com/thmb/3H96L9iC_VUhvsqmnypxfEQW4UA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/full-color-800x450-cee226a48bed4177b90351075b332227.jpg"></img>
          <p id="cerr" style={{color:"red",}}></p>
          <p>Your total amount is : {total}</p>
          <p>Email ID :<input id="email" style={base} type="text" maxLength="40"></input></p>
          <p>Name on the card : <input id="name" style={base} type="text" maxLength={20}></input></p>
          <p>Select type of card <select id="type" style={base}>
              <option>Credit Card</option>
              <option>Debit Card</option>
          </select><br></br>
          </p>
          <p>16 Digit number :<input style={base} id="cardn" type="password" maxLength={16}></input> </p>
          <p>CVV: <input id="cvv" style={base} type="password" max="999" maxLength={3}></input></p>
          <button style={btn} onClick={Verify}>Pay</button>
        </div>
        );
    }
}

function csub(ver){
    email=document.getElementById("email").value;
    let len1 = document.querySelector("#name").value;
    let len2 = document.querySelector("#cardn").value;
    let len3 = document.querySelector("#cvv").value;
    let len4 = document.querySelector("#type").value;
    let cerr = document.querySelector("#cerr");
    if(len1.length==0 || len2.length==0 ||len3.length==0){
      cerr.style.display="block"; 
      cerr.innerHTML="Check all the details ";
    }else if(len2.length<16){
      cerr.style.display="block";
      cerr.innerHTML="Card No is incorrect ";   
    }
    else{
      tcopy.name=len1;
      tcopy.type=len4;
      tcopy.cardn=len2;
      tcopy.total=total;
      tcopy.show=`${ticketno} x ${shw}`;
      tcopy.email=email;
      const TextFile = () => {
        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(tcopy)]);
        element.href = URL.createObjectURL(textFile);
        element.download = "tickets.txt";
        document.body.appendChild(element); 
        element.click();
      }
      if(ver===0){
          let err = document.getElementById("cerr");
          err.innerHTML="email ID not found enter registered email id"
          err.style.display="block";
      }else{
        TextFile();
        root.render(<Finish total={total} email={email} tickets={tickets} movie={movie}></Finish>);    
      }
    }
}
export default Card;
