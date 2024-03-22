import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthComponent from "./pages/Auth/AuthComponent";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard";
import StudentDashboard from "./pages/Dashboards/StudentDashboard";
import AdminNews from "./components/AdminDashboard/AdminNews";
import Students from "./components/AdminDashboard/Students";
import StudentNews from "./components/StudentDashboard/StudentNews";
import Internship from "./components/StudentDashboard/Internship";
import StudentProfile from "./components/StudentDashboard/StudentProfile";
import InternshipRequest from "./components/StudentDashboard/InternshipRequest";
import Internships from "./components/TeacherDashboard/Internships";
import TeacherNews from "./components/TeacherDashboard/TeacherNews";
import StudentNotification from "./components/StudentDashboard/StudentNotification";
import TeacherNotifications from "./components/TeacherDashboard/TeacherNotifications";
import InternshipRequests from "./components/AdminDashboard/InternshipRequests";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="teacher/login"
          element={<AuthComponent person="teacher" />}
        />
        <Route
          path="teacher/register"
          element={<AuthComponent person="teacher" />}
        />
        <Route
          path="student/login"
          element={<AuthComponent person="student" />}
        />
        <Route
          path="student/register"
          element={<AuthComponent person="student" />}
        />
        <Route path="admin/login" element={<AuthComponent person="admin" />} />
        <Route
          path="admin/register"
          element={<AuthComponent person="admin" />}
        />
        <Route path="admin/" element={<AdminDashboard />}>
          <Route path="news" element={<AdminNews />} />
          <Route path="students" element={<Students />} />
          <Route path="internshipRequests" element={<InternshipRequests />} />
        </Route>
        <Route path="teacher" element={<TeacherDashboard />}>
          <Route path="internships" element={<TeacherNews />} />
          <Route path="news" element={<Internships />} />
          <Route path="notification" element={<TeacherNotifications />} />
        </Route>
        <Route path="student" element={<StudentDashboard />}>
          <Route path="news" element={<StudentNews />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="internshipRequest" element={<InternshipRequest />} />
          <Route path="internship" element={<Internship />} />
          <Route path="notifications" element={<StudentNotification />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
