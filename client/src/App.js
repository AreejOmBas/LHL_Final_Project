import React, { useState ,useEffect} from 'react'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Survey from './Components/Survey';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import ForgetPassword from './Components/ForgetPassword';

import Welcome from './Components/Welcome';

import Footer from './Components/Footer';
import Nav from './Components/Nav';

import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import auth from './helpers/auth-helpers'
import SurveyHandler from './Components/SurveyHandler';
import PrivateRoute from './Components/PrivateRoute';
import ConfirmationPage from './Components/ConfirmationPage';


export default function App() {
  

  const storedJwt = localStorage.getItem('token');
  const [token,setToken]= useState(null);
  const [message, setMessage] = useState();
  const [isAuth, setAuth]= useState(false);
  
  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin'
  }

  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState('')
  const [profile, setProfile] = useState('')
  const history = useHistory();

  const login =  (user) => {
    const { email, password } = user;
    return  axios
      .post("http://localhost:3002/api/login", { email, password })
    
  };
  console.log("app.js", user)
  useEffect(() =>{
    const token= localStorage.getItem("token");
    if (token){
     // const foundUser = JSON.parse(token);
      setUser(token);
    }

  },[]);

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

  // const Logout = details => {
  //   console.log('LOGOUT')
  //   setUser({
  //     email: ''
  //   })
  // }
 



  return (

    <>
      <Router >

        {//(user) ? (<Nav profile="logged" />) : (<Nav profile="" />)}
        }

        <main className="layout">
          <div className="container">
            <Switch >
              <Route path="/login" render={(props) => <LoginForm  setUser={setUser} token={setToken} setAuth= {setAuth} location={props.location} login={login} error={error} {...props} />} />
              <Route path="/register" render={(props) => <RegisterForm Register={Register} error={error} {...props} />} />
              <Route path="/home-client-profile" component={LandingPage} />
              <Route path="/client-profile" component={LandingPage} />
             <PrivateRoute isAuth={isAuth}  user={user} setAuth= {setAuth} component={Survey} path="/survey/:id"  />
              <Route path="/confirmation" component={ConfirmationPage}/>
              <Route path="/forgot-password" component={ForgetPassword} />
              <Route path="/" component={Welcome} />

            </Switch>
          </div>
        </main>
      </Router>
      <Footer />
    </>
  );
          
  }

