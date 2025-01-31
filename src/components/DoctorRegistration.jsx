import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegistration = ({ role, setRole }) => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        specialization: '',
        license_number: '',
        years_of_experience: '',
        gender: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.name) {
            isValid = false;
            newErrors.name = 'First name is required.';
        }

        if (!formData.last_name) {
            isValid = false;
            newErrors.last_name = 'Last name is required.';
        }

        if (!formData.email) {
            isValid = false;
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            newErrors.email = 'Email is invalid.';
        }

        if (!formData.password) {
            isValid = false;
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            isValid = false;
            newErrors.password = 'Password must be at least 6 characters.';
        }

        if (!formData.phone) {
            isValid = false;
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            isValid = false;
            newErrors.phone = 'Phone number must be 10 digits.';
        }

        if (!formData.specialization) {
            isValid = false;
            newErrors.specialization = 'Specialization is required.';
        }

        if (!formData.license_number) {
            isValid = false;
            newErrors.license_number = 'License number is required.';
        }

        if (formData.years_of_experience && (formData.years_of_experience < 0 || isNaN(formData.years_of_experience))) {
            isValid = false;
            newErrors.years_of_experience = 'Years of experience must be a positive number.';
        }

        if (!formData.gender) {
            isValid = false;
            newErrors.gender = 'Gender is required.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/doctor/register', formData);
                setSuccessMessage('Registration successful!');
                setErrorMessage('');
                setFormData({
                    name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    phone: '',
                    specialization: '',
                    license_number: '',
                    years_of_experience: '',
                    gender: '',
                });
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Registration failed.');
                setSuccessMessage('');
            }
        }
    };

    return (

        <div className="container " style={{ maxWidth: '600px' }}>


            <div className="btn-group" style={{ width: "100%", margin: "10px 0 10px 0" }}>
                <button
                    className={`btn btn-sm ${role === 'Patient' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setRole('Patient')}
                >
                    Patient
                </button>
                <button
                    className={`btn btn-sm ${role === 'Doctor' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setRole('Doctor')}
                >
                    Doctor
                </button>
            </div>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light border border-primary">
                <h5 className="mb-1 text-center text-primary">Doctor Registration</h5>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label text-secondary">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                        {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Phone</label>
                        <input
                            type="text"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Specialization</label>
                        <input
                            type="text"
                            className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="Enter specialization"
                        />
                        {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label text-secondary">License Number</label>
                        <input
                            type="text"
                            className={`form-control ${errors.license_number ? 'is-invalid' : ''}`}
                            name="license_number"
                            value={formData.license_number}
                            onChange={handleChange}
                            placeholder="Enter license number"
                        />
                        {errors.license_number && <div className="invalid-feedback">{errors.license_number}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Years of Experience</label>
                        <input
                            type="number"
                            className={`form-control ${errors.years_of_experience ? 'is-invalid' : ''}`}
                            name="years_of_experience"
                            value={formData.years_of_experience}
                            onChange={handleChange}
                            placeholder="Enter years of experience"
                        />
                        {errors.years_of_experience && <div className="invalid-feedback">{errors.years_of_experience}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label text-secondary">Gender</label>
                        <select
                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-50">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorRegistration;