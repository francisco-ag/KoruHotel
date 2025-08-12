import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ totalAmount, onPaymentConfirm, isProcessing }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const paymentMethods = [
    {
      id: 'efectivo',
      name: 'Efectivo',
      icon: 'Banknote',
      description: 'Pago en efectivo en recepción'
    },
    {
      id: 'tarjeta',
      name: 'Tarjeta de Crédito/Débito',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'transferencia',
      name: 'Transferencia Bancaria',
      icon: 'Building2',
      description: 'Transferencia directa a cuenta del motel'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setPaymentConfirmed(false);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod && paymentConfirmed) {
      onPaymentConfirm(selectedPaymentMethod);
    }
  };

  const isPaymentReady = selectedPaymentMethod && paymentConfirmed;

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Método de Pago
          </h2>
          <p className="text-sm text-muted-foreground">
            Selecciona cómo procesarás el pago
          </p>
        </div>
      </div>
      {/* Total Amount Display */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Calculator" size={20} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Total a Cobrar</div>
              <div className="text-xs text-muted-foreground">Importe final de la estancia</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(totalAmount)}
          </div>
        </div>
      </div>
      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        <label className="text-sm font-medium text-foreground">
          Selecciona el método de pago
        </label>
        {paymentMethods?.map((method) => (
          <button
            key={method?.id}
            onClick={() => handlePaymentMethodSelect(method?.id)}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${
              selectedPaymentMethod === method?.id
                ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground hover:bg-muted/50'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedPaymentMethod === method?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={method?.icon} size={16} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{method?.name}</div>
              <div className="text-xs text-muted-foreground">{method?.description}</div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedPaymentMethod === method?.id
                ? 'border-primary bg-primary' :'border-muted-foreground'
            }`}>
              {selectedPaymentMethod === method?.id && (
                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Payment Confirmation */}
      {selectedPaymentMethod && (
        <div className="border-t border-border pt-6">
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  Confirmación de Pago Requerida
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedPaymentMethod === 'efectivo' && 'Confirma que has recibido el pago en efectivo del huésped.'}
                  {selectedPaymentMethod === 'tarjeta' && 'Confirma que el pago con tarjeta se ha procesado correctamente.'}
                  {selectedPaymentMethod === 'transferencia' && 'Confirma que has verificado la transferencia bancaria.'}
                </div>
              </div>
            </div>
          </div>

          <Checkbox
            label="Confirmo que el pago ha sido recibido y procesado correctamente"
            checked={paymentConfirmed}
            onChange={(e) => setPaymentConfirmed(e?.target?.checked)}
            className="mb-6"
          />

          <Button
            variant={isPaymentReady ? 'success' : 'outline'}
            onClick={handleConfirmPayment}
            disabled={!isPaymentReady || isProcessing}
            loading={isProcessing}
            iconName={isPaymentReady ? 'CheckCircle' : 'AlertCircle'}
            iconPosition="left"
            fullWidth
          >
            {isProcessing ? 'Procesando Pago...' : 
             isPaymentReady ? 'Confirmar Pago Recibido' : 'Selecciona y Confirma el Pago'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;