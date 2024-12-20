import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompanyLogin.css";
import { CompanyContext } from "../../../context/CompanyContext";

export default function CompanyLogin() {
    const navigate = useNavigate(); 
    const { login } = useContext(CompanyContext); 

    const [company, setCompany] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault(); 
        try {
            if (!company.email || !company.password) {
                alert("Please fill in all fields.");
                return;
            }
            const res = await axios.post(`http://localhost:5000/company/companylogin`, company);
            alert(res.data.message);
            if(res.data.message === 'Company loggin successful')
            {
                login(company.email);
                navigate("/companydashboard");
            }
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred during login.");
            console.error(err);
        }
    };

    return (
        <><header className="text-center mb-4">
            <h1>Company Login</h1>
            <p className="text-muted">Manage your candidates and interviews effectively</p>
        </header><div className="login-container">
                <div className="login-form card shadow-sm">
                    <h2 className="text-center">Company Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Company Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={company.email}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={company.password}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleClick}
                            >
                                Login
                            </button>
                        </div>
                        <a href="/companyregister">Register new company</a>
                    </form>
                </div>
            </div>
            <footer className="footer1 mt-4 text-center">
                <p>&copy; {new Date().getFullYear()} . All rights reserved.</p>
            </footer>
            </>
    );
}
