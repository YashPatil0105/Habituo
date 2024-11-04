import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'lucide-react';

const notificationsData = [
  { id: 1, message: 'Reminder: Complete your workout plan today', read: false },
  { id: 2, message: 'Your streak is at risk!', read: false },
  { id: 3, message: 'Congratulations on unlocking the "Fitness Master" badge!', read: true },
  { id: 4, message: 'New challenges available! Check them out.', read: false },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('Daily');

  const toggleNotificationRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const handleFrequencyChange = (event) => {
    setNotificationFrequency(event.target.value);
  };

  return (
    <div className="min-h-screen p-5 bg-gray-900 text-white">
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Notification Center</h1>
        <button
          onClick={() => setShowSettingsModal(true)}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Notification Settings
        </button>
      </header>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="flex flex-col gap-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex justify-between items-center">
              <span className={notification.read ? 'text-gray-400 line-through' : 'text-white'}>
                {notification.message}
              </span>
              <button
                onClick={() => toggleNotificationRead(notification.id)}
                className={`ml-2 text-xs ${notification.read ? 'text-blue-500' : 'text-gray-300'}`}
              >
                {notification.read ? 'Mark as Unread' : 'Mark as Read'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Notification Settings Modal */}
      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="block text-sm">Notification Frequency</label>
            <select
              value={notificationFrequency}
              onChange={handleFrequencyChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Instant">Instant</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowSettingsModal(false)}>
            Cancel
          </button>
          <button variant="primary" onClick={() => setShowSettingsModal(false)}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// export default NotificationCenter;
