import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotifications, Notification } from '../../context/NotificationsContext';

// Individual Notification Component
interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const { removeNotification } = useNotifications();

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => removeNotification(notification.id), 300);
  };

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - (100 / (notification.duration! / 100));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [notification.duration]);

  const renderIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="text-white" size={20} />;
      case 'error':
        return <AlertCircle className="text-white" size={20} />;
      case 'info':
        return <Info className="text-white" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-white" size={20} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-600';
      case 'error':
        return 'bg-red-500 dark:bg-red-600';
      case 'info':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'warning':
        return 'bg-yellow-500 dark:bg-yellow-600';
      default:
        return 'bg-gray-700 dark:bg-gray-800';
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden flex shadow-md transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100'}
        bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700
      `}
      role="alert"
      aria-live="assertive"
    >
      {/* Vertical color bar */}
      <div className={`w-2 rounded-l-lg ${getBackgroundColor()}`} />

      {/* Content */}
      <div className="flex-1 p-4 flex gap-3 items-start">
        <div className={`w-8 h-8 rounded-full ${getBackgroundColor()} flex items-center justify-center`}>
          {renderIcon()}
        </div>

        <div className="flex flex-col flex-1">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            {notification.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
            {notification.message}
          </p>

          {notification.action && (
            <button 
              onClick={notification.action.onClick}
              className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              {notification.action.label}
            </button>
          )}
        </div>

        {notification.dismissible && (
          <button 
            onClick={handleDismiss} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Progress bar */}
      {notification.duration && notification.duration > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800">
          <div 
            className={`h-full transition-all duration-100 ease-linear ${getBackgroundColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

const Notifications: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div className="fixed z-50 top-4 right-4 w-full sm:max-w-sm flex flex-col gap-3">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification}
        />
      ))}
    </div>
  );
};

export default Notifications;