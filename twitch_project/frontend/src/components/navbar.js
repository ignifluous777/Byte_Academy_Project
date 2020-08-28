import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ token, setToken }) {

  return (
    <div>
      { token ?
        <>
        <nav class="navbar navbar-inverse">
          <div style={{fontSize: '15px', fontWeight: 'bold'}} class="container-fluid">
            <div style={{fontSize: '30px', fontWeight: 'bold'}} class="navbar-header">
              <Link class="navbar-brand" to="/user_home">Twitch Music Helper</Link>
            </div>
            <ul class="nav navbar-nav">
              <li><Link to="/user_home">User Home</Link></li>
              <li><Link to="/scheduler">Scheduler</Link></li>
              <li><Link to="/showsked">View Schedule</Link></li>
              <li><Link to="/skedwithid/iVEvkTSeQkgaDGEk">View Schedule ID</Link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><Link to="/logout"><span class="glyphicon glyphicon-log-in"></span> Logout</Link></li>
            </ul>
          </div>
        </nav>
        </>
        :
        <>
        <nav class="navbar navbar-inverse">
          <div style={{fontSize: '15px', fontWeight: 'bold'}} class="container-fluid">
            <div style={{fontSize: '30px', fontWeight: 'bold'}} class="navbar-header">
              <Link class="navbar-brand" to="/login">Twitch Music Helper</Link>
            </div>
            <ul class="nav navbar-nav">
              <li><Link to="/login">Home</Link></li>
              <li><Link to="/showsked">View Schedule</Link></li>
              <li><Link to="/skedwithid/iVEvkTSeQkgaDGEk">View Schedule ID</Link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><Link to="/signup"><span class="glyphicon glyphicon-user"></span> Signup</Link></li>
              <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
          </div>
        </nav>
        </>
      }
    </div>
  )
}