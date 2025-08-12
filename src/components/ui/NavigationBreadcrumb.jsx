import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ className = '' }) => {
  const location = useLocation();

  // Don't render breadcrumb on login page
  if (location?.pathname === '/login') {
    return null;
  }

  const breadcrumbMap = {
    '/dashboard-principal': {
      title: 'Dashboard Principal',
      breadcrumbs: [
        { label: 'Inicio', path: '/dashboard-principal' }
      ]
    },
    '/check-in-de-hu-spedes': {
      title: 'Check-in de Huéspedes',
      breadcrumbs: [
        { label: 'Inicio', path: '/dashboard-principal' },
        { label: 'Check-in', path: '/check-in-de-hu-spedes' }
      ]
    },
    '/check-out-de-hu-spedes': {
      title: 'Check-out de Huéspedes',
      breadcrumbs: [
        { label: 'Inicio', path: '/dashboard-principal' },
        { label: 'Check-out', path: '/check-out-de-hu-spedes' }
      ]
    },
    '/gesti-n-de-habitaciones': {
      title: 'Gestión de Habitaciones',
      breadcrumbs: [
        { label: 'Inicio', path: '/dashboard-principal' },
        { label: 'Habitaciones', path: '/gesti-n-de-habitaciones' }
      ]
    },
    '/historial-y-reportes': {
      title: 'Historial y Reportes',
      breadcrumbs: [
        { label: 'Inicio', path: '/dashboard-principal' },
        { label: 'Reportes', path: '/historial-y-reportes' }
      ]
    }
  };

  const currentPage = breadcrumbMap?.[location?.pathname];

  if (!currentPage) {
    return null;
  }

  return (
    <div className={`bg-background border-b border-border ${className}`}>
      <div className="px-8 py-4">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-semibold text-foreground">
            {currentPage?.title}
          </h1>
          <div className="text-sm text-muted-foreground font-data">
            {new Date()?.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm">
          {currentPage?.breadcrumbs?.map((crumb, index) => {
            const isLast = index === currentPage?.breadcrumbs?.length - 1;
            
            return (
              <div key={crumb?.path} className="flex items-center space-x-2">
                {index > 0 && (
                  <Icon 
                    name="ChevronRight" 
                    size={14} 
                    className="text-muted-foreground"
                  />
                )}
                {isLast ? (
                  <span className="text-foreground font-medium">
                    {crumb?.label}
                  </span>
                ) : (
                  <Link
                    to={crumb?.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {crumb?.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationBreadcrumb;