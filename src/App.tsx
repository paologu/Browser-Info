import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import UAParser from "ua-parser-js"
import './App.css';
import {isAdBlockInUse} from "@guardian/commercial-core" //import adblocker function from nmp install @guardian/commercial-core 
import {getCookie} from "@guardian/libs"
import useSWR from "swr"
const fetcher = (init?: RequestInit) => (url: string) =>
	fetch(url, init)
		.then((res) => res.json()); // request to fetch a url

const cookieNames = ["gu_hide_support_messaging" , "gu_digital_subscriber" , "gu_paying_member" , "gu_recurring_contributor"]

function App() {
  const { data, error, isLoading } = useSWR('https://members-data-api.theguardian.com/user-attributes/me', fetcher ())
  console.log (data,error,isLoading)
  const ua = new UAParser ()
  console.log(ua)
  const [adblockstatus, setadblockstatus] = useState (false) //use State to store data to the render of the page
  useEffect (function() {  //useEffect is being given a function which is only called when React wants to call it, then adblockinuse is called, which after completion it gives us value, which we then give to the setadblockstatus
    isAdBlockInUse ().then(function(value) {setadblockstatus(value)})
  })
const cookies = cookieNames.map(function(cookieName){ //function inside map gets called from cookieNames list, returns to new list called cookie
const value = getCookie({name : cookieName})  //loop through every name in the cookieNames list, and for every one of them we call the function getCookie
return {name : cookieName , value : value}   //we return an object which contains the name of the value we just requested, and this goes into const

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
        <ul>{cookies.map(function(cookie){
          return <li>{cookie.name} : {cookie.value || "unset"}</li>  /* using curly brackets to write code to go through all the cookies in the array, and create a new li for each one */
        })}</ul>
      
      </div>
    </div>
  );

}




export default App;
