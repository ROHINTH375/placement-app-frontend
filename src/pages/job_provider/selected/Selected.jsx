import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert, ListGroup, Card, Button } from "react-bootstrap";  // Importing Bootstrap components

export default function Selected() {
    const navigation = useNavigate()
    const { email } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/company/getselected?company=${email}`);
            setCandidates(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch candidates");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [email]);

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    const handleView = (cemail) => {
        navigation(`/viewdetails/${cemail}`)
    }

    return (
        <div className="container mt-5">
            <Card>
                <Card.Header as="h2">Selected Candidates for {email}</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {candidates.length > 0 ? (
                            candidates.map((candidate) => (
                                <ListGroup.Item key={candidate._id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{candidate.username}</strong> - {candidate.status}
                                    </div>
                                    <Button variant="info" size="sm" onClick={()=>handleView(candidate.email)}>View Details</Button> {/* Add any actions here */}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No candidates selected yet.</ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}
