// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetail';
import MyApplications from './pages/MyApplications';
import Notification from './pages/Notification';
import SidebarLayout from './pages/SidebarLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
           <Route path="SidebarLayout" element={<SidebarLayout/>} />
          <Route path="jobs" element={<JobListings />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="notifications" element={<Notification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
