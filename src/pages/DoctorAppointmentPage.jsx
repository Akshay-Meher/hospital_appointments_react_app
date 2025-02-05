import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const DoctorAppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState('10');
    const [selectedTime, setSelectedTime] = useState('9:00 am');

    const dates = [
        { day: 'MON', date: '10' },
        { day: 'TUE', date: '11' },
        { day: 'WED', date: '12' },
        { day: 'THU', date: '13' },
        { day: 'FRI', date: '14' },
        { day: 'SAT', date: '15' },
        { day: 'SUN', date: '16' }
    ];

    const timeSlots = [
        '8:00 am', '8:30 am', '9:00 am', '9:30 am',
        '10:00 am', '10:30 am', '11:00 am', '11:30 am'
    ];

    const relatedDoctors = [
        {
            name: 'Dr. Richard James',
            specialty: 'General physician',
            available: true,
            image: '/api/placeholder/200/200'
        },
        // Repeat for other doctors
    ];

    return (
        <Container className="py-5">
            {/* Doctor Profile Section */}
            <Row className="mb-5">
                <Col md={3}>
                    <img
                        src="/api/placeholder/300/300"
                        alt="Dr. Richard James"
                        className="img-fluid rounded"
                    />
                </Col>
                <Col md={9}>
                    <Card className="border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="mb-0">Dr. Richard James</h2>
                            <span className="ms-2 text-primary">✓</span>
                            <span className="ms-3 px-2 py-1 bg-light rounded small">3 Years</span>
                        </div>
                        <p className="text-muted mb-3">MBBS - General Physician</p>

                        <h6 className="mb-2">About</h6>
                        <p className="text-muted">
                            Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine,
                            early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering
                            comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective
                            treatment strategies.
                        </p>

                        <div className="mt-3">
                            <strong>Appointment fee: </strong>
                            <span className="text-primary">$50</span>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Booking Section */}
            <h5 className="mb-4">Booking slots</h5>

            {/* Date Selection */}
            <div className="d-flex gap-3 mb-4 overflow-auto">
                {dates.map(({ day, date }) => (
                    <Button
                        key={date}
                        variant={selectedDate === date ? 'primary' : 'outline-secondary'}
                        className="rounded-pill px-4 py-2"
                        onClick={() => setSelectedDate(date)}
                    >
                        <div className="text-center">
                            <div className="small">{day}</div>
                            <div>{date}</div>
                        </div>
                    </Button>
                ))}
            </div>

            {/* Time Selection */}
            <div className="d-flex gap-3 mb-4 flex-wrap">
                {timeSlots.map((time) => (
                    <Button
                        key={time}
                        variant={selectedTime === time ? 'primary' : 'outline-secondary'}
                        className="rounded-pill px-4"
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </Button>
                ))}
            </div>

            {/* Book Appointment Button */}
            <Button
                variant="primary"
                size="lg"
                className="rounded-pill px-5 py-2 mb-5 w-100"
            >
                Book an appointment
            </Button>

            {/* Related Doctors Section */}
            <div className="mt-5">
                <h3 className="text-center mb-3">Related Doctors</h3>
                <p className="text-center text-muted mb-4">Simply browse through our extensive list of trusted doctors.</p>

                <Row>
                    {relatedDoctors.map((doctor, index) => (
                        <Col key={index} md={4} lg={3} className="mb-4">
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Img variant="top" src={doctor.image} />
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                                        <small className="text-success">Available</small>
                                    </div>
                                    <h6 className="mb-1">{doctor.name}</h6>
                                    <small className="text-muted">{doctor.specialty}</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default DoctorAppointmentPage;