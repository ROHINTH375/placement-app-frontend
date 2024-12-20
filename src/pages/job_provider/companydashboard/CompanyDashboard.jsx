import "./CompanyyDashboard.css";
import { CompanyContext } from "../../../context/CompanyContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function CompanyDashboard() {
    const navigation = useNavigate()
    const { companyEmail, logout } = useContext(CompanyContext);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCandidates, setShowCandidates] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [schedule, setSchedules] = useState([]);
    const [showSchedules, setShowSchedules] = useState(false);
    const [interviewPanel, setInterviewPanel] = useState(null);
    const [interview, setInterview] = useState({
        date: "",
        time: "",
    });

    const getCompanyDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/company/getdetails?email=${companyEmail}`);
            setDetails(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load company details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewCandidates = async () => {
        setShowCandidates(!showCandidates);
        try {
            const res = await axios.get(`http://localhost:5000/company/getcandidates`);
            setCandidates(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load candidates. Please try again.");
        }
    };

    const handleViewInterviews = async () => {
        setShowSchedules(!showSchedules);
        try {
            const res = await axios.get(`http://localhost:5000/company/getInterviews?email=${companyEmail}`);
            setSchedules(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load interview schedules.");
        }
    };

    const handleScheduleInterview = async (candidateEmail) => {
        try {
            if (!interview.date || !interview.time) {
                alert("Please provide both date and time.");
                return;
            }

            const res = await axios.get(`http://localhost:5000/company/schedule?company=${companyEmail}&candidate=${candidateEmail}&date=${interview.date}&time=${interview.time}`);
            alert("Interview scheduled successfully.");
            setShowSchedules(false);
            handleViewInterviews();
        } catch (err) {
            console.error(err);
            alert("Failed to schedule interview.");
        }
    };

    const handleInterviewChange = (e) => {
        const { name, value } = e.target;
        setInterview({ ...interview, [name]: value });
    };

    useEffect(() => {
        if (companyEmail) {
            getCompanyDetails();
        } else {
            setError("Company email is not available in the context.");
            setLoading(false);
        }
    }, [companyEmail]);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container alert alert-danger">{error}</div>;
    }

    const handleSelect = async (candidate, company) => {
        try {
            const res = await axios.get(`http://localhost:5000/company/select?candidate=${candidate}&company=${company}`);
            alert("Status Updated")
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSelected =()=>{
        navigation(`/select/${companyEmail}`)
    }

    const handleLogout=()=>{
        logout()
        navigation('/')
    }

    return (
        <div className="container dashboard-container">
            <header className="text-center mb-4">
                <h1>Welcome to {details?.companyname} Dashboard</h1>
                <p className="text-muted">Manage your candidates and interviews effectively</p>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </header>

            <div className="card shadow-sm company-info-card p-4">
                <h2 className="text-center mb-4 text-dark">Company Information</h2>
                {details && (
                    <div className="details-container text-light">
                        <center>
                            <p><strong>Company Name:</strong> {details.companyname}</p>
                            <p><strong>Company Email:</strong> {details.email}</p>
                        </center>
                        {details.image && (
                            <center>
                                <img
                                    src={`http://localhost:5000/${details.image}`}
                                    alt="Company Logo"
                                    className="company-logo"
                                />
                            </center>

                        )}
                    </div>
                )}
            </div>

            <div className="button-container mt-4">
                <button className="btn btn-primary me-2" onClick={handleViewCandidates}>
                    {showCandidates ? "Hide Candidates" : "View Candidates"}
                </button>
                <button className="btn btn-primary me-2" onClick={handleViewInterviews}>
                    {showSchedules ? "Hide Schedules" : "View Interviews"}
                </button>
                <button className="btn btn-primary me-2" onClick={handleSelected}>
                    {showSchedules ? "Hide Selected Candidates" : "View Selected Candidates"}
                </button>
            </div>

            {showCandidates && candidates.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-center">Candidate List</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Resume</th>
                                    <th>Details</th>
                                    <th>Schedule</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate, index) => (
                                    <tr key={index}>
                                        <td>{candidate.username}</td>
                                        <td>{candidate.email}</td>
                                        <td>
                                            <a
                                                href={`http://localhost:5000/${candidate.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        </td>
                                        <td><button onClick={() => navigation(`/viewdetails/${candidate.email}`)} className="btn btn-primary me-2">View Details</button></td>
                                        <td>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() =>
                                                    setInterviewPanel(
                                                        interviewPanel === candidate.email ? null : candidate.email
                                                    )
                                                }
                                            >
                                                {interviewPanel === candidate.email ? "Hide Panel" : "Schedule Interview"}
                                            </button>
                                            {interviewPanel === candidate.email && (
                                                <div className="mt-2">
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={interview.date}
                                                        onChange={handleInterviewChange}
                                                        className="form-control mb-2"
                                                    />
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        value={interview.time}
                                                        onChange={handleInterviewChange}
                                                        className="form-control mb-2"
                                                    />
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => handleScheduleInterview(candidate.email)}
                                                    >
                                                        Confirm Schedule
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => handleSelect(candidate.email, companyEmail)}>Selected</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showCandidates && candidates.length === 0 && (
                <div className="alert alert-info mt-4">No candidates available.</div>
            )}

            {showSchedules && schedule.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-center">Interview Schedules</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Candidate Email</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.candidate}</td>
                                        <td>{new Date(item.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                        <td>{item.Time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showSchedules && schedule.length === 0 && (
                <div className="alert alert-info mt-4">No interview schedules available.</div>
            )}

            <footer className="footer mt-4 text-center">
                <p>&copy; {new Date().getFullYear()} {details?.companyname}. All rights reserved.</p>
            </footer>
        </div>
    );
}
