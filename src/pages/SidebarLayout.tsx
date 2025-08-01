import { useState, useEffect } from 'react';

const SidebarLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard'); // ← default view

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeTab === 'dashboard' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            🏠 Home
          </li>
          <li
            className={`cursor-pointer ${activeTab === 'profile' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 View Profile
          </li>
          <li
            className="cursor-pointer text-red-300"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            🚪 Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h1>
            <p>Choose an option from the sidebar.</p>
          </div>
        )}

        {activeTab === 'profile' && user && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">👤 My Profile</h1>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>DOB:</strong> {user.dob}</p>
              <p><strong>Qualification:</strong> {user.qualification}</p>
              <p><strong>College:</strong> {user.college}</p>
              <p><strong>Passing Year:</strong> {user.passingYear}</p>
              <p><strong>Last Company:</strong> {user.lastCompany}</p>
              <p><strong>Experience:</strong> {user.experience}</p>
              <p><strong>Skills:</strong> {user.skills}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SidebarLayout;
