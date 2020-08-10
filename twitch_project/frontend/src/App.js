import React from 'react';
import { useStateWithSessionStorage } from './components/models';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar';
import Router from './components/router';
import './App.css';

function App() {
  const [token, setToken] = useStateWithSessionStorage("token", "");

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={token} setToken={setToken}/>
        <Router token={token} setToken={setToken} />
      </BrowserRouter>
    </div>
  );
}

export default App;
