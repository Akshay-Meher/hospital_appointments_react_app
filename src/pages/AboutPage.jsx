import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';

import aboutImg from "../assets/assets_frontend/about_image.png"

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">


            {/* About Section */}
            <Container className="py-5">
                <h2 className="mb-4 text-center">ABOUT <span className="text-dark">US</span></h2>
                <Row className="align-items-center ">
                    <Col md={4}>
                        <img
                            src={aboutImg}
                            alt="Healthcare professionals"
                            className="img-fluid rounded-lg shadow"
                        />
                    </Col>
                    <Col md={6}>
                        <div className="mt-4 mt-md-0">
                            <p className="mb-4">
                                Welcome To Prescripto, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently.
                                At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor
                                Appointments And Managing Their Health Records.
                            </p>
                            <p className="mb-4">
                                Prescripto Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our
                                Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service.
                                Whether You're Booking Your First Appointment Or Managing Ongoing Care, Prescripto Is Here To Support You
                                Every Step Of The Way.
                            </p>
                            <div className="mt-5">
                                <h3 className="mb-3">Our Vision</h3>
                                <p>
                                    Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The
                                    Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When
                                    You Need It.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Why Choose Us Section */}
            <Container className="py-5">
                <h2 className="mb-5">WHY <span className="text-dark">CHOOSE US</span></h2>
                <Row>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                            <Card.Body className="p-4">
                                <h4 className="mb-3">EFFICIENCY:</h4>
                                <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <h4 className="mb-3">CONVENIENCE:</h4>
                                <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <h4 className="mb-3">PERSONALIZATION:</h4>
                                <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutPage;