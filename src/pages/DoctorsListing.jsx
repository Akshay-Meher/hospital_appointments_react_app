import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const DoctorsListing = () => {
    const [activeSpecialty, setActiveSpecialty] = useState('General physician');

    const specialties = [
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatrician',
        'Neurologist',
        'Gastroenterologist'
    ];

    const doctors = Array(12).fill().map((_, i) => ({
        id: i + 1,
        name: 'Dr. Richard James',
        specialty: 'General physician',
        imageUrl: '/api/placeholder/200/250',
        available: true,
        rating: 4.8,
        reviewCount: 120 + i
    }));

    return (
        <Container fluid className="py-4">
            <Row>
                <Col lg={3} md={4} className="mb-4">
                    <div className="bg-white p-4 rounded-3 shadow-sm">
                        <h6 className="mb-4 fw-bold">Browse through the doctors specialist</h6>
                        <ListGroup variant="flush">
                            {specialties.map((specialty, index) => (
                                <ListGroup.Item
                                    key={index}
                                    action
                                    active={activeSpecialty === specialty}
                                    onClick={() => setActiveSpecialty(specialty)}
                                    className="border-0 px-3 py-3 mb-1 rounded-2 transition-all"
                                    style={{
                                        backgroundColor: activeSpecialty === specialty ? '#f0f3ff' : 'transparent',
                                        color: activeSpecialty === specialty ? '#4361ee' : 'inherit',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    {specialty}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col>

                <Col lg={9} md={8}>
                    <Row className="g-4">
                        {doctors.map((doctor) => (
                            <Col key={doctor.id} xl={3} lg={4} md={6} sm={6}>
                                <Card
                                    className="h-100 border-0 shadow-sm overflow-hidden"
                                    style={{
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    <div className="position-relative">
                                        <Card.Img
                                            variant="top"
                                            src={doctor.imageUrl}
                                            className="bg-light"
                                            style={{
                                                height: '220px',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                        />
                                        <div
                                            className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill"
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(4px)'
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="text-warning me-1">★</span>
                                                <small className="fw-semibold">{doctor.rating}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <Card.Body className="p-4">
                                        <div className="d-flex align-items-center mb-2">
                                            <div
                                                className="me-2 rounded-circle"
                                                style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: '#4CAF50',
                                                    boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
                                                }}
                                            />
                                            <small className="text-success fw-medium">Available Now</small>
                                        </div>
                                        <Card.Title className="h6 mb-2 fw-bold">{doctor.name}</Card.Title>
                                        <Card.Text className="text-muted small mb-3">
                                            {doctor.specialty}
                                        </Card.Text>
                                        <div className="d-flex align-items-center text-muted small">
                                            <span>⭐ {doctor.rating}</span>
                                            <span className="mx-2">•</span>
                                            <span>{doctor.reviewCount} Reviews</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default DoctorsListing;



















// import React from 'react';
// import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

// const DoctorsListing = () => {
//     const specialties = [
//         'General physician',
//         'Gynecologist',
//         'Dermatologist',
//         'Pediatrician',
//         'Neurologist',
//         'Gastroenterologist'
//     ];

//     const doctors = [
//         {
//             id: 1,
//             name: 'Dr. Richard James',
//             specialty: 'General physician',
//             imageUrl: '/api/placeholder/200/250',
//             available: true
//         },
//         // Repeat for all doctors shown in the design
//     ].concat(Array(11).fill()).map((doc, i) => ({
//         id: i + 1,
//         name: 'Dr. Richard James',
//         specialty: 'General physician',
//         imageUrl: '/api/placeholder/200/250',
//         available: true
//     }));

//     return (
//         <Container fluid className="py-4">
//             <Row>
//                 <Col lg={3} md={4} className="mb-4">
//                     <div className="bg-white p-3 rounded shadow-sm">
//                         <h6 className="mb-3">Browse through the doctors specialist</h6>
//                         <ListGroup variant="flush">
//                             {specialties.map((specialty, index) => (
//                                 <ListGroup.Item
//                                     key={index}
//                                     action
//                                     className="border-0 px-2 py-2"
//                                     style={{ backgroundColor: index === 0 ? '#f8f9ff' : 'transparent' }}
//                                 >
//                                     {specialty}
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     </div>
//                 </Col>

//                 <Col lg={9} md={8}>
//                     <Row className="g-4">
//                         {doctors.map((doctor) => (
//                             <Col key={doctor.id} xl={3} lg={4} md={6} sm={6}>
//                                 <Card className="h-100 border-0 shadow-sm">
//                                     <Card.Img
//                                         variant="top"
//                                         src={doctor.imageUrl}
//                                         className="bg-light"
//                                         style={{ height: '200px', objectFit: 'cover' }}
//                                     />
//                                     <Card.Body className="p-3">
//                                         <div className="d-flex align-items-center mb-2">
//                                             <div
//                                                 className="me-2 rounded-circle"
//                                                 style={{
//                                                     width: '8px',
//                                                     height: '8px',
//                                                     backgroundColor: '#4CAF50'
//                                                 }}
//                                             />
//                                             <small className="text-success">Available</small>
//                                         </div>
//                                         <Card.Title className="h6 mb-1">{doctor.name}</Card.Title>
//                                         <Card.Text className="text-muted small">
//                                             {doctor.specialty}
//                                         </Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DoctorsListing;