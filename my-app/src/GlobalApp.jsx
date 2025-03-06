import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
//import Navbar from './componets/Navbar';
import Completed from './pages/Completed';
import Active from './pages/Active';
import All from './pages/All';
import Edit from './pages/Edit';
import View from './pages/View';
import Home from './pages/Home';
const GlobalApp = () => {
    function handleChildData(childData) {
        console.log(childData)
    }
  return (
    <>
      <Router>
         <Routes>
            <Route path='/' element={<Login onChildData={handleChildData} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/todo' element={<Home />} />
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

export default GlobalApp