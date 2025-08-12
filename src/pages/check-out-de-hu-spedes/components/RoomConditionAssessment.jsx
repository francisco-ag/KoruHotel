import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const RoomConditionAssessment = ({ onAssessmentChange }) => {
  const [roomCondition, setRoomCondition] = useState({
    damages: [],
    maintenanceNeeds: [],
    additionalNotes: '',
    overallCondition: 'good'
  });

  const damageOptions = [
    { id: 'furniture_damage', label: 'Daños en mobiliario', icon: 'Armchair' },
    { id: 'wall_damage', label: 'Daños en paredes', icon: 'Home' },
    { id: 'bathroom_damage', label: 'Daños en baño', icon: 'Droplets' },
    { id: 'electronics_damage', label: 'Daños en electrónicos', icon: 'Tv' },
    { id: 'bedding_damage', label: 'Daños en ropa de cama', icon: 'Bed' },
    { id: 'carpet_damage', label: 'Daños en alfombras/suelos', icon: 'Square' }
  ];

  const maintenanceOptions = [
    { id: 'deep_cleaning', label: 'Limpieza profunda requerida', icon: 'Sparkles' },
    { id: 'plumbing_check', label: 'Revisión de fontanería', icon: 'Wrench' },
    { id: 'electrical_check', label: 'Revisión eléctrica', icon: 'Zap' },
    { id: 'ac_maintenance', label: 'Mantenimiento aire acondicionado', icon: 'Wind' },
    { id: 'paint_touch', label: 'Retoque de pintura', icon: 'Paintbrush' },
    { id: 'furniture_repair', label: 'Reparación de mobiliario', icon: 'Hammer' }
  ];

  const conditionLevels = [
    { value: 'excellent', label: 'Excelente', color: 'text-success', icon: 'Star' },
    { value: 'good', label: 'Bueno', color: 'text-primary', icon: 'ThumbsUp' },
    { value: 'fair', label: 'Regular', color: 'text-warning', icon: 'AlertTriangle' },
    { value: 'poor', label: 'Malo', color: 'text-destructive', icon: 'AlertCircle' }
  ];

  const handleDamageChange = (damageId, checked) => {
    const updatedDamages = checked
      ? [...roomCondition?.damages, damageId]
      : roomCondition?.damages?.filter(id => id !== damageId);
    
    const updatedCondition = {
      ...roomCondition,
      damages: updatedDamages
    };
    
    setRoomCondition(updatedCondition);
    onAssessmentChange(updatedCondition);
  };

  const handleMaintenanceChange = (maintenanceId, checked) => {
    const updatedMaintenance = checked
      ? [...roomCondition?.maintenanceNeeds, maintenanceId]
      : roomCondition?.maintenanceNeeds?.filter(id => id !== maintenanceId);
    
    const updatedCondition = {
      ...roomCondition,
      maintenanceNeeds: updatedMaintenance
    };
    
    setRoomCondition(updatedCondition);
    onAssessmentChange(updatedCondition);
  };

  const handleNotesChange = (e) => {
    const updatedCondition = {
      ...roomCondition,
      additionalNotes: e?.target?.value
    };
    
    setRoomCondition(updatedCondition);
    onAssessmentChange(updatedCondition);
  };

  const handleConditionChange = (condition) => {
    const updatedCondition = {
      ...roomCondition,
      overallCondition: condition
    };
    
    setRoomCondition(updatedCondition);
    onAssessmentChange(updatedCondition);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="ClipboardCheck" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Evaluación del Estado de la Habitación
          </h2>
          <p className="text-sm text-muted-foreground">
            Registra cualquier daño o necesidad de mantenimiento
          </p>
        </div>
      </div>
      {/* Overall Condition */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Estado General de la Habitación
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {conditionLevels?.map((level) => (
            <button
              key={level?.value}
              onClick={() => handleConditionChange(level?.value)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                roomCondition?.overallCondition === level?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <Icon 
                name={level?.icon} 
                size={16} 
                className={roomCondition?.overallCondition === level?.value ? 'text-primary' : level?.color}
              />
              <span className={`text-sm font-medium ${
                roomCondition?.overallCondition === level?.value ? 'text-primary' : 'text-foreground'
              }`}>
                {level?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Damage Assessment */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Daños Identificados
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {damageOptions?.map((damage) => (
            <div key={damage?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <Checkbox
                checked={roomCondition?.damages?.includes(damage?.id)}
                onChange={(e) => handleDamageChange(damage?.id, e?.target?.checked)}
              />
              <Icon name={damage?.icon} size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{damage?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Maintenance Needs */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Necesidades de Mantenimiento
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {maintenanceOptions?.map((maintenance) => (
            <div key={maintenance?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <Checkbox
                checked={roomCondition?.maintenanceNeeds?.includes(maintenance?.id)}
                onChange={(e) => handleMaintenanceChange(maintenance?.id, e?.target?.checked)}
              />
              <Icon name={maintenance?.icon} size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{maintenance?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Notes */}
      <div>
        <Input
          type="textarea"
          label="Notas Adicionales"
          placeholder="Describe cualquier observación adicional sobre el estado de la habitación..."
          value={roomCondition?.additionalNotes}
          onChange={handleNotesChange}
          rows={4}
        />
      </div>
      {/* Summary Alert */}
      {(roomCondition?.damages?.length > 0 || roomCondition?.maintenanceNeeds?.length > 0) && (
        <div className="mt-6 bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Atención Requerida
              </div>
              <div className="text-xs text-muted-foreground">
                Se han identificado {roomCondition?.damages?.length} daños y {roomCondition?.maintenanceNeeds?.length} necesidades de mantenimiento. 
                La habitación requerirá atención antes del próximo check-in.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomConditionAssessment;