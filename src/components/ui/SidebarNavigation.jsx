import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarNavigation = ({ isCollapsed = false, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Don't render sidebar on login page
  if (location?.pathname === '/login') {
    return null;
  }

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-principal',
      icon: 'LayoutDashboard',
      tooltip: 'Panel principal con resumen operativo'
    },
    {
      label: 'Check-in',
      path: '/check-in-de-hu-spedes',
      icon: 'UserPlus',
      tooltip: 'Registro de entrada de huéspedes'
    },
    {
      label: 'Check-out',
      path: '/check-out-de-hu-spedes',
      icon: 'UserMinus',
      tooltip: 'Proceso de salida de huéspedes'
    },
    {
      label: 'Habitaciones',
      path: '/gesti-n-de-habitaciones',
      icon: 'Bed',
      tooltip: 'Gestión y configuración de habitaciones'
    },
    {
      label: 'Reportes',
      path: '/historial-y-reportes',
      icon: 'FileText',
      tooltip: 'Historial y análisis de datos'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-900 sidebar-transition hidden md:block ${
        isCollapsed ? 'w-16' : 'w-60'
      } ${className}`}>
        <nav className="h-full flex flex-col py-6">
          <div className="flex-1 space-y-2 px-3">
            {navigationItems?.map((item) => {
              const isActive = isActiveRoute(item?.path);
              
              return (
                <div
                  key={item?.path}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item?.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left nav-item-hover transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.tooltip : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-sm truncate">
                        {item?.label}
                      </span>
                    )}
                  </button>
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === item?.path && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-modal whitespace-nowrap z-1100">
                      {item?.tooltip}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Collapse Toggle */}
          <div className="px-3 pt-4 border-t border-border">
            <button
              onClick={() => {/* Handle collapse toggle */}}
              className="w-full flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
            >
              <Icon 
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={16} 
              />
            </button>
          </div>
        </nav>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-900 md:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.slice(0, 4)?.map((item) => {
            const isActive = isActiveRoute(item?.path);
            
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary' :'text-muted-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActive ? 'text-primary' : ''}
                />
                <span className="text-xs font-medium">
                  {item?.label}
                </span>
              </button>
            );
          })}
          
          {/* More menu for additional items */}
          <button className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-muted-foreground">
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-medium">Más</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default SidebarNavigation;