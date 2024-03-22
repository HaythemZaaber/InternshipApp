import React from "react";
import classNames from "classnames";
import profileImg from "../../assets/images/haythem.jpg";
import { Link } from "react-router-dom";
// import navigate hook
import { useNavigate } from "react-router-dom";

const ProfileBar = ({ show, barRef, profileBtn, user }) => {
  // navigate hook
  const navigate = useNavigate();
  return (
    <div
      ref={barRef}
      className={classNames(
        "absolute w-72 origin-top duration-150 bg-[#130A1D] z-50 right-7 top-100 rounded-sm shadow-md shadow-[#3b3641]",
        !show ? "scale-y-0" : ""
      )}
    >
      <div className=" flex justify-center items-center gap-3 flex-col mt-4">
        <div className="w-12  rounded-full overflow-hidden ">
          <img
            className="scale-125"
            src={
              user.picture !== undefined
                ? `http://localhost:3000/uploads/` + user.picture
                : profileImg
            }
            alt="profileImg"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-sm gap-1">
          <h1 className="text-base font-bold">{user.name}</h1>
          <h4>{user.email}</h4>
          <p className="opacity-50">{user.__t}</p>
          <span>{user.group}</span>
        </div>
      </div>
      <Link ref={profileBtn} to="/student/profile">
        <div className="w-100  border-y-2 [#1C0F2B] border-[#422364] text-center mt-4 p-2">
          <button>View Profile</button>
        </div>
      </Link>
      {/* <Link to="/student/login"> */}
        <div onClick={()=>{navigate("/student/login");localStorage.removeItem('authToken')}} className="w-100 [#1C0F2B] bg-[#371957] text-center p-2">
          <button>Logout</button>
        </div>
      {/* </Link> */}
    </div>
  );
};

export default ProfileBar;
