import React from 'react';
import Icon from '../../../components/AppIcon';

const RoomStatusCard = ({ title, count, total, icon, color, trend }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  const getColorClasses = (colorName) => {
    const colors = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20'
      },
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        border: 'border-error/20'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20'
      },
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary/20'
      }
    };
    return colors?.[colorName] || colors?.primary;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg border ${colorClasses?.bg} ${colorClasses?.border} flex items-center justify-center`}>
              <Icon name={icon} size={24} className={colorClasses?.text} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-card-foreground">
                  {count}
                </span>
                <span className="text-sm text-muted-foreground">
                  de {total}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ocupación</span>
              <span className={`font-medium ${colorClasses?.text}`}>
                {percentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${colorClasses?.text?.replace('text-', 'bg-')}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Trend Indicator */}
          {trend && (
            <div className="flex items-center space-x-1 mt-3">
              <Icon 
                name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={trend?.direction === 'up' ? 'text-success' : 'text-error'}
              />
              <span className={`text-xs font-medium ${trend?.direction === 'up' ? 'text-success' : 'text-error'}`}>
                {trend?.value}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs. ayer
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomStatusCard;