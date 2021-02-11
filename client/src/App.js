import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

// required css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


//Custom components
import Survey from './Components/Survey';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import ForgetPassword from './Components/ForgetPassword';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import LandingPage from './Components/LandingPage';
import PrivateRoute from './Components/PrivateRoute';
import ConfirmationPage from './Components/ConfirmationPage';

// Main Component to  make the application
export default function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || null); //JWT Token

  const [user, setUser] = useState(localStorage.getItem('email') || null);//user email
  const [error, setError] = useState();

  const history = useHistory();


  const login = (userData) => {
    const { email, password } = userData;
    return axios
      .post('http://localhost:3002/api/login', { email, password })
  };

  const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('email', '');
    setUser(null);
  }

  //to get the token if valid
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }

  }, []);



  return (
    <>
      <Router >

        {(user) ? (<Nav profile='logged' user={user} logout={logout} />) : (<Nav profile='' />)}

        <main className='layout'>
          <div className='container'>
            <Switch >

              <Route path='/login' render={(props) => <LoginForm setUser={setUser} token={setToken} location={props.location} login={login} error={error} {...props} />} />
              <Route path='/register' render={(props) => <RegisterForm error={error} {...props} />} />
              <PrivateRoute token={token} component={Survey} path='/survey/:id' />
              <Route path='/confirmation' name={user} logout={logout} render={(props) => <ConfirmationPage logout={logout} {...props} />} />
              <Route path='/forgot-password' component={ForgetPassword} />
              <Route path='/' component={LandingPage} />

            </Switch>
          </div>
        </main>
      </Router>
      <Footer />
    </>
  );

}

