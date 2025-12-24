import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);  //"http://localhost:5000/api/jobs"
        const res = await axios.get("http://localhost:5000/api/jobs");

        setJobs(res.data);
        setFilteredJobs(res.data);

        const locationSet = new Set(res.data.map((job: Job) => job.location));
        setLocations(Array.from(locationSet) as string[]);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchTitle = searchTitle
        ? job.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true;
      const matchLocation = selectedLocation
        ? job.location === selectedLocation
        : true;
      return matchTitle && matchLocation;
    });
    setFilteredJobs(filtered);
  }, [searchTitle, selectedLocation, jobs]);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-900">
        🌟 Explore Top Job Opportunities
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        />

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        >
          <option value="">🌍 All Locations</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>🏢 Company:</strong> {job.company}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>📍 Location:</strong> {job.location}
            </p>
            <p className="text-gray-600 text-sm mb-4">{job.description}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          😕 No jobs match your search.
        </p>
      )}
    </div>
  );
};

export default JobListings;
