import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RoomQuickActions = ({ onQuickAction, totalRooms, availableRooms }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActions = [
    {
      value: 'bulk-available',
      label: 'Marcar Todas Disponibles',
      icon: 'CheckCircle',
      color: 'success',
      description: 'Cambiar estado de todas las habitaciones a disponible'
    },
    {
      value: 'bulk-cleaning',
      label: 'Enviar Todas a Limpieza',
      icon: 'Sparkles',
      color: 'warning',
      description: 'Programar limpieza para todas las habitaciones'
    },
    {
      value: 'maintenance-check',
      label: 'Revisión de Mantenimiento',
      icon: 'Wrench',
      color: 'secondary',
      description: 'Programar revisión de mantenimiento preventivo'
    },
    {
      value: 'export-report',
      label: 'Exportar Reporte',
      icon: 'Download',
      color: 'primary',
      description: 'Descargar reporte de estado de habitaciones'
    }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    setIsProcessing(true);
    
    try {
      await onQuickAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Error executing action:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionColor = (color) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      secondary: 'text-secondary',
      primary: 'text-primary'
    };
    return colors?.[color] || 'text-primary';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Acciones Rápidas
          </h2>
          <p className="text-sm text-muted-foreground">
            Operaciones en lote para gestión eficiente
          </p>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-card-foreground">
            {totalRooms}
          </div>
          <div className="text-xs text-muted-foreground">
            Total Habitaciones
          </div>
        </div>
        <div className="text-center p-4 bg-success/10 rounded-lg">
          <div className="text-2xl font-bold text-success">
            {availableRooms}
          </div>
          <div className="text-xs text-muted-foreground">
            Disponibles
          </div>
        </div>
      </div>
      {/* Action Selection */}
      <div className="space-y-4">
        <Select
          label="Seleccionar Acción"
          placeholder="Elija una acción rápida"
          options={quickActions?.map(action => ({
            value: action?.value,
            label: action?.label,
            description: action?.description
          }))}
          value={selectedAction}
          onChange={setSelectedAction}
        />

        {selectedAction && (
          <div className="p-4 bg-muted/30 rounded-lg">
            {(() => {
              const action = quickActions?.find(a => a?.value === selectedAction);
              return (
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={action?.icon} 
                    size={20} 
                    className={getActionColor(action?.color)}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-card-foreground">
                      {action?.label}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action?.description}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <Button
          variant="default"
          onClick={handleExecuteAction}
          disabled={!selectedAction}
          loading={isProcessing}
          iconName="Play"
          iconPosition="left"
          fullWidth
        >
          Ejecutar Acción
        </Button>
      </div>
      {/* Recent Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-card-foreground mb-3">
          Acciones Recientes
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-muted-foreground">
                Limpieza completada - Hab. 205
              </span>
            </div>
            <span className="text-muted-foreground font-data">
              14:30
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" size={14} className="text-warning" />
              <span className="text-muted-foreground">
                Mantenimiento programado - Hab. 101
              </span>
            </div>
            <span className="text-muted-foreground font-data">
              13:15
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Plus" size={14} className="text-primary" />
              <span className="text-muted-foreground">
                Nueva habitación agregada - Hab. 301
              </span>
            </div>
            <span className="text-muted-foreground font-data">
              12:45
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomQuickActions;