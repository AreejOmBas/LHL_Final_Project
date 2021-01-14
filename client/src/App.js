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
    
    </main>
    <Footer/>
    </>
    );
}

export default App;
