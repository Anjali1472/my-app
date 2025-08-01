// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "My Applications", path: "/applications" },
    { name: "Notifications", path: "/notifications" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-sky-100 text-sky-800 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-sky-900">Jobify</Link>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition font-medium hover:text-sky-600 ${
                isActive(item.path) ? "font-semibold underline text-sky-700" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile Dropdown */}
        <div className="hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <UserCircle size={28} className="text-sky-700 hover:text-sky-900 transition" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg ring-1 ring-sky-200 z-50 animate-fade-in">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-sky-50 hover:text-sky-600 transition"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white border border-sky-400 text-sky-700 px-4 py-1.5 rounded-full hover:bg-sky-50 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-sky-500 text-white px-4 py-1.5 rounded-full hover:bg-sky-600 font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 mt-3 space-y-3 bg-sky-50 pb-4 rounded-b-md shadow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block bg-sky-200 px-4 py-2 rounded-lg hover:bg-sky-300 text-sm font-medium transition"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 mt-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-white text-sky-700 px-4 py-2 rounded-full border border-sky-400 text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-center bg-white text-sky-700 px-4 py-2 rounded-full border border-sky-400 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-center bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
