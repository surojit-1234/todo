import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import Navbar from './componets/Navbar';
import Completed from './pages/Completed';
import Active from './pages/Active';
import All from './pages/All';
import Edit from './pages/Edit';
import View from './pages/View';
import Home from './pages/Home';
import Protected from './Protected';

const GlobalApp = () => {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  if(isLoggedIn)
  localStorage.setItem("loginResponse", isLoggedIn);
  let isLogIn = localStorage.getItem("loginResponse");
  return (
    <>
      <Router>
        <Navbar />
         <Routes>
            <Route path='/' element={<Login onChildData={(childData)=> setIsLoggedIn(childData) } />} />
            <Route path='/register' element={<Register />} />
            <Route path='/todo' element={<Protected isLoggedIn={isLogIn}>
              <Home />
            </Protected>} />
            <Route path='/all' element={<All />} />
            <Route path='/active' element={<Active />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/view/:id' element={<View />} />
         </Routes>
      </Router>
    </>
  )
}

export default GlobalApp;