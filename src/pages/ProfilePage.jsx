import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
    const [profile, setProfile] = useState({
        name: 'Edward Vincent',
        email: 'richardjameswap@gmail.com',
        phone: '+1 123 456 7890',
        address: '57th Cross, Richmond',
        addressLine2: 'Circle, Church Road, London',
        gender: 'Male',
        birthday: '20 July, 2024'
    });

    const [tempProfile, setTempProfile] = useState({ ...profile });

    const handleEdit = () => {
        setIsEditing(true);
        setTempProfile({ ...profile });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempProfile(prev => ({
            ...prev,
            [name]: value
        }));
        setFeedbackMessage({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempProfile),
            });

            if (response.ok) {
                setProfile(tempProfile);
                setIsEditing(false);
                setFeedbackMessage({ type: 'success', message: 'Profile updated successfully!' });
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            setFeedbackMessage({ type: 'error', message: 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-header">
                    <img
                        src="/api/placeholder/100/100"
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-image-placeholder"></div>
                    <h2>{profile.name}</h2>
                </div>

                {feedbackMessage.message && (
                    <div className={`alert ${feedbackMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                        {feedbackMessage.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="section">
                        <h6>CONTACT INFORMATION</h6>

                        <div className="form-group">
                            <label>Email id:</label>
                            <input
                                type="email"
                                name="email"
                                value={isEditing ? tempProfile.email : profile.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={isEditing ? tempProfile.phone : profile.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={isEditing ? tempProfile.address : profile.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mb-2"
                            />
                            <input
                                type="text"
                                name="addressLine2"
                                value={isEditing ? tempProfile.addressLine2 : profile.addressLine2}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h6>BASIC INFORMATION</h6>

                        <div className="form-group">
                            <label>Gender:</label>
                            <input
                                type="text"
                                name="gender"
                                value={isEditing ? tempProfile.gender : profile.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Birthday:</label>
                            <input
                                type="text"
                                name="birthday"
                                value={isEditing ? tempProfile.birthday : profile.birthday}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="button-group">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    className="edit-button"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        className="save-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save information'}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFeedbackMessage({ type: '', message: '' });
                                        }}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .profile-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .profile-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .profile-image-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #F5F4FF;
        }

        h2 {
          color: #2E2C34;
          font-size: 24px;
          font-weight: 500;
          margin: 0;
        }

        .section {
          margin-bottom: 2rem;
        }

        h6 {
          color: #84818A;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          color: #84818A;
          font-size: 14px;
          margin-bottom: 0.5rem;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #E8E8E8;
          border-radius: 6px;
          color: #2E2C34;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        input:disabled {
          background-color: white;
          cursor: not-allowed;
          opacity: 0.7;
        }

        input:focus {
          outline: none;
          border-color: #6E62E5;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        button {
          padding: 10px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .edit-button, .save-button {
          background-color: #F5F4FF;
          color: #6E62E5;
          border: none;
        }

        .edit-button:hover, .save-button:hover {
          background-color: #E8E6FF;
        }

        .cancel-button {
          background-color: white;
          border: 1px solid #E8E8E8;
          color: #2E2C34;
        }

        .cancel-button:hover {
          background-color: #f8f8f8;
        }

        @media (max-width: 768px) {
          .profile-content {
            padding: 1.5rem;
          }

          .profile-header {
            justify-content: center;
            text-align: center;
          }

          .button-group {
            justify-content: center;
          }

          button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .profile-container {
            margin: 1rem auto;
          }

          .profile-content {
            padding: 1rem;
          }

          h2 {
            font-size: 20px;
          }
        }
      `}</style>
        </div>
    );
};

export default ProfilePage;



























// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProfilePage = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [profile, setProfile] = useState({
//         name: 'Edward Vincent',
//         email: 'richardjameswap@gmail.com',
//         phone: '+1 123 456 7890',
//         address: '57th Cross, Richmond',
//         addressLine2: 'Circle, Church Road, London',
//         gender: 'Male',
//         birthday: '20 July, 2024'
//     });

//     const [tempProfile, setTempProfile] = useState({ ...profile });

//     const handleEdit = () => {
//         setIsEditing(true);
//         setTempProfile({ ...profile });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTempProfile(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('YOUR_API_ENDPOINT', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(tempProfile),
//             });

//             if (response.ok) {
//                 setProfile(tempProfile);
//                 setIsEditing(false);
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="d-flex align-items-center mb-4">
//                         <img
//                             src="/api/placeholder/100/100"
//                             alt="Profile"
//                             className="rounded-circle me-3"
//                             style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                         />
//                         <div className="placeholder-profile rounded-circle me-3"
//                             style={{ width: '80px', height: '80px', backgroundColor: '#F5F4FF' }}>
//                         </div>
//                         <h2 className="mb-0" style={{ color: '#2E2C34' }}>{profile.name}</h2>
//                     </div>

//                     <div className="profile-content">
//                         <div className="section mb-4">
//                             <h6 className="text-uppercase mb-3" style={{ color: '#84818A' }}>CONTACT INFORMATION</h6>

//                             <div className="mb-3">
//                                 <label className="form-label" style={{ color: '#84818A' }}>Email id:</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     name="email"
//                                     value={isEditing ? tempProfile.email : profile.email}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                                 <label className="form-label" style={{ color: '#84818A' }}>Phone:</label>
//                                 <input
//                                     type="tel"
//                                     className="form-control"
//                                     name="phone"
//                                     value={isEditing ? tempProfile.phone : profile.phone}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                                 <label className="form-label" style={{ color: '#84818A' }}>Address:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     name="address"
//                                     value={isEditing ? tempProfile.address : profile.address}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="addressLine2"
//                                     value={isEditing ? tempProfile.addressLine2 : profile.addressLine2}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                             </div>
//                         </div>

//                         <div className="section">
//                             <h6 className="text-uppercase mb-3" style={{ color: '#84818A' }}>BASIC INFORMATION</h6>

//                             <div className="mb-3">
//                                 <label className="form-label" style={{ color: '#84818A' }}>Gender:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="gender"
//                                     value={isEditing ? tempProfile.gender : profile.gender}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                             </div>

//                             <div className="mb-4">
//                                 <label className="form-label" style={{ color: '#84818A' }}>Birthday:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="birthday"
//                                     value={isEditing ? tempProfile.birthday : profile.birthday}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     style={{ color: '#2E2C34', border: '1px solid #E8E8E8' }}
//                                 />
//                             </div>

//                             <div className="d-flex gap-2">
//                                 {!isEditing ? (
//                                     <button
//                                         className="btn px-4"
//                                         onClick={handleEdit}
//                                         style={{
//                                             backgroundColor: '#F5F4FF',
//                                             color: '#6E62E5',
//                                             border: 'none',
//                                             borderRadius: '6px',
//                                             padding: '8px 16px'
//                                         }}
//                                     >
//                                         Edit
//                                     </button>
//                                 ) : (
//                                     <>
//                                         <button
//                                             className="btn px-4"
//                                             onClick={handleSubmit}
//                                             style={{
//                                                 backgroundColor: '#F5F4FF',
//                                                 color: '#6E62E5',
//                                                 border: 'none',
//                                                 borderRadius: '6px',
//                                                 padding: '8px 16px'
//                                             }}
//                                         >
//                                             Save information
//                                         </button>
//                                         <button
//                                             className="btn btn-light px-4"
//                                             onClick={() => setIsEditing(false)}
//                                             style={{
//                                                 border: '1px solid #E8E8E8',
//                                                 borderRadius: '6px',
//                                                 padding: '8px 16px'
//                                             }}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//         .form-control:disabled {
//           background-color: white;
//           cursor: not-allowed;
//         }
//         .form-control {
//           padding: 12px;
//           border-radius: 6px;
//         }
//         .form-label {
//           margin-bottom: 8px;
//           font-size: 14px;
//         }
//         .btn {
//           font-size: 14px;
//           font-weight: 500;
//         }
//         h2 {
//           font-size: 24px;
//           font-weight: 500;
//         }
//         h6 {
//           font-size: 12px;
//           font-weight: 500;
//           letter-spacing: 0.5px;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default ProfilePage;





















// import React, { useState } from 'react';
// import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

// const ProfilePage = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [profile, setProfile] = useState({
//         name: 'Edward Vincent',
//         email: 'richardjameswap@gmail.com',
//         phone: '+1 123 456 7890',
//         address: '57th Cross, Richmond',
//         addressLine2: 'Circle, Church Road, London',
//         gender: 'Male',
//         birthday: '20 July, 2024'
//     });

//     const [tempProfile, setTempProfile] = useState({ ...profile });

//     const handleEdit = () => {
//         setIsEditing(true);
//         setTempProfile({ ...profile });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTempProfile(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Replace with your actual API endpoint
//             const response = await fetch('YOUR_API_ENDPOINT', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(tempProfile),
//             });

//             if (response.ok) {
//                 setProfile(tempProfile);
//                 setIsEditing(false);
//             } else {
//                 throw new Error('Failed to update profile');
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             // Handle error appropriately
//         }
//     };

//     return (
//         <Container className="py-5">
//             <Row className="justify-content-center">
//                 <Col md={8} lg={6}>
//                     <Card className="shadow-sm">
//                         <Card.Body>
//                             <div className="text-center mb-4">
//                                 <img
//                                     src="/path-to-profile-image.jpg"
//                                     alt="Profile"
//                                     className="rounded-circle mb-3"
//                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                                 />
//                                 <h2 className="mb-0">{profile.name}</h2>
//                             </div>

//                             <Form onSubmit={handleSubmit}>
//                                 <h5 className="mb-3">CONTACT INFORMATION</h5>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Email id:</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         name="email"
//                                         value={isEditing ? tempProfile.email : profile.email}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Phone:</Form.Label>
//                                     <Form.Control
//                                         type="tel"
//                                         name="phone"
//                                         value={isEditing ? tempProfile.phone : profile.phone}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Address:</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="address"
//                                         value={isEditing ? tempProfile.address : profile.address}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                         className="mb-2"
//                                     />
//                                     <Form.Control
//                                         type="text"
//                                         name="addressLine2"
//                                         value={isEditing ? tempProfile.addressLine2 : profile.addressLine2}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                     />
//                                 </Form.Group>

//                                 <h5 className="mb-3 mt-4">BASIC INFORMATION</h5>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Gender:</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="gender"
//                                         value={isEditing ? tempProfile.gender : profile.gender}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Birthday:</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="birthday"
//                                         value={isEditing ? tempProfile.birthday : profile.birthday}
//                                         onChange={handleChange}
//                                         disabled={!isEditing}
//                                     />
//                                 </Form.Group>

//                                 <div className="d-flex gap-2">
//                                     {!isEditing ? (
//                                         <Button variant="primary" onClick={handleEdit}>
//                                             Edit
//                                         </Button>
//                                     ) : (
//                                         <>
//                                             <Button variant="primary" type="submit">
//                                                 Save information
//                                             </Button>
//                                             <Button variant="secondary" onClick={() => setIsEditing(false)}>
//                                                 Cancel
//                                             </Button>
//                                         </>
//                                     )}
//                                 </div>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default ProfilePage;