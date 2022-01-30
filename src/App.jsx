import React from 'react';

import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import logo from './img/tier-logo.svg';
import './css/App.css';
import ShortenUrlForm from './components/ShortenUrlForm';

// axios config
const token = process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN;
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const App = () => (
    <div className="App">
         <ToastContainer />
        <img src={logo} className="App-logo" alt="logo" />
        <p>Change mobility for good</p>
        <ShortenUrlForm />
    </div>
);

export default App;
