import { useState } from "react";
import './Register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigation = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/user/register`, user);
            alert(res.data.message);
            navigation("/login");
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred during registration.");
            console.error(err);
        }
    }

    return (
        <div className="register-page">
            <header className="header">
                <h1 className="text-light">Job Portal</h1>
            </header>
            <div className="register-container">
                <div className="register-form card shadow-sm">
                    <h2 className="text-center">Register New Candidate</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter your name"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Register</button>
                        </div>
                        <a href="/login" className="login-link">Already a candidate? Login here</a>
                    </form>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Job Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}
