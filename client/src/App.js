import React, { useState } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Header from './Components/Header';
import Footer from './Components/Footer';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import Welcome from './Components/Welcome'



export default function App () {
      const adminUser = {
        email: 'admin@admin.com',
        password: 'admin'
      }

      const [user, setUser] = useState({ email: '' })
      const [error, setError] = useState('')

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
    <Header />
        <main className="layout">
        
              <Router >
                    <div className="container">                     
                          <Switch >
                              <Route path="/login" render={(props) => <LoginForm Login={Login} error={error} {...props} />} />
                              <Route path="/register" render={(props) => <RegisterForm  Register={Register} error={error} {...props} />} />
                              <Route path="/" component={LandingPage} />

                          </Switch>
                    </div>

              </Router>
        </main>
    <Footer/>
    </>
    );
}

