import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Nuevo Check-in',
      icon: 'UserPlus',
      variant: 'default',
      action: () => navigate('/check-in-de-hu-spedes')
    },
    {
      label: 'Procesar Check-out',
      icon: 'UserMinus',
      variant: 'secondary',
      action: () => navigate('/check-out-de-hu-spedes')
    },
    {
      label: 'Gestionar Habitaciones',
      icon: 'Bed',
      variant: 'outline',
      action: () => navigate('/gesti-n-de-habitaciones')
    },
    {
      label: 'Ver Reportes',
      icon: 'FileText',
      variant: 'outline',
      action: () => navigate('/historial-y-reportes')
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Acciones Rápidas
      </h3>
      {quickActions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant}
          iconName={action?.icon}
          iconPosition="left"
          onClick={action?.action}
          fullWidth
          className="justify-start"
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;