import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap'; 
import {getInterviewById} from "../../Server/InterviewServer"

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const data = await getInterviewById(id);
        console.log("Fetched interview:", data);
        setInterview(data);
      } catch (err) {
        setError("Failed to fetch interview details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInterview();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!interview) return <p>No interview data found.</p>;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h2>{error}</h2>
        <Button variant="secondary" className="mt-3" onClick={() => navigate("/interviews")}>
          Back to Interviews
        </Button>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="container mt-5 text-center">
        <h2>Interview not found</h2>
        <Button variant="secondary" className="mt-3" onClick={() => navigate("/interviewcards")}>
          Back to Interviews
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="card mx-auto p-4 shadow-sm" style={{ maxWidth: "1000px", borderRadius: "1rem" }}>
        <div className="text-center">
          <img
            src={`http://127.0.0.1:8000/static/${interview.logo_filename}`} 
            alt={interview.company}
            style={{ height: "120px", objectFit: "contain", marginBottom: "1rem" }}
          />
          <h2 className="mb-1">{interview.company}</h2>
          <h5 className="text-muted">{interview.jobTitle}</h5>
        </div>

        <div className="mt-4">
          <p><strong className='text-muted'>Date:</strong> {interview.date}</p>
          <p><strong className='text-muted'>Contact:</strong> {interview.contact}</p>
          <p><strong className='text-muted'>Email:</strong> {interview.email}</p>
          <p><strong className='text-muted'>Skills:</strong> {interview.skills}</p>
          <p><strong className='text-muted'>Experience:</strong> {interview.experience}</p>
          <p><strong className='text-muted'>Duration:</strong> {interview.duration}</p>
          <p><strong className='text-muted'>Location:</strong> {interview.location}</p>
          <p><strong className='text-muted'>Details:</strong> {interview.details}</p>
          <p><strong className='text-muted'>About the job:</strong> {interview.information}</p>
        </div>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate("/interviewcards")}>
            Back to Interviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
