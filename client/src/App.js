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
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import auth from './helpers/auth-helpers'
import SurveyHandler from './Components/SurveyHandler';

//import routes from './helpers/routes'

// const apiUrl = 'http://localhost:3002';
// axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default function App() {
  

  const storedJwt = localStorage.getItem('token');
  
  const [message, setMessage] = useState();
  const [isAuth, setAuth]= useState(false);
  
  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin'
  }

  const [user, setUser] = useState({ email: '' })
  const [error, setError] = useState('')
  const [profile, setProfile] = useState('')
  const history = useHistory();

  const login = (user) => {
    const { email, password } = user;
    return axios
      .post("http://localhost:3002/api/login", { email, password })
    
  };


  const Register = details => {
    console.log(details)
  }

  // const Login = details => {
  //   console.log(details)
  //   if (details.email === adminUser.email && details.password === adminUser.password) {
  //     console.log('logged in')
  //     setUser({
  //       email: details.name
  //     })
  //   } else {
  //     console.log('Not match')
  //     setError('Error')
  //   }
  // }

  const Logout = details => {
   
    setUser({
      email: ''
    })
  }
  const PrivateRoute =({component: Component, isAuth, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => isAuth === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  return (

    <>
      <Router >

        {(user.email !== '') ? (<Nav profile="logged" />) : (<Nav profile="" />)}

        <main className="layout">
          <div className="container">
            <Switch >
              <Route path="/login" render={(props) => <LoginForm  Auth= {setAuth} location={props.location} login={login} error={error} {...props} />} />
              <Route path="/register" render={(props) => <RegisterForm Register={Register} error={error} {...props} />} />
              <Route path="/home-client-profile" component={LandingPage} />
              <Route path="/client-profile" component={LandingPage} />
              <PrivateRoute isAuth={isAuth}  component={Survey} path="/survey/:id" exact />
              <Route path="/survey" component={LandingPage} />
              <Route path="/forgot-password" component={ForgetPassword} />
              <Route path="/" component={LandingPage} />

            </Switch>
          </div>
        </main>
      </Router>
      <Footer />
    </>
  );
}

