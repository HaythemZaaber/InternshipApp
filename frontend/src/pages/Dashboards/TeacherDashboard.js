import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Dashboard/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { TEACHER_DASHBOARD_LINKS } from "../../lib/consts/navigation";

const TeacherDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar link={TEACHER_DASHBOARD_LINKS} />
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
