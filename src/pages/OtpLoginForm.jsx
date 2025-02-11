import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { sendLoginOtp } from '../apis/authApis';

const OtpLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        role: '',
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(30);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let interval;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Replace with your actual API call
            // const response = await fetch('your-api-endpoint/send-otp', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });

            const response = await sendLoginOtp(formData);
            // const data = await response.json();
            const data = response?.data;
            console.log("OTP response", response);
            console.log("OTP response?.data", data);
            if (response.data.success) {
                setStep(2);
                setIsTimerRunning(true);
            } else {
                setError(data?.message || 'Failed to send OTP. Please try again.');
            }
        } catch (err) {
            console.log("err", err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpInput = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                const nextInput = e.target.nextElementSibling;
                if (nextInput) nextInput.focus();
            }
            if (!value && index > 0) {
                const prevInput = e.target.previousElementSibling;
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Replace with your actual API call
            const response = await fetch('your-api-endpoint/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    otp: otp.join('')
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful verification (e.g., redirect or set auth token)
                console.log('Successfully verified!');
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = () => {
        setStep(1);
        setOtp(['', '', '', '', '', '']);
        setTimer(30);
        setIsTimerRunning(false);
        setError('');
    };

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center py-5">
            <Card
                className="border-0 shadow-sm"
                style={{
                    maxWidth: '450px',
                    width: '100%',
                    backgroundColor: '#ffffff'
                }}
            >
                <Card.Body className="p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h4 className="fw-bold mb-1">Welcome Back!</h4>
                        <p className="text-muted">
                            {step === 1 ? 'Enter your details to receive OTP' : 'Enter the OTP sent to your email'}
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 mb-4" role="alert">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <Form onSubmit={handleEmailSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted fw-medium">Select Role</Form.Label>
                                <Form.Select
                                    value={formData.role}
                                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                    required
                                    className="py-2 px-3"
                                >
                                    <option value="">Select your role</option>
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-muted fw-medium">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                    className="py-2 px-3"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                className="w-100 py-2"
                                disabled={loading || !formData.email || !formData.role}
                                style={{
                                    backgroundColor: '#4361ee',
                                    border: 'none'
                                }}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </Button>
                        </Form>
                    ) : (
                        <Form onSubmit={handleVerifyOtp}>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Selected Role:</small>
                                    <span className="badge bg-light text-dark">{formData.role}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Email:</small>
                                    <span className="text-truncate ms-2">{formData.email}</span>
                                </div>
                            </div>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-muted fw-medium mb-3">Enter OTP</Form.Label>
                                <div className="d-flex gap-2 justify-content-between mb-3">
                                    {otp.map((digit, index) => (
                                        <Form.Control
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpInput(e, index)}
                                            className="text-center fw-bold"
                                            style={{
                                                width: '45px',
                                                height: '45px',
                                                fontSize: '1.2rem',
                                                padding: '0.375rem'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="text-center mb-4">
                                    {isTimerRunning ? (
                                        <span className="text-muted">Resend OTP in {timer}s</span>
                                    ) : (
                                        <Button
                                            variant="link"
                                            onClick={handleResendOtp}
                                            className="text-decoration-none p-0"
                                            style={{ color: '#4361ee' }}
                                        >
                                            Resend OTP
                                        </Button>
                                    )}
                                </div>
                            </Form.Group>

                            <Button
                                type="submit"
                                className="w-100 py-2"
                                disabled={loading || otp.some(digit => !digit)}
                                style={{
                                    backgroundColor: '#4361ee',
                                    border: 'none'
                                }}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OtpLoginForm;




// import React, { useState, useEffect } from 'react';
// import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

// const OtpLoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const [step, setStep] = useState(1);
//     const [timer, setTimer] = useState(30);
//     const [isTimerRunning, setIsTimerRunning] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         let interval;
//         if (isTimerRunning && timer > 0) {
//             interval = setInterval(() => {
//                 setTimer((prev) => prev - 1);
//             }, 1000);
//         } else if (timer === 0) {
//             setIsTimerRunning(false);
//         }
//         return () => clearInterval(interval);
//     }, [isTimerRunning, timer]);

//     const handleEmailSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         // Simulate API call
//         setTimeout(() => {
//             setStep(2);
//             setIsTimerRunning(true);
//             setLoading(false);
//         }, 1500);
//     };

//     const handleOtpInput = (e, index) => {
//         const value = e.target.value;
//         if (value.length <= 1 && /^[0-9]*$/.test(value)) {
//             const newOtp = [...otp];
//             newOtp[index] = value;
//             setOtp(newOtp);

//             // Auto-focus next input
//             if (value && index < 5) {
//                 const nextInput = e.target.nextElementSibling;
//                 if (nextInput) {
//                     nextInput.focus();
//                 }
//             }
//             // Auto-focus previous input on backspace
//             if (!value && index > 0) {
//                 const prevInput = e.target.previousElementSibling;
//                 if (prevInput) {
//                     prevInput.focus();
//                 }
//             }
//         }
//     };

//     const handleVerifyOtp = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         // Simulate API call
//         setTimeout(() => {
//             alert('OTP Verified Successfully!');
//             setLoading(false);
//         }, 1500);
//     };

//     const handleResendOtp = () => {
//         setTimer(30);
//         setIsTimerRunning(true);
//         setOtp(['', '', '', '', '', '']);
//         // Simulate API call for resending OTP
//         // Add your API call here
//     };

//     return (
//         <Container className="min-vh-100 d-flex align-items-center justify-content-center py-5">
//             <Card
//                 className="border-0 shadow-sm"
//                 style={{
//                     maxWidth: '450px',
//                     width: '100%',
//                     backgroundColor: '#ffffff'
//                 }}
//             >
//                 <Card.Body className="p-4 p-md-5">
//                     <div className="text-center mb-4">
//                         <h4 className="fw-bold mb-1">Welcome Back!</h4>
//                         <p className="text-muted">
//                             {step === 1 ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
//                         </p>
//                     </div>

//                     {step === 1 ? (
//                         <Form onSubmit={handleEmailSubmit}>
//                             <Form.Group className="mb-4">
//                                 <Form.Label className="text-muted fw-medium">Email address</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     className="py-2 px-3"
//                                     style={{ fontSize: '1rem' }}
//                                 />
//                             </Form.Group>
//                             <Button
//                                 type="submit"
//                                 className="w-100 py-2"
//                                 disabled={loading}
//                                 style={{
//                                     backgroundColor: '#4361ee',
//                                     border: 'none'
//                                 }}
//                             >
//                                 {loading ? 'Sending...' : 'Send OTP'}
//                             </Button>
//                         </Form>
//                     ) : (
//                         <Form onSubmit={handleVerifyOtp}>
//                             <Form.Group className="mb-4">
//                                 <Form.Label className="text-muted fw-medium mb-3">Enter OTP</Form.Label>
//                                 <div className="d-flex gap-2 justify-content-between mb-3">
//                                     {otp.map((digit, index) => (
//                                         <Form.Control
//                                             key={index}
//                                             type="text"
//                                             maxLength={1}
//                                             value={digit}
//                                             onChange={(e) => handleOtpInput(e, index)}
//                                             className="text-center fw-bold"
//                                             style={{
//                                                 width: '45px',
//                                                 height: '45px',
//                                                 fontSize: '1.2rem',
//                                                 padding: '0.375rem'
//                                             }}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="text-center mb-4">
//                                     <Button
//                                         variant="link"
//                                         onClick={handleResendOtp}
//                                         disabled={isTimerRunning}
//                                         className="text-decoration-none p-0"
//                                     >
//                                         {isTimerRunning ? (
//                                             <span className="text-muted">Resend OTP in {timer}s</span>
//                                         ) : (
//                                             <span style={{ color: '#4361ee' }}>Resend OTP</span>
//                                         )}
//                                     </Button>
//                                 </div>
//                             </Form.Group>
//                             <Button
//                                 type="submit"
//                                 className="w-100 py-2"
//                                 disabled={loading || otp.some(digit => !digit)}
//                                 style={{
//                                     backgroundColor: '#4361ee',
//                                     border: 'none'
//                                 }}
//                             >
//                                 {loading ? 'Verifying...' : 'Verify OTP'}
//                             </Button>
//                         </Form>
//                     )}
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default OtpLoginForm;