import React from 'react';
import ReactDOM  from 'react-dom/client';
import Transact from './transact';
let btn={fontSize:"20px",padding:"5px",marginLeft:"160px",marginTop:"0px"
          ,width:"80px",border:"4px solid black",cursor:"pointer"
          ,borderRadius:"10px",backgroundColor:"lightgreen"
        }
let base={margin:"30px",fontSize:"30px"}; 
let tickets=[];
let movie="";
let ticketno="";
let total="";

const root = ReactDOM.createRoot(document.getElementById("root"))
class Pay extends React.Component{
    constructor(props){      
      super(props);
      movie=props.movie;
      tickets=props.ticket;
      ticketno=tickets.length;
      total = ticketno*12;
    }
    render(){
      return(
          <div>
            <Order></Order>
            <p style={base}>Select mode of payment</p>
            <select id="mode" style={base}>
              <option value="Card">Card</option>
              <option value="UPI">Remitly</option>
              <option value="Wallet">GooglePay</option>  
            </select><br></br>  
            <button style={btn} onClick={transaction}>pay</button>
          </div>
      );
    }
}

function transaction(){
    root.render(
      <Transact ticketno={ticketno} tickets={tickets} total={total} movie={movie}/>
    )
}

function Order(){
  return(
    <div>  
      <p style={base}>You are purchasing  </p>
      <h5 style={base}>{ticketno} x The Expandables(Hindi)</h5>
      <p style={base}>Amount to be payed is </p>
      <h5 style={base}>{ticketno} x 12 <br></br><br></br>£{total}.00</h5>
    </div>
  );
}

export default Pay;
  