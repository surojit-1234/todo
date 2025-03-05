import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/all'>All</NavLink></li>
            <li><NavLink to='/active'>Active</NavLink></li>
            <li><NavLink to='/completed'>Completed</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar;