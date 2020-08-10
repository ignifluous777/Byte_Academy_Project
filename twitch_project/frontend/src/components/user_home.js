import React, { useState, useEffect } from 'react';
import { postRequest } from './models';

function User_home() {

//   useEffect(() => {
//     const getPositions = async () => {
//       const data = await postRequest("portfolio", {token: sessionStorage.getItem("token")});
//       // data is likely an object, will need to access a certian key
//       setPortfolio(data.portfolio)
//     }
//     getPositions();
//   }, [])

  return (
    <div>
      {/* some sort of map function through performers*/}
      {/* {performers.map((p) => <p>{p}</p>)} */}
      <p>Performers Here</p>
    </div>
  )

}

export default User_home;