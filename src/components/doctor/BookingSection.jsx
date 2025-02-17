import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addDays, startOfToday, isToday } from 'date-fns';


function BookingSection({ error, success, view, setView, availableDates, selectedDate, setSelectedDate, format, handleBookAppointment, selectedTime, setSelectedTime, loading, setLoading }) {

    // Time slots with morning and afternoon sessions
    const timeSlots = {
        morning: [
            { time: '09:00 AM', available: true },
            { time: '09:30 AM', available: true },
            { time: '10:00 AM', available: false },
            { time: '10:30 AM', available: true },
            { time: '11:00 AM', available: true },
            { time: '11:30 AM', available: true },
        ],
        afternoon: [
            { time: '02:00 PM', available: true },
            { time: '02:30 PM', available: true },
            { time: '03:00 PM', available: false },
            { time: '03:30 PM', available: true },
            { time: '04:00 PM', available: true },
            { time: '04:30 PM', available: true },
        ]
    };


    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
                {view === 'calendar' ? (
                    <>
                        <h3 className="card-title h4 mb-4 d-flex align-items-center">
                            <Calendar className="text-primary me-2" size={24} />
                            Select Appointment Date
                        </h3>

                        {/* Date Selector with Hidden Scrollbar */}
                        <div className="position-relative">
                            <div
                                className="d-flex gap-2 pb-2 overflow-auto"
                                style={{
                                    scrollbarWidth: 'none', /* Firefox */
                                    '-ms-overflow-style': 'none', /* IE/Edge */
                                    '-webkit-overflow-scrolling': 'touch', /* Smooth scrolling */
                                    overflowX: 'scroll',
                                }}
                            >
                                {availableDates.map((date) => (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => {
                                            setSelectedDate(date);
                                            setView('time');
                                        }}
                                        className={`btn flex-shrink-0 px-3 py-2 rounded ${selectedDate?.toISOString() === date.toISOString() ? 'btn-primary' : 'btn-outline-primary'}`}
                                        style={{ minWidth: '90px' }}
                                    >
                                        <div className="text-center">
                                            <small className="d-block">{format(date, 'EEE')}</small>
                                            <strong className="fs-5 d-block">{format(date, 'd')}</strong>
                                            <small>{format(date, 'MMM')}</small>
                                        </div>
                                        {isToday(date) && <span className="badge bg-danger mt-1">Today</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center mb-4">
                            <button className="btn btn-link p-0 me-3" onClick={() => setView('calendar')}>
                                <ChevronLeft size={24} />
                            </button>
                            <h3 className="card-title h4 mb-0">
                                <Clock className="text-primary me-2" size={24} />
                                Select Time Slot - {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                            </h3>
                        </div>

                        {['morning', 'afternoon'].map((period) => (
                            <div key={period} className="mb-4">
                                <h6 className="text-muted mb-3 text-capitalize">{period} Slots</h6>
                                <div className="row g-2">
                                    {timeSlots[period].map((slot, index) => (
                                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                                            <button
                                                onClick={() => setSelectedTime(slot.time)}
                                                disabled={!slot.available}
                                                className={`btn w-100 text-start px-3 py-2 rounded ${selectedTime === slot.time ? 'btn-primary' : slot.available ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Clock size={16} className="me-2" />
                                                    {slot.time}
                                                    {!slot.available && <span className="badge bg-danger ms-2">Booked</span>}
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={handleBookAppointment}
                            disabled={loading || !selectedTime}
                            className="btn btn-primary w-100 py-3 rounded-3 mt-3"
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Booking your appointment...
                                </>
                            ) : (
                                'Confirm Appointment'
                            )}
                        </button>
                    </>
                )}

                {error && <div className="alert alert-danger mt-3 d-flex align-items-center"><AlertCircle size={18} className="me-2" />{error}</div>}
                {success && <div className="alert alert-success mt-3 d-flex align-items-center"><CheckCircle size={18} className="me-2" />Appointment booked successfully! Check your email for confirmation.</div>}
            </div>
        </div>
    )
}

export default BookingSection