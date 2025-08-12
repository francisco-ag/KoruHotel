import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const GuestSearchSection = ({ onGuestSelect, selectedGuest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('room');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock guest data for search
  const mockGuests = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      room: '101',
      documentId: '12345678A',
      checkInDate: '2025-08-09T14:30:00',
      phone: '+34 666 123 456',
      email: 'carlos.rodriguez@email.com'
    },
    {
      id: 2,
      name: 'María González',
      room: '205',
      documentId: '87654321B',
      checkInDate: '2025-08-10T16:15:00',
      phone: '+34 677 987 654',
      email: 'maria.gonzalez@email.com'
    },
    {
      id: 3,
      name: 'Antonio López',
      room: '312',
      documentId: '11223344C',
      checkInDate: '2025-08-08T12:00:00',
      phone: '+34 688 456 789',
      email: 'antonio.lopez@email.com'
    }
  ];

  const filteredGuests = mockGuests?.filter(guest => {
    const term = searchTerm?.toLowerCase();
    switch (searchType) {
      case 'room':
        return guest?.room?.includes(term);
      case 'name':
        return guest?.name?.toLowerCase()?.includes(term);
      case 'document':
        return guest?.documentId?.toLowerCase()?.includes(term);
      default:
        return false;
    }
  });

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    setShowSuggestions(value?.length > 0);
  };

  const handleGuestSelection = (guest) => {
    onGuestSelect(guest);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const searchTypeOptions = [
    { value: 'room', label: 'Número de Habitación', icon: 'Bed' },
    { value: 'name', label: 'Nombre del Huésped', icon: 'User' },
    { value: 'document', label: 'Documento de Identidad', icon: 'CreditCard' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Buscar Huésped para Check-out
          </h2>
          <p className="text-sm text-muted-foreground">
            Selecciona el método de búsqueda y encuentra al huésped
          </p>
        </div>
      </div>
      {/* Search Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {searchTypeOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSearchType(option?.value)}
            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
              searchType === option?.value
                ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={option?.icon} size={20} />
            <span className="text-sm font-medium">{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Search Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder={`Buscar por ${searchTypeOptions?.find(opt => opt?.value === searchType)?.label?.toLowerCase()}`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pr-12"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} className="text-muted-foreground" />
        </div>

        {/* Search Suggestions */}
        {showSuggestions && filteredGuests?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-64 overflow-y-auto">
            {filteredGuests?.map((guest) => (
              <button
                key={guest?.id}
                onClick={() => handleGuestSelection(guest)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-200 border-b border-border last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">
                      {guest?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Habitación {guest?.room} • {guest?.documentId}
                    </div>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {showSuggestions && filteredGuests?.length === 0 && searchTerm?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal p-4">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">No se encontraron huéspedes</span>
            </div>
          </div>
        )}
      </div>
      {/* Selected Guest Preview */}
      {selectedGuest && (
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                Huésped seleccionado: {selectedGuest?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                Habitación {selectedGuest?.room} • Check-in: {new Date(selectedGuest.checkInDate)?.toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSearchSection;