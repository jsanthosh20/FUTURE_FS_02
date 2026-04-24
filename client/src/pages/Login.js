import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextValue } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContextValue);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', credentials);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;