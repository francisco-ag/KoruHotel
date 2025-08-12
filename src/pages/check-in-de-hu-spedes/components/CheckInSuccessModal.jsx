import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CheckInSuccessModal = ({ isOpen, onClose, checkInData }) => {
  if (!isOpen || !checkInData) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateNights = () => {
    const entrada = new Date(checkInData.fechaEntrada);
    const salida = new Date(checkInData.fechaSalida);
    const diffTime = salida - entrada;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalCost = calculateNights() * checkInData?.habitacion?.tarifaNoche;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Check-in Completado
              </h2>
              <p className="text-sm text-muted-foreground">
                Registro exitoso en el sistema
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información del Huésped */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Información del Huésped Principal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nombre Completo
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.nombre} {checkInData?.apellido}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Documento
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.documento}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Teléfono
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.telefono}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Información de la Habitación */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Detalles de la Habitación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Habitación
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.habitacion?.numero} - {checkInData?.habitacion?.tipo}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Planta
                </label>
                <p className="text-foreground font-medium">
                  Planta {checkInData?.habitacion?.planta}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Capacidad
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.habitacion?.capacidad} personas
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tarifa por Noche
                </label>
                <p className="text-foreground font-medium">
                  ${checkInData?.habitacion?.tarifaNoche}
                </p>
              </div>
            </div>
          </div>

          {/* Detalles de la Estancia */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Detalles de la Estancia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fecha de Entrada
                </label>
                <p className="text-foreground font-medium">
                  {formatDate(checkInData?.fechaEntrada)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fecha de Salida
                </label>
                <p className="text-foreground font-medium">
                  {formatDate(checkInData?.fechaSalida)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Hora de Check-in
                </label>
                <p className="text-foreground font-medium">
                  {formatTime(checkInData?.fechaCheckin)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Número de Huéspedes
                </label>
                <p className="text-foreground font-medium">
                  {checkInData?.numeroHuespedes} {checkInData?.numeroHuespedes === 1 ? 'huésped' : 'huéspedes'}
                </p>
              </div>
            </div>
          </div>

          {/* Huéspedes Adicionales */}
          {checkInData?.huespedesAdicionales && checkInData?.huespedesAdicionales?.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Huéspedes Adicionales
              </h3>
              <div className="space-y-3">
                {checkInData?.huespedesAdicionales?.map((guest, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">
                        {guest?.nombre} {guest?.apellido}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {guest?.documento}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Huésped {index + 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resumen Financiero */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Resumen Financiero
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Duración de la estancia:
                </span>
                <span className="font-medium text-foreground">
                  {calculateNights()} {calculateNights() === 1 ? 'noche' : 'noches'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tarifa por noche:
                </span>
                <span className="font-medium text-foreground">
                  ${checkInData?.habitacion?.tarifaNoche}
                </span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">
                    Total Estimado:
                  </span>
                  <span className="text-xl font-bold text-accent">
                    ${totalCost?.toLocaleString('es-ES')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Solicitudes Especiales */}
          {checkInData?.solicitudesEspeciales && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Solicitudes Especiales
              </h3>
              <p className="text-foreground">
                {checkInData?.solicitudesEspeciales}
              </p>
            </div>
          )}

          {/* Información Importante */}
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  Información Importante
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• El check-out debe realizarse antes de las 12:00 PM</li>
                  <li>• Las llaves de la habitación están disponibles en recepción</li>
                  <li>• El desayuno se sirve de 7:00 AM a 10:00 AM</li>
                  <li>• WiFi gratuito disponible en toda la propiedad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => window.print()}
            iconName="Printer"
            iconPosition="left"
          >
            Imprimir
          </Button>
          <Button
            variant="default"
            onClick={onClose}
            iconName="Check"
            iconPosition="left"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInSuccessModal;