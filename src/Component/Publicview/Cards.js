import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Button,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cards.css";
import { getAllInterview } from "../../Server/InterviewServer";

/**
 * Cards Component - Displays a list of upcoming interviews with filtering, sorting, and pagination.
 */
const Cards = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter state
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const navigate = useNavigate();

  // Extract unique filter values
  const allLocations = [...new Set(fullData.map(item => item.location).filter(Boolean))];
  const allJobTitles = [...new Set(fullData.map(item => item.jobTitle).filter(Boolean))];
  const allDurations = [...new Set(fullData.map(item => item.duration).filter(Boolean))];
  const allExperiences = [...new Set(fullData.map(item => item.experience).filter(Boolean))];

  // Fetch and filter data on dependency change
  useEffect(() => {
    fetchInterviews();
  }, [searchTerm, selectedLocations, selectedJobTitle, selectedDuration, selectedExperience, sortOrder]);

  const fetchInterviews = async () => {
    try {
      const response = await getAllInterview();
      let data = response;
      setFullData(data);

      // Apply filters
      if (selectedLocations.length)
        data = data.filter(d => selectedLocations.includes(d.location));
      if (selectedJobTitle.length)
        data = data.filter(d => selectedJobTitle.includes(d.jobTitle));
      if (selectedDuration.length)
        data = data.filter(d => selectedDuration.includes(d.duration));
      if (selectedExperience.length)
        data = data.filter(d => selectedExperience.includes(d.experience));

      // Search
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        data = data.filter(
          d =>
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

  const clearFilters = () => {
    setSelectedLocations([]);
    setSelectedJobTitle([]);
    setSelectedDuration([]);
    setSelectedExperience([]);
    setSearchTerm("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interviewData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(interviewData.length / itemsPerPage);

  // Pagination component for filter lists
  const paginate = (items, page, perPage = 5) => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  };

  // Main Render
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

      <Row>
        {/* Filters */}
        <Col md={3}>
          <FilterGroup
            title="Location"
            items={allLocations}
            selectedItems={selectedLocations}
            setSelectedItems={setSelectedLocations}
          />
          <FilterGroup
            title="Job Title"
            items={allJobTitles}
            selectedItems={selectedJobTitle}
            setSelectedItems={setSelectedJobTitle}
          />
          <FilterGroup
            title="Duration"
            items={allDurations}
            selectedItems={selectedDuration}
            setSelectedItems={setSelectedDuration}
          />
          <FilterGroup
            title="Experience"
            items={allExperiences}
            selectedItems={selectedExperience}
            setSelectedItems={setSelectedExperience}
          />
        </Col>

        {/* Main Cards + Search */}
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
            {loading ? (
              <p className="text-muted">Loading interviews...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : currentItems.length === 0 ? (
              <div className="text-muted px-3">No interviews found.</div>
            ) : (
              currentItems.map((item) => {
                const isExpired = new Date(item.date) < new Date().setHours(0, 0, 0, 0);
                return (
                  <Col key={item.id} lg={12} className="mb-3">
                    <Card
                      className={`w-100 border ${isExpired ? "border-danger" : "border-success"} card-hover`}
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
                          <p className="mb-1 text-muted">{item.location}</p>
                          <p className="mb-1">{item.duration} | {item.experience}</p>
                          <p className="mb-0 text-muted">{item.date}</p>
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

          {/* Pagination Controls */}
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

/**
 * FilterGroup - Reusable filter block with checkbox items.
 */
const FilterGroup = ({ title, items, selectedItems, setSelectedItems }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="mb-4">
      <h5>{title}</h5>
      {paginatedItems.map((item, idx) => (
        <Form.Check
          key={idx}
          type="checkbox"
          label={item}
          checked={selectedItems.includes(item)}
          onChange={() =>
            setSelectedItems((prev) =>
              prev.includes(item)
                ? prev.filter((val) => val !== item)
                : [...prev, item]
            )
          }
        />
      ))}
      {totalPages > 1 && (
        <div className="d-flex gap-2 mt-2">
          <Button size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </Button>
          <span style={{ fontSize: "0.8rem" }}>Page {page} of {totalPages}</span>
          <Button size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cards;
