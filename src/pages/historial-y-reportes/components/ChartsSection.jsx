import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ChartsSection = ({ reportType }) => {
  const occupancyData = [
    { date: '05/08', ocupacion: 85, disponibles: 35, limpieza: 5 },
    { date: '06/08', ocupacion: 92, disponibles: 23, limpieza: 10 },
    { date: '07/08', ocupacion: 78, disponibles: 37, limpieza: 8 },
    { date: '08/08', ocupacion: 88, disponibles: 27, limpieza: 10 },
    { date: '09/08', ocupacion: 95, disponibles: 20, limpieza: 5 },
    { date: '10/08', ocupacion: 82, disponibles: 33, limpieza: 10 },
    { date: '11/08', ocupacion: 90, disponibles: 25, limpieza: 5 }
  ];

  const revenueData = [
    { date: '05/08', ingresos: 8750, revpar: 87.5, adr: 115 },
    { date: '06/08', ingresos: 9200, revpar: 92.0, adr: 118 },
    { date: '07/08', ingresos: 7800, revpar: 78.0, adr: 112 },
    { date: '08/08', ingresos: 8900, revpar: 89.0, adr: 116 },
    { date: '09/08', ingresos: 9500, revpar: 95.0, adr: 120 },
    { date: '10/08', ingresos: 8200, revpar: 82.0, adr: 114 },
    { date: '11/08', ingresos: 9000, revpar: 90.0, adr: 117 }
  ];

  const roomTypeData = [
    { name: 'Individual', value: 35, color: '#2563EB' },
    { name: 'Doble', value: 45, color: '#10B981' },
    { name: 'Suite', value: 15, color: '#F59E0B' },
    { name: 'Familiar', value: 5, color: '#EF4444' }
  ];

  const stayDurationData = [
    { duracion: '1 día', huespedes: 45 },
    { duracion: '2 días', huespedes: 78 },
    { duracion: '3 días', huespedes: 92 },
    { duracion: '4 días', huespedes: 65 },
    { duracion: '5+ días', huespedes: 34 }
  ];

  const formatTooltipValue = (value, name) => {
    if (name === 'ingresos') return [`$${value?.toLocaleString('es-ES')}`, 'Ingresos'];
    if (name === 'revpar') return [`$${value}`, 'RevPAR'];
    if (name === 'adr') return [`$${value}`, 'ADR'];
    return [value, name];
  };

  const renderOccupancyChart = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Ocupación Diaria
            </h3>
            <p className="text-sm text-muted-foreground">
              Últimos 7 días
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="ocupacion" fill="#2563EB" name="Ocupadas" />
            <Bar dataKey="disponibles" fill="#10B981" name="Disponibles" />
            <Bar dataKey="limpieza" fill="#F59E0B" name="Limpieza" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderRevenueChart = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Tendencia de Ingresos
            </h3>
            <p className="text-sm text-muted-foreground">
              Ingresos y métricas clave
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#2563EB" 
              strokeWidth={3}
              name="ingresos"
            />
            <Line 
              type="monotone" 
              dataKey="revpar" 
              stroke="#10B981" 
              strokeWidth={2}
              name="revpar"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderRoomTypeChart = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="PieChart" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Distribución por Tipo
            </h3>
            <p className="text-sm text-muted-foreground">
              Ocupación por tipo de habitación
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={roomTypeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
            >
              {roomTypeData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderStayDurationChart = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Duración de Estadías
            </h3>
            <p className="text-sm text-muted-foreground">
              Distribución por días de estancia
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stayDurationData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" stroke="#64748B" />
            <YAxis dataKey="duracion" type="category" stroke="#64748B" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="huespedes" fill="#F59E0B" name="Huéspedes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const getChartsForReportType = () => {
    switch (reportType) {
      case 'ocupacion-diaria':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderOccupancyChart()}
            {renderRoomTypeChart()}
          </div>
        );
      case 'ingresos-habitacion':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderRevenueChart()}
            {renderRoomTypeChart()}
          </div>
        );
      case 'duracion-estadias':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderStayDurationChart()}
            {renderOccupancyChart()}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderOccupancyChart()}
            {renderRevenueChart()}
          </div>
        );
    }
  };

  return (
    <div className="mb-6">
      {getChartsForReportType()}
    </div>
  );
};

export default ChartsSection;