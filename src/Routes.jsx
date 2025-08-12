import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DashboardPrincipal from './pages/dashboard-principal';
import CheckoutDeHuespedes from './pages/check-out-de-hu-spedes';
import LoginPage from './pages/login';
import GestionDeHabitaciones from './pages/gesti-n-de-habitaciones';
import CheckInDeHuespedes from './pages/check-in-de-hu-spedes';
import HistorialYReportes from './pages/historial-y-reportes';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CheckInDeHuespedes />} />
        <Route path="/dashboard-principal" element={<DashboardPrincipal />} />
        <Route path="/check-out-de-hu-spedes" element={<CheckoutDeHuespedes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gesti-n-de-habitaciones" element={<GestionDeHabitaciones />} />
        <Route path="/check-in-de-hu-spedes" element={<CheckInDeHuespedes />} />
        <Route path="/historial-y-reportes" element={<HistorialYReportes />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
