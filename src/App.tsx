import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import UAParser from "ua-parser-js"
import './App.css';
import {isAdBlockInUse} from "@guardian/commercial-core" //import adblocker function from nmp install @guardian/commercial-core 

function App() {
  const ua = new UAParser ()
  console.log(ua)
  const [adblockstatus, setadblockstatus] = useState (false) //use State to store data to the render of the page
  useEffect (function() {  //useEffect is being given a function which is only called when React wants to call it, then adblockinuse is called, which after completion it gives us value, which we then give to the setadblockstatus
    isAdBlockInUse ().then(function(value) {setadblockstatus(value)})
  })
  return (
    <div className="App">
      <div className="App-container">
        <h1> YOUR BROWSER INFORMATION </h1>
        <p>{ua.getDevice().model} - {ua.getOS().name} {ua.getOS().version}</p>
        <p>{ua.getBrowser().name} {ua.getBrowser().version}</p>
        <p>Window Size: {window.innerWidth} x {window.innerHeight}</p>
        <p>Screen Size: {window.screen.width} x {window.screen.height}</p>
        <p>Adblocker status: {adblockstatus ? "On" : "Off"} </p> {/* Boolean - qmark is saying if its true = on, if false then off */}
      </div>
    </div>
  );

}




export default App;
