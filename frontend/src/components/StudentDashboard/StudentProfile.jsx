import React, { useCallback, useEffect, useState } from "react";
import profileImg from "../../assets/images/haythem.jpg";
import axiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
// import useNavigate
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
// import { usePicture } from "../Dashboard/PictureProvider";

// import useSelector hook
import { useSelector } from "react-redux";
import { updateStudentSuccess } from "../../store/reducers/student.slice";
// import useDispatch
import { useDispatch } from "react-redux";

const StudentProfile = () => {
  const [file, setFile] = useState("");
  // const { picture, setPicture } = usePicture();
  const dispatch = useDispatch();
  // navigate hook
  const navigate = useNavigate();

  const { student } = useSelector((state) => state.student);

  const [studentData, setStudentData] = useState({
    address: "",
    phoneNumber: "",
    secondPhoneNumber: "",
    linkedIn: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      address: student.address,
      phoneNumber: student.phoneNumber,
      secondPhoneNumber: student.secondPhoneNumber,
      linkedIn: student.linkedIn,
    }));
  }, [student]);

  const updateProfileData = async () => {
    try {
      const response = await axiosInstance.get("/student/profile");
      // access to the picture inside the data
      console.log("StudentProfileData:", response.data.studentProfile);
      dispatch(updateStudentSuccess(response.data.studentProfile));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/student/profile");
      // access to the picture inside the data
      console.log("pictureData:", response.data.studentProfile.picture);
      dispatch(
        updateStudentSuccess({ picture: response.data.studentProfile.picture })
      );
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const createProfilePicture = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("file: ", file);

        const response = await axiosInstance.post("/student/upload", formData);

        console.log("response from the POST method:", response);

        // Assuming fetchData is a function to fetch data, call it here if needed
        fetchData();
      } catch (error) {
        console.error("Error creating profile picture:", error);
      }
    };

    // Only call createProfilePicture if file is defined
    if (file) {
      createProfilePicture();
    }
  }, [file, fetchData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phoneNumber" || name === "secondPhoneNumber") {
      value = parseInt(value, 10);
    }
    if (name === "birthday") {
      var date = new Date(value);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const day = date.getDate();
      value = `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`;
    }
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("studentData", studentData);
    updateDatabase(studentData);
  };

  const updateDatabase = async (studentData) => {
    try {
      const response = await axiosInstance.put("/student", studentData);
      console.log("responseThePostMethod", response);
      toast.success("Profile updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      updateProfileData();
      setTimeout(() => {
        if (
          studentData.currentPassword &&
          studentData.newPassword &&
          studentData.confirmNewPassword &&
          response
        ) {
          navigate("/student/login");
          localStorage.removeItem("authToken");
        }
      }, 2000);
    } catch (error) {
      console.log("error:", error);
      toast.error("An error occurred: " + error.response.data.error, {
        position: "top-right",
        autoClose: 5000, // Time in milliseconds before the notification closes automatically
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the notification when clicked
        pauseOnHover: true, // Pause the auto-close timer when hovering over the notification
        draggable: true, // Allow dragging the notification
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-[75%,23%] gap-3 w-[calc(100vw-17.5rem)] ml-auto">
        <div className="flex flex-col gap-4 ">
          <div className="bg-[#130A1D] rounded-lg p-5 mb-2 ">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="text-center font-bold text-3xl pb-10 ">
                Personal information
              </h1>

              <div className="flex flex-col gap-5">
                <div className="flex items-center my-3 gap-10">
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="studentName">
                      Student Name
                    </label>
                    <input
                      type="text"
                      placeholder={student.name}
                      name="name"
                      id="studentName"
                      disabled
                      className="rounded-md p-2 bg-[#493066] text-white"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder={student.email}
                      name="email"
                      id="email"
                      disabled
                      className="rounded-md p-2 bg-[#493066] text-white"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center w-[100%] my-3 gap-10">
                  <div className="flex flex-1 flex-col gap-2 ">
                    <label className="font-bold" htmlFor="birthday">
                      Birthday
                    </label>
                    <input
                      type="text"
                      name="birthday"
                      id="birthday"
                      disabled
                      placeholder={student.birthday}
                      className="rounded-md p-2 bg-[#493066] text-white"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={studentData.address}
                      className="rounded-md p-2 bg-[#493066] text-white "
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center w-[100%] my-3 gap-10">
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      type="Number"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={studentData.phoneNumber}
                      className="rounded-md p-2 bg-[#493066] text-white "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="secondPhoneNumber">
                      Second Phone Number
                    </label>
                    <input
                      type="Number"
                      name="secondPhoneNumber"
                      id="secondPhoneNumber"
                      value={studentData.secondPhoneNumber}
                      className="rounded-md p-2 bg-[#493066] text-white "
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label className="font-bold" htmlFor="linkedin">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="linkedIn"
                    id="linkedin"
                    value={studentData.linkedIn}
                    className="rounded-md p-2 bg-[#493066] text-white "
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-center font-bold text-white p-3 mt-6">
                <button
                  className="bg-[#8c5ac5] py-2 px-5 rounded-xl"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#130A1D] rounded-lg p-5 mb-2 ">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="text-center font-bold text-3xl pb-10 ">
                Security
              </h1>

              <div className="flex flex-col gap-5">
                <div className="flex flex-1 flex-col gap-2">
                  <label className="font-bold" htmlFor="current_password">
                    Current password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="current_password"
                    className="rounded-md p-2 bg-[#493066] text-white tracking-widest"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center w-[100%] my-3 gap-10">
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="new_password">
                      New password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="new_Password"
                      className="rounded-md p-2 bg-[#493066] text-white tracking-widest"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-bold" htmlFor="confirm_new_password">
                      Confirm your new password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      id="confirm_new_password"
                      className="rounded-md p-2 bg-[#493066] text-white tracking-widest"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center font-bold text-white p-3 mt-4">
                  <button
                    className="bg-[#8c5ac5] py-2 px-5 rounded-xl"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-[#130A1D] rounded-lg p-5 grid-flow-row sticky top-[6.5rem] right-3 h-fit">
          <div className="flex flex-col justify-center items-center gap-5 p-7">
            <div className="flex  rounded-full overflow-hidden ">
              <img
                className=" inline-block h-48 w-48 rounded-full ring-2 ring-white "
                src={
                  student.picture !== undefined
                    ? `http://localhost:3000/uploads/` + student.picture
                    : profileImg
                }
                alt="profileImg"
              />
            </div>
            <div className="relative bg-[#493066] hover:bg-[#301e44] text-white rounded-md p-2 px-4 mt-2 cursor-pointer">
              <span className="cursor-pointer">Choose your picture</span>
              <input
                type="file"
                className=" absolute inset-0  w-full h-full opacity-0 cursor-pointer"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
