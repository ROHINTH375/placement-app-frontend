import React, { createContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {
    const savedEmail = localStorage.getItem('companyEmail');
    const [companyEmail, setCompanyEmail] = useState(savedEmail); 

    const login = (email) => {
        setCompanyEmail(email);
        localStorage.setItem('companyEmail', email); 
    };

    const logout = () => {
        setCompanyEmail(null);
        localStorage.removeItem('companyEmail'); 
    };

    useEffect(() => {
        if (savedEmail) {
            setCompanyEmail(savedEmail);
        }
    }, [savedEmail]);

    return (
        <CompanyContext.Provider value={{ companyEmail, login, logout }}>
            {children}
        </CompanyContext.Provider>
    );
};

export { CompanyContext };
export default CompanyProvider;
