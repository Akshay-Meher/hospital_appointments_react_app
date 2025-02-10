import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { patientLoginRequest, patientRegisterRequest } from '../apis/authApis';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'patient'
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                return '';
            case 'role':
                if (!value) return 'Please select your role';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(name => {
            const error = validateField(name, formData[name]);
            if (error) newErrors[name] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(`Logging in as ${formData.role}:`, formData);

            try {
                // API call based on role
                if (formData.role === 'patient') {
                    const response = await patientLoginRequest(formData);
                    // console.log("response", response);
                    const resData = response?.data?.data;
                    // console.log("resData", resData);
                    dispatch(loginSuccess(resData));
                    // localStorage.setItem('user', JSON.stringify(resData));
                    setSuccessMessage(response.data.message);
                    navigate('/home');
                } else {
                    const response = await axios.post(`${BASE_URL}/doctor/login`, formData);
                    const resData = response?.data?.data;
                    dispatch(loginSuccess(resData));
                    // localStorage.setItem('user', JSON.stringify(resData));
                    setSuccessMessage(response.data.message);
                    navigate('/home');
                }
            } catch (error) {
                console.log("error with login", error);
                if (Array.isArray(error.response.data)) {
                    setErrorMessage(error.response.data[0].message);
                } else {
                    setErrorMessage(error.response.data.message);
                }
            }

        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="shadow p-4 rounded-4 bg-light border border-primary">
                    <div className="card-body">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold mb-4">
                                <i className="bi bi-heart-pulse me-2 text-primary"></i>
                                HealthConnect
                            </h2>
                            {successMessage && <span className="alert alert-success p-3">{successMessage}</span>}
                            {errorMessage && <span className="alert alert-danger p-3">{errorMessage}</span>}
                        </div>



                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <label htmlFor="role" className="form-label fw-medium">Role</label>
                                <div className="input-group">
                                    {/* <span className="input-group-text">
                                        <i className="bi bi-person-badge"></i>
                                    </span> */}
                                    <select
                                        className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </div>
                                {errors.role && <div className="text-danger mt-2 small">{errors.role}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-medium">Email</label>
                                <div className="input-group">
                                    {/* <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span> */}
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && <div className="text-danger mt-2 small">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-medium">Password</label>
                                <div className="input-group">
                                    {/* <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span> */}
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && <div className="text-danger mt-2 small">{errors.password}</div>}
                            </div>

                            <div className="d-grid mb-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg fw-semibold shadow-sm py-2"
                                >
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Sign In
                                </button>
                            </div>

                            <div className="text-center mb-3">
                                <Link to="/forgot-password" className="text-decoration-none small text-muted text-primary">
                                    <i className="bi bi-question-circle me-1"></i>
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>

                        <div className="text-center mt-4 pt-3 border-top">
                            <p className="text-muted small mb-0">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-medium">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
