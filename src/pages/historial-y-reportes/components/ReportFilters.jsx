import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportFilters = ({ onFiltersChange, onExport }) => {
  const [filters, setFilters] = useState({
    startDate: '01/08/2025',
    endDate: '11/08/2025',
    reportType: 'ocupacion-diaria',
    roomType: 'todos',
    floor: 'todos',
    guestCategory: 'todos'
  });

  const reportTypeOptions = [
    { value: 'ocupacion-diaria', label: 'Ocupación Diaria' },
    { value: 'ingresos-habitacion', label: 'Ingresos por Habitación' },
    { value: 'duracion-estadias', label: 'Duración de Estadías' },
    { value: 'huespedes-frecuentes', label: 'Huéspedes Frecuentes' }
  ];

  const roomTypeOptions = [
    { value: 'todos', label: 'Todos los Tipos' },
    { value: 'individual', label: 'Individual' },
    { value: 'doble', label: 'Doble' },
    { value: 'suite', label: 'Suite' },
    { value: 'familiar', label: 'Familiar' }
  ];

  const floorOptions = [
    { value: 'todos', label: 'Todas las Plantas' },
    { value: '1', label: 'Planta 1' },
    { value: '2', label: 'Planta 2' },
    { value: '3', label: 'Planta 3' },
    { value: '4', label: 'Planta 4' }
  ];

  const guestCategoryOptions = [
    { value: 'todos', label: 'Todas las Categorías' },
    { value: 'corporativo', label: 'Corporativo' },
    { value: 'turismo', label: 'Turismo' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'vip', label: 'VIP' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleExport = (format) => {
    onExport(format, filters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Configuración de Reportes
            </h2>
            <p className="text-sm text-muted-foreground">
              Personaliza los parámetros para generar reportes detallados
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => handleExport('pdf')}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            iconName="FileSpreadsheet"
            iconPosition="left"
            onClick={() => handleExport('excel')}
          >
            Excel
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Date Range */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Fecha Inicio"
              type="date"
              value={filters?.startDate?.split('/')?.reverse()?.join('-')}
              onChange={(e) => {
                const formattedDate = e?.target?.value?.split('-')?.reverse()?.join('/');
                handleFilterChange('startDate', formattedDate);
              }}
            />
            <Input
              label="Fecha Fin"
              type="date"
              value={filters?.endDate?.split('/')?.reverse()?.join('-')}
              onChange={(e) => {
                const formattedDate = e?.target?.value?.split('-')?.reverse()?.join('/');
                handleFilterChange('endDate', formattedDate);
              }}
            />
          </div>
        </div>

        {/* Report Type */}
        <Select
          label="Tipo de Reporte"
          options={reportTypeOptions}
          value={filters?.reportType}
          onChange={(value) => handleFilterChange('reportType', value)}
        />

        {/* Room Type */}
        <Select
          label="Tipo de Habitación"
          options={roomTypeOptions}
          value={filters?.roomType}
          onChange={(value) => handleFilterChange('roomType', value)}
        />

        {/* Floor */}
        <Select
          label="Planta"
          options={floorOptions}
          value={filters?.floor}
          onChange={(value) => handleFilterChange('floor', value)}
        />

        {/* Guest Category */}
        <Select
          label="Categoría Huésped"
          options={guestCategoryOptions}
          value={filters?.guestCategory}
          onChange={(value) => handleFilterChange('guestCategory', value)}
        />
      </div>
      {/* Quick Date Filters */}
      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Períodos rápidos:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            handleFilterChange('startDate', startOfWeek?.toLocaleDateString('es-ES'));
            handleFilterChange('endDate', endOfWeek?.toLocaleDateString('es-ES'));
          }}
        >
          Esta Semana
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            handleFilterChange('startDate', startOfMonth?.toLocaleDateString('es-ES'));
            handleFilterChange('endDate', endOfMonth?.toLocaleDateString('es-ES'));
          }}
        >
          Este Mes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            const endOfYear = new Date(today.getFullYear(), 11, 31);
            handleFilterChange('startDate', startOfYear?.toLocaleDateString('es-ES'));
            handleFilterChange('endDate', endOfYear?.toLocaleDateString('es-ES'));
          }}
        >
          Este Año
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;