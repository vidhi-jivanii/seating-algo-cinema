import MvApp from './components/homepage/Movies-App';
import Shows from './components/homepage/shows';
// eslint-disable-next-line no-unused-vars
import {Login,loginContext} from './components/login/login';
import Register from './components/register/register';
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Logo from './components/payment/Nishan';
import {
  Routes,
  Outlet,
  Navigate,
  Route
} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const Private = (props) =>{

  // eslint-disable-next-line no-unused-vars
  const[user,setUser] = useState(0);
  
  return(
    user!==0?<Outlet/>:<Navigate to="/login"></Navigate>
  );
}


export default function App(){

  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MvApp/>}></Route>
        {/* <Route element={<Private/>}>
          <Route path='/auth/payment' element={}></Route>
        </Route> */}
        <Route path='/auth/payment' element={<Logo/>}></Route>
        <Route path="/shows/:show" element={<Shows/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </>
  );
}