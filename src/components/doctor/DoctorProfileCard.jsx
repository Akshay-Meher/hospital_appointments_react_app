import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';


const DoctorProfileCard = () => {


    const DoctorStats = () => (
        <div className="row g-3 mt-2">
            <div className="col-6 col-md-3">
                <div className="p-3 rounded-4 bg-light h-100">
                    <div className="d-flex align-items-center">
                        <Award className="text-primary me-2" size={24} />
                        <div>
                            <h4 className="mb-0">10+</h4>
                            <small className="text-muted">Years Exp.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="p-3 rounded-4 bg-light h-100">
                    <div className="d-flex align-items-center">
                        <Star className="text-warning me-2" size={24} fill="#ffc107" />
                        <div>
                            <h4 className="mb-0">4.9</h4>
                            <small className="text-muted">Rating</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="p-3 rounded-4 bg-light h-100">
                    <div className="d-flex align-items-center">
                        <Users className="text-success me-2" size={24} />
                        <div>
                            <h4 className="mb-0">1000+</h4>
                            <small className="text-muted">Patients</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="p-3 rounded-4 bg-light h-100">
                    <div className="d-flex align-items-center">
                        <Stethoscope className="text-info me-2" size={24} />
                        <div>
                            <h4 className="mb-0">15+</h4>
                            <small className="text-muted">Services</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
                <div className="row g-4">
                    <div className="col-lg-3">
                        <div className="text-center">
                            <div className="position-relative d-inline-block">
                                <img
                                    src="/api/placeholder/200/200"
                                    alt="Doctor"
                                    className="img-fluid rounded-4 mb-3"
                                    style={{ maxWidth: '200px' }}
                                />
                                <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle">
                                    <span className="visually-hidden">Online</span>
                                </span>
                            </div>
                            <div className="d-flex justify-content-center gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className="text-warning" fill="#ffc107" />
                                ))}
                            </div>
                            <div className="d-flex gap-2 justify-content-center">
                                <button className="btn btn-outline-primary btn-sm px-3">
                                    View Profile
                                </button>
                                <button className="btn btn-outline-primary btn-sm px-3">
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-start flex-wrap">
                            <div>
                                <h2 className="mb-1">Dr. Richard James</h2>
                                <p className="text-muted mb-3">
                                    <span className="badge bg-primary-subtle text-primary me-2">MBBS</span>
                                    <span className="badge bg-primary-subtle text-primary">General Physician</span>
                                </p>
                            </div>
                            <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">$50/Visit</span>
                        </div>

                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <MapPin size={18} className="text-primary me-2" />
                                <span>123 Medical Center, Healthcare Avenue, NY</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Phone size={18} className="text-primary me-2" />
                                <span>+1 234 567 8900</span>
                            </div>
                        </div>

                        <p className="mb-4 text-muted">
                            Dr. James has a strong commitment to delivering comprehensive medical care,
                            focusing on preventive medicine, early diagnosis, and effective treatment strategies.
                            With over 10 years of experience, he specializes in both acute and chronic conditions.
                        </p>

                        <DoctorStats />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfileCard;