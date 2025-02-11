import React from 'react'
import { Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { logOut } from '../apis/authApis';

function UserProfileDrodown() {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout");
        sessionStorage.clear();
        localStorage.clear();
        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });

        const fetchData = async () => {

            try {
                const allResponse = await logOut();
                console.log("logOut", allResponse);
            } catch (err) {
                console.log("logOut err", err);
            }
        };

        fetchData();

        dispatch(logout());
        navigate('/login');
    };

    return (
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
                    src={user?.avatar}
                    alt="User Avatar"
                    roundedCircle
                    width={30}
                    height={30}
                    className="me-2"
                />
                <div className="d-flex flex-column">
                    <span className="fw-bold">{user?.name}</span>
                    <span
                        className="text-uppercase badge bg-primary text-white small"
                        style={{
                            fontSize: "10px",
                            padding: "2px 4px",
                        }}
                    >
                        {user?.plan}
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
                }}>
                {/* User Info */}
                <div className="d-flex align-items-center mb-3">
                    <Image
                        src={user?.avatar}
                        alt="User Avatar"
                        roundedCircle
                        width={40}
                        height={40}
                        className="me-3"
                    />
                    <div>
                        <h6 className="mb-0 fw-bold">{user?.name}</h6>
                        <small className="text-muted">{user?.email}</small>
                    </div>
                </div>
                <Dropdown.Divider />

                {/* Dropdown Menu Items */}
                {/* 
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
                */}
                <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center py-2">
                    <i className="bi bi-gear me-2 text-primary"></i> Profile Settings
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={handleLogout}
                    className="d-flex align-items-center py-2 text-danger"
                >
                    <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserProfileDrodown