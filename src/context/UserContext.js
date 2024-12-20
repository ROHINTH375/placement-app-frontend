import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const savedEmail = localStorage.getItem('userEmail');
    const [userEmail, setUserEmail] = useState(savedEmail); 

    const login = (email) => {
        setUserEmail(email);
        localStorage.setItem('userEmail', email); 
    };

    const logout = () => {
        setUserEmail(null);
        localStorage.removeItem('userEmail'); 
    };

    useEffect(() => {
        if (savedEmail) {
            setUserEmail(savedEmail);
        }
    }, [savedEmail]);

    return (
        <UserContext.Provider value={{ userEmail, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
export default UserProvider;
