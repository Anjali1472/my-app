import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

interface Application {
  id: number;
  status: string;
  jobId: number;
  job?: {
    title: string;
  };
}

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching applications', err);
        setError('Failed to fetch applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app =>
    (app.job?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === 'All' || app.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          My Applications
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="In Review">In Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center text-gray-600">Loading applications...</div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <p className="text-center text-gray-500">
                No applications found for your filter.
              </p>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {app.job?.title || "Job Title Not Found"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Application ID: {app.id}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium px-4 py-1 rounded-full ${getStatusStyle(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
