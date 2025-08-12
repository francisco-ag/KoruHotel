import React, { useState } from 'react';
import HeaderBar from '../../components/ui/HeaderBar';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import GuestRegistrationForm from './components/GuestRegistrationForm';
import AvailableRoomsPanel from './components/AvailableRoomsPanel';
import CheckInSuccessModal from './components/CheckInSuccessModal';

const CheckInDeHuespedes = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checkInData, setCheckInData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleCheckInSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store check-in data for success modal
      setCheckInData(formData);
      setShowSuccessModal(true);
      
      // Reset form state
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error during check-in:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCheckInData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderBar />
      
      {/* Sidebar */}
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-200 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'
      } pt-16`}>
        {/* Breadcrumb */}
        <NavigationBreadcrumb />
        
        {/* Page Content */}
        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Check-in de Huéspedes
                </h1>
                <p className="text-muted-foreground">
                  Registre nuevos huéspedes y asigne habitaciones disponibles
                </p>
              </div>
              
              {/* Quick Stats */}
              {/* <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">8</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Ocupadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">2</div>
                  <div className="text-sm text-muted-foreground">Limpieza</div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Available Rooms Panel - Left Panel */}
            <div className="xl:col-span-8">
              <AvailableRoomsPanel
                onRoomSelect={handleRoomSelect}
                selectedRoom={selectedRoom}
              />
            </div>
            
            
            
            {/* Guest Registration Form - Right Panel */}
            <div className="xl:col-span-4">
              <GuestRegistrationForm
                selectedRoom={selectedRoom}
                onSubmit={handleCheckInSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            
          </div>

          {/* Mobile Quick Actions */}
          {/* <div className="xl:hidden mt-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Resumen Rápido
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-xl font-bold text-success">8</div>
                  <div className="text-xs text-muted-foreground">Disponibles</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Ocupadas</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-xl font-bold text-warning">2</div>
                  <div className="text-xs text-muted-foreground">Limpieza</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Success Modal */}
      <CheckInSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        checkInData={checkInData}
      />

      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default CheckInDeHuespedes;