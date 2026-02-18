import { useState,useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import Venues from './pages/Venues';
import Events from './pages/Events';
import Header from './components/Header';
import CreateEvent from './pages/CreateEvent';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  const [userName, setUserName] = useState(localStorage.getItem('username') || 'Guest');

  useEffect(() => {
    const access = localStorage.getItem('access');
    setIsLoggedIn(!!access);
    if (access) {
      setUserName(localStorage.getItem('username') || 'Guest');
    } else {
      setUserName('Guest');
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
    
  };
  return (
      <Router>
        <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={< Register/>} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>} />
          <Route path='/venues' element={<Venues/>} />
          <Route path='/events' element={<Events/>} />
          <Route path="/createevent" element={<CreateEvent />} />
        </Routes>
      </Router>
  )
}

export default App
