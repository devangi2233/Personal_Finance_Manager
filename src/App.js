import React, { useState } from 'react';
import Login from '../src/components/Login';
import './App.css';
import Signup from '../src/components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Expenss from './components/Expense';
import Income from './components/Income';
import Budget from './components/Budget';
import ResetPassword from './components/ResetPassword';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';

function App() {
  // const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={isLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/expense" element={<Expenss/>}></Route>
          <Route exact path="/income" element={<Income/>}></Route>
          <Route exact path="/budget" element={<Budget/>}></Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset" element={<Reset />} />
          
        </Routes>
      </Router>
      
   
  );
}

export default App;
