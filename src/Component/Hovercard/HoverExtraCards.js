import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './hoverextracards.css';

const HoverExtraCards = () => {
  // Data for each card
  const cardData = [
    {
      id: 1,
      title: "Inquiry type",
      content: " Whether the inquiry is about a student, candidate, or other topic.",
    },
    {
      id: 2,
      title: "Inquiry source",
      content: "Whether the inquiry came from email, phone, social media, or another channel.",
    },
    {
      id: 3,
      title: "Inquiry status",
      content: "Whether the inquiry has been responded to, is being tracked, or is still pending.",
      extra: "Supreat Supreat Content 3"
    }
  ];

  return (
    <Container className="mt-4">
      <Row>
        {cardData.map(card => (
          <Col key={card.id} md={4} className="mb-4">
            <Card className="hover-box border-0">
              <Card.Body>
                <Card.Title style={{color:"gray"}}>{card.title}</Card.Title>
                <Card.Text>{card.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HoverExtraCards;
