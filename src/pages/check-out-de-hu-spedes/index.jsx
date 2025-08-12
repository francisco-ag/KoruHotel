import React, { useState } from 'react';
import HeaderBar from '../../components/ui/HeaderBar';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import GuestSearchSection from './components/GuestSearchSection';
import CheckoutSummaryCard from './components/CheckoutSummaryCard';
import PaymentSection from './components/PaymentSection';
import RoomConditionAssessment from './components/RoomConditionAssessment';
import GuestFeedbackSection from './components/GuestFeedbackSection';
import CheckoutActionsPanel from './components/CheckoutActionsPanel';
import Icon from '../../components/AppIcon';

const CheckoutDeHuespedes = () => {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [roomAssessment, setRoomAssessment] = useState(null);
  const [guestFeedback, setGuestFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    // Reset other states when selecting a new guest
    setPaymentMethod(null);
    setPaymentConfirmed(false);
    setRoomAssessment(null);
    setGuestFeedback(null);
    setCheckoutCompleted(false);
  };

  const handlePaymentConfirm = (method) => {
    setPaymentMethod(method);
    setPaymentConfirmed(true);
  };

  const handleRoomAssessmentChange = (assessment) => {
    setRoomAssessment(assessment);
  };

  const handleFeedbackChange = (feedback) => {
    setGuestFeedback(feedback);
  };

  const handleProcessCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate checkout processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update room status and complete checkout
    setCheckoutCompleted(true);
    setIsProcessing(false);
    
    // Show success message
    alert(`Check-out procesado exitosamente para ${selectedGuest?.name}.\nHabitación ${selectedGuest?.room} marcada como "En limpieza".`);
  };

  const handlePrintReceipt = () => {
    // Simulate receipt printing
    const receiptData = {
      guest: selectedGuest,
      checkoutDate: new Date(),
      paymentMethod,
      roomAssessment,
      feedback: guestFeedback
    };
    
    console.log('Printing receipt:', receiptData);
    alert('Recibo enviado a impresora');
  };

  // Calculate total amount for selected guest
  const calculateTotalAmount = () => {
    if (!selectedGuest) return 0;
    
    const checkInDate = new Date(selectedGuest.checkInDate);
    const checkOutDate = new Date();
    const daysDiff = Math.floor((checkOutDate?.getTime() - checkInDate?.getTime()) / (1000 * 3600 * 24)) || 1;
    
    const roomRate = 85.00;
    const additionalServices = 25.50; // Breakfast + Parking + WiFi per day
    const subtotal = (roomRate * daysDiff) + (additionalServices * daysDiff);
    const taxes = subtotal * 0.10;
    
    return subtotal + taxes;
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      <SidebarNavigation />

      <NavigationBreadcrumb />
      
      <main className="md:ml-60 pt-16">
        <div className="p-8 pb-24 md:pb-8">
          {/* Success Message */}
          {checkoutCompleted && (
            <div className="mb-6 bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Check-out Completado Exitosamente
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedGuest?.name} ha sido dado de baja. Habitación {selectedGuest?.room} en proceso de limpieza.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guest Search Section */}
          <div className="mb-8">
            <GuestSearchSection 
              onGuestSelect={handleGuestSelect}
              selectedGuest={selectedGuest}
            />
          </div>

          {/* Main Content - Only show when guest is selected */}
          {selectedGuest && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Main Information */}
              <div className="xl:col-span-2 space-y-8">
                {/* Checkout Summary */}
                <CheckoutSummaryCard guest={selectedGuest} />

                {/* Payment Section */}
                <PaymentSection
                  totalAmount={calculateTotalAmount()}
                  onPaymentConfirm={handlePaymentConfirm}
                  isProcessing={isProcessing}
                />

                {/* Room Condition Assessment */}
                <RoomConditionAssessment
                  onAssessmentChange={handleRoomAssessmentChange}
                />

                {/* Guest Feedback Section */}
                <GuestFeedbackSection
                  onFeedbackChange={handleFeedbackChange}
                />
              </div>

              {/* Right Column - Actions Panel */}
              <div className="xl:col-span-1">
                <div className="sticky top-24">
                  <CheckoutActionsPanel
                    guest={selectedGuest}
                    paymentConfirmed={paymentConfirmed}
                    roomAssessment={roomAssessment}
                    onProcessCheckout={handleProcessCheckout}
                    onPrintReceipt={handlePrintReceipt}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedGuest && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="UserMinus" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Selecciona un Huésped
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Utiliza el buscador superior para encontrar al huésped que desea realizar el check-out. 
                Puedes buscar por número de habitación, nombre o documento de identidad.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutDeHuespedes;