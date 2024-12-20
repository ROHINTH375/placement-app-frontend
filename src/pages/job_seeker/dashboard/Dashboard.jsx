import "./Dashboard.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigation = useNavigate()
    const { userEmail, logout } = useContext(UserContext);
    const [details, setDetails] = useState(null);
    const [resume, setResume] = useState(null);
    const [updateDetails, setUpdateDetails] = useState({
        CGPA: '',
        college: '',
        hsc: '',
        sslc: "",
        experience: '',
    });
    const [profile, setProfile] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [showInterviews, setShowInterviews] = useState(false);

    const fetchDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/getdetails?email=${userEmail}`);
            setDetails(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchDetails();
        }
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateDetails({ ...updateDetails, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/user/update?email=${userEmail}`, updateDetails);

            if (res.status === 200) {
                setDetails({ ...details, ...updateDetails });
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while updating your details.');
        }
    };

    const handleResume = async () => {
        if (!resume) {
            alert('Please select a resume to upload.');
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);

        try {
            const res = await axios.post(`http://localhost:5000/user/resumeupload?email=${userEmail}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert('An error occurred while uploading the resume.');
        }
    };

    const handleCompanies = async () => {
        if (!showInterviews) {
            try {
                const res = await axios.get(`http://localhost:5000/user/getinterviews?candidate=${userEmail}`);
                setCompanies(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        setShowInterviews(!showInterviews);
    };

    const handlelogout=()=>{
        logout()
        navigation('/')
    }

    const handlePlaced=()=>{
        navigation(`/placed/${userEmail}`)
    }

    return (
        <div className="dashboard-container container mt-5">
            <header className="dashboard-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="#">Candidate Dashboard</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <button className="btn btn-transparent text-danger" onClick={handlelogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header text-center">
                            <p>Welcome, {userEmail}!</p>
                        </div>
                        <div className="card-body">
                            {details ? (
                                <div>
                                    <h5>Candidate Details:</h5>
                                    <p><strong>Name:</strong> {details.username}</p>
                                    <p><strong>Email:</strong> {details.email}</p>
                                    {details.CGPA && <p><strong>CGPA:</strong> {details.CGPA}</p>}
                                    {details.college && <p><strong>College:</strong> {details.college}</p>}
                                    {details.hsc && <p><strong>HSC SCORE:</strong> {details.hsc}%</p>}
                                    {details.sslc && <p><strong>SSLC SCORE:</strong> {details.sslc}%</p>}
                                    {details.experience && <p><strong>Experience:</strong> {details.experience} years</p>}
                                    <img className="img-fluid" src={`http://localhost:5000/${details.resume}`} alt="User Resume" />
                                </div>
                            ) : (
                                <h3>Please provide all your details</h3>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="d-flex justify-content-between mb-3">
                        <button className="btn btn-info" onClick={handleCompanies}>
                            {showInterviews ? "Hide Interviews" : "View Interviews"}
                        </button>
                        <button className="btn btn-info" onClick={handlePlaced}>
                            Placed In
                        </button>
                        <button className="btn btn-warning" onClick={() => setProfile(!profile)}>
                            {profile ? "Cancel Update" : "Update Profile"}
                        </button>
                    </div>

                    {profile && (
                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <h2>Enter Your Details</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-3">
                                        <label htmlFor="CGPA">CGPA</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="CGPA"
                                            name="CGPA"
                                            value={updateDetails.CGPA}
                                            placeholder="Enter your CGPA"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="college">College</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="college"
                                            name="college"
                                            value={updateDetails.college}
                                            placeholder="Enter Your college name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="hsc">HSC</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="hsc"
                                            name="hsc"
                                            placeholder="HSC percentage"
                                            value={updateDetails.hsc}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sslc">SSLC</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sslc"
                                            name="sslc"
                                            placeholder="SSLC percentage"
                                            value={updateDetails.sslc}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="experience">Experience</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="experience"
                                            name="experience"
                                            placeholder="Experience in years"
                                            value={updateDetails.experience}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <input
                                type="file"
                                name="resume"
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                            <br />
                            <button className="btn btn-success mt-3" onClick={handleResume}>Upload Resume</button>
                        </div>
                    </div>
                </div>
            </div>

            {showInterviews && companies.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-center">Scheduled Interviews</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Contact-Company</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company, index) => (
                                    <tr key={index}>
                                        <td>{company.company}</td>
                                        <td>{new Date(company.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                        <td>{company.Time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showInterviews && companies.length === 0 && (
                <div className="alert alert-info mt-4">No interviews scheduled yet.</div>
            )}

            <footer className="footer mt-5 py-4 bg-light text-center">
                <p>© 2024 Your Company. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
