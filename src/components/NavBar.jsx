import React from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../css/navbar.css';


const NavBar = () => {
    const user = {
        name: "Sardor",
        email: "sardor@mail.com",
        avatar: "/api/user-avatar.jpg", // Replace with the actual avatar URL
        plan: "PRO",
    };

    const handleLogout = () => {
        console.log("User logged out");
    };

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
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            as="div"
                            className="d-flex align-items-center cursor-pointer border border-light rounded-pill px-3 py-2 shadow-sm"
                            style={{
                                backgroundColor: "#f8f9fa",
                                cursor: "pointer",
                            }}
                        >
                            <Image
                                src={user.avatar}
                                alt="User Avatar"
                                roundedCircle
                                width={30}
                                height={30}
                                className="me-2"
                            />
                            <div className="d-flex flex-column">
                                <span className="fw-bold">{user.name}</span>
                                <span
                                    className="text-uppercase badge bg-primary text-white small"
                                    style={{
                                        fontSize: "10px",
                                        padding: "2px 4px",
                                    }}
                                >
                                    {user.plan}
                                </span>
                            </div>
                            <i className="bi bi-chevron-down ms-2 text-secondary"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            className="shadow-sm"
                            style={{
                                borderRadius: "12px",
                                minWidth: "250px",
                                padding: "16px",
                                backgroundColor: "#ffffff",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {/* User Info */}
                            <div className="d-flex align-items-center mb-3">
                                <Image
                                    src={user.avatar}
                                    alt="User Avatar"
                                    roundedCircle
                                    width={40}
                                    height={40}
                                    className="me-3"
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">{user.name}</h6>
                                    <small className="text-muted">{user.email}</small>
                                </div>
                            </div>
                            <Dropdown.Divider />

                            {/* Dropdown Menu Items */}
                            <Dropdown.Item href="/profile" className="d-flex align-items-center py-2">
                                <i className="bi bi-gear me-2 text-primary"></i> Profile Settings
                            </Dropdown.Item>
                            <Dropdown.Item href="/help" className="d-flex align-items-center py-2">
                                <i className="bi bi-question-circle me-2 text-primary"></i> Help Center
                            </Dropdown.Item>
                            <Dropdown.Item href="#" className="d-flex align-items-center py-2">
                                <i className="bi bi-moon me-2 text-primary"></i> Dark Mode
                            </Dropdown.Item>
                            <Dropdown.Item href="/upgrade" className="d-flex align-items-center py-2">
                                <i className="bi bi-arrow-up-right-circle me-2 text-primary"></i> Upgrade Plan
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={handleLogout}
                                className="d-flex align-items-center py-2 text-danger"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
