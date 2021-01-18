import React, { useState } from 'react'
import './Nav.css';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';


export default function Nav(props) {


  return (
    ( props.profile !== '') ? (
        <nav className="nav">
            <div className="container">
                <div className="logo">
                    <img src="cedarHouse_logo.png" width="250px"/>
                </div>
                <div className="navbar">
                    <Link to="/home-client-profile" className="nav-title">Home</Link>
                    <Link to="/client-profile" className="nav-title">Profile</Link>
                    <Link to="/surveys" className="nav-title">Surveys</Link>                
                </div>
            
            </div>
        </nav> )
    :   
    (<nav className="nav">
            <div className="container">
                <div className="logo">
                    <img src="cedarHouse_logo.png" width="250px"/>
                </div>
            </div>
     </nav> )
)

}
