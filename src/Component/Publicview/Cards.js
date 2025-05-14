import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, Pagination, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Filter
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  // filterpaginaction
  const [locationPage, setLocationPage] = useState(1); 
  const [jobTitlePage, setJobTitlePage] = useState(1);
  const [durationPage, setDurationPage] = useState(1);
  const [experiencePage, setExperiencePage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/interviews/");
        setInterviewData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const locations = [...new Set(interviewData.map(item => item.location).filter(Boolean))];
  const jobTitle = [...new Set(interviewData.map(item => item.jobTitle).filter(Boolean))];
  const duration = [...new Set(interviewData.map(item => item.duration).filter(Boolean))];
  const experience = [...new Set(interviewData.map(item => item.experience).filter(Boolean))];

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = interviewData.filter((item) => {
      const matchesSearch =
        item.jobTitle.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term);

      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.includes(item.location);

      const matchesJobTitle =
        selectedJobTitle.length === 0 || selectedJobTitle.includes(item.jobTitle);

      const matchesDuration =
        selectedDuration.length === 0 || selectedDuration.includes(item.duration);

      const matchesExperience =
        selectedExperience.length === 0 || selectedExperience.includes(item.experience);

      return (
        matchesSearch && matchesLocation && matchesJobTitle && matchesDuration && matchesExperience
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedLocations, selectedJobTitle, selectedDuration, selectedExperience, interviewData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // location pagination
  const locationItemsPerPage = 5;
  const totalLocationPages = Math.ceil(locations.length / locationItemsPerPage);

  const indexOfLastLocation = locationPage * locationItemsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationItemsPerPage;
  const currentLocationPageItems = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  // jobTitle pagibation
  const jobTitleItemsPerPage = 5;
  const totalJobTitlePages = Math.ceil(jobTitle.length /jobTitleItemsPerPage);

  const indexOfLastJobTitle = jobTitlePage * jobTitleItemsPerPage;
  const indexOfFirstJobTitle = indexOfLastJobTitle - jobTitleItemsPerPage;
  const currentJobTitlePageItems = jobTitle.slice(indexOfFirstJobTitle,indexOfLastJobTitle );

  // duration pagination
  const durationItemsPerPage = 5;
  const totalDurationPages = Math.ceil(duration.length / durationItemsPerPage);
   
  const indexOfLastDuration = durationPage * durationItemsPerPage;
  const indexOfFirstDuration = indexOfLastDuration - durationItemsPerPage;
  const currentDurationPageItems = duration.slice(indexOfFirstDuration, indexOfLastDuration);

  // experience pagination
  const experienceItemsPerPage = 5;
  const totalExperiencePages = Math.ceil(experience.length / experienceItemsPerPage);

  const indexOfLastExperience = experiencePage * experienceItemsPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experienceItemsPerPage;
  const currentExperiencePageItems = experience.slice(indexOfFirstExperience, indexOfLastExperience);
  
  // filters
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location]
    );
  };

  const handleJobTitleChange = (jobTitle) => {
    setSelectedJobTitle((prev) =>
      prev.includes(jobTitle) ? prev.filter((title) => title !== jobTitle) : [...prev, jobTitle]
    );
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration((prev) =>
      prev.includes(duration) ? prev.filter((dur) => dur !== duration) : [...prev, duration]
    );
  };

  const handleExperienceChange = (experience) => {
    setSelectedExperience((prev) =>
      prev.includes(experience) ? prev.filter((exp) => exp !== experience) : [...prev, experience]
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary p-3 rounded">
        <h3 style={{ color: "white" }}>Get Upcoming Interviews</h3>
      </div>

      {/* Filters */}
      <Row>
        <h5 style={{ color: "orange" }}>All Filters</h5>

        <Col md={3}>
          <h5>Filter by Location</h5>
          <Form>
            {currentLocationPageItems.map((loc, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={loc}
                checked={selectedLocations.includes(loc)}
                onChange={() => handleLocationChange(loc)}
              />
            ))}
          </Form>

          {/* Pagination for Location Filter */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setLocationPage((prev) => Math.max(prev - 1, 1))}
              disabled={locationPage === 1}
            >
              Prev
            </button>
            <small>Page {locationPage} of {totalLocationPages}</small>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setLocationPage((prev) => Math.min(prev + 1, totalLocationPages))}
              disabled={locationPage === totalLocationPages}
            >
              Next
            </button>
          </div>

          <h5 className="mt-4">Filter by JobTitle</h5>
          <Form>
            {currentJobTitlePageItems.map((title, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={title}
                checked={selectedJobTitle.includes(title)}
                onChange={() => handleJobTitleChange(title)}
              />
            ))}
          </Form>

        {/* Pagination for jobtitle Filter */}  
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button className="btn btn-sm btn-outline-secondary"
          onClick={() =>setJobTitlePage((prev)=>Math.max(prev - 1,  1))}
          disabled= {jobTitlePage === 1}>
            Prev
          </button>
          <small>Page {jobTitlePage} of {totalJobTitlePages}</small>
          <button className="btn btn-sm btn-outline-secondary"
          onClick={() =>setJobTitlePage((prev) =>Math.min(prev + 1, totalJobTitlePages))}
          disabled={jobTitlePage === totalJobTitlePages}>
            Next
          </button>
        </div>

         <h5 className="mt-4">Filter by Duration</h5>
          <Form>
            {currentDurationPageItems.map((dur, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={dur}
                checked={selectedDuration.includes(dur)}
                onChange={() => handleDurationChange(dur)}
              />
            ))}
          </Form>

          {/* Pagination for duration Filter */}  
          <div className="d-flex justify-content-between align-item-center mt-2">
            <button className="btn btn-sm btn-outline-secondary"
            onClick={() => setDurationPage ((prev) => Math.max(prev - 1, 1))}
            disabled={durationPage === 1}>
              prev
            </button>
            <small>Page {durationPage} of {totalDurationPages}</small>
            <button className="btn btn-sm btn-outline-secondary"
              onClick={() => setDurationPage ((prev) => Math.min(prev + 1, totalDurationPages))}
              disabled={durationPage === totalDurationPages}>
                Next
            </button>
          </div>

          <h5>Filter by Experience</h5>
          <Form>
            {currentExperiencePageItems.map((exp, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={exp}
                checked={selectedExperience.includes(exp)}
                onChange={() => handleExperienceChange(exp)}
              />
            ))}
          </Form>
          {/* Pagination for Experience Filter */}  
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button className="btn btn-sm btn-outline-secondary"
            onClick={() => setExperiencePage((prev) => Math.max(prev -1, 1))}
            disabled={experiencePage === 1}>
              Prev
            </button>
            <small>Page {experiencePage} of {totalExperiencePages}</small>
            <button className="btn btn-sm btn-outline-secondary"
            onClick={() => setExperiencePage((prev) => Math.min(prev + 1, totalExperiencePages))}
            disabled={experiencePage === totalExperiencePages}>
              Next
            </button>
          </div>
        </Col>

        <Col md={9}>
          <Form className="mb-4">
            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Search by Job title or Location ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Form>

          <Row>
            {currentItems.length === 0 ? (
              <div className="text-muted px-3">No interviews found.</div>
            ) : (
              currentItems.map((item) => (
                <Col key={item.id} lg={12} className="mb-4 d-flex">
                  <Card
                    className={`interview-card w-100 ${
                      new Date(item.date) < new Date().setHours(0, 0, 0, 0) ? "expired-card" : ""
                    }`}
                    onClick={() => {
                      const isExpired = new Date(item.date) < new Date().setHours(0, 0, 0, 0);
                      if (!isExpired) {
                        navigate(`/apply/${item.id}`);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://127.0.0.1:8000/static/${item.logo_filename}`}
                      alt={`${item.company} Logo`}
                      style={{ height: "120px", objectFit: "contain", padding: "1rem" }}
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title>{item.company}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Date: {item.date}
                        </Card.Subtitle>
                        <h5 className="mb-2 text-muted">{item.jobTitle}</h5>
                        <p>
                          <strong className="text-muted">{item.location}</strong>
                        </p>
                        <Card.Text
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxHeight: "4.5rem",
                          }}
                        >
                          {item.details}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>

          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;