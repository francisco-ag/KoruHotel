import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestRegistrationForm = ({ selectedRoom, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    telefono: '',
    email: '',
    fechaEntrada: new Date()?.toISOString()?.split('T')?.[0],
    fechaSalida: '',
    numeroHuespedes: 1,
    solicitudesEspeciales: ''
  });

  const [errors, setErrors] = useState({});
  const [showAdditionalGuests, setShowAdditionalGuests] = useState(false);
  const [additionalGuests, setAdditionalGuests] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.nombre?.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData?.apellido?.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    if (!formData?.documento?.trim()) {
      newErrors.documento = 'El documento de identidad es obligatorio';
    }

    if (!formData?.telefono?.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\+?[\d\s-()]{9,}$/?.test(formData?.telefono)) {
      newErrors.telefono = 'Formato de teléfono inválido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData?.fechaSalida) {
      newErrors.fechaSalida = 'La fecha de salida es obligatoria';
    } else if (new Date(formData.fechaSalida) <= new Date(formData.fechaEntrada)) {
      newErrors.fechaSalida = 'La fecha de salida debe ser posterior a la entrada';
    }

    if (selectedRoom && formData?.numeroHuespedes > selectedRoom?.capacidad) {
      newErrors.numeroHuespedes = `Máximo ${selectedRoom?.capacidad} huéspedes para esta habitación`;
    }

    if (formData?.numeroHuespedes < 1) {
      newErrors.numeroHuespedes = 'Debe haber al menos 1 huésped';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

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

  const handleGuestCountChange = (value) => {
    const count = parseInt(value) || 1;
    handleInputChange('numeroHuespedes', count);

    // Manage additional guests array
    if (count > 1) {
      setShowAdditionalGuests(true);
      const newAdditionalGuests = Array.from({ length: count - 1 }, (_, index) => 
        additionalGuests?.[index] || { nombre: '', apellido: '', documento: '' }
      );
      setAdditionalGuests(newAdditionalGuests);
    } else {
      setShowAdditionalGuests(false);
      setAdditionalGuests([]);
    }
  };

  const handleAdditionalGuestChange = (index, field, value) => {
    setAdditionalGuests(prev => {
      const updated = [...prev];
      updated[index] = { ...updated?.[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        habitacion: selectedRoom,
        huespedesAdicionales: additionalGuests,
        fechaCheckin: new Date()?.toISOString()
      };
      onSubmit(submitData);
    }
  };

  const calculateNights = () => {
    if (formData?.fechaEntrada && formData?.fechaSalida) {
      const entrada = new Date(formData.fechaEntrada);
      const salida = new Date(formData.fechaSalida);
      const diffTime = salida - entrada;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="UserPlus" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Registro de Huésped
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete la información del huésped principal
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Información Personal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              type="text"
              placeholder="Nombre del huésped"
              value={formData?.nombre}
              onChange={(e) => handleInputChange('nombre', e?.target?.value)}
              error={errors?.nombre}
              required
            />
            
            <Input
              label="Apellido"
              type="text"
              placeholder="Apellido del huésped"
              value={formData?.apellido}
              onChange={(e) => handleInputChange('apellido', e?.target?.value)}
              error={errors?.apellido}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Documento de Identidad"
              type="text"
              placeholder="DNI, Pasaporte, etc."
              value={formData?.documento}
              onChange={(e) => handleInputChange('documento', e?.target?.value)}
              error={errors?.documento}
              required
            />
            
            <Input
              label="Teléfono"
              type="tel"
              placeholder="+34 600 000 000"
              value={formData?.telefono}
              onChange={(e) => handleInputChange('telefono', e?.target?.value)}
              error={errors?.telefono}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        {/* Detalles de la Estancia */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Detalles de la Estancia
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Fecha de Entrada"
              type="date"
              value={formData?.fechaEntrada}
              onChange={(e) => handleInputChange('fechaEntrada', e?.target?.value)}
              error={errors?.fechaEntrada}
              required
            />
            
            <Input
              label="Fecha de Salida"
              type="date"
              value={formData?.fechaSalida}
              onChange={(e) => handleInputChange('fechaSalida', e?.target?.value)}
              error={errors?.fechaSalida}
              required
            />
            
            <Input
              label="Número de Huéspedes"
              type="number"
              min="1"
              max={selectedRoom ? selectedRoom?.capacidad : 10}
              value={formData?.numeroHuespedes}
              onChange={(e) => handleGuestCountChange(e?.target?.value)}
              error={errors?.numeroHuespedes}
              description={selectedRoom ? `Máximo ${selectedRoom?.capacidad} huéspedes` : ''}
              required
            />
          </div>

          {/* Resumen de Noches */}
          {calculateNights() > 0 && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duración de la estancia:</span>
                <span className="font-medium text-foreground">
                  {calculateNights()} {calculateNights() === 1 ? 'noche' : 'noches'}
                </span>
              </div>
              {selectedRoom && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Costo estimado:</span>
                  <span className="font-medium text-foreground">
                    ${(calculateNights() * selectedRoom?.tarifaNoche)?.toLocaleString('es-ES')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Huéspedes Adicionales */}
        {showAdditionalGuests && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
              Huéspedes Adicionales
            </h3>
            
            {additionalGuests?.map((guest, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-medium text-foreground">
                  Huésped {index + 2}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Nombre"
                    type="text"
                    placeholder="Nombre"
                    value={guest?.nombre}
                    onChange={(e) => handleAdditionalGuestChange(index, 'nombre', e?.target?.value)}
                  />
                  <Input
                    label="Apellido"
                    type="text"
                    placeholder="Apellido"
                    value={guest?.apellido}
                    onChange={(e) => handleAdditionalGuestChange(index, 'apellido', e?.target?.value)}
                  />
                  <Input
                    label="Documento"
                    type="text"
                    placeholder="Documento ID"
                    value={guest?.documento}
                    onChange={(e) => handleAdditionalGuestChange(index, 'documento', e?.target?.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Solicitudes Especiales */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Solicitudes Especiales
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Comentarios adicionales
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Solicitudes especiales, preferencias de habitación, necesidades dietéticas, etc."
              value={formData?.solicitudesEspeciales}
              onChange={(e) => handleInputChange('solicitudesEspeciales', e?.target?.value)}
            />
          </div>
        </div>

        {/* Habitación Seleccionada */}
        {selectedRoom && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-2">
              Habitación Seleccionada
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold text-primary">
                  Habitación {selectedRoom?.numero}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {selectedRoom?.tipo} • {selectedRoom?.capacidad} personas
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">
                  ${selectedRoom?.tarifaNoche}/noche
                </div>
                <div className="text-sm text-muted-foreground">
                  Planta {selectedRoom?.planta}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botón de Envío */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isSubmitting}
            disabled={!selectedRoom || isSubmitting}
            iconName="UserPlus"
            iconPosition="left"
          >
            {isSubmitting ? 'Procesando...' : 'Registrar Check-in'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuestRegistrationForm;