import React, { useState, useEffect } from 'react';
import api from '../api';
// import OpenAI from "openai";




// Main App component
const Home = () => {
   
    // State for generated event ideas
    const [eventIdeas, setEventIdeas] = useState('');
    // State for loading indicator
    const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
    // State for error message
    const [ideaError, setIdeaError] = useState(false);

   

    // Function to handle chatgpt API call for event ideas
 const generateEventIdeas = async () => {
    setIsLoadingIdeas(true);
    setIdeaError(false);
    try {
    const response = await api.post('generate-ideas/');
    
    const data = response.data;
    setEventIdeas(data.ideas.split('\n').map((line, i) => <p key={i}>{line}</p>));
} catch (error) {
        setIdeaError(true);
    console.error("Failed to generate ideas:", error);
  }finally{
    setIsLoadingIdeas(false);
  }
};

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Bootstrap CSS CDN */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
            {/* Custom font for a modern look (Inter) - Optional, Bootstrap uses its own font stack */}
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f8fafc; /* Light background */
                }
                .genre-image {
                    width: 100%;
                    height: 150px; /* Fixed height for consistency */
                    object-fit: cover; /* Cover the area, cropping if necessary */
                }
                `}
            </style>

            {/* Navbar */}
            {/* <Header/> */}

            {/* Main Content Area */}
            <main className="container flex-grow-1 py-5">

                {/* Hero Section & Search Bar */}
                <section className="text-center my-5">
                    <h1 className="display-4 fw-bold text-dark mb-4">Discover Unforgettable Experiences</h1>
                    <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>Find your next adventure, from concerts and sports to workshops and conferences.</p>

                    {/* Search Bar (Middle of the page) */}
                    <div className="input-group mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                        <input
                            type="text"
                            id="event-search-input"
                            placeholder="Search for events, artists, venues..."
                            className="form-control form-control-lg rounded-start-pill"
                            aria-label="Search events"
                        />
                        <button className="btn btn-primary btn-lg rounded-end-pill d-flex align-items-center" type="button" id="search-button">
                            <svg className="me-2" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            Search
                        </button>
                    </div>

                    {/* Gemini API Feature: Event Idea Generator */}
                    <div className="mt-5">
                        <button
                            id="generate-ideas-button"
                            onClick={generateEventIdeas}
                            className="btn btn-info btn-lg rounded-pill shadow-lg"
                        >
                            ✨ Generate Event Ideas
                        </button>
                        {(isLoadingIdeas || eventIdeas || ideaError) && (
                            <div id="event-ideas-output" className="card mt-4 mx-auto" style={{ maxWidth: '700px' }}>
                                <div className="card-body text-start">
                                    <h3 className="card-title h4 mb-3">Fresh Event Ideas for You!</h3>
                                    <div id="ideas-content" className="text-muted">
                                        {isLoadingIdeas && (
                                            <div id="loading-indicator" className="text-center text-info my-4">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="mt-2">Generating ideas...</p>
                                            </div>
                                        )}
                                        {ideaError && (
                                            <div id="error-message" className="text-center text-danger my-4">
                                                <p>Oops! Something went wrong while generating ideas. Please try again.</p>
                                            </div>
                                        )}
                                        {!isLoadingIdeas && !ideaError && eventIdeas}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Genre Section */}
                <section className="my-5">
                    <h2 className="display-5 fw-bold text-dark text-center mb-5">Explore Events by Genre</h2>
                    <div className="row g-4">
                        {/* Music Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/music.jpg" className="card-img-top genre-image" alt="Music Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title"> Music</h3>
                                    <p className="card-text text-muted">Concerts, festivals, live bands</p>
                                </div>
                            </div>
                        </div>

                        {/* Sports Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/sports.jpg" className="card-img-top genre-image" alt="Sports Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title"> Sports</h3>
                                    <p className="card-text text-muted">Matches, tournaments, athletic events</p>
                                </div>
                            </div>
                        </div>

                        {/* Arts & Culture Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/workshop1.jpg" className="card-img-top genre-image" alt="Arts & Culture Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title"> Arts & Culture</h3>
                                    <p className="card-text text-muted">Exhibitions, theater, dance, museums</p>
                                </div>
                            </div>
                        </div>

                        {/* Food & Drink Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/food.jpg" className="card-img-top genre-image" alt="Food & Drink Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title"> Food & Drink</h3>
                                    <p className="card-text text-muted">Festivals, tastings, culinary workshops</p>
                                </div> {/* This was the missing closing div */}
                            </div>
                        </div>

                        {/* Technology Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/conferencetech.jpg" className="card-img-top genre-image" alt="Technology Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title">💻 Technology</h3>
                                    <p className="card-text text-muted">Conferences, hackathons, tech talks</p>
                                </div>
                            </div>
                        </div>

                        {/* Conferences Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="" className="card-img-top genre-image" alt="Conferences" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title">🗣️ Conferences</h3>
                                    <p className="card-text text-muted">Business, academic, networking events</p>
                                </div>
                            </div>
                        </div>

                        {/* Workshops Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="/workshop.jpg" className="card-img-top genre-image" alt="Workshops" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title">🛠️ Workshops</h3>
                                    <p className="card-text text-muted">Skill-building, creative, hands-on</p>
                                </div>
                            </div>
                        </div>

                        {/* Family Genre Card */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm h-100 cursor-pointer">
                                <img src="https://placehold.co/400x300/FFC0CB/FFFFFF?text=Family+Fun" className="card-img-top genre-image" alt="Family Events" />
                                <div className="card-body text-center">
                                    <h3 className="h5 card-title">👨‍👩‍👧‍👦 Family</h3>
                                    <p className="card-text text-muted">Kid-friendly, community gatherings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-dark text-white py-5 mt-auto">
                <div className="container">
                    <div className="row">
                        {/* About Us */}
                        <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
                            <h3 className="h5 text-info mb-3">About EventSphere</h3>
                            <p className="small text-muted text-white-50">Your one-stop platform for discovering and managing events. We connect people with unforgettable experiences.</p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
                            <h3 className="h5 text-info mb-3">Quick Links</h3>
                            <ul className="list-unstyled small">
                                <li><a href="#aboutus" className="text-white-50 text-decoration-none hover-link">About Us</a></li>
                                <li><a href="#contactus" className="text-white-50 text-decoration-none hover-link">Contact Us</a></li>
                                <li><a href="#faq" className="text-white-50 text-decoration-none hover-link">Help & FAQs</a></li>
                                <li><a href="#tos" className="text-white-50 text-decoration-none hover-link">Terms of Service</a></li>
                                <li><a href="#privacypolicy" className="text-white-50 text-decoration-none hover-link">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Connect With Us */}
                        <div className="col-md-4 text-center text-md-start">
                            <h3 className="h5 text-info mb-3">Connect With Us</h3>
                            <div className="d-flex justify-content-center justify-content-md-start mb-3">
                                <a href="www.x.com" className="text-white-50" aria-label="Twitter">
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                         <path d="M8.29 20.25c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.36-.01-.54a8.35 8.35 0 0 0 2.05-2.13 8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6.99 4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.46-4.3 4.1 4.1 0 0 0 1.27 5.48 4.07 4.07 0 0 1-1.86-.52 4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85 8.23 8.23 0 0 1-5.1 1.84"/>
                                    </svg>
                                </a>
                                <a href="www.facebook.com" className="text-white-50">
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10S17.523 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="www.instagram.com" className="text-white-50 me-2">
                                   <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                  </a>
                                <a href="www.linkedin.com" height="24" width="24" className="fab fa-linkedin">
                                   <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                     
                                    </svg>
                                  </a>
                            </div>
                            <p className="small text-muted">&copy; 2025 EventSphere. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Bootstrap Bundle with Popper */}
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossOrigin="anonymous"
            ></script>
        </div>
    );
};

export default Home;
