import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './assets/style.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoCloudyNight, IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
//import App from './App';
import Home from './pages/Home';

const Login = (props) => {
  //const[roleId, setRoleId] = useState()
  const navigate = useNavigate();
  const [eyeToggle, setEyeToggle] = useState(false);

  const [signIn, setSignIn] = useState({
    userEmail: '',
    password: ''
  });
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  };

  useEffect(() => {
    console.log(signIn);
  }, [signIn]);

  const handleSignInForm = (event) => {
    event.preventDefault();

    // Send login request to API
    const loginData = {
      email: signIn.userEmail,
      password: signIn.password,
    };

    axios.post('http://localhost:8080/api/user/login', loginData) // Replace with your API URL
      .then((response) => {
      //  setRoleId(response.data.role_id);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          toast.success(
            <div>
              <h5 style={{ fontWeight: 'bolder' }}>Logged In Successfully!</h5>
            </div>
          );

          // Redirect to the home page or dashboard after successful login
          setTimeout(() => {
            navigate(`/todo?role-id=${response.data.role_id}`);
            props.onChildData(true);
          }, 1300);
        } else {
          // If no token is returned, it shows the error
          toast.error(
            <div>
              <h5 style={{ fontWeight: 'bolder' }}>Invalid Login Credentials!</h5>
            </div>
          );
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again!");
        console.error(error);
      });
  };



const handleForgotPassword = async () => {

  let userEmail = { 
    email: signIn.userEmail
  }


  if (!userEmail.email) {
    toast.warning('Please enter your email address.');
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8080/api/user/email-verify', userEmail.email);
    
    if (response.data.message === 'Verification email sent successfully!') {
      toast.success('Verification email sent! Check your inbox.');
    } else {
      toast.error('Failed to send verification email.');
    }
  } catch (err) {
    toast.error('Error sending verification email.');
    console.error(err);
  } finally {
    setLoading(false);
  }

  };



  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="mb-4">User Login</h2>
        <form id="login-form" onSubmit={handleSignInForm} className="form">
          <input
            type="email"
            placeholder="Email"
            aria-label="Username"
            name="userEmail"
            className="form-input"
            onChange={handleSignInChange}
            value={signIn.userEmail}
            required
          />
          <div className="w-100 password-field">
            <input
              type={`${!eyeToggle ? 'password' : 'text'}`}
              placeholder="Password"
              name="password"
              className="w-100 form-input"
              onChange={handleSignInChange}
              value={signIn.password}
              required
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEyeToggle(!eyeToggle);
              }}
            >
              {eyeToggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </a>
          </div>

          <Link 
           to='' 
            className='d-block text-end' 
            // onClick={()=> {

            //   let userEmail = {
            //     email: signIn.userEmail
            //   }

            //   if(userEmail.email=='') {
            //     toast.warning("Registered email must required!");
            //   }else{
            //     const userEmail={}
            //     axios.post('http://localhost:8080/api/user/forgetMail', userEmail)
            //     .then((res)=> {
            //       console.log(res)
            //       console.log(res.data.token)
            //     })
            //     .catch(err => console.log(err))
            //   }
              
            // }}
            onClick={(e)=>{
              e.preventDefault();
              handleForgotPassword()
            }}
            style={{marginTop: '-10px'}}>Forgot Password?
          </Link>

          <Link to="/register" style={{ textDecoration: 'none' }}>
            Don't have an account? Create Now!
          </Link>

          <button type="submit" className="btn-1">
            <span>Login</span>
          </button>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
