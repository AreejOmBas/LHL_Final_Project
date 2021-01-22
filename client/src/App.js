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
import axios from 'axios';
import auth from './helpers/auth-helpers'
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

export default function App () {

  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [message,setMessage] = useState();

      const adminUser = {
        email: 'admin@admin.com',
        password: 'admin'
      }

      const [user, setUser] = useState({ email: '' })
      const [error, setError] = useState('')
      const [profile, setProfile] = useState('')


      const login =  (user) => {
        return axios
        .post(API_URL + "login", {
          email,
          password,
        })
        .then((response) => {if (response.status === 200) {
          props.history.push('/');
        } else {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      }); 
      };
              /* .then(res => {
    if (res.status === 200) {
      this.props.history.push('/');
    } else {
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error logging in please try again');
  }); */    
        
      };

    // const getFoods = async () => {
    //     try {
    //       const { data } = await axios.get(`${apiUrl}/foods`);
    //       setFoods(data);
    //       setFetchError(null);
    //     } catch (err) {
    //       setFetchError(err.message);
    //     }
    //   };

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

     {( user.email !== '') ? (<Nav profile="logged"/> ) : (<Nav profile=""/> )}

        <main className="layout">
                <div className="container">   
                          <Switch >
                              <Route path="/login" render={(props) => <LoginForm login={login} error={error} {...props} />} />
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

{/* <main className="layout">
  <Survey/>
  </main> */}

    {/* <div className="push" ></div> */}
    <Footer/>
    </>
    );
}

