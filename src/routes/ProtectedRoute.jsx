import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import PageLoader from '../components/PageLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Suspense fallback={<PageLoader/>}>{children}</Suspense>;
};

export default ProtectedRoute; 