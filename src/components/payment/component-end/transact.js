import Upi from './upi';
import Card from './card';
import Wallet from './wallet';
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
let tickets=[];
let total="";
let movie="";
let ticketno="";
class Transact extends React.Component{
    constructor(props){
        super(props);
        movie=props.movie;
        tickets=props.tickets;
        total=props.total;
        ticketno=props.ticketno;
    }
    render(){
        let mode = document.getElementById("mode");
        console.log(mode.value);  
        if(mode.value==="Card"){
            root.render(<Card tickets={tickets} total={total} ticketno={ticketno} movie={movie}></Card>)
        }else if(mode.value==="UPI"){
            root.render(<Upi tickets={tickets} ticketno={ticketno} total={total} movie={movie}></Upi>)
        }else if(mode.value==="Wallet"){
            root.render(<Wallet tickets={tickets} ticketno={ticketno} total={total} movie={movie}></Wallet>)
        }   
        return(
            <div></div>
        );
    }
}

export default Transact;