import axios from "axios";
import "./Placed.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap"; // Import Bootstrap components

export default function Placed() {
  const { email } = useParams();
  const [data, setData] = useState("Loading..."); // Default loading message
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/getplaced?email=${email}`);
      setData(res.data.message);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch placement details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [email]);

  if (error) {
    return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  }

  return (
    <div className="container1 text-center mt-5">
      {data === "Loading..." ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Alert variant={data.includes("placed") ? "success" : "info"}>{data}</Alert>
      )}
    </div>
  );
}
