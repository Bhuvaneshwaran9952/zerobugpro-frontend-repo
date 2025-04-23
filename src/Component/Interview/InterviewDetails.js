import React from 'react';
import { useParams } from 'react-router-dom';
import googleimg from "../../Images/google.jpg"
import itimg from "../../Images/It.png"
import neotericimg from "../../Images/neoteric.jpg"

const interviewData = [
  {
    id: 1,
    logo: googleimg,
    company: "Google",
    jobTitle: "Frontend Developer",
    date: "2025-05-12",
    contact: "0000000000 (or) abc@gmail.com",
    location: "Gundiy",
    details: "Online technical round followed by HR interview.",
    informaction: "Google interviews include data structures, algorithms, system design, and cultural fit."
  },
  {
    id: 2,
    logo: itimg,
    company: "Microsoft",
    jobTitle: "Software Engineer",
    date: "2025-05-15",
    contact: "0000000000 (or) abc@gmail.com",
    location: "Velachery",
    details: "Initial coding round, then 2 technical panels.",
    informaction: "Microsoft focuses on OOPs, .NET tech stack, and problem-solving."
  },
  {
    id: 3,
    logo: neotericimg,
    company: "Amazon",
    jobTitle: "Backend Developer",
    date: "2025-05-18",
    contact: "0000000000 (or) abc@gmail.com",
    location: "Pallikarnai",
    details: "Aptitude test followed by behavioral interview.",
    informaction: "Amazon emphasizes leadership principles and customer obsession."
  }
];

const InterviewDetails = () => {
  const { id } = useParams();
  const interview = interviewData.find(item => item.id === parseInt(id));

  if (!interview) return <p>Interview not found</p>;
  

  return (
    <div className="container mt-4">
      <img src={interview.logo} alt={interview.company} style={{ height: "120px" }} />
      <h2>{interview.company}</h2>
      <h4>{interview.jobTitle}</h4>
      <p><strong className='me-2'>Date:</strong> {interview.date}</p>
      <p><strong className='me-2'>Contact:</strong>{interview.contact}</p>
      <p><strong className='me-2'>Location:</strong>{interview.location}</p>
      <p><strong className='me-2'>Details:</strong> {interview.details}</p>
      <p><strong className='me-2'>Informaction:</strong> {interview.informaction}</p>
    </div>
  );
};

export default InterviewDetails;