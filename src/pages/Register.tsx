import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface FormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  qualification: string;
  college: string;
  passingYear: string;
  lastCompany: string;
  experience: string;
  skills: string;
  password: string;
  confirmPassword: string;
  resume: File | null;
  [key: string]: string | File | null;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dob: '',
    qualification: '',
    college: '',
    passingYear: '',
    lastCompany: '',
    experience: '',
    skills: '',
    password: '',
    confirmPassword: '',
    resume: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, resume: files?.[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    for (const key in formData) {
      const value = formData[key];
      if (value === null || value === undefined) continue;

      if (key === 'resume' && value instanceof File) {
        data.append(key, value);
      } else if (key === 'skills' && typeof value === 'string') {
        const skillsArray = value
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
        data.append(key, JSON.stringify(skillsArray));
      } else {
        data.append(key, value.toString());
      }
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      setMessage(result.message || result.error || 'Something went wrong.');
      if (response.ok) {
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      setMessage('Server error');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">Create Your Profile</h2>

        {message && (
          <div className={`mb-6 text-center py-3 px-4 rounded-lg font-medium ${
            message.toLowerCase().includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Personal Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="name" label="Full Name" value={formData.name} onChange={handleChange} />
            <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <Input name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} />
            <Input name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} />
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="qualification" label="Qualification" value={formData.qualification} onChange={handleChange} />
            <Input name="college" label="College / University" value={formData.college} onChange={handleChange} />
            <Input name="passingYear" label="Passing Year" value={formData.passingYear} onChange={handleChange} />
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="lastCompany" label="Last Company" value={formData.lastCompany} onChange={handleChange} />
            <Input name="experience" label="Years of Experience" value={formData.experience} onChange={handleChange} />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <Input
            name="skills"
            label="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React"
          />
        </div>

        {/* Resume */}
        <div className="mb-8">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-600 mb-2">Upload Resume (PDF/DOC/DOCX)</label>
          <input
            id="resume"
            name="resume"
            onChange={handleChange}
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full border p-3 border-gray-300 rounded-lg file:bg-indigo-50 file:text-indigo-600 file:font-semibold file:border-none file:mr-4"
          />
        </div>

        {/* Passwords */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordInput
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              visible={showPassword}
              toggle={() => setShowPassword(p => !p)}
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              visible={showConfirm}
              toggle={() => setShowConfirm(p => !p)}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default Register;

// Reusable Input component
const Input = ({
  name, label, value, onChange, type = 'text', placeholder
}: {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

// Password input with toggle
const PasswordInput = ({
  name, label, value, onChange, visible, toggle
}: {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  visible: boolean;
  toggle: () => void;
}) => (
  <div className="relative">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={visible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600 transition"
    >
      {visible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
    </button>
  </div>
);
