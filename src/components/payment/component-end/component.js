import { render } from "@testing-library/react";
import { Route,BrowserRouter,Routes,Link } from "react-router-dom";
import {React, useEffect,Component } from "react";
import ReactDOM from "react-dom/client";
import Finish from "./finish";
import Card from './card';

let total="";
let ticketno="";
let shw="RRR(Hindi)";

function final(){
  let root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<div>
    <Finish/>
  </div>);
}

export default final;