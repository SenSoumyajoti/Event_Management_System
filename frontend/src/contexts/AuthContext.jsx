// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const api = axios.create({ baseURL: 'http://localhost:8000', withCredentials: true });

  // Fetch current user
  const fetchMe = async () => {
    try {
      const { data } = await api.get('/api/me/');
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  // Log out
  const logout = async () => {
    await api.post('/logout/');
    setUser(null);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);