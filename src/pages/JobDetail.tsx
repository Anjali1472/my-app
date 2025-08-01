import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  experience?: string;
  type?: string;
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const handleApply = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      title: "Login Required",
      text: "You must be logged in to apply.",
      icon: "warning",
      confirmButtonText: "Login Now",
    }).then(() => {
      window.location.href = "/login";
    });
    return;
  }

  try {
    // ✅ Make real POST request to backend
    await axios.post(
      "http://localhost:5000/api/application/apply", // Make sure this matches your Express backend
      { jobId: job?.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Application Sent",
      text: "You have successfully applied for this job!",
    });
  } catch (err: any) {
    console.error("Application failed", err);

    Swal.fire({
      icon: "error",
      title: "Application Failed",
      text: err?.response?.data?.message || "Something went wrong.",
    });
  }
};


  if (loading) return <div className="text-center mt-10 text-blue-500">Loading job details...</div>;
  if (!job) return <div className="text-center mt-10 text-red-500">Job not found.</div>;

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{job.title}</h1>
        <p className="text-gray-800 mb-2"><strong>🏢 Company:</strong> {job.company}</p>
        <p className="text-gray-800 mb-2"><strong>📍 Location:</strong> {job.location}</p>
        {job.salary && <p className="text-gray-800 mb-2"><strong>💰 Salary:</strong> {job.salary}</p>}
        {job.experience && <p className="text-gray-800 mb-2"><strong>🧑‍💼 Experience:</strong> {job.experience}</p>}
        {job.type && <p className="text-gray-800 mb-2"><strong>🕒 Type:</strong> {job.type}</p>}
        <hr className="my-4" />
        <p className="text-gray-700 leading-relaxed">{job.description}</p>

        <button
          onClick={handleApply}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
