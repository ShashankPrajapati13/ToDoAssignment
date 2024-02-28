import React, { useEffect } from 'react'
import './StyleSheet/App.css'
import Auth from './Components/Auth'
import Home from "./Components/Home.jsx";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { loadUserAsync } from "./Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

function App() {

 const dispatch = useDispatch()
 useEffect(() => {
  dispatch(loadUserAsync())
 }, [])
 
  

  return (
    <>
      <Router>
      <Routes>
  
        <Route exact path="/" element = {<Auth/>} />
        <Route path="/home" element = { <Home />} />
    
      </Routes >
    </Router>
    </>
  );
}

export default App;

