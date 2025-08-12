import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';

const HeaderBar = ({ className = '' }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Don't render header on login page
  if (location?.pathname === '/login') {
    return null;
  }

  const user = {
    name: 'María González',
    role: 'Recepcionista',
    avatar: '/assets/images/user-avatar.jpg',
    email: 'maria.gonzalez@hotelguest.com'
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-1000 ${className}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Hotel" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                Administracion Motel
              </h1>
              <span className="text-xs text-muted-foreground leading-none">
                Sistema de Gestión Motel
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - User Controls */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {/* <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button> */}

          {/* System Status */}
          {/* <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Sistema Activo</span>
          </div> */}

          {/* User Profile */}
          <div className="relative">
            <UserProfileDropdown 
              user={user}
              isOpen={isProfileOpen}
              onToggle={() => setIsProfileOpen(!isProfileOpen)}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;