import React, { useState, useEffect } from "react";
import {
  Card, Container, Row, Col, Form, Pagination, Button, Dropdown, ButtonGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Cards.css';

const Cards = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [response, setResponse] = useState("");
  const [fullData, setFullData] = useState([]);


  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const allLocations = [...new Set(fullData.map(item => item.location).filter(Boolean))].sort();
  const allJobTitles = [...new Set(fullData.map(item => item.jobTitle).filter(Boolean))].sort();
  const allDurations = [...new Set(fullData.map(item => item.duration).filter(Boolean))].sort();
  const allExperiences = [...new Set(fullData.map(item => item.experience).filter(Boolean))].sort();
  
  

  const buildQueryParams = () => {
    const params = new URLSearchParams();
  
    if (searchTerm) params.append("search", searchTerm);
    if (selectedLocations.length) params.append("locations", selectedLocations.join(","));
    if (selectedJobTitle.length) params.append("job_titles", selectedJobTitle.join(","));
    if (selectedDuration.length) params.append("durations", selectedDuration.join(","));
    if (selectedExperience.length) params.append("experiences", selectedExperience.join(","));
  
    return params.toString();
  };

  useEffect(() => {
    fetchInterviews();
  }, [response, searchTerm, selectedLocations, selectedJobTitle, selectedDuration, selectedExperience, sortOrder]);

  const fetchInterviews = async () => {
    try {
      const query = buildQueryParams();
      const response = await axios.get(`http://127.0.0.1:8000/interviews/?${query}`);
      let data = response.data;
  
      setFullData(data); // store the full data for filters
  
      // Apply filters
      if (selectedLocations.length) {
        data = data.filter(d => selectedLocations.includes(d.location));
      }
      if (selectedJobTitle.length) {
        data = data.filter(d => selectedJobTitle.includes(d.jobTitle));
      }
      if (selectedDuration.length) {
        data = data.filter(d => selectedDuration.includes(d.duration));
      }
      if (selectedExperience.length) {
        data = data.filter(d => selectedExperience.includes(d.experience));
      }
  
      // 🔍 Search filtering
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        data = data.filter(d =>
          d.jobTitle.toLowerCase().includes(term) ||
          d.location.toLowerCase().includes(term)
        );
      }
  
      // Sort
      data = data.sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
  
      setInterviewData(data);
      setCurrentPage(1);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  

  function filterData(response, selectedLocations, selectedJobTitle, selectedDuration, selectedExperience) {
    let data = response.data;
  
    if (selectedLocations.length) {
      data = data.filter(d => selectedLocations.includes(d.location));
    }
    if (selectedJobTitle.length) {
      data = data.filter(d => selectedJobTitle.includes(d.jobTitle));
    }
    if (selectedDuration.length) {
      data = data.filter(d => selectedDuration.includes(d.duration));
    }
    if (selectedExperience.length) {
      data = data.filter(d => selectedExperience.includes(d.experience));
    }
  
    return data;
  }
 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interviewData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(interviewData.length / itemsPerPage);
  
  const clearFilters = () => {
    setSelectedLocations([]);
    setSelectedJobTitle([]);
    setSelectedDuration([]);
    setSelectedExperience([]);
    setSearchTerm("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
  <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary p-3 rounded flex-wrap gap-2">
    <h3 style={{ color: "white" }}>Get Upcoming Interviews</h3>
    
    <div className="d-flex align-items-center gap-2">
      <Dropdown as={ButtonGroup}>
        <Button variant="light">Sort by</Button>
        <Dropdown.Toggle split variant="light" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortOrder("newest")}>Newest First</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOrder("oldest")}>Oldest First</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="outline-light" onClick={clearFilters}>Clear Filters</Button>

    </div>
  </div>

      {/* Filters */}
      <Row>
        <Col md={3}>
          <h5>Location</h5>
          {allLocations.map((loc, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              label={loc}
              checked={selectedLocations.includes(loc)}
              onChange={() =>
                setSelectedLocations((prev) =>
                  prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
                )
              }
            />
          ))}

          <h5 className="mt-3">Job Title</h5>
          {allJobTitles.map((title, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              label={title}
              checked={selectedJobTitle.includes(title)}
              onChange={() =>
                setSelectedJobTitle((prev) =>
                  prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
                )
              }
            />
          ))}

          <h5 className="mt-3">Duration</h5>
          {allDurations.map((dur, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              label={dur}
              checked={selectedDuration.includes(dur)}
              onChange={() =>
                setSelectedDuration((prev) =>
                  prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
                )
              }
            />
          ))}

          <h5 className="mt-3">Experience</h5>
          {allExperiences.map((exp, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              label={exp}
              checked={selectedExperience.includes(exp)}
              onChange={() =>
                setSelectedExperience((prev) =>
                  prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
                )
              }
            />
          ))}
        </Col>

        <Col md={9}>
          <Form className="mb-4">
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <span className="input-group-text"><FaSearch /></span>
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
              currentItems.map((item) => {
                const isExpired = new Date(item.date) < new Date().setHours(0, 0, 0, 0);
                return (
                  <Col key={item.id} lg={12} className="mb-3">
                  <Card
                    className={`w-100 border ${
                      isExpired ? "border-danger" : "border-success"
                    } card-hover`}
                    style={{ cursor: isExpired ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (!isExpired) navigate(`/apply/${item.id}`);
                    }}
                  >
                      <Card.Body className="d-flex align-items-center">
                        <img
                          src={`http://127.0.0.1:8000/static/${item.logo_filename}`}
                          alt="logo"
                          style={{ width: 100, height: 100, objectFit: "contain", marginRight: "1rem" }}
                        />
                        <div className="flex-grow-1">
                          <h5>{item.company}</h5>
                          <p className="mb-1"><strong>{item.jobTitle}</strong></p>
                          <p className="mb-1 text-muted"> {item.location}</p>
                          <p className="mb-1"> {item.duration} |  {item.experience}</p>
                          <p className="mb-0 text-muted"> {item.date}</p>
                          <p className="mb-1" style={{ fontSize: "0.9rem", maxHeight: "3rem", overflow: "hidden" }}>
                            {item.details}
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>

          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
