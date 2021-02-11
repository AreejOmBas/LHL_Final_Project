import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


import './Nav.css';

/* Component for the Header (Nav bar) */
export default function Nav(props) {
    console.log('inside nav ', props.user)
    return (
        (props.user) ? // if user is logged in 
            <nav className='navbar'>

                <div className='logo'>
                    <a href='https://cedarhouse.org'>
                        <img src='cedarHouse_logo.png' width='250px' />
                    </a>
                </div>
                <div className='navbar-links'>
                    <span> Logged in as {props.user} </span>
                    <Link to='/' onClick={() => props.logout()} className='navbar-links'>Logout</Link>
                </div>
            </nav>
            :
            // if user is not logged in 
            <nav className='navbar'>
                <div className='logo'>
                    <a href='https://cedarhouse.org'>
                        <img src='cedarHouse_logo.png' width='250px' />
                    </a>
                </div>
                <div className='navbar-links'>
                    <Link to='/login' >Login</Link>
                    <Link to='/register'>Register</Link>
                </div>

            </nav>
    )

}
