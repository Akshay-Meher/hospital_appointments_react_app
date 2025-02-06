import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-light py-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <img
                            src="/api/placeholder/40/40"
                            alt="Prescripto Logo"
                            className="mb-3"
                        />
                        <p className="text-muted small">
                            Lorem ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem ipsum has been the industry's standard dummy text
                            ever since the 1500s.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5 className="mb-4">COMPANY</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About us</Nav.Link>
                            <Nav.Link href="#contact">Contact us</Nav.Link>
                            <Nav.Link href="#privacy">Privacy policy</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={4}>
                        <h5 className="mb-4">GET IN TOUCH</h5>
                        <p className="mb-2">+1-222-456-7890</p>
                        <p>greentechnologies@gmail.com</p>
                    </Col>
                </Row>
                <hr className="my-4" />
                <p className="text-center text-muted small mb-0">
                    Copyright © 2024 GreenStack - All Right Reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
