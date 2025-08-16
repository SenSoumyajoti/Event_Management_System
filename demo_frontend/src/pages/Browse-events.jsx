import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

const BrowseEvents = () => {
  // Sample event data
  const [events, setEvents] = useState([
    // {
    //   id: 1,
    //   title: "Kolkata Music Festival",
    //   description: "Annual music festival featuring top artists from across India",
    //   category: "Music",
    //   date: "2023-11-15",
    //   location: "Nicco Park, Kolkata",
    //   price: 500,
    //   image: "https://source.unsplash.com/random/300x200/?concert"
    // },
    // {
    //   id: 2,
    //   title: "Eden Gardens Cricket Match",
    //   description: "IPL match between Kolkata Knight Riders and Mumbai Indians",
    //   category: "Sports",
    //   date: "2023-11-20",
    //   location: "Eden Gardens, Kolkata",
    //   price: 1500,
    //   image: "https://source.unsplash.com/random/300x200/?cricket"
    // },
    // {
    //   id: 3,
    //   title: "Tech Summit 2023",
    //   description: "Annual technology conference with industry leaders",
    //   category: "Tech",
    //   date: "2023-12-05",
    //   location: "Biswa Bangla Convention Centre",
    //   price: 2000,
    //   image: "https://source.unsplash.com/random/300x200/?tech"
    // },
    // {
    //   id: 4,
    //   title: "Art Exhibition",
    //   description: "Contemporary art exhibition by local artists",
    //   category: "Art",
    //   date: "2023-11-25",
    //   location: "Victoria Memorial, Kolkata",
    //   price: 200,
    //   image: "https://source.unsplash.com/random/300x200/?art"
    // },
    // {
    //   id: 5,
    //   title: "Food Festival",
    //   description: "Taste cuisines from around the world",
    //   category: "Food",
    //   date: "2023-12-10",
    //   location: "City Centre, Salt Lake",
    //   price: 300,
    //   image: "https://source.unsplash.com/random/300x200/?food"
    // },
    // {
    //   id: 6,
    //   title: "Heritage Walk",
    //   description: "Guided tour of Kolkata's historic landmarks",
    //   category: "Travel",
    //   date: "2023-11-30",
    //   location: "North Kolkata",
    //   price: 150,
    //   image: "https://source.unsplash.com/random/300x200/?heritage"
    // }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    priceRange: ''
  });

  // Filtered events
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Apply filters
  useEffect(() => {
    let result = events;
    
    if (filters.category) {
      result = result.filter(event => event.category === filters.category);
    }
    
    if (filters.date) {
      result = result.filter(event => event.date === filters.date);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(event => event.price >= min && event.price <= max);
    }
    
    setFilteredEvents(result);
  }, [filters, events]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      date: '',
      priceRange: ''
    });
  };

  return (<>
  {/* <Header minimal={true}/> */}
    <Container className="my-5">
        
      <h1 className="text-center mb-4">Browse Events</h1>
      
      {/* Filter Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Filter Events</h5>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                  <option value="Art">Art</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Price Range</Form.Label>
                <Form.Select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Price</option>
                  <option value="0-500">Under ₹500</option>
                  <option value="501-1500">₹501 - ₹1500</option>
                  <option value="1501-5000">₹1501 - ₹5000</option>
                  <option value="5001-10000">Over ₹5000</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end mt-3">
            <Button 
              variant="outline-secondary" 
              onClick={resetFilters}
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Events Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Col key={event.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={event.image} 
                  alt={event.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>{event.title}</Card.Title>
                    <Badge bg="primary">{event.category}</Badge>
                  </div>
                  <Card.Text className="text-muted small mb-2">
                    <i className="bi bi-calendar me-2"></i>
                    {new Date(event.date).toLocaleDateString('en-IN', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Card.Text>
                  <Card.Text className="text-muted small mb-2">
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.location}
                  </Card.Text>
                  <Card.Text className="mb-3">
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">₹{event.price}</span>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4>No events found matching your filters</h4>
            <Button variant="outline-primary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </Col>
        )}
      </Row>
    </Container></>
  );
};

export default BrowseEvents;