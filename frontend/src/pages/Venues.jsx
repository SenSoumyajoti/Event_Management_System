import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header  from '../components/Header';

const venues = [
  {
    name: "Music Events",
    description: "Kolkata's Nicco Park hosts various concerts and music festivals throughout the year, featuring both local and international artists.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrV7ohlAa2KXuK8GydnmbZ6k9cdZpG1EvGPLod5nijGmS3ypYQY58H2yJoy9Ih3_h_aOZKJR_F22QDpwWGy6Cpf0wr39THrFHaiQtbOtv5CNaMInZB3Qg2lwh38Xu2lwZuya2Gs=s1360-w1360-h1020-rw",
    location: "Nicco Park, Kolkata"
  },
  {
    name: "Sports Events",
    description: "Eden Gardens, Kolkata, is a prominent cricket stadium and often hosts major cricket matches and tournaments, as well as other sporting events.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrxSbeNwtvIiE2Tr8riJrYvxWYL7MmDGi3jwGbrWYs2WvVSKG0wPCLuVzVq4Owc6Xqs3-jUgL8_kcMCPWuBAcGencXVeLIupXM1Do1QxB4Y0aB-BiVFaAThcUfl4KYqs8rRX21nQw=s1360-w1360-h1020-rw",
    location: "Eden Gardens, Kolkata"
  },
  {
    name: "Arts & Culture Events",
    description: "Victoria Memorial, Kolkata, is a hub for arts and culture, hosting exhibitions, theatrical performances, and other cultural events.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqeuPSYRO6PydDZ9ozerudT_CmfnFgCpGbWZ3KjCQmt7AUj-Kh5EBntgrb5Fb4kb1UX3I6UWn95kTPkCXhng-89KpY2bQjOFIHrzaKbfRCkhaWkx1N_OuRVSGMABPXL2iHIsVqn=s1360-w1360-h1020-rw",
    location: "Victoria Memorial, Kolkata"
  },
  {
    name: "Food & Drink Events",
    description: "The City Centre, Salt Lake, Kolkata area often features food festivals and culinary workshops, showcasing a variety of cuisines.",
    image: "https://lh3.googleusercontent.com/p/AF1QipPyHNxPEjICJm4IQCD2E3p_I-SG7Oo1x12Di3gI=s1360-w1360-h1020-rw",
    location: "City Centre, Salt Lake, Kolkata"
  },
  {
    name: "Technology Events",
    description: "IEM (Institute of Engineering and Management), Kolkata, is known for its technology-focused events like hackathons and tech talks.",
    image: "https://img.collegepravesh.com/2018/11/IEM-Kolkata.jpg",
    location: "IEM Kolkata"
  },
  {
    name: "Conferences",
    description: "The Biswa Bangla Convention Centre, Kolkata, is a venue that hosts various conferences, business events, and networking opportunities.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrhflQx1fFng2M6OrIAqE7GzerMarQpnVkMvwcA1cwDf8Xw5dYzz15AtZgGJwFfFSDh9uvn2w5LmKOoAOG8XdpbGFSV18Wld_mON7su6Ep1gijKha74nVT0UiAACtRP-QFssSaf=s1360-w1360-h1020-rw",
    location: "Biswa Bangla Convention Centre, Kolkata"
  },
  {
    name: "Workshops",
    description: "Kala Bhavan, Santiniketan, is renowned for its art and craft workshops, providing hands-on learning experiences in various creative fields.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npKJoxwCoYCZVkpKzX76btBh8_jtdUlN6Ww8dZx93FDRkja1EOBxniDGERHQabVrmn94JZYUYvOuDoqUjtsVDnrXoLorwkbtZ4M6sb8hVeGi-X-iTHh8s6uuQjIXXLVOnOd775c=s1360-w1360-h1020-rw",
    location: "Kala Bhavan, Santiniketan"
  },
  {
    name: "Family Events",
    description: "The Marble Palace Mansion, Kolkata, offers a fun and engaging environment for families with its royal collection and family-friendly activities.",
    image: "/public/marbel_palace.jpg",
    location: "The Marble Palace Mansion, Kolkata"
  }
];

const Venues = () => {
  const handleCardClick = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  return (<>
  {/* <Header minimal={true} /> */}
    <Container className="my-5">
      <h1 className="text-center mb-4">Popular Venues in Kolkata For Events</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {venues.map((venue, index) => (
          <Col key={index}>
            <Card 
              className="h-100 shadow-sm" 
              onClick={() => handleCardClick(venue.location)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Img 
                variant="top" 
                src={venue.image} 
                alt={venue.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                Click to view on map
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container></>
  );
};

export default Venues;