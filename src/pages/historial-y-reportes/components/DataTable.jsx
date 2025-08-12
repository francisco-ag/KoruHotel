import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataTable = ({ reportType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;

  const mockData = [
    {
      id: 1,
      guestName: 'Carlos Rodríguez',
      roomNumber: '101',
      roomType: 'Individual',
      checkIn: '05/08/2025 14:30',
      checkOut: '08/08/2025 11:00',
      duration: '3 días',
      totalAmount: '$345,00',
      status: 'Completado',
      guestCategory: 'Turismo'
    },
    {
      id: 2,
      guestName: 'María González',
      roomNumber: '205',
      roomType: 'Doble',
      checkIn: '06/08/2025 15:45',
      checkOut: '09/08/2025 10:30',
      duration: '3 días',
      totalAmount: '$420,00',
      status: 'Completado',
      guestCategory: 'Corporativo'
    },
    {
      id: 3,
      guestName: 'Antonio López',
      roomNumber: '312',
      roomType: 'Suite',
      checkIn: '07/08/2025 16:00',
      checkOut: '11/08/2025 12:00',
      duration: '4 días',
      totalAmount: '$680,00',
      status: 'Activo',
      guestCategory: 'VIP'
    },
    {
      id: 4,
      guestName: 'Isabel Martín',
      roomNumber: '108',
      roomType: 'Individual',
      checkIn: '08/08/2025 13:15',
      checkOut: '10/08/2025 11:45',
      duration: '2 días',
      totalAmount: '$230,00',
      status: 'Completado',
      guestCategory: 'Turismo'
    },
    {
      id: 5,
      guestName: 'Francisco Jiménez',
      roomNumber: '401',
      roomType: 'Familiar',
      checkIn: '09/08/2025 14:00',
      checkOut: '13/08/2025 10:00',
      duration: '4 días',
      totalAmount: '$560,00',
      status: 'Activo',
      guestCategory: 'Eventos'
    },
    {
      id: 6,
      guestName: 'Carmen Ruiz',
      roomNumber: '203',
      roomType: 'Doble',
      checkIn: '10/08/2025 15:30',
      checkOut: '12/08/2025 11:30',
      duration: '2 días',
      totalAmount: '$280,00',
      status: 'Activo',
      guestCategory: 'Turismo'
    },
    {
      id: 7,
      guestName: 'Miguel Fernández',
      roomNumber: '315',
      roomType: 'Suite',
      checkIn: '04/08/2025 16:45',
      checkOut: '07/08/2025 12:15',
      duration: '3 días',
      totalAmount: '$510,00',
      status: 'Completado',
      guestCategory: 'Corporativo'
    },
    {
      id: 8,
      guestName: 'Ana Torres',
      roomNumber: '110',
      roomType: 'Individual',
      checkIn: '11/08/2025 14:20',
      checkOut: '14/08/2025 10:45',
      duration: '3 días',
      totalAmount: '$345,00',
      status: 'Activo',
      guestCategory: 'VIP'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-success/10 text-success';
      case 'Completado':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'VIP':
        return 'bg-accent/10 text-accent';
      case 'Corporativo':
        return 'bg-primary/10 text-primary';
      case 'Eventos':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = mockData?.filter(item =>
    item?.guestName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.roomNumber?.includes(searchTerm) ||
    item?.roomType?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (aValue < bValue) {
      return sortConfig?.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig?.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-foreground" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Table" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Registros Detallados
              </h3>
              <p className="text-sm text-muted-foreground">
                {sortedData?.length} registros encontrados
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <Input
            type="search"
            placeholder="Buscar por huésped, habitación o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('guestName')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Huésped</span>
                  <SortIcon column="guestName" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('roomNumber')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Habitación</span>
                  <SortIcon column="roomNumber" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('checkIn')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Check-in</span>
                  <SortIcon column="checkIn" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('checkOut')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Check-out</span>
                  <SortIcon column="checkOut" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Duración</span>
                  <SortIcon column="duration" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('totalAmount')}
                  className="flex items-center space-x-2 hover:text-foreground transition-colors"
                >
                  <span>Total</span>
                  <SortIcon column="totalAmount" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-foreground">{item?.guestName}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Bed" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item?.roomNumber}</div>
                      <div className="text-sm text-muted-foreground">{item?.roomType}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground font-data">{item?.checkIn}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground font-data">{item?.checkOut}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{item?.duration}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{item?.totalAmount}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item?.guestCategory)}`}>
                    {item?.guestCategory}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, sortedData?.length)} de {sortedData?.length} registros
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;