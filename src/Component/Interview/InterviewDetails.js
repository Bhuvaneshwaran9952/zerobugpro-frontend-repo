import React from 'react';
import { useParams } from 'react-router-dom';
import googleimg from "../../Images/google.jpg";
import itimg from "../../Images/It.png";
import neotericimg from "../../Images/neoteric.jpg";

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
    informaction:
      "Google interviews include data structures, algorithms, system design, and cultural fit.",
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
    informaction:
      "Microsoft focuses on OOPs, .NET tech stack, and problem-solving.",
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
    informaction:
      "Amazon emphasizes leadership principles and customer obsession.",
  },
];

const InterviewDetails = () => {
  const { id } = useParams();
  const interview = interviewData.find((item) => item.id === parseInt(id));

  if (!interview) return <p>Interview not found</p>;

  return (
    <div className="container mt-4 grid place-items-center">
      <div className="card w-full max-w-xl border-2 border-gray-200 rounded-2xl shadow-sm p-3 mb-3">
        <div className="flex flex-col items-center space-y-4">
        <img src={interview.logo} alt={interview.company} style={{ height: "120px" }} />
          <h2 className="text-2xl font-semibold">{interview.company}</h2>
          <h4 className="text-lg text-gray-700">{interview.jobTitle}</h4>
        </div>

        <div className="mt-6 space-y-2 text-base">
          <p>
            <strong className="me-2">Date:</strong> {interview.date}
          </p>
          <p>
            <strong className="me-2">Contact:</strong>
            {interview.contact}
          </p>
          <p>
            <strong className="me-2">Location:</strong>
            {interview.location}
          </p>
          <p>
            <strong className="me-2">Details:</strong> {interview.details}
          </p>
          <p>
            <strong className="me-2">Information:</strong> {interview.informaction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
