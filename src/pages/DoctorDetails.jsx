import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDoctorById } from '../apis/doctorApis';

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetchDoctorById(id);
                if (response?.data?.success) {
                    setDoctor(response?.data?.data);
                }
            } catch (err) {
                console.error("DoctorDetails Error:", err);
            }
        };
        fetchDoctor();
    }, [id]);

    if (!doctor) {
        return <p className="text-center my-5">Loading doctor details...</p>;
    }

    return (
        <Container className="py-5">
            <Button onClick={() => navigate(-1)} className="mb-3">← Back</Button>
            <Row>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Img
                            variant="top"
                            src={doctor.profile_image ? `http://localhost:5000/${doctor.profile_image}` : "/upload/profile-default.png"}
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                    </Card>
                </Col>
                <Col md={8}>
                    <h2>Dr. {doctor.name} {doctor.last_name}</h2>
                    <h5 className="text-muted">{doctor.specialization}</h5>
                    <p><strong>Experience:</strong> {doctor.years_of_experience} years</p>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Phone:</strong> {doctor.phone}</p>
                    <p><strong>Address:</strong> {doctor.address}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DoctorDetails;
