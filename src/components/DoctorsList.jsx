import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { fetchAllDoctors } from '../apis/doctorApis';
import { useNavigate } from 'react-router-dom';

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllDoctors();
                if (response?.data?.success) {
                    setDoctors(response.data.data);
                }
            } catch (err) {
                console.error("fetchAllDoctors error:", err);
            }
        };

        fetchData();
    }, []);

    // Show only first 8 doctors
    const visibleDoctors = doctors.slice(0, 8);

    return (
        <Container className="py-5">
            <h2 className="text-center mb-3">Top Doctors to Book</h2>
            <p className="text-center text-muted mb-5">Simply browse through our extensive list of trusted doctors.</p>
            <Row>
                {visibleDoctors.map((doctor) => (
                    <Col key={doctor.id} xl={3} lg={4} md={6} sm={6}>
                        <Card
                            className="h-100 border-0 shadow-sm overflow-hidden"
                            style={{ transition: 'all 0.3s ease-in-out', cursor: 'pointer' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
                                const imgElement = e.currentTarget.querySelector('img');
                                imgElement.classList.remove('bg-light');
                                imgElement.classList.add('bg-primary');
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                                const imgElement = e.currentTarget.querySelector('img');
                                imgElement.classList.add('bg-light');
                                imgElement.classList.remove('bg-primary');
                            }}
                            onClick={() => navigate(`/doctor/${doctor.id}`)}
                        >
                            <Card.Img
                                variant="top"
                                src={doctor.profile_image ? `http://localhost:5000/${doctor.profile_image}` : "/upload/profile-default.png"}
                                className="bg-light"
                                style={{ height: '220px', objectFit: 'cover' }}
                            />
                            <Card.Body className="p-4">
                                <Card.Title className="h6 mb-2 fw-bold">Dr. {doctor.name} {doctor.last_name}</Card.Title>
                                <Card.Text className="text-muted small mb-3">{doctor.specialization}</Card.Text>
                                <div className="d-flex align-items-center text-muted small">
                                    <span>{doctor.years_of_experience} Years Experience</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Show More Button */}
            {doctors.length > 8 && (
                <div className="text-center mt-4">
                    <Button variant="primary" className="rounded-pill px-4" onClick={() => navigate('/doctors')}>
                        View More
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default DoctorsList;



















// import React, { useEffect, useState } from 'react'
// import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
// import { fetchAllDoctors } from '../apis/doctorApis';

// function DoctorsList() {

//     const [doctors, setDoctors] = useState([]);

//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 const response = await fetchAllDoctors();
//                 // console.log("fetchAllDoctors", allResponse);
//                 if (response?.data?.success) {
//                     setDoctors(response.data.data)
//                 }

//             } catch (err) {
//                 console.log("fetchAllDoctors err", err);
//             }
//         };

//         fetchData();
//     }, []);


//     return (

//         <Container className="py-5">
//             <h2 className="text-center mb-3">Top Doctors to Book</h2>
//             <p className="text-center text-muted mb-5">Simply browse through our extensive list of trusted doctors.</p>
//             <Row>
//                 {doctors.map((doctor, index) => (

//                     <Col key={doctor.id} xl={3} lg={4} md={6} sm={6}>
//                         <Card
//                             // className="h-100 border-0 shadow-sm overflow-hidden"
//                             // style={{ cursor: 'pointer', transition: 'all 0.3s ease-in-out' }}
//                             className="h-100 border-0 shadow-sm overflow-hidden"
//                             style={{
//                                 transition: 'all 0.3s ease-in-out',
//                                 cursor: 'pointer',
//                             }}
//                             onMouseEnter={(e) => {

//                                 e.currentTarget.style.transform = 'translateY(-5px)';
//                                 e.currentTarget.style.boxShadow = '50px 50px 50px rgb(250, 5, 5)';

//                                 // Change the background of the image to transparent
//                                 const imgElement = e.currentTarget.querySelector('img');
//                                 imgElement.style.transition = 'background-color 0.3s ease-in-out';
//                                 imgElement.classList.remove('bg-light');
//                                 imgElement.classList.add('bg-primary');
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                                 e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                                 const imgElement = e.currentTarget.querySelector('img');
//                                 imgElement.classList.add('bg-light');
//                                 imgElement.classList.remove('bg-primary');

//                             }}
//                             onClick={() => navigate(`/doctor/${doctor.id}`)} // Navigate to doctor details page
//                         >
//                             <Card.Img
//                                 variant="top"
//                                 src={doctor.profile_image ? `http://localhost:5000/${doctor.profile_image}` : "/upload/profile-default.png"}
//                                 className="bg-light"
//                                 style={{ height: '220px', objectFit: 'cover' }}
//                             />
//                             <Card.Body className="p-4">
//                                 <Card.Title className="h6 mb-2 fw-bold">Dr. {doctor.name} {doctor.last_name}</Card.Title>
//                                 <Card.Text className="text-muted small mb-3">{doctor.specialization}</Card.Text>
//                                 <div className="d-flex align-items-center text-muted small">
//                                     <span>{doctor.years_of_experience} Years Experience</span>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>

//             <div className="text-center mt-4">
//                 <Button variant="light" className="rounded-pill px-4">more</Button>
//             </div>
//         </Container>
//     )
// }

// export default DoctorsList