import React from "react";
import profileImg from "../../assets/images/haythem.jpg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = ({ setBar, buttonRef, user }) => {
  const location = useLocation();

  return (
    <div className="bg-[#231730] sticky top-0 right-0 pt-1 w-[calc(100vw-17.5rem)] ml-auto">
      <div className="bg-[#130A1D]  mt-2 mb-3 mr-3 p-3 rounded-lg sticky top-0 right-0 w-max-[calc(100vw-17.5rem)] ml-auto">
        <nav className=" flex justify-between items-center">
          <div className="font-bold ml-3 text-lg">
            {location.pathname
              .slice(1)
              .split("/")
              .map((item) => item.toUpperCase())
              .join("/")}
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer bg-[#1C0F2B] px-3 py-2 rounded-xl"
            onClick={() => setBar((prev) => !prev)}
            ref={buttonRef}
          >
            <div className="w-8 mr-3  rounded-full overflow-hidden flex ">
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
            <div className="flex flex-col justify-center items-center text-sm">
              <h3>{user.name}</h3>
              <p className="opacity-50">{user.__t}</p>
              {/* <span>
              ING-A02-GL-04
            </span> */}
            </div>
            <div className="ml-3 font-bold text-2xl">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
