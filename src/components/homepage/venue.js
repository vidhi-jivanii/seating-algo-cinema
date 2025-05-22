import { Navigate, Link } from "react-router-dom";


function Flex(props) {
    return <img className="circle-img " src={props.imgURL} alt="Flex_img" />;
}

function Format(props) {
    return <p className="info">{props.format}</p>;
}

function Time(props) {
    return <p className="info">{props.time}</p>;
}

// eslint-disable-next-line no-unused-vars
const toPay = () =>{
  Navigate('/auth/payment');
}

function Btn(props) {
    return (
    <div>
    <Link className="btn" to="/auth/payment">
        <Time time={props.timings} />
        <Format format={props.format} />
    </Link>
    </div>
    );
}
    
    function Card(props){
        // eslint-disable-next-line no-unused-vars
        let movie=props.movie;
        return (
            <div className="card">
              <div className="top">
                <p>{props.key}</p>
                <Flex imgURL={props.imgURL} />
                <h2 className="name" >{props.name}</h2>
              </div>
              <div className="bottom">
                <div>
                  <Btn timings={props.t1} format={props.f1} />
                </div>
                <div>
                  <Btn timings={props.t2} format={props.f2} />
                </div>
                <div>
                  <Btn timings={props.t3} format={props.f3} />
                </div>
                <div>
                  <Btn timings={props.t4} format={props.f1} />
                </div>
                <div>
                  <Btn timings={props.t5} format={props.f3} />
                </div>
                <div>
                  <Btn timings={props.t6} format={props.f2} />
                </div>
              </div>
            </div>
        );
      }

export default function createCard(cine) {
    return (
        <Card
        key={cine.id}
        name={cine.name}
        imgURL={cine.imgURL}
        t1={cine.timings[0]}
        t2={cine.timings[1]}
        t3={cine.timings[2]}
        t4={cine.timings[3]}
        t5={cine.timings[4]}
        t6={cine.timings[5]}
        f1={cine.format[0]}
        f2={cine.format[1]}
        f3={cine.format[2]}
        f4={cine.format[3]}
        movie="Kantara"
        />
    );
    }