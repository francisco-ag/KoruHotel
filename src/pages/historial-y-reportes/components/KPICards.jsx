import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ reportType }) => {
  const getKPIData = () => {
    switch (reportType) {
      case 'ocupacion-diaria':
        return [
          {
            title: 'Ocupación Promedio',
            value: '78,5%',
            change: '+5,2%',
            trend: 'up',
            icon: 'TrendingUp',
            color: 'success'
          },
          {
            title: 'Habitaciones Ocupadas',
            value: '94',
            change: '+12',
            trend: 'up',
            icon: 'Bed',
            color: 'primary'
          },
          {
            title: 'Habitaciones Disponibles',
            value: '26',
            change: '-12',
            trend: 'down',
            icon: 'Home',
            color: 'warning'
          },
          {
            title: 'Tiempo Promedio Estadía',
            value: '3,2 días',
            change: '+0,4',
            trend: 'up',
            icon: 'Clock',
            color: 'accent'
          }
        ];
      case 'ingresos-habitacion':
        return [
          {
            title: 'Ingresos Totales',
            value: '$45.280',
            change: '+8,7%',
            trend: 'up',
            icon: 'Euro',
            color: 'success'
          },
          {
            title: 'RevPAR',
            value: '$89,50',
            change: '+12,3%',
            trend: 'up',
            icon: 'TrendingUp',
            color: 'primary'
          },
          {
            title: 'ADR',
            value: '$114,00',
            change: '+3,1%',
            trend: 'up',
            icon: 'Calculator',
            color: 'accent'
          },
          {
            title: 'Ingresos por Servicios',
            value: '$8.750',
            change: '+15,2%',
            trend: 'up',
            icon: 'ShoppingBag',
            color: 'warning'
          }
        ];
      default:
        return [
          {
            title: 'Total Registros',
            value: '1.247',
            change: '+156',
            trend: 'up',
            icon: 'FileText',
            color: 'primary'
          },
          {
            title: 'Huéspedes Únicos',
            value: '892',
            change: '+89',
            trend: 'up',
            icon: 'Users',
            color: 'success'
          },
          {
            title: 'Estadía Promedio',
            value: '2,8 días',
            change: '+0,2',
            trend: 'up',
            icon: 'Calendar',
            color: 'accent'
          },
          {
            title: 'Satisfacción',
            value: '4,6/5',
            change: '+0,1',
            trend: 'up',
            icon: 'Star',
            color: 'warning'
          }
        ];
    }
  };

  const kpiData = getKPIData();

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      accent: 'bg-accent/10 text-accent',
      error: 'bg-error/10 text-error'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpiData?.map((kpi, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(kpi?.color)}`}>
              <Icon name={kpi?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor(kpi?.trend)}`}>
              <Icon 
                name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{kpi?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {kpi?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {kpi?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;