import React, { useState, useEffect } from 'react';
import HeaderBar from '../../components/ui/HeaderBar';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import KPICard from './components/KPICard';
import RoomCard from './components/RoomCard';
import ActivityTimeline from './components/ActivityTimeline';
import QuickActions from './components/QuickActions';
import RoomFilters from './components/RoomFilters';
import TodaySchedule from './components/TodaySchedule';

const DashboardPrincipal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for rooms
  const [rooms] = useState([
    {
      id: 1,
      number: '101',
      type: 'Individual',
      capacity: 1,
      status: 'occupied',
      currentGuests: 1,
      guests: [{ name: 'Carlos Mendoza', id: 'G001' }],
      checkInTime: '2025-01-11T14:30:00',
      checkOutTime: '2025-01-12T11:00:00'
    },
    {
      id: 2,
      number: '102',
      type: 'Doble',
      capacity: 2,
      status: 'available',
      currentGuests: 0,
      guests: [],
      checkInTime: null,
      checkOutTime: null
    },
    {
      id: 3,
      number: '103',
      type: 'Suite',
      capacity: 4,
      status: 'occupied',
      currentGuests: 3,
      guests: [
        { name: 'Ana García', id: 'G002' },
        { name: 'Luis García', id: 'G003' },
        { name: 'Sofia García', id: 'G004' }
      ],
      checkInTime: '2025-01-10T16:00:00',
      checkOutTime: '2025-01-13T10:00:00'
    },
    {
      id: 4,
      number: '104',
      type: 'Doble',
      capacity: 2,
      status: 'cleaning',
      currentGuests: 0,
      guests: [],
      checkInTime: null,
      checkOutTime: null
    },
    {
      id: 5,
      number: '201',
      type: 'Individual',
      capacity: 1,
      status: 'available',
      currentGuests: 0,
      guests: [],
      checkInTime: null,
      checkOutTime: null
    },
    {
      id: 6,
      number: '202',
      type: 'Familiar',
      capacity: 6,
      status: 'occupied',
      currentGuests: 4,
      guests: [
        { name: 'María Rodriguez', id: 'G005' },
        { name: 'Pedro Rodriguez', id: 'G006' },
        { name: 'Carmen Rodriguez', id: 'G007' },
        { name: 'Diego Rodriguez', id: 'G008' }
      ],
      checkInTime: '2025-01-11T15:45:00',
      checkOutTime: '2025-01-14T11:00:00'
    },
    {
      id: 7,
      number: '203',
      type: 'Suite',
      capacity: 4,
      status: 'maintenance',
      currentGuests: 0,
      guests: [],
      checkInTime: null,
      checkOutTime: null
    },
    {
      id: 8,
      number: '204',
      type: 'Doble',
      capacity: 2,
      status: 'available',
      currentGuests: 0,
      guests: [],
      checkInTime: null,
      checkOutTime: null
    }
  ]);

  // Mock data for activities
  const [activities] = useState([
    {
      id: 1,
      type: 'check-in',
      title: 'Check-in completado',
      description: 'Carlos Mendoza se registró exitosamente',
      room: '101',
      timestamp: '2025-01-11T14:30:00'
    },
    {
      id: 2,
      type: 'check-in',
      title: 'Check-in completado',
      description: 'Familia Rodriguez se registró exitosamente',
      room: '202',
      timestamp: '2025-01-11T15:45:00'
    },
    {
      id: 3,
      type: 'cleaning',
      title: 'Limpieza iniciada',
      description: 'Personal de limpieza comenzó servicio',
      room: '104',
      timestamp: '2025-01-11T13:15:00'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Mantenimiento programado',
      description: 'Revisión de aire acondicionado',
      room: '203',
      timestamp: '2025-01-11T10:00:00'
    },
    {
      id: 5,
      type: 'reservation',
      title: 'Nueva reserva',
      description: 'Reserva confirmada para mañana',
      room: '102',
      timestamp: '2025-01-11T09:30:00'
    }
  ]);

  // Mock data for today's schedule
  const [todayCheckIns] = useState([
    {
      id: 1,
      guestName: 'Elena Martínez',
      room: '102',
      expectedTime: '2025-01-11T16:00:00',
      status: 'confirmed'
    },
    {
      id: 2,
      guestName: 'Roberto Silva',
      room: '204',
      expectedTime: '2025-01-11T18:30:00',
      status: 'pending'
    },
    {
      id: 3,
      guestName: 'Carmen López',
      room: '201',
      expectedTime: '2025-01-11T20:00:00',
      status: 'confirmed'
    }
  ]);

  const [todayCheckOuts] = useState([
    {
      id: 1,
      guestName: 'Carlos Mendoza',
      room: '101',
      expectedTime: '2025-01-12T11:00:00',
      status: 'pending'
    },
    {
      id: 2,
      guestName: 'Ana García',
      room: '103',
      expectedTime: '2025-01-13T10:00:00',
      status: 'scheduled'
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate KPIs
  const kpiData = {
    totalRooms: rooms?.length,
    occupiedRooms: rooms?.filter(room => room?.status === 'occupied')?.length,
    availableRooms: rooms?.filter(room => room?.status === 'available')?.length,
    cleaningRooms: rooms?.filter(room => room?.status === 'cleaning')?.length,
    maintenanceRooms: rooms?.filter(room => room?.status === 'maintenance')?.length,
    totalGuests: rooms?.reduce((sum, room) => sum + (room?.currentGuests || 0), 0),
    occupancyRate: Math.round((rooms?.filter(room => room?.status === 'occupied')?.length / rooms?.length) * 100),
    dailyRevenue: 15750.00
  };

  // Filter rooms based on search and filters
  const filteredRooms = rooms?.filter(room => {
    const matchesSearch = !searchTerm || 
      room?.number?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      room?.guests?.some(guest => guest?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || room?.status === statusFilter;
    const matchesType = typeFilter === 'all' || room?.type?.toLowerCase() === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (roomId, action) => {
    console.log(`${action} for room ${roomId}`);
    // Handle room status changes
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    console.log('View details for room:', room);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderBar />
        <SidebarNavigation />
        <div className="md:ml-60 pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      <SidebarNavigation />
      <div className="md:ml-60 pt-16">
        
        <NavigationBreadcrumb />
        
        <main className="p-8">
          {/* KPI Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Habitaciones Ocupadas"
              value={kpiData?.occupiedRooms}
              subtitle={`${kpiData?.occupancyRate}% de ocupación`}
              icon="Bed"
              color="error"
              trend="up"
              trendValue="+12%"
            />
            <KPICard
              title="Habitaciones Disponibles"
              value={kpiData?.availableRooms}
              subtitle="Listas para huéspedes"
              icon="CheckCircle"
              color="success"
              trend=""
              trendValue=""
            />
            <KPICard
              title="Huéspedes Actuales"
              value={kpiData?.totalGuests}
              subtitle="En el Motel"
              icon="Users"
              color="primary"
              trend="up"
              trendValue="+5"
            />
            <KPICard
              title="Ingresos Hoy"
              value={`$${kpiData?.dailyRevenue?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
              subtitle="Facturación diaria"
              icon="Euro"
              color="success"
              trend="up"
              trendValue="+8.5%"
            />
          </div> */}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            {/* Main Content - Room Grid */}
            <div className="xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Estado de Habitaciones
                </h2>
                
                <RoomFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  typeFilter={typeFilter}
                  onTypeFilterChange={setTypeFilter}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Room Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms?.map(room => (
                  <RoomCard
                    key={room?.id}
                    room={room}
                    onStatusChange={handleStatusChange}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {filteredRooms?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron habitaciones que coincidan con los filtros aplicados.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1 space-y-8">

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <QuickActions />
              </div>

              {/* Today's Schedule */}
              {/* <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Programación de Hoy
                </h3>
                <TodaySchedule 
                  checkIns={todayCheckIns}
                  checkOuts={todayCheckOuts}
                />
              </div> */}

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Actividad Reciente
                </h3>
                <ActivityTimeline activities={activities?.slice(0, 5)} />
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPrincipal;