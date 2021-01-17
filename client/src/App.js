import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Survey from './Components/Survey';

import './App.css';

import useApplicationData from './hooks/useApplicationData';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';


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
    {/* <div className="App">
        {(user.email !== '')
          ? (
            <div className ="Welcome">
                <h2 className="text-center"> Welcome  </h2>
                <Button className="btn-lg btn-dark btn-block" onClick={Logout}> Logout  </Button>
               
            </div>
            )
          : (
     //   <LoginForm Login={Login} error={error}/>
          <RegisterForm Register={Register} error={error}/>


            )}
                </div> */}
        <Survey/>
    </main>
   
    <Footer/>
    </>
    );
}

