import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('gym_token');
        const username = localStorage.getItem('gym_username');
        const email = localStorage.getItem('gym_email');
        const role = localStorage.getItem('gym_role');

        if (token && username) {
            setUser({ username, email, role, token });
        }
        setLoading(false);
    }, []);

   const login = (userData) => {
    const activeToken = userData.token || userData.jwtToken; 
    
    if (activeToken) {
        localStorage.setItem('gym_token', activeToken);
        localStorage.setItem('gym_username', userData.username);
        localStorage.setItem('gym_email', userData.email);
        localStorage.setItem('gym_role', userData.role);
        setUser({
            token: activeToken,
            username: userData.username,
            email: userData.email,
            role: userData.role
        });
    }
};


  const logout = () => {
    // 1. Reset your React user state context
    if (typeof setUser === 'function') {
        setUser(null);
    }

    // 2. Completely clear all authentication tokens and state caches
    localStorage.clear(); 
    sessionStorage.clear();

    // 3. Force a clean window reload straight to the home landing view page
    window.location.href = '/';
};


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
