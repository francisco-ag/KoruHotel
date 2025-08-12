import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ user, isOpen, onToggle, onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
    onClose();
  };

  const menuItems = [
    {
      label: 'Mi Perfil',
      icon: 'User',
      action: () => {
        // Handle profile navigation
        onClose();
      }
    },
    {
      label: 'Configuración',
      icon: 'Settings',
      action: () => {
        // Handle settings navigation
        onClose();
      }
    },
    {
      label: 'Ayuda',
      icon: 'HelpCircle',
      action: () => {
        // Handle help navigation
        onClose();
      }
    },
    {
      label: 'Cerrar Sesión',
      icon: 'LogOut',
      action: handleLogout,
      variant: 'destructive'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {user?.role}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden lg:block text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-1100 gentle-animation">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={item?.action}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors duration-200 ${
                  item?.variant === 'destructive' ?'text-destructive hover:text-destructive' :'text-popover-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={item?.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}
                />
                <span className="text-sm font-medium">
                  {item?.label}
                </span>
              </button>
            ))}
          </div>

          {/* Session Info */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Última conexión</span>
              <span className="font-data">11:11 AM</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>Sesión activa</span>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span>2h 15m</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;