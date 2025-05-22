/* eslint-disable jsx-a11y/alt-text */
import { useParams } from "react-router-dom";
import createCard from "./venue";
import { cinemas } from "./cine";
import dumyy from './assets/Kantara.png';

export default function Shows(){
    let {show} = useParams();
    console.log(show)
    return (
    <div className="showbody">
        <center><h1 className="heading" >Shows for {show}</h1></center>
        <div className="marq"><p className="showanime">Now Showing</p></div>
        <div className="shows">
            <img src={dumyy} className="showposter"></img>
            <div className="venue"> 
                {cinemas.map(createCard)}
            </div>
        </div>
    </div>
    );
}

