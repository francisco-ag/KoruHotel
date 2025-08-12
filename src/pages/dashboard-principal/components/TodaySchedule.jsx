import React from 'react';
import Icon from '../../../components/AppIcon';

const TodaySchedule = ({ checkIns, checkOuts }) => {
  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedCheckIns = [...checkIns]?.sort((a, b) => new Date(a.expectedTime) - new Date(b.expectedTime));
  const sortedCheckOuts = [...checkOuts]?.sort((a, b) => new Date(a.expectedTime) - new Date(b.expectedTime));

  return (
    <div className="space-y-6">
      {/* Check-ins Today */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="UserPlus" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">
            Check-ins Hoy
          </h3>
          <span className="bg-success/10 text-success px-2 py-1 rounded-full text-sm font-medium">
            {checkIns?.length}
          </span>
        </div>

        <div className="space-y-3">
          {sortedCheckIns?.length > 0 ? (
            sortedCheckIns?.map((checkIn) => (
              <div key={checkIn?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {checkIn?.guestName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Habitación {checkIn?.room}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-data text-foreground">
                    {formatTime(checkIn?.expectedTime)}
                  </div>
                  <div className={`text-xs ${
                    checkIn?.status === 'confirmed' ? 'text-success' : 
                    checkIn?.status === 'pending' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {checkIn?.status === 'confirmed' ? 'Confirmado' : 
                     checkIn?.status === 'pending' ? 'Pendiente' : 'Sin confirmar'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No hay check-ins programados para hoy
            </div>
          )}
        </div>
      </div>
      {/* Check-outs Today */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="UserMinus" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-foreground">
            Check-outs Hoy
          </h3>
          <span className="bg-error/10 text-error px-2 py-1 rounded-full text-sm font-medium">
            {checkOuts?.length}
          </span>
        </div>

        <div className="space-y-3">
          {sortedCheckOuts?.length > 0 ? (
            sortedCheckOuts?.map((checkOut) => (
              <div key={checkOut?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {checkOut?.guestName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Habitación {checkOut?.room}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-data text-foreground">
                    {formatTime(checkOut?.expectedTime)}
                  </div>
                  <div className={`text-xs ${
                    checkOut?.status === 'completed' ? 'text-success' : 
                    checkOut?.status === 'pending' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {checkOut?.status === 'completed' ? 'Completado' : 
                     checkOut?.status === 'pending' ? 'Pendiente' : 'Programado'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No hay check-outs programados para hoy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;