import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Hotel" size={32} color="white" />
        </div>
      </div>

      {/* Brand Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">
          MotelGuest Manager
        </h1>
        <p className="text-lg text-muted-foreground">
          Sistema de Gestión Motel
        </p>
      </div>

      {/* Welcome Message */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-primary font-medium">
          Bienvenido al sistema de gestión hotelera
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Inicie sesión para acceder al panel de control
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;