import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import PageLoader from "../components/PageLoader";
import NavBar from "../components/NavBar";
import AboutPage from "../pages/About";
import Footer from "../pages/footer";

const NotFound = lazy(() => import("../components/NotFound"));

const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <NavBar /> {/* Add NavBar here to be rendered on every route */}
      <Routes>
        {/* Redirect base route '/' to '/login' */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicRoute>
                <Element />
              </PublicRoute>
            }
          />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Catch all route - 404 */}
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
