import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaRobot, FaFileAlt, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-sky-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-300 to-teal-300 text-sky-900 py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Find Your Dream Job
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl mb-8 text-sky-800"
        >
          Thousands of opportunities. One destination.
        </motion.p>
        <Link
          to="/register"
          className="bg-white text-sky-700 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-sky-100 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect job seekers with trusted employers using AI, verified listings, and career tools.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <div className="p-6 rounded-xl bg-sky-50 shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-teal-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">Every job post is verified to ensure a secure hiring process.</p>
          </div>
          <div className="p-6 rounded-xl bg-sky-50 shadow hover:shadow-lg transition">
            <FaRobot className="text-purple-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">AI-powered suggestions tailored to your skills and goals.</p>
          </div>
          <div className="p-6 rounded-xl bg-sky-50 shadow hover:shadow-lg transition">
            <FaFileAlt className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resume Builder</h3>
            <p className="text-gray-600">Design and export a professional resume right from your profile.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sky-100 py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800">What Our Users Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: 'I found my dream job within two weeks of signing up!', name: 'Aditi Sharma' },
            { text: 'User-friendly and great support team! Highly recommended.', name: 'Rahul Verma' },
            { text: 'This platform helped me land my first internship!', name: 'Priya Das' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <FaQuoteLeft className="text-sky-400 text-2xl mb-3" />
              <p className="text-gray-700 italic">"{item.text}"</p>
              <h4 className="mt-4 font-semibold text-gray-800">– {item.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-200 text-sky-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-lg mb-3">About Us</h4>
            <p>
              We are dedicated to helping individuals grow their careers and enabling businesses to hire the right talent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/register" className="hover:underline">Register</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Contact</h4>
            <p>Email: support@jobportal.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="mt-6 text-center text-sky-700 text-xs">© 2025 Job Portal. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;
