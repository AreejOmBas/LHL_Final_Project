import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import Header from './Components/Header';
import Footer from './Components/Footer';

import './App.css';

function App() {
  
  const {state, setState}  = useApplicationData();

  
const userList = state.users.map(user => <li>{user.name} {user.email}</li>)

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

export default App;
