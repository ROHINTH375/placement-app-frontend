import { useState } from "react";
import './CompanyRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompanyRegister() {
    const [company, setCompany] = useState({
        companyname: '',
        email: '',
        password: '',
        image: null,
    });

    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setCompany({ ...company, image: files[0] });
        } else {
            setCompany({ ...company, [name]: value });
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!company.companyname || !company.email || !company.password) {
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('companyname', company.companyname);
        formData.append('email', company.email);
        formData.append('password', company.password);
        if (company.image) formData.append('image', company.image);

        try {
            const res = await axios.post(`http://localhost:5000/company/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(res.data.message);
            navigation("/companylogin");
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="company-register-page">
            <header className="header">
                <h1>Register Company</h1>
            </header>
            <div className="company-register-container">
                <div className="company-register-form card shadow-sm">
                    <h2 className="text-center">Register Company</h2>
                    <form>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="companyname" className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyname"
                                name="companyname"
                                placeholder="Enter your company name"
                                value={company.companyname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Company Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={company.email}
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
                                value={company.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Company Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Register</button>
                        </div>
                        <p className="mt-3 text-center">Already a registered company? <a href="/companylogin">Login here</a></p>
                    </form>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Company Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}
