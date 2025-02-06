import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense, useEffect, useState } from 'react';
import PageLoader from '../components/PageLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(null);
  const location = useLocation();
  useEffect(() => {

    const userToken = localStorage.getItem('user');
    // Check if token exists and is valid
    if (userToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const userToken = localStorage.getItem('user');
  console.log("userToken", userToken)

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default ProtectedRoute; 