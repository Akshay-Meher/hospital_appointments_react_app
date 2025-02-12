import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            doctor: "Dr. Richard James",
            specialty: "General physician",
            address: "57th Cross, Richmond",
            addressLine2: "Circle, Church Road, London",
            date: "25, July, 2024",
            time: "8:30 PM",
            status: "upcoming",
            image: "/api/placeholder/120/120"
        },
        {
            id: 2,
            doctor: "Dr. Richard James",
            specialty: "General physician",
            address: "57th Cross, Richmond",
            addressLine2: "Circle, Church Road, London",
            date: "25, July, 2024",
            time: "8:30 PM",
            status: "unpaid",
            image: "/api/placeholder/120/120"
        },
        {
            id: 3,
            doctor: "Dr. Richard James",
            specialty: "General physician",
            address: "57th Cross, Richmond",
            addressLine2: "Circle, Church Road, London",
            date: "25, July, 2024",
            time: "8:30 PM",
            status: "paid",
            image: "/api/placeholder/120/120"
        }
    ]);

    const handleCancel = async (id) => {
        try {
            // API call would go here
            const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
            if (confirmCancel) {
                setAppointments(appointments.filter(app => app.id !== id));
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
        }
    };

    const handlePayment = async (id) => {
        try {
            // Payment API integration would go here
            setAppointments(appointments.map(app =>
                app.id === id ? { ...app, status: 'paid' } : app
            ));
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <div className="appointments-container">
            <h1>My Appointments</h1>

            <div className="appointments-list">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-card">
                        <div className="appointment-content">
                            <div className="doctor-image">
                                <img src={appointment.image} alt={appointment.doctor} />
                            </div>

                            <div className="appointment-details">
                                <h2>{appointment.doctor}</h2>
                                <p className="specialty">{appointment.specialty}</p>

                                <div className="address-section">
                                    <p className="label">Address:</p>
                                    <p className="address">
                                        {appointment.address}<br />
                                        {appointment.addressLine2}
                                    </p>
                                </div>

                                <div className="datetime-section">
                                    <p className="label">Date & Time:</p>
                                    <p className="datetime">{appointment.date} | {appointment.time}</p>
                                </div>
                            </div>

                            <div className="appointment-actions">
                                {appointment.status === 'unpaid' && (
                                    <button
                                        className="pay-button"
                                        onClick={() => handlePayment(appointment.id)}
                                    >
                                        Pay here
                                    </button>
                                )}
                                {appointment.status === 'paid' && (
                                    <button className="paid-button" disabled>
                                        Paid
                                    </button>
                                )}
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancel(appointment.id)}
                                >
                                    Cancel appointment
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .appointments-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        h1 {
          color: #2E2C34;
          font-size: 24px;
          margin-bottom: 2rem;
        }

        .appointments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .appointment-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .appointment-content {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .doctor-image {
          flex-shrink: 0;
        }

        .doctor-image img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          object-fit: cover;
        }

        .appointment-details {
          flex: 1;
        }

        h2 {
          color: #2E2C34;
          font-size: 18px;
          margin: 0 0 0.25rem 0;
        }

        .specialty {
          color: #84818A;
          font-size: 14px;
          margin-bottom: 1rem;
        }

        .label {
          color: #84818A;
          font-size: 14px;
          margin-bottom: 0.25rem;
        }

        .address, .datetime {
          color: #2E2C34;
          font-size: 14px;
          margin-bottom: 1rem;
        }

        .appointment-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 160px;
        }

        button {
          width: 100%;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pay-button {
          background: #6E62E5;
          color: white;
          border: none;
        }

        .pay-button:hover {
          background: #5a50cc;
        }

        .paid-button {
          background: #6E62E5;
          color: white;
          border: none;
          opacity: 0.8;
          cursor: default;
        }

        .cancel-button {
          background: white;
          color: #2E2C34;
          border: 1px solid #E8E8E8;
        }

        .cancel-button:hover {
          background: #f8f8f8;
        }

        @media (max-width: 768px) {
          .appointment-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .doctor-image {
            margin-bottom: 1rem;
          }

          .appointment-actions {
            width: 100%;
            margin-top: 1rem;
          }
        }

        @media (max-width: 576px) {
          .appointments-container {
            margin: 1rem auto;
          }

          .appointment-card {
            padding: 1rem;
          }

          h1 {
            font-size: 20px;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default MyAppointments;