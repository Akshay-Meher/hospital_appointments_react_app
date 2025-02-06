import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import doctorImage from '../assets/assets_frontend/header_img.png';
import { doctors, specialityData } from '../assets/assets_frontend/assets';
import grpProfile from '../assets/assets_frontend/group_profiles.png'
import appointmentImg from "../assets/assets_frontend/appointment_img.png";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {

  useEffect(() => {
    console.log("jii");
  }, []);




  // Mock data for doctors
  const specialities = [
    { name: 'General physician', icon: '👨‍⚕️' },
    { name: 'Gynecologist', icon: '👩‍⚕️' },
    { name: 'Dermatologist', icon: '🧑‍⚕️' },
    { name: 'Pediatrician', icon: '👶' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Gastroenterologist', icon: '👨‍⚕️' },
  ];



  // const doctors = [
  //   {
  //     name: 'Dr. Richard James',
  //     specialty: 'General physician',
  //     available: true,
  //     image: '/api/placeholder/200/200'
  //   },
  //   // Repeat the same structure for other doctors
  // ];

  return (
    <div className="min-vh-100 container">

      {/* Hero Section */}
      <div className="bg-primary text-white mt-3 p-5 position-relative rounded">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Book Appointment<br />With Trusted Doctors</h1>
              <div className='d-flex flex-col md:flex-row justify-content-between align-items-center gap-2'>
                <img src={grpProfile} alt="" />
                <p className="mb-4">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
              </div>

              <Button variant="light" className="rounded-pill px-4">
                <Link to="/appointment">Book appointment →</Link>
              </Button>
            </Col>
            <Col md={6}>
              <img src={doctorImage} alt="Doctors" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Specialities Section */}
      <Container className="py-5">
        <h2 className="text-center mb-3">Find by Speciality</h2>
        <p className="text-center text-muted mb-5">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <Row className="justify-content-center">
          {specialityData.map((specialty, index) => (
            <Col key={index} xs={4} sm={2} className="text-center mb-4">
              <div className="bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                {/* <span style={{ fontSize: '2rem' }}>{specialty.icon}</span> */}
                <span>
                  <img src={specialty.image} alt="Specialty Icon" />
                </span>
              </div>
              <p className='p-1 mt-3'>{specialty.speciality}</p>
              {/* <small>{specialty.name}</small> */}
            </Col>
          ))}
        </Row>
      </Container>

      {/* Top Doctors Section */}
      <Container className="py-5">
        <h2 className="text-center mb-3">Top Doctors to Book</h2>
        <p className="text-center text-muted mb-5">Simply browse through our extensive list of trusted doctors.</p>
        <Row>
          {doctors.map((doctor, index) => (
            <Col key={index} md={4} lg={3} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Img style={{ backgroundColor: '#EAEFFF' }} className='img-fluid' variant="top" src={doctor.image} />
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                    <small className="text-success">Available</small>
                  </div>
                  <h5 className="mb-1">{doctor.name}</h5>
                  <small className="text-muted">{doctor.speciality}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="light" className="rounded-pill px-4">more</Button>
        </div>
      </Container>

      {/* Bottom CTA */}
      {/* <div className="bg-primary text-white p-5 mt-5 rounded">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">Book Appointment<br />With 100+ Trusted Doctors</h2>
              <Button variant="light" className="rounded-pill px-4">Create account</Button>
            </Col>
            <Col md={6}>
              <img src={appointmentImg} alt="Doctor" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div> */}

      <div className="bg-primary text-white p-5 mt-5 rounded">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="display-5 fw-bold mb-4">Book Appointment<br />With 100+ Trusted Doctors</h2>
              <Button variant="light" className="rounded-pill px-4">Create account</Button>
            </Col>
            <Col md={6} className="d-none d-md-block">
              {/* The image will be hidden on small screens */}
              <img
                src={appointmentImg}
                alt="Doctor"
                className="img-fluid"
                style={{ height: 'auto', maxHeight: '350px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      {/* <footer className="bg-light py-5">
        <Container>
          <Row>
            <Col md={4}>
              <img src="/api/placeholder/40/40" alt="Prescripto Logo" className="mb-3" />
              <p className="text-muted small">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.</p>
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
          <p className="text-center text-muted small mb-0">Copyright © 2024 GreenStack - All Right Reserved.</p>
        </Container>
      </footer> */}
    </div>
  );
};

export default Dashboard;




















// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       {/* Header Section */}
//       <header className="bg-primary text-white text-center py-5">
//         <div className="container">
//           <h1 className="fw-bold">Book Appointment With Trusted Doctors</h1>
//           <p className="mt-3">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//           <button className="btn btn-light btn-lg mt-3">Book Appointment</button>
//         </div>
//       </header>

//       {/* Specialities Section */}
//       <section className="py-5 bg-light text-center">
//         <div className="container">
//           <h2 className="fw-bold mb-4">Find by Speciality</h2>
//           <p className="mb-5">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//           <div className="row">
//             {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((speciality, index) => (
//               <div key={index} className="col-md-2 col-sm-4 col-6 mb-4">
//                 <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: "80px", height: "80px" }}>
//                   <span className="fs-5">{speciality.charAt(0)}</span>
//                 </div>
//                 <p className="mt-2 mb-0">{speciality}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Top Doctors Section */}
//       <section className="py-5">
//         <div className="container">
//           <h2 className="fw-bold text-center mb-4">Top Doctors to Book</h2>
//           <p className="text-center mb-5">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//           <div className="row">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
//                 <div className="card border-0 shadow-sm">
//                   <img src="https://via.placeholder.com/150" className="card-img-top" alt="Doctor" />
//                   <div className="card-body text-center">
//                     <span className="badge bg-success mb-2">Available</span>
//                     <h5 className="card-title mb-1">Dr. Richard James</h5>
//                     <p className="text-muted">General Physician</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-4">
//             <button className="btn btn-outline-primary">More</button>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-primary text-white text-center py-5">
//         <div className="container">
//           <h2 className="fw-bold">Book Appointment With 100+ Trusted Doctors</h2>
//           <button className="btn btn-light btn-lg mt-3">Create Account</button>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="bg-light py-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-4 mb-3">
//               <h5 className="fw-bold">Prescripto</h5>
//               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//             </div>
//             <div className="col-md-4 mb-3">
//               <h5 className="fw-bold">Company</h5>
//               <ul className="list-unstyled">
//                 <li><a href="#" className="text-muted">Home</a></li>
//                 <li><a href="#" className="text-muted">About Us</a></li>
//                 <li><a href="#" className="text-muted">Contact Us</a></li>
//                 <li><a href="#" className="text-muted">Privacy Policy</a></li>
//               </ul>
//             </div>
//             <div className="col-md-4 mb-3">
//               <h5 className="fw-bold">Get in Touch</h5>
//               <p className="text-muted">+1-212-456-7890<br />greatstackdev@gmail.com</p>
//             </div>
//           </div>
//           <p className="text-center text-muted mt-4">Copyright © 2024 GreatStack - All Right Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;












// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard;