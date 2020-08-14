import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Scheduler from './scheduler';
import User_home from './user_home';
import Logout from './logout'

export default function Router ({ token, setToken }) {
  return (
    <div>
      {/* { token ?  */}
        <>
          <Redirect from="/" to="/user_home" />
          <Route path="/signup" component={Signup} />
          <Route path="/user_home" component={User_home} />
          <Route path="/scheduler" component={Scheduler} />
          <Route path="/logout" component={Logout} />
        </>
        :
        <>
          <Redirect from="/" to="/login" />
          <Route path="/login" >
            <Login setToken={setToken} component={Login}/>
          </Route>
          {/* <Route path="/signup" component={Signup} /> */}
        </>
      {/* } */}
    </div>
  )
}