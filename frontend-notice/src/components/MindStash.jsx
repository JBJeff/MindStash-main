import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import WelcomeComponent from './basic/WelcomeComponent'
import HeaderComponent from './basic/HeaderComponent'
import FooterComponent from './basic/FooterComponent'

import AuthProvider, { useAuth } from './security/AuthContext.jsx'

import React, { useRef, useState } from 'react'
import LoginComponent from './basic/LoginComponent'
import RegisterComponent from './basic/RegisterComponent'
import MainDashboard from './dashboard/MainDashboard'
import CategoryNotes from './dashboard/CategoryNotes'
import Handbuch from './basic/Handbuch';

/**
 * Beschreibung:
 * Die `AuthenticatedRoute`-Komponente schützt bestimmte Routen, indem sie überprüft, ob der Benutzer authentifiziert ist.
 * Wenn der Benutzer authentifiziert ist, wird der Inhalt angezeigt, andernfalls wird der Benutzer zur Login-Seite weitergeleitet.
 */
export function AuthenticatedRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        console.log('funktioniert');
        return children;

    }


    return <Navigate to="/login" />
}


/**
 * Beschreibung:
 * Die `MindStash`-Komponente ist die Hauptkomponente der Anwendung und enthält die Router-Logik und das Layout.
 * Sie verwendet den `AuthProvider` zum Bereitstellen des Authentifizierungsstatus und den `BrowserRouter` für die 
 * Routing-Funktionalität. Die verschiedenen Routen der Anwendung werden hier definiert.
 */
export default function MindStash() {


    return (

        <div className="MindStash">
            {/* AuthProvider ist ein Context Provider, der den Authentifizierungszustand für alle untergeordneten Komponenten bereitstellt 
            
            Für bessere veranschaulichung und präsentation der App wurde die Authentifizierung rausgenommen.
            
            */}
            <AuthProvider>
                <BrowserRouter>
                     <HeaderComponent></HeaderComponent> 

                    {/* <AuthenticatedRoute> ist die Kompenente welche regelt das nur User zugriff auf die entsprechenden Routes erhalten die die Befugniss haben */}
                    <Routes>
                        {/* <AuthenticatedRoute></AuthenticatedRoute> wird erstmal rausgenommen, SPÄTER EINFÜGEN */}

                        <Route path='/' element={<WelcomeComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>
                        <Route path='/register' element={<RegisterComponent />}></Route>
                        <Route path='/mainDashBoard' element={<MainDashboard></MainDashboard>}></Route>
                        <Route path="/categoryNotes/:categoryId" element={<CategoryNotes></CategoryNotes>} />
                        <Route path='/guide' element={<Handbuch/>} />


                    </Routes>

                <FooterComponent></FooterComponent>

                    {/* <FooterComponent></FooterComponent> */}
                </BrowserRouter>
                </AuthProvider>
            
        </div>
    )
}