import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      // Dacă pagina este deja încărcată
      handleLoad();
    } else {
      // Adăugăm evenimentul pentru încărcarea completă a paginii
      window.addEventListener('load', handleLoad);

      // Curățăm evenimentul la demontarea componentei
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      setMessage('User registered successfully!');
    } catch (err) {
      setMessage('Error registering user');
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loading />}
      <div id="content" style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
