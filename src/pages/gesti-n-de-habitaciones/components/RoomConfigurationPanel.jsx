import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoomConfigurationPanel = ({ onAddRoom, isLoading = false }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    capacity: '',
    floor: '',
    amenities: []
  });
  const [errors, setErrors] = useState({});

  const roomTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'doble', label: 'Doble' },
    { value: 'triple', label: 'Triple' },
    { value: 'suite', label: 'Suite' },
    { value: 'familiar', label: 'Familiar' },
    { value: 'presidencial', label: 'Presidencial' }
  ];

  const floorOptions = [
    { value: '1', label: 'Planta Baja' },
    { value: '2', label: 'Primer Piso' },
    { value: '3', label: 'Segundo Piso' },
    { value: '4', label: 'Tercer Piso' },
    { value: '5', label: 'Cuarto Piso' }
  ];

  const availableAmenities = [
    { id: 'wifi', label: 'WiFi Gratuito' },
    { id: 'tv', label: 'TV por Cable' },
    { id: 'minibar', label: 'Minibar' },
    { id: 'ac', label: 'Aire Acondicionado' },
    { id: 'balcony', label: 'Balcón' },
    { id: 'jacuzzi', label: 'Jacuzzi' },
    { id: 'safe', label: 'Caja Fuerte' },
    { id: 'breakfast', label: 'Desayuno Incluido' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAmenityChange = (amenityId, checked) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev?.amenities, amenityId]
        : prev?.amenities?.filter(id => id !== amenityId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.roomNumber?.trim()) {
      newErrors.roomNumber = 'El número de habitación es obligatorio';
    } else if (!/^\d+$/?.test(formData?.roomNumber)) {
      newErrors.roomNumber = 'El número debe contener solo dígitos';
    }

    if (!formData?.type) {
      newErrors.type = 'Seleccione un tipo de habitación';
    }

    if (!formData?.capacity) {
      newErrors.capacity = 'La capacidad es obligatoria';
    } else if (parseInt(formData?.capacity) < 1 || parseInt(formData?.capacity) > 8) {
      newErrors.capacity = 'La capacidad debe estar entre 1 y 8 personas';
    }

    if (!formData?.floor) {
      newErrors.floor = 'Seleccione un piso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const roomData = {
        ...formData,
        capacity: parseInt(formData?.capacity),
        id: Date.now()?.toString(),
        status: 'disponible',
        createdAt: new Date()?.toISOString()
      };
      
      onAddRoom(roomData);
      
      // Reset form
      setFormData({
        roomNumber: '',
        type: '',
        capacity: '',
        floor: '',
        amenities: []
      });
    }
  };

  const handleReset = () => {
    setFormData({
      roomNumber: '',
      type: '',
      capacity: '',
      floor: '',
      amenities: []
    });
    setErrors({});
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Plus" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Agregar Habitación
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure una nueva habitación en el sistema
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Room Number */}
        <Input
          label="Número de Habitación"
          type="text"
          placeholder="Ej: 101, 205, 301"
          value={formData?.roomNumber}
          onChange={(e) => handleInputChange('roomNumber', e?.target?.value)}
          error={errors?.roomNumber}
          required
        />

        {/* Room Type */}
        <Select
          label="Tipo de Habitación"
          placeholder="Seleccione el tipo"
          options={roomTypes}
          value={formData?.type}
          onChange={(value) => handleInputChange('type', value)}
          error={errors?.type}
          required
        />

        {/* Capacity */}
        <Input
          label="Capacidad Máxima"
          type="number"
          placeholder="Número de huéspedes"
          min="1"
          max="8"
          value={formData?.capacity}
          onChange={(e) => handleInputChange('capacity', e?.target?.value)}
          error={errors?.capacity}
          description="Máximo 8 personas por habitación"
          required
        />

        {/* Floor */}
        <Select
          label="Piso"
          placeholder="Seleccione el piso"
          options={floorOptions}
          value={formData?.floor}
          onChange={(value) => handleInputChange('floor', value)}
          error={errors?.floor}
          required
        />

        {/* Amenities */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-card-foreground">
            Servicios y Amenidades
          </label>
          <div className="grid grid-cols-1 gap-3">
            {availableAmenities?.map((amenity) => (
              <Checkbox
                key={amenity?.id}
                label={amenity?.label}
                checked={formData?.amenities?.includes(amenity?.id)}
                onChange={(e) => handleAmenityChange(amenity?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Guardar Habitación
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Limpiar Formulario
          </Button>
        </div>
      </form>
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-card-foreground mb-3">
          Estadísticas Rápidas
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-card-foreground">24</div>
            <div className="text-xs text-muted-foreground">Total Habitaciones</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-success">18</div>
            <div className="text-xs text-muted-foreground">Disponibles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomConfigurationPanel;