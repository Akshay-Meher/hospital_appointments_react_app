import React, { useState } from 'react';
import PatientRegistration from '../components/PatientRegistration';
import DoctorRegistration from '../components/DoctorRegistration';

const Register = () => {
    const [role, setRole] = useState('Patient');

    return (
        <div>
            {/* Role-Based Forms */}
            <div className="mt-4 p-3 rounded shadow-sm bg-light">
                {role === 'Patient' ? <PatientRegistration role={role} setRole={setRole} /> : <DoctorRegistration role={role} setRole={setRole} />}
            </div>
        </div>
    );
};

export default Register;





































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {

//     return (
//         <div className='container col-10 col-sm-6'>

//         </div>
//     );
// };


// export default Register;

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }
//         console.log('Registration Data:', formData);
//     };

//     return (
//         <div className='container col-10 col-sm-6'>
//             <div className="card p-3 shadow-sm">
//                 <h3 className="mb-4 text-center">Register</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">Full Name</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100">Register</button>
//                     <p className="mt-3 text-center">
//                         Already have an account? <Link to="/login">Login</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

