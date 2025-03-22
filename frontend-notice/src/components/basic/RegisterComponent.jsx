import React, { useState } from 'react';
import './cs_bComponents/Register.css'; // Füge hier deine CSS Datei ein
import { registerUser } from '../api/UserApiService';  


function RegisterComponent() {
  
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            email,
            password,
            firstName,
            lastName
        };

        try {
            const data = await registerUser(requestBody);  // API-Aufruf
            setSuccessMessage(`User registered successfully: ${data.firstName} ${data.lastName}`);
            setError(null);
        } catch (error) {
            setError(error.message);  // Fehlernachricht vom API-Client
            setSuccessMessage(null);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                <div className="input-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
                </div>
                <div className="input-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default RegisterComponent;
