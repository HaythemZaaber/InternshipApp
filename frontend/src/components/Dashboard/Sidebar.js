import React from "react";
import issatLogo from "../../assets/images/issat.png";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import classNames from "classnames";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../../lib/consts/navigation";
// import useNavigate
import { useNavigate } from "react-router-dom";

const Sidebar = ({ links }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col bg-[#130a1d] m-2 rounded-lg items-center  w-64 text-white fixed inset-0 h-max-screen">
      <div className=" bg-[#1c0f2b] rounded-lg flex m-3 pt-2 shadow-md  justify-center ">
        <img className="logo" src={issatLogo} alt="issat" />
      </div>
      <div className="flex-1 w-full">
        {links &&
          links.map((link, index) => <SidebarLink key={index} link={link} />)}
      </div>
      <div className="w-full pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link, index) => (
          <SidebarLink key={index} link={link} />
        ))}
      </div>
    </div>
  );
};

function SidebarLink({ link }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        "link",
        "/" + pathname.split("/").slice(2).join("/") === link.path
          ? "bg-[#281938]"
          : "opacity-70",
        link.name === "Logout" ? "text-red-500" : ""
      )}
      onClick={() => {
        navigate(`${pathname.split("/").slice(0, 2).join("/")}${link.path}`);
        // remove token from localStorage
        localStorage.removeItem("authToken");
      }}
    >
      <span className="text-lg">{link.icon}</span>
      {link.name}
    </div>
  );
}

export default Sidebar;
