import React, { useState } from 'react'
import './Nav.css';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';


export default function Nav(props) {


  return (
    ( props.user) ? (
        <nav className="navbar">
       
                <div className="logo">
                    <a href="https://cedarhouse.org">
                    <img src="cedarHouse_logo.png" width="250px"/>
                    </a>
                </div>
                <div className="navbar-links">
                    <span> Logged in as {props.user.email} </span>
                    <Link to="/" onClick={()=> props.logout()} className="navbar-links">Logout</Link>                
                </div>
        </nav> )
    :   
    (<nav className="navbar">
         
                <div className="logo">
                    <img src="cedarHouse_logo.png" width="250px"/>
                </div>
                <div className="navbar-links">
                    <Link to='/login' >Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
         
     </nav> )
)

}
