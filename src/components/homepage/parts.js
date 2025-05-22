import React from "react";
import {Link} from "react-router-dom";

function Movie(props){
    return(
      <div className="mv-card">
          <dt>
          <img className="movie-img" src={props.link} alt={props.text}/>
          <Link to={`/shows/${props.text}`}>
            <h2 className="movie-name">{props.text}</h2>  
          </Link>
          </dt>
          <dd>
          <p className="movie-sub">{props.sub} • {props.type}</p>
          </dd>
      </div>
    );
}

export default Movie;