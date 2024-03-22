import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Dashboard/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { STUDENT_DASHBOARD_LINKS } from "../../lib/consts/navigation";
import ProfileBar from "../../components/Dashboard/ProfileBar";
import axiosInstance from "../../utils/AxiosInstance";
// import getStudent actions from the store
import {
  getStudentRequest,
  getStudentSuccess,
  createStudentFailure,
} from "../../store/reducers/student.slice";
// import useDispatch hook
import { useDispatch } from "react-redux";
// import useSelector hook
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const [showProfileBar, setShowProfileBar] = useState(false);
  const barRef = useRef(null);
  const buttonRef = useRef(null);
  const profileBtn = useRef(null);
  // initialize useDispatch hook
  const dispatch = useDispatch();
  // initialize useSelector hook
  const { student } = useSelector((state) => state.student);
  // const { token } = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Function to handle clicks outside the bar
    const handleClickOutside = (event) => {
      if (
        (barRef.current &&
          !barRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)) ||
        profileBtn.current.contains(event.target)
      ) {
        if (profileBtn.current.contains(event.target)) {
          setTimeout(() => {
            setShowProfileBar(false);
          }, 250);
        } else {
          setShowProfileBar(false);
        }
        // Click occurred outside the bar, so hide the bar
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      dispatch(getStudentRequest());
      try {
        // console.log("token:",token);
        const response = await axiosInstance.get("/student/profile");
        dispatch(getStudentSuccess(response.data.studentProfile));
      } catch (error) {
        console.error(error);
        dispatch(createStudentFailure(error.toString()));
      }
    };
    fetchdata();
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-y-scroll  scrollbar-thumb-[#130A1D] scrollbar-thin scrollbar-track-transparent ">
      <div className="">
        <Sidebar links={STUDENT_DASHBOARD_LINKS} />
      </div>
      <div className="flex-1">
        <Navbar
          setBar={setShowProfileBar}
          buttonRef={buttonRef}
          user={student}
        />
        <ProfileBar
          barRef={barRef}
          show={showProfileBar}
          profileBtn={profileBtn}
          user={student}
        />
        <div className="w-[calc(100vw-17.5rem)] ml-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
