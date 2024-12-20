import "./ViewDetails.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewDetails() {
    const { email } = useParams();
    const [candidate, setCandidate] = useState(null);

    const getCandidate = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/company/getone?candidate=${email}`);
            setCandidate(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCandidate();
    }, [email]);

    return (
        <div className="view-details-page">
            {candidate ? (
                <div className="candidate-details">
                    <h2 className="text-center">Candidate Details</h2>
                    <div className="candidate-info">
                        <p><strong>Name:</strong> {candidate.username}</p>
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>CGPA:</strong> {candidate.CGPA}</p>
                        <p><strong>College:</strong> {candidate.college}</p>
                        <p><strong>HSC:</strong> {candidate.hsc}%</p>
                        <p><strong>SSLC:</strong> {candidate.sslc}%</p>
                        <p><strong>Experience:</strong> {candidate.experience} years</p>
                    </div>
                    <div className="resume-download">
                        <a
                            href={`http://localhost:5000/${candidate.resume}`}
                            download={candidate.resume}
                            className="btn btn-primary"
                        >
                            View Resume
                        </a>
                    </div>
                </div>
            ) : (
                <p>Loading candidate details...</p>
            )}
        </div>
    );
}
