import React, { createContext, useContext, useState } from 'react';

// Types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // in milliseconds, 0 = no auto-dismiss
  dismissible?: boolean; // allow manual dismissal
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// Create Context
const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: () => '',
  removeNotification: () => {},
  clearAllNotifications: () => {},
});

// Provider Component
export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = crypto.randomUUID();
    const newNotification = {
      id,
      dismissible: true,
      duration: 5000,
      ...notification,
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);

    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook for using notifications
export const useNotifications = () => useContext(NotificationsContext);
