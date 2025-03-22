import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'; 
import  './cs_bComponents/Header.css';
import { useAuth } from '../security/AuthContext.jsx'

function HeaderComponent() {
  // Zustand für den Login-Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  // Funktion für das Einloggen
  const handleLogin = () => {
    navigate('/login');
    //setIsLoggedIn(true);
  };

  // Funktion für das Ausloggen
  // const handleLogout = () => {
  //   setIsLoggedIn(false);

  // };

  const handleLogout = (e) => {
    e.preventDefault(); // Verhindert Standardformularverhalten
    authContext.logout(); // Führt die Logout-Funktion aus
    navigate('/'); // Navigiert zur Startseite
    console.log('Logout erfolgreich');
    setIsLoggedIn(false);
  };
  

  return (
    <header className="header">
      <div className="logo">
        {/* Hier das Logo in einen Link einbetten, der zur Startseite führt */}
        <Link to="/" >
          MindStash
        </Link>
      </div>

      <nav className="nav">
        {/* Menü für Notizen-Dashboard */}
        <a href="/mainDashBoard" className="link">
          Notizen
        </a>

        {/* Einloggen und Ausloggen Optionen */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="button">
            Ausloggen
          </button>
        ) : (
          <button onClick={handleLogin} className="button">
            Einloggen
          </button>
        )}
      </nav>
    </header>
  );
}

export default HeaderComponent;