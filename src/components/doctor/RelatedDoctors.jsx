import React from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';


function RelatedDoctors() {
    return (
        <>
            <h3 className="h4 mt-5 mb-4">Recommended Doctors</h3>
            <div className="row g-4">
                {[1, 2, 3, 4].map((index) => (
                    <div className="col-md-6 col-lg-3" key={index}>
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <img
                                src={`/api/placeholder/300/200`}
                                className="card-img-top rounded-top-4"
                                alt={`Doctor ${index}`}
                            />

                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-2">
                                    <h5 className="card-title mb-0 me-auto">Dr. Sarah Wilson</h5>
                                    <span className="badge bg-success-subtle text-success">Available</span>
                                </div>
                                <p className="text-muted mb-2">General Physician</p>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                className="text-warning"
                                                fill="#ffc107"
                                            />
                                        ))}
                                    </div>
                                    <small className="text-muted">(120 reviews)</small>
                                </div>
                                <div className="d-flex align-items-center text-muted mb-3">
                                    <MapPin size={16} className="me-2" />
                                    <small>New York, USA</small>
                                </div>
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-primary fw-semibold">$45/Visit</span>
                                    <button className="btn btn-outline-primary btn-sm">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RelatedDoctors