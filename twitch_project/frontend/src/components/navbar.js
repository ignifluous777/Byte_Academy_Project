import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { postRequest } from './models'

export default function NavBar({ token, setToken }) {
  
  // function Logout() {
  //   setToken("")
  // }

  return (
    <div>
        <Link to="/signup">Signup</Link>
        <Link to="/user_home">User Home</Link>
        <Link to="/scheduler">Scheduler</Link>
        {/* <Link to="/logout" onClick={Logout}>Logout</Link> */}
        <Link to="/logout">Logout</Link>
    </div>
  )
}