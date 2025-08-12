import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RoomFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  typeFilter, 
  onTypeFilterChange,
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'available', label: 'Disponibles' },
    { value: 'occupied', label: 'Ocupadas' },
    { value: 'cleaning', label: 'En limpieza' },
    { value: 'maintenance', label: 'Mantenimiento' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'individual', label: 'Individual' },
    { value: 'doble', label: 'Doble' },
    { value: 'suite', label: 'Suite' },
    { value: 'familiar', label: 'Familiar' }
  ];

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar por número de habitación o huésped..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Estado"
          />
        </div>

        {/* Type Filter */}
        <div className="w-full lg:w-48">
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={onTypeFilterChange}
            placeholder="Tipo"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            iconName="X"
            onClick={onClearFilters}
            className="w-full lg:w-auto"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomFilters;