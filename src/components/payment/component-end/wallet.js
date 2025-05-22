import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Finish from './finish';
let btn={fontSize:"20px",padding:"5px",marginLeft:"160px",marginTop:"0px"
          ,width:"80px",border:"4px solid black",cursor:"pointer"
          ,borderRadius:"10px",backgroundColor:"lightgreen"
        }
let base={margin:"30px",fontSize:"30px"}; 
let ucopy={show:"",email:"",total:""}
let shw="RRR(Hindi)";
let total="";
let movie="";
let tickets=[];
let ticketno="";
let eror={color:"red",display:"none",marginLeft:"30px"};
const root = ReactDOM.createRoot(document.getElementById("root"));
let email="";
const Verify=()=>{
    email = document.querySelector("#phn").value; 
    console.log(email)
    const verify={
      email:email
    }
    wusb(1);
    // axios.post("http://127.0.0.1:3001/info",verify).then(resp=>{
    //   console.log(resp.data.length)
    //   if(resp.data.length===1){
    //     wusb(1);
    //   }else{
    //     wusb(0);
    //   }
    // })
  }

class Wallet extends React.Component{
    constructor(props){
      super(props);
      tickets=props.tickets;
      total=props.total; 
      ticketno=props.ticketno; 
      movie=props.movie;
    }
    render() {
      return(
        <div style={base}>
            <img style={{height:"200px",width:"250px"}} src="https://www.oneindia.com/img/2017/05/paytm-310517-31-1496211262.jpg"></img>
            <p style={{color:"red",display:"none"}} id="err">Check your email ID</p>
            <p>Enter email ID to link wallet</p>
            <input style={base} id='phn' type='text' maxLength="35"></input>
            <p id="wer" style={eror}>You have insufficient balance !</p>
            <p>Amount to be payed Rs{total}.00</p>
            <p>Your balance is : Rs2000.00</p>
            <button style={btn} onClick={Verify}>Pay</button>
        </div>
      );
    }
}
  
  function wusb(ver){   
    if(ver===0){
      document.getElementById("err").style.display="block";
    }else{
      let phn = document.querySelector("#phn").value; 
      let email=phn;
      ucopy.id=phn;
      ucopy.show=`${ticketno} x ${shw}`;
      ucopy.email=email;
      ucopy.total=total;
      const TextFile = () => {
        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(ucopy)]);
        element.href = URL.createObjectURL(textFile);
        element.download = "tickets.txt";
        document.body.appendChild(element); 
        element.click();
      }
      TextFile();
      if(total<2000){root.render(  
        <div>
          <Finish tickets={tickets} email={email} total={total} movie={movie}></Finish>
        </div>
      );
    
      // final();
      }else{
        document.querySelector("#wer").style.display="block";
      } 
    }
}

export default Wallet;