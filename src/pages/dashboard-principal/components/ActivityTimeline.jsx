import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'check-in': 'UserPlus',
      'check-out': 'UserMinus',
      'cleaning': 'Sparkles',
      'maintenance': 'Wrench',
      'reservation': 'Calendar'
    };
    return icons?.[type] || 'Clock';
  };

  const getActivityColor = (type) => {
    const colors = {
      'check-in': 'text-success',
      'check-out': 'text-error',
      'cleaning': 'text-warning',
      'maintenance': 'text-secondary',
      'reservation': 'text-primary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity, index) => (
        <div key={activity?.id} className="flex space-x-3">
          {/* Timeline Icon */}
          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            {index < activities?.length - 1 && (
              <div className="w-px h-8 bg-border mt-2"></div>
            )}
          </div>

          {/* Activity Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity?.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                {activity?.room && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Habitación {activity?.room}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground font-data">
                {formatTime(activity?.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;