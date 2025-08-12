import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AvailableRoomsPanel = ({ onRoomSelect, selectedRoom }) => {
  const [filters, setFilters] = useState({
    tipo: '',
    capacidad: '',
    planta: '',
    precioMax: ''
  });

  // Mock available rooms data
  const availableRooms = [
    {
      id: 1,
      numero: '101',
      tipo: 'Individual',
      capacidad: 1,
      planta: 1,
      tarifaNoche: 85,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado'],
      descripcion: 'Habitación individual con vista al jardín'
    },
    {
      id: 2,
      numero: '102',
      tipo: 'Doble',
      capacidad: 2,
      planta: 1,
      tarifaNoche: 120,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar'],
      descripcion: 'Habitación doble con balcón'
    },
    {
      id: 3,
      numero: '201',
      tipo: 'Suite',
      capacidad: 4,
      planta: 2,
      tarifaNoche: 250,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Jacuzzi'],
      descripcion: 'Suite ejecutiva con sala de estar'
    },
    {
      id: 4,
      numero: '202',
      tipo: 'Doble',
      capacidad: 2,
      planta: 2,
      tarifaNoche: 135,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado', 'Vista al mar'],
      descripcion: 'Habitación doble con vista al mar'
    },
    {
      id: 5,
      numero: '301',
      tipo: 'Triple',
      capacidad: 3,
      planta: 3,
      tarifaNoche: 180,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado', 'Balcón'],
      descripcion: 'Habitación triple con terraza'
    },
    {
      id: 6,
      numero: '302',
      tipo: 'Individual',
      capacidad: 1,
      planta: 3,
      tarifaNoche: 90,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado'],
      descripcion: 'Habitación individual premium'
    },
    {
      id: 7,
      numero: '401',
      tipo: 'Suite',
      capacidad: 6,
      planta: 4,
      tarifaNoche: 350,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Jacuzzi', 'Cocina'],
      descripcion: 'Suite presidencial con cocina completa'
    },
    {
      id: 8,
      numero: '103',
      tipo: 'Doble',
      capacidad: 2,
      planta: 1,
      tarifaNoche: 115,
      estado: 'disponible',
      amenidades: ['WiFi', 'TV', 'Aire acondicionado'],
      descripcion: 'Habitación doble estándar'
    }
  ];

  // Filter options
  const tipoOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'Individual', label: 'Individual' },
    { value: 'Doble', label: 'Doble' },
    { value: 'Triple', label: 'Triple' },
    { value: 'Suite', label: 'Suite' }
  ];

  const capacidadOptions = [
    { value: '', label: 'Cualquier capacidad' },
    { value: '1', label: '1 persona' },
    { value: '2', label: '2 personas' },
    { value: '3', label: '3 personas' },
    { value: '4', label: '4 personas' },
    { value: '5', label: '5+ personas' }
  ];

  const plantaOptions = [
    { value: '', label: 'Todas las plantas' },
    { value: '1', label: 'Planta 1' },
    { value: '2', label: 'Planta 2' },
    { value: '3', label: 'Planta 3' },
    { value: '4', label: 'Planta 4' }
  ];

  const precioOptions = [
    { value: '', label: 'Cualquier precio' },
    { value: '100', label: 'Hasta $100' },
    { value: '150', label: 'Hasta $150' },
    { value: '200', label: 'Hasta $200' },
    { value: '300', label: 'Hasta $300' }
  ];

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    return availableRooms?.filter(room => {
      if (filters?.tipo && room?.tipo !== filters?.tipo) return false;
      if (filters?.capacidad && room?.capacidad < parseInt(filters?.capacidad)) return false;
      if (filters?.planta && room?.planta !== parseInt(filters?.planta)) return false;
      if (filters?.precioMax && room?.tarifaNoche > parseInt(filters?.precioMax)) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      tipo: '',
      capacidad: '',
      planta: '',
      precioMax: ''
    });
  };

  const getRoomTypeIcon = (tipo) => {
    switch (tipo) {
      case 'Individual': return 'User';
      case 'Doble': return 'Users';
      case 'Triple': return 'Users';
      case 'Suite': return 'Crown';
      default: return 'Bed';
    }
  };

  const getRoomTypeColor = (tipo) => {
    switch (tipo) {
      case 'Individual': return 'text-blue-600';
      case 'Doble': return 'text-green-600';
      case 'Triple': return 'text-orange-600';
      case 'Suite': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Bed" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Habitaciones Disponibles
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredRooms?.length} habitaciones disponibles
            </p>
          </div>
        </div>
      </div>
      {/* Filtros */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Filtros</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Select
            label="Tipo de habitación"
            options={tipoOptions}
            value={filters?.tipo}
            onChange={(value) => handleFilterChange('tipo', value)}
          />

          <Select
            label="Capacidad mínima"
            options={capacidadOptions}
            value={filters?.capacidad}
            onChange={(value) => handleFilterChange('capacidad', value)}
          />

          <Select
            label="Planta"
            options={plantaOptions}
            value={filters?.planta}
            onChange={(value) => handleFilterChange('planta', value)}
          />

          <Select
            label="Precio máximo"
            options={precioOptions}
            value={filters?.precioMax}
            onChange={(value) => handleFilterChange('precioMax', value)}
          />
        </div>
      </div>
      {/* Lista de Habitaciones */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredRooms?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No se encontraron habitaciones con los filtros aplicados
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="mt-3"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          filteredRooms?.map((room) => (
            <div
              key={room?.id}
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedRoom?.id === room?.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-background hover:border-primary/50'
              }`}
              onClick={() => onRoomSelect(room)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedRoom?.id === room?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={getRoomTypeIcon(room?.tipo)} 
                      size={16} 
                      className={selectedRoom?.id === room?.id ? '' : getRoomTypeColor(room?.tipo)}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Habitación {room?.numero}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {room?.tipo} • Planta {room?.planta}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    ${room?.tarifaNoche}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    por noche
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{room?.capacidad} personas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>Planta {room?.planta}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {room?.descripcion}
              </p>

              {/* Amenidades */}
              <div className="flex flex-wrap gap-1 mb-3">
                {room?.amenidades?.slice(0, 3)?.map((amenidad, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                  >
                    {amenidad}
                  </span>
                ))}
                {room?.amenidades?.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                    +{room?.amenidades?.length - 3} más
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  variant={selectedRoom?.id === room?.id ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onRoomSelect(room);
                  }}
                  iconName={selectedRoom?.id === room?.id ? "Check" : "Plus"}
                  iconPosition="left"
                >
                  {selectedRoom?.id === room?.id ? 'Seleccionada' : 'Seleccionar'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableRoomsPanel;