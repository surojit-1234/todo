import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import Register from './Register';
import GlobalApp from './GlobalApp';

 //createRoot(document.getElementById('root')).render(<App />)
//createRoot(document.getElementById('root')).render(<Register />)

createRoot(document.getElementById('root')).render(<GlobalApp />)