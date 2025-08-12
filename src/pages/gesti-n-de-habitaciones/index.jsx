import React, { useState, useEffect } from 'react';
import HeaderBar from '../../components/ui/HeaderBar';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoomConfigurationPanel from './components/RoomConfigurationPanel';
import RoomsTable from './components/RoomsTable';
import RoomStatusCard from './components/RoomStatusCard';
import RoomQuickActions from './components/RoomQuickActions';

const GestionDeHabitaciones = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockRooms = [
      {
        id: '1',
        roomNumber: '101',
        type: 'individual',
        capacity: 1,
        floor: '1',
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac'],
        createdAt: '2025-01-10T10:00:00Z'
      },
      {
        id: '2',
        roomNumber: '102',
        type: 'doble',
        capacity: 2,
        floor: '1',
        status: 'ocupada',
        amenities: ['wifi', 'tv', 'ac', 'minibar'],
        createdAt: '2025-01-10T10:15:00Z'
      },
      {
        id: '3',
        roomNumber: '103',
        type: 'triple',
        capacity: 3,
        floor: '1',
        status: 'limpieza',
        amenities: ['wifi', 'tv', 'ac', 'balcony'],
        createdAt: '2025-01-10T10:30:00Z'
      },
      {
        id: '4',
        roomNumber: '201',
        type: 'suite',
        capacity: 4,
        floor: '2',
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi', 'safe'],
        createdAt: '2025-01-10T11:00:00Z'
      },
      {
        id: '5',
        roomNumber: '202',
        type: 'familiar',
        capacity: 6,
        floor: '2',
        status: 'mantenimiento',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'balcony'],
        createdAt: '2025-01-10T11:15:00Z'
      },
      {
        id: '6',
        roomNumber: '203',
        type: 'doble',
        capacity: 2,
        floor: '2',
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac', 'breakfast'],
        createdAt: '2025-01-10T11:30:00Z'
      },
      {
        id: '7',
        roomNumber: '301',
        type: 'presidencial',
        capacity: 8,
        floor: '3',
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi', 'safe', 'balcony', 'breakfast'],
        createdAt: '2025-01-10T12:00:00Z'
      },
      {
        id: '8',
        roomNumber: '302',
        type: 'suite',
        capacity: 4,
        floor: '3',
        status: 'ocupada',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe'],
        createdAt: '2025-01-10T12:15:00Z'
      }
    ];
    
    setRooms(mockRooms);
  }, []);

  const handleAddRoom = async (roomData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for duplicate room number
      const existingRoom = rooms?.find(room => room?.roomNumber === roomData?.roomNumber);
      if (existingRoom) {
        throw new Error('Ya existe una habitación con este número');
      }
      
      setRooms(prev => [...prev, roomData]);
    } catch (error) {
      console.error('Error adding room:', error);
      // In a real app, show error notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRoom = (updatedRoom) => {
    setRooms(prev => prev?.map(room => 
      room?.id === updatedRoom?.id ? updatedRoom : room
    ));
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta habitación?')) {
      setRooms(prev => prev?.filter(room => room?.id !== roomId));
    }
  };

  const handleBulkAction = (roomIds, action, value) => {
    setRooms(prev => prev?.map(room => {
      if (roomIds?.includes(room?.id)) {
        if (action === 'updateStatus') {
          return { ...room, status: value };
        }
      }
      return room;
    }));
  };

  const handleQuickAction = async (actionType) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (actionType) {
        case 'bulk-available':
          setRooms(prev => prev?.map(room => ({ ...room, status: 'disponible' })));
          break;
        case 'bulk-cleaning':
          setRooms(prev => prev?.map(room => 
            room?.status === 'disponible' ? { ...room, status: 'limpieza' } : room
          ));
          break;
        case 'maintenance-check':
          // Simulate scheduling maintenance
          console.log('Maintenance check scheduled for all rooms');
          break;
        case 'export-report':
          // Simulate report export
          console.log('Room status report exported');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error executing quick action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate room statistics
  const roomStats = {
    total: rooms?.length,
    available: rooms?.filter(room => room?.status === 'disponible')?.length,
    occupied: rooms?.filter(room => room?.status === 'ocupada')?.length,
    cleaning: rooms?.filter(room => room?.status === 'limpieza')?.length,
    maintenance: rooms?.filter(room => room?.status === 'mantenimiento')?.length
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      <SidebarNavigation isCollapsed={sidebarCollapsed} />
      <main className={`transition-all duration-200 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'} pt-16`}>
        <NavigationBreadcrumb />
        
        <div className="p-8 space-y-8">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoomStatusCard
              title="Habitaciones Disponibles"
              count={roomStats?.available}
              total={roomStats?.total}
              icon="CheckCircle"
              color="success"
              trend={{ direction: 'up', value: 12 }}
            />
            <RoomStatusCard
              title="Habitaciones Ocupadas"
              count={roomStats?.occupied}
              total={roomStats?.total}
              icon="Users"
              color="error"
              trend={{ direction: 'down', value: 5 }}
            />
            <RoomStatusCard
              title="En Limpieza"
              count={roomStats?.cleaning}
              total={roomStats?.total}
              icon="Sparkles"
              color="warning"
              trend={{ direction: 'up', value: 8 }}
            />
            <RoomStatusCard
              title="En Mantenimiento"
              count={roomStats?.maintenance}
              total={roomStats?.total}
              icon="Wrench"
              color="primary"
              trend={{ direction: 'down', value: 3 }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Rooms Table - 8 columns */}
            <div className="xl:col-span-8">
              <RoomsTable
                rooms={rooms}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={handleDeleteRoom}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Right Panel - 4 columns */}
            <div className="xl:col-span-4 space-y-6">
              {/* Room Configuration Panel */}
              <RoomConfigurationPanel
                onAddRoom={handleAddRoom}
                isLoading={isLoading}
              />

              {/* Quick Actions */}
              <RoomQuickActions
                onQuickAction={handleQuickAction}
                totalRooms={roomStats?.total}
                availableRooms={roomStats?.available}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default GestionDeHabitaciones;