import React from 'react'
import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

export const QuickInfoSection = () => {

    return (
        <div className="row g-4 mt-5">
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="rounded-circle bg-primary-subtle p-3 me-3">
                                <Clock className="text-primary" size={24} />
                            </div>
                            <h5 className="card-title mb-0">Working Hours</h5>
                        </div>
                        <ul className="list-unstyled mb-0">
                            <li className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Monday - Friday</span>
                                <span>9:00 AM - 5:00 PM</span>
                            </li>
                            <li className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Saturday</span>
                                <span>9:00 AM - 2:00 PM</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span className="text-muted">Sunday</span>
                                <span className="text-danger">Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="rounded-circle bg-success-subtle p-3 me-3">
                                <Stethoscope className="text-success" size={24} />
                            </div>
                            <h5 className="card-title mb-0">Services</h5>
                        </div>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">✓ General Health Checkup</li>
                            <li className="mb-2">✓ Preventive Care</li>
                            <li className="mb-2">✓ Chronic Disease Management</li>
                            <li>✓ Vaccinations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="rounded-circle bg-warning-subtle p-3 me-3">
                                <Award className="text-warning" size={24} />
                            </div>
                            <h5 className="card-title mb-0">Experience</h5>
                        </div>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">• 10+ Years in Practice</li>
                            <li className="mb-2">• Board Certified</li>
                            <li className="mb-2">• Multiple Awards</li>
                            <li>• Regular Medical Speaker</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
