import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import PageLoader from "../components/PageLoader";

const NotFound = lazy(() => import("../components/NotFound"));

const Router = () => {
  return (
    <Suspense fallback={<PageLoader/>}>
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
            <Suspense fallback={<PageLoader/>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
