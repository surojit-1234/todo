import React from 'react'
import{ BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
import Navbar from './componets/Navbar';
import Completed from './pages/Completed';
import Active from './pages/Active';
import All from './pages/All';
import Edit from './pages/Edit';
import View from './pages/View';

const App = () => {
    
  return (
    <div>
        <Router>
         <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/all' element={<All />} />
            <Route path='/active' element={<Active />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/view/:id' element={<View />} />
          </Routes>
        </Router> 
    </div>
  )
}

export default App