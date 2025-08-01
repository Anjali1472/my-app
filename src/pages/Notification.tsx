// File: src/pages/Notification.tsx
import { Bell } from 'lucide-react';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      message: 'New job posted: Backend Developer in Pune',
      type: 'job',
      time: '2 hrs ago',
    },
    {
      id: 2,
      message: 'Your application for Frontend Developer is under review.',
      type: 'application',
      time: '1 day ago',
    },
  ];

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'border-green-500 text-green-700';
      case 'application':
        return 'border-yellow-500 text-yellow-700';
      default:
        return 'border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No new notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`p-4 border-l-4 rounded-md bg-gray-50 ${getBorderColor(note.type)}`}
            >
              <p className="text-sm md:text-base font-medium">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">{note.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
