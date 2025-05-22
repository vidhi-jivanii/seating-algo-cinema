import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Finish from './finish';
let btn1={fontSize:"30px",padding:"5px",marginLeft:"160px",marginTop:"0px"
        ,width:"160px",border:"4px solid black",cursor:"pointer"
        ,borderRadius:"10px",backgroundColor:"lightgreen"
      }
let base={margin:"30px",fontSize:"30px"};  
let eror={color:"red",display:"none",marginLeft:"30px"};
let ucopy={id:"",show:"",total:""}
let shw="RRR(Hindi)";
let ticketno="";
let tickets=[];
let movie="";
let email="";
let total="";
const root = ReactDOM.createRoot(document.getElementById("root"));

const Verify=()=>{
  email = document.querySelector("#uid").value; 
  const verify={
    email:email
  }
  upis(1);
  // axios.post("http://127.0.0.1:3001/info",verify).then(resp=>{
  //   console.log(resp.data.length)
  //   if(resp.data.length===1){
  //     upis(1);
  //   }else{
  //     upis(0);
  //   }
  // })
}


class Upi extends React.Component{
    constructor(props){
      super(props);
      ticketno=props.ticketno;
      tickets=props.tickets;
      total=props.total;
      movie=props.movie;
    }
    render(){
      let imgst={height:"100px",width:"200px"};
      return(
        <div>
          <img style={imgst} src="https://image01.realme.net/general/20190821/1566357380566.jpg"></img>
          <p id="uerr" style={eror}> email Id not found </p>
          <p>Your total amount is : {total}</p>
          <div style={{display:"flex"}}>
          <p style={base}>Enter UPI ID : <input style={base} id="uid" type="text" maxLength={30}></input> OR <t></t>Scan this QR</p><br></br>
          <img style={{height:"300px",width:"300px"}} src="https://ih1.redbubble.net/<Route index element={<Logo/>}></Route>);image.1335632870.8097/st,small,507x507-pad,600x600,f8f8f8.jpg"></img>
        </div>
        <button id="ubtn" style={btn1} onClick={Verify}>Pay</button>
        </div>
      );
    }
  }

  function upis(ver){
      let len = document.querySelector("#uid").value;
      let uerr = document.querySelector("#uerr");
      if(len.length==0){
        uerr.style.display="block"; 
        uerr.innerHTML="Enter UPI id !";
      }else if(len.length<10){
        uerr.style.display="block";
        uerr.innerHTML="Enter correct UPI id !";   
      }
      else{
        ucopy.id=len;
        ucopy.show=`${ticketno} x ${shw}`;
        ucopy.total=total;
        const TextFile = () => {
          const element = document.createElement("a");
          const textFile = new Blob([JSON.stringify(ucopy)]);
          element.href = URL.createObjectURL(textFile);
          element.download = "tickets.txt";
          document.body.appendChild(element); 
          element.click();
        }
        if(ver===0){
          document.getElementById("uerr").style.display="block";
        }else{
          TextFile();
          console.log("this is upi file",len)
          root.render(<Finish tickets={tickets} email={len} total={total} movie={movie}></Finish>);  
        }
      }
}

  export default Upi;