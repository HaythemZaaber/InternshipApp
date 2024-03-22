import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Dashboard/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { ADMIN_DASHBOARD_LINKS } from "../../lib/consts/navigation";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar links={ADMIN_DASHBOARD_LINKS} />
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
