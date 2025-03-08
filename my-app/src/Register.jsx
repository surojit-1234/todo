import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './assets/style.css';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [eyeToggle, setEyeToggle] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState('');
    const [signup, setSignup] = useState({
        userName: '',
        email: '',
        password: '',
        userType: '' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignup({ ...signup, [name]: value });
    };

    const handleSignUpFormSubmit = (event) => {
        event.preventDefault();

        // Password validation
        const res = signup.password.split('').some((letter) => /[0-9]/.test(letter));
        if (!res) {
            setIsPasswordError('Password must contain at least one number');
            return;
        } else {
            setIsPasswordError('');
        }

        const userInfo = {
            name: signup.userName,
            email: signup.email,
            password: signup.password,
            role_id: signup.userType,
            user_id: '2'
        };

        axios.post(`http://localhost:8080/api/user/register`, userInfo)
            .then((res) => {
                console.log(res);
                toast.success(
                    <div>
                        <h5 style={{ fontWeight: 'bolder' }}>
                            {`Congratulations!! ${signup.userName}`}
                        </h5>
                        <p>Your Profile has been registered</p>
                    </div>
                );
                setSignup({
                    userName: '',
                    email: '',
                    password: '',
                    userType: ''
                });
                setTimeout(() => {
                    navigate('/');
                }, 1600);
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again!");
                console.log(err);
            });
    };

    return (
        <div className='main-container'>
            <div className="form-container">
                <h2 className='mb-4'>Register Now!</h2>
                <form id="signup-form" onSubmit={handleSignUpFormSubmit} className='form'>
                    <input 
                        type="text" 
                        className='form-input'
                        placeholder="Username" 
                        name='userName' 
                        onChange={handleInputChange} 
                        value={signup.userName} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className='form-input'
                        name='email' 
                        onChange={handleInputChange} 
                        value={signup.email} 
                        required 
                    />
                    <div className='w-100 password-field'>
                        <input 
                            type={`${!eyeToggle ? 'password' : 'text'}`}
                            placeholder="Password" 
                            name='password' 
                            className='form-input w-100'
                            onChange={handleInputChange} 
                            value={signup.password} 
                            required 
                        />
                        <a href='#' onClick={(e) => {
                            e.preventDefault();
                            setEyeToggle(!eyeToggle);
                        }}> 
                            { eyeToggle ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                        </a>
                    </div>
                    
                    <span style={{ color: 'red', fontSize: '12px', lineHeight: '1' }}>
                        {isPasswordError}
                    </span>

                    <select 
                        className='form-input' 
                        name="userType" 
                        value={signup.userType} 
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a User Type</option>
                        <option value="1">Admin</option>
                        <option value="2">Editor</option>
                        <option value="3">User</option>
                    </select>
                    <Link to='/'>Already Have an Account??</Link>
                    <button type="submit" className="btn-1">
                        <span>Sign Up</span>
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
