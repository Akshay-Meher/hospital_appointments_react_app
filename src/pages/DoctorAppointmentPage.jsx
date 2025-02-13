import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addDays, startOfToday, isToday } from 'date-fns';
import DoctorProfileCard from '../components/doctor/DoctorProfileCard';
import { QuickInfoSection } from '../components/doctor/QuickInfoSection';
import RelatedDoctors from '../components/doctor/RelatedDoctors';
import BookingSection from '../components/doctor/BookingSection';




const DoctorAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [view, setView] = useState('calendar');
    const [isScrolled, setIsScrolled] = useState(false);

    // Generate available dates (next 14 days)
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));


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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBookAppointment = async () => {
        if (!selectedDate || !selectedTime) {
            setError('Please select both date and time');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            setTimeout(() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setView('calendar');
                setSuccess(false);
            }, 3000);
        } catch (err) {
            setError('Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
        <div className="container-fluid container-lg py-4">
            {/* Sticky Booking Summary */}
            <div
                className={`fixed-top bg-white shadow-sm py-2 ${isScrolled ? 'd-block' : 'd-none'}`}
                style={{ transition: 'all 0.3s ease' }}
            >
                <div className="container-fluid container-lg">
                    <div className="row align-items-center">
                        <div className="col">
                            <h6 className="mb-0">Dr. Richard James</h6>
                            <small className="text-muted">
                                {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                                {selectedTime && ` - ${selectedTime}`}
                            </small>
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-primary"
                                onClick={handleBookAppointment}
                                disabled={!selectedDate || !selectedTime || loading}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor Profile Card */}
            <DoctorProfileCard />

            {/* Booking Section */}




            {/* <BookingSection
                error={error} success={success} view={view} availableDates={availableDates}
                selectedDate={selectedDate} format={format}
            /> */}


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




            {/* <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    {view === 'calendar' ? (
                        <>
                            <h3 className="card-title h4 mb-4 d-flex align-items-center">
                                <Calendar className="text-primary me-2" size={24} />
                                Select Appointment Date
                            </h3>

                            <div className="d-flex overflow-auto gap-2 pb-2">
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
            </div> */}


            {/* <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    {view === 'calendar' ? (
                        <>
                            <h3 className="card-title h4 mb-4 d-flex align-items-center">
                                <Calendar className="text-primary me-2" size={24} />
                                Select Appointment Date
                            </h3>

                            <Slider {...sliderSettings} className="mb-4">
                                {availableDates.map((date) => (
                                    <div key={date.toISOString()} className="text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedDate(date);
                                                setView('time');
                                            }}
                                            className={`btn p-3 w-100 ${selectedDate?.toISOString() === date.toISOString() ? 'btn-primary' : 'btn-outline-primary'}`}
                                        >
                                            <small className="d-block">{format(date, 'EEE')}</small>
                                            <strong className="fs-5 d-block">{format(date, 'd')}</strong>
                                            <small>{format(date, 'MMM')}</small>
                                        </button>
                                        {isToday(date) && <span className="badge bg-danger position-relative mt-1">Today</span>}
                                    </div>
                                ))}
                            </Slider>
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
                                    <div className="row g-3">
                                        {timeSlots[period].map((slot, index) => (
                                            <div className="col-6 col-md-4 col-lg-3" key={index}>
                                                <button
                                                    onClick={() => setSelectedTime(slot.time)}
                                                    disabled={!slot.available}
                                                    className={`btn w-100 position-relative ${selectedTime === slot.time ? 'btn-primary' : slot.available ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                                                >
                                                    <Clock size={16} className="me-2" />
                                                    {slot.time}
                                                    {!slot.available && <span className="badge bg-danger position-absolute top-0 end-0">Booked</span>}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={handleBookAppointment}
                                disabled={loading || !selectedTime}
                                className="btn btn-primary w-100 py-3 rounded-3"
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
            </div> */}


            {/* <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    {view === 'calendar' ? (
                        <>
                            <h3 className="card-title h4 mb-4">
                                <Calendar className="text-primary me-2" size={24} />
                                Select Appointment Date
                            </h3>

                            <div className="dates-carousel mb-4">
                                <div className="row flex-nowrap overflow-auto g-2 pb-2">
                                    {availableDates.map((date) => (
                                        <div className="col-auto" key={date.toISOString()}>
                                            <button
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    setView('time');
                                                }}
                                                className={`btn position-relative p-3 ${selectedDate?.toISOString() === date.toISOString()
                                                    ? 'btn-primary'
                                                    : 'btn-outline-primary'
                                                    }`}
                                                style={{ minWidth: '100px' }}
                                            >
                                                <div className="text-center">
                                                    <small className="d-block mb-1">{format(date, 'EEE')}</small>
                                                    <strong className="fs-5 d-block mb-1">{format(date, 'd')}</strong>
                                                    <small>{format(date, 'MMM')}</small>
                                                </div>
                                                {isToday(date) && (
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        Today
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex align-items-center mb-4">
                                <button
                                    className="btn btn-link text-decoration-none p-0 me-3"
                                    onClick={() => setView('calendar')}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <h3 className="card-title h4 mb-0">
                                    <Clock className="text-primary me-2" size={24} />
                                    Select Time Slot - {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                                </h3>
                            </div>

                            <div className="mb-4">
                                <h6 className="text-muted mb-3">Morning Slots</h6>
                                <div className="row g-3 mb-4">
                                    {timeSlots.morning.map((slot, index) => (
                                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                                            <button
                                                onClick={() => setSelectedTime(slot.time)}
                                                disabled={!slot.available}
                                                className={`btn w-100 position-relative ${selectedTime === slot.time
                                                    ? 'btn-primary'
                                                    : slot.available
                                                        ? 'btn-outline-primary'
                                                        : 'btn-outline-secondary'
                                                    }`}
                                            >
                                                <Clock size={16} className="me-2" />
                                                {slot.time}
                                                {!slot.available && (
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        Booked
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <h6 className="text-muted mb-3">Afternoon Slots</h6>
                                <div className="row g-3 mb-4">
                                    {timeSlots.afternoon.map((slot, index) => (
                                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                                            <button
                                                onClick={() => setSelectedTime(slot.time)}
                                                disabled={!slot.available}
                                                className={`btn w-100 position-relative ${selectedTime === slot.time
                                                    ? 'btn-primary'
                                                    : slot.available
                                                        ? 'btn-outline-primary'
                                                        : 'btn-outline-secondary'
                                                    }`}
                                            >
                                                <Clock size={16} className="me-2" />
                                                {slot.time}
                                                {!slot.available && (
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        Booked
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleBookAppointment}
                                    disabled={loading || !selectedTime}
                                    className="btn btn-primary w-100 py-3 rounded-3"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Booking your appointment...
                                        </>
                                    ) : (
                                        'Confirm Appointment'
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                            <AlertCircle size={18} className="me-2" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success d-flex align-items-center mt-3" role="alert">
                            <CheckCircle size={18} className="me-2" />
                            Appointment booked successfully! Check your email for confirmation.
                        </div>
                    )}
                </div>
            </div> */}

            {/* Related Doctors */}
            <RelatedDoctors />

            {/* Quick Info Section */}
            <QuickInfoSection />
        </div>
    );
};

export default DoctorAppointment;


// return (
//     <div className="container-fluid container-lg py-4">
//         {/* Sticky Booking Summary */}
//         <div
//             className={`fixed-top bg-white shadow-sm py-2 px-3 ${isScrolled ? 'd-block' : 'd-none'}`}
//             style={{ transition: 'all 0.3s ease-in-out', zIndex: 1030 }}
//         >
//             <div className="container d-flex justify-content-between align-items-center">
//                 <div>
//                     <h6 className="mb-0">Dr. Richard James</h6>
//                     <small className="text-muted">
//                         {selectedDate && format(selectedDate, 'MMM d, yyyy')}
//                         {selectedTime && ` - ${selectedTime}`}
//                     </small>
//                 </div>
//                 <button
//                     className="btn btn-primary btn-sm"
//                     onClick={handleBookAppointment}
//                     disabled={!selectedDate || !selectedTime || loading}
//                 >
//                     Book Now
//                 </button>
//             </div>
//         </div>

//         {/* Doctor Profile Card */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4">
//             <div className="card-body p-4">
//                 <div className="row g-4">
//                     {/* Doctor Image */}
//                     <div className="col-md-4 text-center">
//                         <img
//                             src="/api/placeholder/200/200"
//                             alt="Doctor"
//                             className="img-fluid rounded-4 mb-3"
//                             style={{ maxWidth: '180px' }}
//                         />
//                         <div className="d-flex justify-content-center gap-1">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star key={star} size={18} className="text-warning" fill="#ffc107" />
//                             ))}
//                         </div>
//                         <button className="btn btn-outline-primary btn-sm mt-3">View Profile</button>
//                     </div>
//                     {/* Doctor Details */}
//                     <div className="col-md-8">
//                         <h2 className="mb-1">Dr. Richard James</h2>
//                         <p className="text-muted mb-3">
//                             <span className="badge bg-primary-subtle text-primary me-2">MBBS</span>
//                             <span className="badge bg-primary-subtle text-primary">General Physician</span>
//                         </p>
//                         <p className="text-muted">$50/Visit</p>
//                         <p className="mb-4 text-muted">
//                             Dr. James has a strong commitment to delivering comprehensive medical care,
//                             focusing on preventive medicine, early diagnosis, and effective treatment strategies.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* Booking Section */}
//         <div className="card border-0 shadow-sm rounded-4">
//             <div className="card-body p-4">
//                 <h3 className="h5 mb-3">
//                     <Calendar className="text-primary me-2" size={24} /> Select Appointment Date
//                 </h3>
//                 <div className="d-flex gap-2 overflow-auto pb-2">
//                     {availableDates.map((date) => (
//                         <button
//                             key={date.toISOString()}
//                             onClick={() => {
//                                 setSelectedDate(date);
//                                 setView('time');
//                             }}
//                             className={`btn p-3 ${selectedDate?.toISOString() === date.toISOString() ? 'btn-primary' : 'btn-outline-primary'}`}
//                         >
//                             {format(date, 'EEE d MMM')}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         {/* Time Slot Selection */}
//         {view === 'time' && (
//             <div className="card border-0 shadow-sm rounded-4 mt-4">
//                 <div className="card-body p-4">
//                     <h3 className="h5 mb-3">
//                         <Clock className="text-primary me-2" size={24} /> Select Time Slot
//                     </h3>
//                     <div className="row g-3">
//                         {timeSlots.morning.concat(timeSlots.afternoon).map((slot, index) => (
//                             <div className="col-6 col-md-4 col-lg-3" key={index}>
//                                 <button
//                                     onClick={() => setSelectedTime(slot.time)}
//                                     disabled={!slot.available}
//                                     className={`btn w-100 ${selectedTime === slot.time ? 'btn-primary' : slot.available ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
//                                 >
//                                     {slot.time}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         )}

//         {/* Confirmation Button */}
//         <div className="text-center mt-4">
//             <button
//                 onClick={handleBookAppointment}
//                 disabled={loading || !selectedTime}
//                 className="btn btn-primary w-100 py-3 rounded-3"
//             >
//                 {loading ? 'Booking...' : 'Confirm Appointment'}
//             </button>
//         </div>
//     </div>
// );














// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Star, MapPin, Phone } from 'lucide-react';
// import { format, addDays, startOfToday } from 'date-fns';

// const DoctorAppointmentPage = () => {
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(false);
//     const [view, setView] = useState('calendar'); // 'calendar' or 'time'

//     // Generate available dates (next 7 days)
//     const availableDates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

//     // Time slots
//     const timeSlots = [
//         { time: '09:00 AM', available: true },
//         { time: '09:30 AM', available: true },
//         { time: '10:00 AM', available: false },
//         { time: '10:30 AM', available: true },
//         { time: '11:00 AM', available: true },
//         { time: '11:30 AM', available: true },
//         { time: '02:00 PM', available: true },
//         { time: '02:30 PM', available: true },
//         { time: '03:00 PM', available: false },
//         { time: '03:30 PM', available: true },
//         { time: '04:00 PM', available: true },
//         { time: '04:30 PM', available: true },
//     ];

//     const handleBookAppointment = async () => {
//         if (!selectedDate || !selectedTime) {
//             setError('Please select both date and time');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             // Simulated API call
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             setSuccess(true);
//             setSelectedDate(null);
//             setSelectedTime(null);
//             setView('calendar');
//         } catch (err) {
//             setError('Failed to book appointment. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const DoctorStats = () => (
//         <div className="row text-center mt-4 mb-4">
//             <div className="col-md-3 col-6 mb-3">
//                 <div className="p-3 bg-light rounded">
//                     <h4 className="mb-0">10+</h4>
//                     <small className="text-muted">Years Experience</small>
//                 </div>
//             </div>
//             <div className="col-md-3 col-6 mb-3">
//                 <div className="p-3 bg-light rounded">
//                     <h4 className="mb-0">4.9</h4>
//                     <small className="text-muted">Rating</small>
//                 </div>
//             </div>
//             <div className="col-md-3 col-6 mb-3">
//                 <div className="p-3 bg-light rounded">
//                     <h4 className="mb-0">1000+</h4>
//                     <small className="text-muted">Patients</small>
//                 </div>
//             </div>
//             <div className="col-md-3 col-6 mb-3">
//                 <div className="p-3 bg-light rounded">
//                     <h4 className="mb-0">15+</h4>
//                     <small className="text-muted">Services</small>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <div className="container py-5">
//             {/* Doctor Profile Card */}
//             <div className="card shadow-sm mb-5">
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-md-3 text-center">
//                             <img
//                                 src="/api/placeholder/200/200"
//                                 alt="Doctor"
//                                 className="img-fluid rounded-circle mb-3"
//                                 style={{ maxWidth: '200px' }}
//                             />
//                             <div className="d-flex justify-content-center gap-2 mb-3">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                     <Star key={star} className="text-warning" size={20} fill="#ffc107" />
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="col-md-9">
//                             <div className="d-flex justify-content-between align-items-start">
//                                 <div>
//                                     <h2 className="mb-1">Dr. Richard James</h2>
//                                     <p className="text-muted mb-2">MBBS - General Physician</p>
//                                 </div>
//                                 <span className="badge bg-primary px-3 py-2">$50/Visit</span>
//                             </div>

//                             <div className="mb-3">
//                                 <div className="d-flex align-items-center mb-2">
//                                     <MapPin size={18} className="text-primary me-2" />
//                                     <span>123 Medical Center, Healthcare Avenue, NY</span>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <Phone size={18} className="text-primary me-2" />
//                                     <span>+1 234 567 8900</span>
//                                 </div>
//                             </div>

//                             <p className="mb-3">
//                                 Dr. James has a strong commitment to delivering comprehensive medical care,
//                                 focusing on preventive medicine, early diagnosis, and effective treatment strategies.
//                             </p>

//                             <DoctorStats />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Booking Section */}
//             <div className="card shadow-sm">
//                 <div className="card-body">
//                     <h3 className="card-title mb-4">
//                         {view === 'calendar' ? 'Select Date' : 'Select Time'}
//                     </h3>

//                     {view === 'calendar' ? (
//                         <>
//                             <div className="row row-cols-2 row-cols-md-4 row-cols-lg-7 g-3 mb-4">
//                                 {availableDates.map((date) => (
//                                     <div className="col" key={date.toISOString()}>
//                                         <button
//                                             onClick={() => {
//                                                 setSelectedDate(date);
//                                                 setView('time');
//                                             }}
//                                             className={`btn w-100 h-100 p-3 ${selectedDate?.toISOString() === date.toISOString()
//                                                 ? 'btn-primary'
//                                                 : 'btn-outline-primary'
//                                                 }`}
//                                         >
//                                             <div className="text-center">
//                                                 <small className="d-block">{format(date, 'EEE')}</small>
//                                                 <strong className="d-block mb-1">{format(date, 'd')}</strong>
//                                                 <small>{format(date, 'MMM')}</small>
//                                             </div>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <button
//                                 className="btn btn-link text-decoration-none mb-4"
//                                 onClick={() => setView('calendar')}
//                             >
//                                 <i className="bi bi-arrow-left"></i> Back to dates
//                             </button>

//                             <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 mb-4">
//                                 {timeSlots.map((slot, index) => (
//                                     <div className="col" key={index}>
//                                         <button
//                                             onClick={() => setSelectedTime(slot.time)}
//                                             disabled={!slot.available}
//                                             className={`btn w-100 ${selectedTime === slot.time
//                                                 ? 'btn-primary'
//                                                 : slot.available
//                                                     ? 'btn-outline-primary'
//                                                     : 'btn-outline-secondary'
//                                                 }`}
//                                         >
//                                             <Clock size={16} className="me-2" />
//                                             {slot.time}
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>

//                             <button
//                                 onClick={handleBookAppointment}
//                                 disabled={loading || !selectedTime}
//                                 className="btn btn-primary w-100 py-3"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                         Booking...
//                                     </>
//                                 ) : (
//                                     'Confirm Appointment'
//                                 )}
//                             </button>
//                         </>
//                     )}

//                     {error && (
//                         <div className="alert alert-danger mt-3" role="alert">
//                             {error}
//                         </div>
//                     )}

//                     {success && (
//                         <div className="alert alert-success mt-3" role="alert">
//                             Appointment booked successfully! We'll send you a confirmation email shortly.
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Related Doctors */}
//             <h3 className="mt-5 mb-4">Related Doctors</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//                 {[1, 2, 3, 4].map((index) => (
//                     <div className="col" key={index}>
//                         <div className="card h-100">
//                             <img
//                                 src={`/api/placeholder/300/200`}
//                                 className="card-img-top"
//                                 alt={`Doctor ${index}`}
//                             />
//                             <div className="card-body">
//                                 <h5 className="card-title">Dr. Sarah Wilson</h5>
//                                 <p className="card-text text-muted">General Physician</p>
//                                 <span className="badge bg-success">Available</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointmentPage;










// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';


// const DoctorAppointmentPage = () => {
//     const [selectedDate, setSelectedDate] = useState('10');
//     const [selectedTime, setSelectedTime] = useState('9:00 am');

//     const dates = [
//         { day: 'MON', date: '10' },
//         { day: 'TUE', date: '11' },
//         { day: 'WED', date: '12' },
//         { day: 'THU', date: '13' },
//         { day: 'FRI', date: '14' },
//         { day: 'SAT', date: '15' },
//         { day: 'SUN', date: '16' }
//     ];

//     const timeSlots = [
//         '8:00 am', '8:30 am', '9:00 am', '9:30 am',
//         '10:00 am', '10:30 am', '11:00 am', '11:30 am'
//     ];

//     const relatedDoctors = [
//         {
//             name: 'Dr. Richard James',
//             specialty: 'General physician',
//             available: true,
//             image: '/api/placeholder/200/200'
//         },
//         // Repeat for other doctors
//     ];

//     return (
//         <Container className="py-5">
//             {/* Doctor Profile Section */}
//             <Row className="mb-5">
//                 <Col md={3}>
//                     <img
//                         src="/api/placeholder/300/300"
//                         alt="Dr. Richard James"
//                         className="img-fluid rounded"
//                     />
//                 </Col>
//                 <Col md={9}>
//                     <Card className="border-0 shadow-sm p-4">
//                         <div className="d-flex align-items-center mb-2">
//                             <h2 className="mb-0">Dr. Richard James</h2>
//                             <span className="ms-2 text-primary">✓</span>
//                             <span className="ms-3 px-2 py-1 bg-light rounded small">3 Years</span>
//                         </div>
//                         <p className="text-muted mb-3">MBBS - General Physician</p>

//                         <h6 className="mb-2">About</h6>
//                         <p className="text-muted">
//                             Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine,
//                             early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering
//                             comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective
//                             treatment strategies.
//                         </p>

//                         <div className="mt-3">
//                             <strong>Appointment fee: </strong>
//                             <span className="text-primary">$50</span>
//                         </div>
//                     </Card>
//                 </Col>
//             </Row>

//             {/* Booking Section */}
//             <h5 className="mb-4">Booking slots</h5>

//             {/* Date Selection */}
//             <div className="d-flex gap-3 mb-4 overflow-auto">
//                 {dates.map(({ day, date }) => (
//                     <Button
//                         key={date}
//                         variant={selectedDate === date ? 'primary' : 'outline-secondary'}
//                         className="rounded-pill px-4 py-2"
//                         onClick={() => setSelectedDate(date)}
//                     >
//                         <div className="text-center">
//                             <div className="small">{day}</div>
//                             <div>{date}</div>
//                         </div>
//                     </Button>
//                 ))}
//             </div>

//             {/* Time Selection */}
//             <div className="d-flex gap-3 mb-4 flex-wrap">
//                 {timeSlots.map((time) => (
//                     <Button
//                         key={time}
//                         variant={selectedTime === time ? 'primary' : 'outline-secondary'}
//                         className="rounded-pill px-4"
//                         onClick={() => setSelectedTime(time)}
//                     >
//                         {time}
//                     </Button>
//                 ))}
//             </div>

//             {/* Book Appointment Button */}
//             <Button
//                 variant="primary"
//                 size="lg"
//                 className="rounded-pill px-5 py-2 mb-5 w-100"
//             >
//                 Book an appointment
//             </Button>

//             {/* Related Doctors Section */}
//             <div className="mt-5">
//                 <h3 className="text-center mb-3">Related Doctors</h3>
//                 <p className="text-center text-muted mb-4">Simply browse through our extensive list of trusted doctors.</p>

//                 <Row>
//                     {relatedDoctors.map((doctor, index) => (
//                         <Col key={index} md={4} lg={3} className="mb-4">
//                             <Card className="border-0 shadow-sm h-100">
//                                 <Card.Img variant="top" src={doctor.image} />
//                                 <Card.Body>
//                                     <div className="d-flex align-items-center mb-2">
//                                         <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
//                                         <small className="text-success">Available</small>
//                                     </div>
//                                     <h6 className="mb-1">{doctor.name}</h6>
//                                     <small className="text-muted">{doctor.specialty}</small>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </div>
//         </Container>
//     );
// };

// export default DoctorAppointmentPage;