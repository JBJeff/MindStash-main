import React, { useState } from 'react';
import  './cs_bComponents/Login.css';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../security/AuthContext.jsx'


function LoginComponent() {
  const [errorMessage, setShowErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault(); // Verhindert Standardformularverhalten
    if (await authContext.login(email, password)) {
      navigate('/mainDashBoard');
      console.log('Login erfolgreich');
    } else {
      console.log('Login fehlgeschlagen');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="loginComponent">
      <main className="login-main-content">
        <h1>Login</h1>
        
        <form className="login-form" onSubmit={handleLogin}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <div className="input-group">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Deine E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Dein Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <button className="register-button" onClick={handleRegister}>
          Registrieren
        </button>
      </main>
    </div>
  );
}

export default LoginComponent;

