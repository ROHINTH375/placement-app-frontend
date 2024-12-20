import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { UserContext } from "../../../context/UserContext";

export default function Login() {
    const navigate = useNavigate(); 
    const { login } = useContext(UserContext); 

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault(); 
        try {
            if (!user.email || !user.password) {
                alert("Please fill in all fields.");
                return;
            }

            const res = await axios.post(`http://localhost:5000/user/login`, user);
            alert(res.data.message);

            login(user.email);

            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred during login.");
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <h1 className="text-light">Job Portal</h1>
            </header>
            <div className="login-container">
                <div className="login-form card shadow-sm">
                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
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
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
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
                        <a href="/register" className="register-link">Register new candidate</a>
                    </form>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Job Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}
