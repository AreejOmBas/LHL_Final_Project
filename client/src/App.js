import React, { useState } from 'react'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Survey from './Components/Survey';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import ForgetPassword from './Components/ForgetPassword';

import Footer from './Components/Footer';
import Nav from './Components/Nav';

import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';




export default function App () {
      const adminUser = {
        email: 'admin@admin.com',
        password: 'admin'
      }

      const [user, setUser] = useState({ email: '' })
      const [error, setError] = useState('')
      const [profile, setProfile] = useState('')


      const Register = details => {
        console.log(details)
      }

      const Login = details => {
        console.log(details)
        if (details.email === adminUser.email && details.password === adminUser.password) {
          console.log('logged in')
          setUser({
            email: details.name
          })
        } else {
          console.log('Not match')
          setError('Error')
        }
      }

      const Logout = details => {
        console.log('LOGOUT')
        setUser({
          email: ''
        })
      }

  return ( 

    <>
  <Router >

     {( user.email !== '') ? (<Nav profile="logged"/> ) : (<Nav profile=""/> )}

        <main className="layout">
                <div className="container">   
                          <Switch >
                              <Route path="/login" render={(props) => <LoginForm Login={Login} error={error} {...props} />} />
                              <Route path="/register" render={(props) => <RegisterForm  Register={Register} error={error} {...props} />} />
                              <Route path="/home-client-profile" component={LandingPage} />
                              <Route path="/client-profile" component={LandingPage} />
                              <Route path="/surveys" component={LandingPage} />
                              <Route path="/forgot-password" component={ForgetPassword} />
                              <Route path="/" component={LandingPage} />

                          </Switch>
                </div>
        </main>
  </Router>
    <div className="push" ></div>
    <Footer/>
    </>
    );
}

