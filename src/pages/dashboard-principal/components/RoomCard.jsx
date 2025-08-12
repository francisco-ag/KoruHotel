import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoomCard = ({ room, onStatusChange, onViewDetails }) => {
  const statusConfig = {
    available: {
      color: 'bg-success text-success-foreground',
      icon: 'CheckCircle',
      label: 'Disponible'
    },
    occupied: {
      color: 'bg-error text-error-foreground',
      icon: 'User',
      label: 'Ocupada'
    },
    cleaning: {
      color: 'bg-warning text-warning-foreground',
      icon: 'Sparkles',
      label: 'Limpieza'
    },
    maintenance: {
      color: 'bg-secondary text-secondary-foreground',
      icon: 'Wrench',
      label: 'Mantenimiento'
    }
  };

  const currentStatus = statusConfig?.[room?.status] || statusConfig?.available;

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(timeString)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      {/* Room Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">
            {room?.number}
          </h3>
          <span className="text-sm text-muted-foreground">
            {room?.type}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus?.color}`}>
          <div className="flex items-center space-x-1">
            <Icon name={currentStatus?.icon} size={12} />
            <span>{currentStatus?.label}</span>
          </div>
        </div>
      </div>
      {/* Room Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Capacidad:</span>
          <span className="text-foreground font-medium">
            {room?.currentGuests || 0}/{room?.capacity} huéspedes
          </span>
        </div>

        {room?.status === 'occupied' && room?.guests && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Huéspedes:</span>
            {room?.guests?.slice(0, 2)?.map((guest, index) => (
              <div key={index} className="text-sm text-foreground">
                {guest?.name}
              </div>
            ))}
            {room?.guests?.length > 2 && (
              <div className="text-sm text-muted-foreground">
                +{room?.guests?.length - 2} más
              </div>
            )}
          </div>
        )}

        {room?.checkInTime && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Check-in:</span>
            <span className="text-foreground font-data">
              {formatTime(room?.checkInTime)}
            </span>
          </div>
        )}

        {room?.checkOutTime && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Check-out:</span>
            <span className="text-foreground font-data">
              {formatTime(room?.checkOutTime)}
            </span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(room)}
          className="flex-1"
        >
          Ver Detalles
        </Button>
        
        {room?.status === 'available' && (
          <Button
            variant="default"
            size="sm"
            iconName="UserPlus"
            onClick={() => onStatusChange(room?.id, 'check-in')}
            className="flex-1"
          >
            Check-in
          </Button>
        )}
        
        {room?.status === 'occupied' && (
          <Button
            variant="secondary"
            size="sm"
            iconName="UserMinus"
            onClick={() => onStatusChange(room?.id, 'check-out')}
            className="flex-1"
          >
            Check-out
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;