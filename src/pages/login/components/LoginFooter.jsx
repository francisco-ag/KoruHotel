import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 text-center space-y-4">
      {/* System Status */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="font-medium">Sistema Operativo</span>
        </div>
      </div>

      {/* Support Information */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Conexión Segura</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>24/7 Disponible</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="HelpCircle" size={14} />
          <span>Soporte Técnico</span>
        </div>
      </div>

      {/* Version and Copyright */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Versión 2.1.4</span>
          <span>© {currentYear} Motel Manager. Todos los derechos reservados.</span>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="text-xs text-muted-foreground">
        <p>¿Problemas de acceso? Contacte al administrador del sistema</p>
        <p className="font-data mt-1">soporte@hotelguest.com | +34 900 123 456</p>
      </div>
    </div>
  );
};

export default LoginFooter;