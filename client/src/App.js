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
  

  
  const [token,setToken]= useState(localStorage.getItem("token") || null);
  const [message, setMessage] = useState();
  const [isAuth, setAuth]= useState(false);
  
  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin'
  }

  const [user, setUser] =  useState();
  
  const [error, setError] = useState()
/*   const [profile, setProfile] = useState('') */
  const history = useHistory();

  const login =  (userData) => {
    const { email, password } = userData;
    return  axios
      .post("http://localhost:3002/api/login", { email, password })
    
  };
  

  useEffect(() =>{
    const token= localStorage.getItem("token");
    if (token){
     // const foundUser = JSON.parse(token);
      setToken(token);
    }

  },[]);

  const Register = details => {
    console.log(details)
  }
  
  const logout= () =>{  
    localStorage.setItem('token','');
   setUser(null)
  }
 



  return (

    <>
      <Router >

        {(user) ? (<Nav profile="logged" user={user} logout={logout}/>) : (<Nav profile="" />)}
        

        <main className="layout">
          <div className="container">
            <Switch >
              <Route path="/login" render={(props) => <LoginForm  setUser={setUser} token={setToken} setAuth= {setAuth} location={props.location} login={login} error={error} {...props} />} />
              <Route path="/register" render={(props) => <RegisterForm Register={Register} error={error} {...props} />} />
              <Route path="/home-client-profile" component={LandingPage} />
              <Route path="/client-profile" component={LandingPage} />
             <PrivateRoute isAuth={isAuth}  token={token} setAuth= {setAuth} component={Survey} path="/survey/:id"  />
              <Route path="/confirmation" name={user} component={ConfirmationPage}/>
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

