import React from 'react';
import { useNotifications } from '../context/NotificationsContext';
import Button from '../components/ui/Button';

const NotificationDemo: React.FC = () => {
  const { addNotification } = useNotifications();

  const showSuccessNotification = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Your action was completed successfully.',
      duration: 5000,
    });
  };

  const showErrorNotification = () => {
    addNotification({
      type: 'error',
      title: 'Error',
      message: 'There was a problem processing your request.',
      duration: 5000,
    });
  };

  const showInfoNotification = () => {
    addNotification({
      type: 'info',
      title: 'Information',
      message: 'Here is some useful information you should know.',
      duration: 5000,
    });
  };

  const showWarningNotification = () => {
    addNotification({
      type: 'warning',
      title: 'Warning',
      message: 'Be careful! This action might have consequences.',
      duration: 5000,
    });
  };

  const showPersistentNotification = () => {
    addNotification({
      type: 'info',
      title: 'Persistent Notification',
      message: 'This notification will not disappear automatically.',
      duration: 0,
      dismissible: true,
    });
  };

  const showNotificationWithAction = () => {
    addNotification({
      type: 'success',
      title: 'Item Added to Cart',
      message: 'Your item has been added to your shopping cart.',
      duration: 8000,
      action: {
        label: 'View Cart',
        onClick: () => {
          window.location.href = '/cart';
        },
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notification System Demo</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Notification Types</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our notification system supports different types of notifications to convey various kinds of information.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={showSuccessNotification} variant="primary" fullWidth>
              Show Success Notification
            </Button>
            <Button onClick={showErrorNotification} variant="ghost" fullWidth>
              Show Error Notification
            </Button>
            <Button onClick={showInfoNotification} variant="secondary" fullWidth>
              Show Info Notification
            </Button>
            <Button onClick={showWarningNotification} variant="secondary" fullWidth>
              Show Warning Notification
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our notification system also provides additional functionality for more complex use cases.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={showPersistentNotification} variant="secondary" fullWidth>
              Show Persistent Notification
            </Button>
            <Button onClick={showNotificationWithAction} variant="primary" fullWidth>
              Notification With Action
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              To use notifications in your components:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Import the useNotifications hook from NotificationsContext</li>
              <li>Destructure the addNotification function from the hook</li>
              <li>Call addNotification with your notification configuration</li>
            </ol>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 overflow-x-auto">
              <code>
{`import { useNotifications } from '../context/NotificationsContext';

const { addNotification } = useNotifications();

// Show a success notification
addNotification({
  type: 'success',
  title: 'Success!',
  message: 'Your action was completed successfully.',
  duration: 5000,
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;