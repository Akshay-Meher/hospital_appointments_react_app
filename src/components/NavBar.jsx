import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../css/navbar.css';
import UserProfileDrodown from "./userProfileDrodown";
import { useSelector } from "react-redux";


const NavBar = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated);
        setIsLogin(isAuthenticated);
    }, [isAuthenticated]);


    return (
        <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3">
            <Container>
                {/* Brand Logo */}
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
                    Prescripto
                </Navbar.Brand>

                {/* Toggle Button for Small Screens */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    {/* Navigation Tabs */}
                    <Nav className="me-auto d-flex align-items-center gap-3">
                        <Nav.Link
                            as={NavLink}
                            to="/home"
                            className="fw-semibold text-secondary"
                            activeClassName="text-primary"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/doctors"
                            className="fw-semibold text-secondary"
                            activeClassName="text-primary"
                        >
                            All Doctors
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/about"
                            className="fw-semibold text-secondary"
                            activeClassName="text-primary"
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/contact"
                            className="fw-semibold text-secondary"
                            activeClassName="text-primary"
                        >
                            Contact
                        </Nav.Link>
                    </Nav>

                    {/* User Profile Dropdown */}
                    {
                        isLogin && <UserProfileDrodown />
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;












// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { NavLink, useLocation } from "react-router-dom";

// const NavBar = () => {
//     const location = useLocation(); // Get the current page path

//     return (
//         <Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm py-3">
//             <Container>
//                 {/* Brand Logo */}
//                 <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
//                     <img
//                         src="/api/placeholder/40/40"
//                         alt="Prescripto Logo"
//                         className="me-2 rounded-circle"
//                         style={{ width: "40px", height: "40px" }}
//                     />
//                     <span className="h5 mb-0 text-white">Prescripto</span>
//                 </Navbar.Brand>

//                 {/* Toggle Button for Small Screens */}
//                 <Navbar.Toggle aria-controls="navbar-nav" />

//                 <Navbar.Collapse id="navbar-nav">
//                     <Nav className="ms-auto d-flex gap-lg-4 gap-2">
//                         {[
//                             { name: "Home", path: "/home" },
//                             { name: "All Doctors", path: "/doctors" },
//                             { name: "About", path: "/about" },
//                             { name: "Contact", path: "/contact" },
//                         ].map((link) => (
//                             <Nav.Link
//                                 as={NavLink}
//                                 to={link.path}
//                                 key={link.name}
//                                 className={`nav-link px-3 py-2 rounded ${location.pathname === link.path ? "bg-white text-primary fw-bold shadow-sm" : "text-white"
//                                     }`}
//                             >
//                                 {link.name}
//                             </Nav.Link>
//                         ))}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default NavBar;













// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom'; // Using NavLink to manage active links

// const NavBar = () => {
//     return (
//         <Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm py-3">
//             <Container>
//                 <Navbar.Brand href="#home" className="d-flex align-items-center">
//                     <img
//                         src="/api/placeholder/40/40"
//                         alt="Prescripto Logo"
//                         className="me-2"
//                     />
//                     <span className="h5 mb-0 text-white">Prescripto</span>
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbar-nav" />
//                 <Navbar.Collapse id="navbar-nav">
//                     <Nav className="ms-auto d-flex gap-4">
//                         {/* Use NavLink for active link management */}
//                         <Nav.Link>
//                             <NavLink
//                                 to="/home"
//                                 className={({ isActive }) =>
//                                     isActive
//                                         ? 'nav-link active-link'
//                                         : 'nav-link text-white'
//                                 }
//                             >
//                                 Home
//                             </NavLink>
//                         </Nav.Link>
//                         <Nav.Link>
//                             <NavLink
//                                 to="/doctors"
//                                 className={({ isActive }) =>
//                                     isActive
//                                         ? 'nav-link active-link'
//                                         : 'nav-link text-white'
//                                 }
//                             >
//                                 All Doctors
//                             </NavLink>
//                         </Nav.Link>
//                         <Nav.Link>
//                             <NavLink
//                                 to="/about"
//                                 className={({ isActive }) =>
//                                     isActive
//                                         ? 'nav-link active-link'
//                                         : 'nav-link text-white'
//                                 }
//                             >
//                                 About
//                             </NavLink>
//                         </Nav.Link>
//                         <Nav.Link>
//                             <NavLink
//                                 to="/contact"
//                                 className={({ isActive }) =>
//                                     isActive
//                                         ? 'nav-link active-link'
//                                         : 'nav-link text-white'
//                                 }
//                             >
//                                 Contact
//                             </NavLink>
//                         </Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default NavBar;
