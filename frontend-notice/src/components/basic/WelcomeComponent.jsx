import React from 'react';
import './cs_bComponents/Welcome.css';
import { Link } from 'react-router-dom';


function WelcomeComponent() {
  return (
    <div className="welcomeComponent">
      <header className="welcomeHeader">
        <h1>Willkommen bei MindStash!</h1>
        <p>Willkommen bei MindStash –
          deinem Ort für die wertvollsten Gedanken! Tauche ein in eine Welt voller Inspiration,
          Ideen und Notizen, die den Geist beflügeln.
          Hier wird jeder Moment zu einem Schatz, den du aufbewahren kannst.
          Bereit, deine besten Gedanken zu sammeln?</p>
      </header>
      <main className="main-content">
        <p className="main-text">Erkunde die Funktionen</p>
        <Link to="/guide">
          <button className="explore-button">Funktionen</button>
        </Link>
      </main>
    </div>
  );
}

export default WelcomeComponent;