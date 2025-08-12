import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutSummaryCard = ({ guest }) => {
  if (!guest) return null;

  const checkInDate = new Date(guest.checkInDate);
  const checkOutDate = new Date();
  
  // Calculate stay duration
  const timeDiff = checkOutDate?.getTime() - checkInDate?.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hoursDiff = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

  // Mock room and service charges
  const roomRate = 85.00;
  const additionalServices = [
    { name: 'Desayuno', amount: 12.50, quantity: daysDiff + 1 },
    { name: 'Parking', amount: 8.00, quantity: daysDiff + 1 },
    { name: 'WiFi Premium', amount: 5.00, quantity: daysDiff + 1 }
  ];

  const roomTotal = roomRate * (daysDiff || 1);
  const servicesTotal = additionalServices?.reduce((sum, service) => sum + (service?.amount * service?.quantity), 0);
  const subtotal = roomTotal + servicesTotal;
  const taxes = subtotal * 0.10; // 10% IVA
  const totalAmount = subtotal + taxes;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Receipt" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Resumen de Check-out
          </h2>
          <p className="text-sm text-muted-foreground">
            Detalles de la estancia y facturación
          </p>
        </div>
      </div>
      {/* Guest Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Información del Huésped
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{guest?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{guest?.documentId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{guest?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Detalles de Habitación
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Bed" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Habitación {guest?.room}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Check-in: {checkInDate?.toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Check-out: {checkOutDate?.toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stay Duration */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Timer" size={20} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Duración de la Estancia</div>
              <div className="text-xs text-muted-foreground">Tiempo total de hospedaje</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">
              {daysDiff} {daysDiff === 1 ? 'día' : 'días'}
            </div>
            {hoursDiff > 0 && (
              <div className="text-sm text-muted-foreground">
                + {hoursDiff} {hoursDiff === 1 ? 'hora' : 'horas'}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Billing Summary */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Resumen de Facturación</h3>
        
        <div className="space-y-3">
          {/* Room Charges */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Icon name="Bed" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                Habitación ({daysDiff || 1} {(daysDiff || 1) === 1 ? 'noche' : 'noches'})
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(roomTotal)}
            </span>
          </div>

          {/* Additional Services */}
          {additionalServices?.map((service, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Icon name="Plus" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {service?.name} ({service?.quantity} {service?.quantity === 1 ? 'día' : 'días'})
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(service?.amount * service?.quantity)}
              </span>
            </div>
          ))}

          {/* Subtotal */}
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-foreground">Subtotal</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(subtotal)}
              </span>
            </div>

            {/* Taxes */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">IVA (10%)</span>
              <span className="text-sm text-muted-foreground">
                {formatCurrency(taxes)}
              </span>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-semibold text-foreground">Total a Pagar</span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummaryCard;