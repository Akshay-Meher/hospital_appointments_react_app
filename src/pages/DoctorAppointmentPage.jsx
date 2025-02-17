import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Award, Users, Stethoscope, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addDays, startOfToday, isToday } from 'date-fns';
import DoctorProfileCard from '../components/doctor/DoctorProfileCard';
import { QuickInfoSection } from '../components/doctor/QuickInfoSection';
import RelatedDoctors from '../components/doctor/RelatedDoctors';
import BookingSection from '../components/doctor/BookingSection';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDoctorById } from '../apis/doctorApis';
import { useSelector } from 'react-redux';
import { bookAppoiontment } from '../apis/appointmentAPis';



const DoctorAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [view, setView] = useState('calendar');
    const [isScrolled, setIsScrolled] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector((state) => state.auth);




    // Generate available dates (next 14 days)
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));
    function convertTo24Hour(time) {
        let [hour, rest] = time?.split(':');
        let [minute, period] = rest?.split(' ');

        hour = parseInt(hour);
        minute = parseInt(minute);

        // Convert PM time except for 12 PM, and convert 12 AM to 00
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        // Return formatted time
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    // console.log("selectedTime", convertTo24Hour(selectedTime));

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

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetchDoctorById(id);
                console.log("fetchDoctor response", response);
                if (response?.data?.success) {
                    setDoctor(response?.data?.data);
                }
            } catch (err) {
                console.error("DoctorDetails Error:", err);
            }
        };
        fetchDoctor();
    }, [id]);

    const handleBookAppointment = async () => {
        if (!selectedDate || !selectedTime) {
            setError('Please select both date and time');
            return;
        }

        setLoading(true);
        setError(null);

        try {

            const date = new Date(selectedDate);
            const formattedDate = date.toISOString().split("T")[0];
            console.log(formattedDate); // Output: 2025-02-16

            const formateTime = convertTo24Hour(selectedTime);
            console.log("bookAppointmentPayload", user);
            const bookAppointmentPayload = {
                patient_id: user?.id,
                doctor_id: id,
                appointment_date: formattedDate,
                appointment_time: formateTime
            };
            console.log("bookAppointmentPayload", bookAppointmentPayload);
            const response = await bookAppoiontment(bookAppointmentPayload);
            console.log("bookAppointmentPayload", response);

            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            setTimeout(() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setView('calendar');
                setSuccess(false);
            }, 3000);
        } catch (err) {
            console.log("bookAppointmentPayload", err);
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

    if (!doctor) {
        return <p className="text-center my-5">Loading doctor details...</p>;
    }


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

            {doctor && <DoctorProfileCard doctor={doctor} />}

            {/* Booking Section */}

            <BookingSection
                error={error} success={success} view={view} setView={setView} availableDates={availableDates}
                selectedDate={selectedDate} setSelectedDate={setSelectedDate} format={format}
                handleBookAppointment={handleBookAppointment} selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                loading={loading} setLoading={setLoading}
            />

            {/* Related Doctors */}
            <RelatedDoctors />

            {/* Quick Info Section */}
            <QuickInfoSection />
        </div>
    );
};

export default DoctorAppointment;

