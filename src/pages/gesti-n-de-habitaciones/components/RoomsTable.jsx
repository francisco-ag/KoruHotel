import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoomsTable = ({ rooms, onUpdateRoom, onDeleteRoom, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'roomNumber', direction: 'asc' });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'ocupada', label: 'Ocupada' },
    { value: 'limpieza', label: 'En Limpieza' },
    { value: 'mantenimiento', label: 'Mantenimiento' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      disponible: 'bg-success/10 text-success border-success/20',
      ocupada: 'bg-error/10 text-error border-error/20',
      limpieza: 'bg-warning/10 text-warning border-warning/20',
      mantenimiento: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusLabel = (status) => {
    const labels = {
      disponible: 'Disponible',
      ocupada: 'Ocupada',
      limpieza: 'Limpieza',
      mantenimiento: 'Mantenimiento'
    };
    return labels?.[status] || status;
  };

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = rooms?.filter(room => {
      const matchesSearch = room?.roomNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           room?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = filterStatus === 'all' || room?.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'roomNumber') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [rooms, searchTerm, sortConfig, filterStatus]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    setSelectedRooms(checked ? filteredAndSortedRooms?.map(room => room?.id) : []);
  };

  const handleSelectRoom = (roomId, checked) => {
    setSelectedRooms(prev => 
      checked 
        ? [...prev, roomId]
        : prev?.filter(id => id !== roomId)
    );
  };

  const handleEditRoom = (room) => {
    setEditingRoom({ ...room });
  };

  const handleSaveEdit = () => {
    if (editingRoom) {
      onUpdateRoom(editingRoom);
      setEditingRoom(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedRooms?.length > 0) {
      onBulkAction(selectedRooms, 'updateStatus', newStatus);
      setSelectedRooms([]);
    }
  };

  const SortableHeader = ({ label, sortKey }) => (
    <button
      onClick={() => handleSort(sortKey)}
      className="flex items-center space-x-1 text-left font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      <span>{label}</span>
      <Icon 
        name={sortConfig?.key === sortKey && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
        size={14}
        className={sortConfig?.key === sortKey ? 'text-primary' : 'text-muted-foreground'}
      />
    </button>
  );

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Gestión de Habitaciones
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedRooms?.length} de {rooms?.length} habitaciones
            </p>
          </div>
          
          {selectedRooms?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedRooms?.length} seleccionadas
              </span>
              <Select
                placeholder="Acciones en lote"
                options={[
                  { value: 'disponible', label: 'Marcar como Disponible' },
                  { value: 'limpieza', label: 'Enviar a Limpieza' },
                  { value: 'mantenimiento', label: 'Enviar a Mantenimiento' }
                ]}
                value=""
                onChange={handleBulkStatusChange}
                className="w-48"
              />
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="search"
            placeholder="Buscar por número o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="flex-1"
          />
          
          <Select
            placeholder="Filtrar por estado"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-48"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedRooms?.length === filteredAndSortedRooms?.length && filteredAndSortedRooms?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <SortableHeader label="Habitación" sortKey="roomNumber" />
              </th>
              <th className="text-left p-4">
                <SortableHeader label="Tipo" sortKey="type" />
              </th>
              <th className="text-left p-4">
                <SortableHeader label="Capacidad" sortKey="capacity" />
              </th>
              <th className="text-left p-4">
                <SortableHeader label="Piso" sortKey="floor" />
              </th>
              <th className="text-left p-4">Estado</th>
              <th className="text-left p-4">Servicios</th>
              <th className="text-center p-4 w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRooms?.map((room) => (
              <tr key={room?.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <Checkbox
                    checked={selectedRooms?.includes(room?.id)}
                    onChange={(e) => handleSelectRoom(room?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-card-foreground">
                    {room?.roomNumber}
                  </div>
                </td>
                <td className="p-4">
                  {editingRoom?.id === room?.id ? (
                    <Select
                      options={[
                        { value: 'individual', label: 'Individual' },
                        { value: 'doble', label: 'Doble' },
                        { value: 'triple', label: 'Triple' },
                        { value: 'suite', label: 'Suite' },
                        { value: 'familiar', label: 'Familiar' }
                      ]}
                      value={editingRoom?.type}
                      onChange={(value) => setEditingRoom(prev => ({ ...prev, type: value }))}
                      className="w-32"
                    />
                  ) : (
                    <span className="text-muted-foreground capitalize">
                      {room?.type}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {editingRoom?.id === room?.id ? (
                    <Input
                      type="number"
                      min="1"
                      max="8"
                      value={editingRoom?.capacity}
                      onChange={(e) => setEditingRoom(prev => ({ ...prev, capacity: parseInt(e?.target?.value) }))}
                      className="w-20"
                    />
                  ) : (
                    <span className="text-muted-foreground">
                      {room?.capacity} personas
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span className="text-muted-foreground">
                    Piso {room?.floor}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(room?.status)}`}>
                    {getStatusLabel(room?.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {room?.amenities?.slice(0, 3)?.map((amenity) => (
                      <span key={amenity} className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                    {room?.amenities?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        +{room?.amenities?.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    {editingRoom?.id === room?.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveEdit}
                          iconName="Check"
                          className="text-success hover:text-success"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          iconName="X"
                          className="text-error hover:text-error"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRoom(room)}
                          iconName="Edit"
                          className="text-muted-foreground hover:text-foreground"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteRoom(room?.id)}
                          iconName="Trash2"
                          className="text-error hover:text-error"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedRooms?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No se encontraron habitaciones
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'all' ?'Intente ajustar los filtros de búsqueda' :'Agregue su primera habitación usando el panel de configuración'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsTable;