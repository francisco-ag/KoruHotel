import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, icon, color, trend, trendValue }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${colorClasses?.[color] || colorClasses?.primary}`}>
              <Icon name={icon} size={20} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-foreground">
              {value}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${trendColors?.[trend]}`}>
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;