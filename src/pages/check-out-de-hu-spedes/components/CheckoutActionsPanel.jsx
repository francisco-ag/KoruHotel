import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CheckoutActionsPanel = ({ 
  guest, 
  paymentConfirmed, 
  roomAssessment, 
  onProcessCheckout, 
  onPrintReceipt,
  isProcessing 
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const canProcessCheckout = guest && paymentConfirmed;

  const handleProcessCheckout = () => {
    if (canProcessCheckout) {
      setShowConfirmation(true);
    }
  };

  const confirmCheckout = () => {
    onProcessCheckout();
    setShowConfirmation(false);
  };

  const getCheckoutSummary = () => {
    const issues = [];
    
    if (roomAssessment?.damages?.length > 0) {
      issues?.push(`${roomAssessment?.damages?.length} daños identificados`);
    }
    
    if (roomAssessment?.maintenanceNeeds?.length > 0) {
      issues?.push(`${roomAssessment?.maintenanceNeeds?.length} necesidades de mantenimiento`);
    }

    return issues;
  };

  const checkoutIssues = getCheckoutSummary();

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CheckCircle" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Finalizar Check-out
          </h2>
          <p className="text-sm text-muted-foreground">
            Procesa la salida del huésped y genera documentación
          </p>
        </div>
      </div>
      {/* Pre-checkout Checklist */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            guest ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={guest ? 'Check' : 'X'} size={12} />
          </div>
          <span className={`text-sm ${guest ? 'text-foreground' : 'text-muted-foreground'}`}>
            Huésped seleccionado
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            paymentConfirmed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={paymentConfirmed ? 'Check' : 'X'} size={12} />
          </div>
          <span className={`text-sm ${paymentConfirmed ? 'text-foreground' : 'text-muted-foreground'}`}>
            Pago confirmado
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-success text-success-foreground">
            <Icon name="Check" size={12} />
          </div>
          <span className="text-sm text-foreground">
            Evaluación de habitación completada
          </span>
        </div>
      </div>
      {/* Issues Alert */}
      {checkoutIssues?.length > 0 && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Atención: Problemas Identificados
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {checkoutIssues?.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
              <div className="text-xs text-muted-foreground mt-2">
                La habitación será marcada para mantenimiento después del check-out.
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant={canProcessCheckout ? 'default' : 'outline'}
          onClick={handleProcessCheckout}
          disabled={!canProcessCheckout || isProcessing}
          loading={isProcessing}
          iconName="UserMinus"
          iconPosition="left"
          fullWidth
        >
          {isProcessing ? 'Procesando Check-out...' : 'Procesar Check-out'}
        </Button>

        <Button
          variant="outline"
          onClick={onPrintReceipt}
          disabled={!guest}
          iconName="Printer"
          iconPosition="left"
          fullWidth
        >
          Imprimir Recibo
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="ghost"
            onClick={() => window.location?.reload()}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Nuevo Check-out
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.history?.back()}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            Volver
          </Button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4 modal-elevation">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Confirmar Check-out
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-foreground mb-2">
                ¿Estás seguro de que deseas procesar el check-out de:
              </p>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-sm font-medium text-foreground">
                  {guest?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Habitación {guest?.room}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={confirmCheckout}
                iconName="CheckCircle"
                iconPosition="left"
                className="flex-1"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutActionsPanel;