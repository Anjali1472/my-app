// src/pages/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-4"> {/* Ensure padding for fixed Navbar */}
        <Outlet /> {/* This renders nested routes like Home, Jobs, etc */}
      </div>
    </>
  );
};

export default Layout;
