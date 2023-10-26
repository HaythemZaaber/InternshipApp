import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthComponent from "./pages/Auth/AuthComponent";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard";
import StudentDashboard from "./pages/Dashboards/StudentDashboard";
import News from "./components/AdminDashboard/News";
import StudentsGroup from "./components/AdminDashboard/StudentsGroup";

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
        <Route path="admin/dashboard" element={<AdminDashboard />}>
          <Route path="news" element={<News />} />
          <Route path="studentsGroup" element={<StudentsGroup />} />
          {/* <Route path="news" element={<News />} /> */}
          {/* <Route path="news" element={<News />} /> */}
        </Route>
        <Route path="teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
