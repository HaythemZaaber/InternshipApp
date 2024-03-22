import { AiOutlineHome } from "react-icons/ai";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";

export const STUDENT_DASHBOARD_LINKS = [
  {
    key: "news",
    name: "News",
    path: "/news",
    icon: <AiOutlineHome />,
  },
  {
    key: "internship request",
    name: "Internship Request",
    path: "/internshipRequest",
    icon: <BsPersonWorkspace />,
  },
  {
    key: "internship",
    name: "Internship",
    path: "/internship",
    icon: <BsPersonWorkspace />,
  },
  {
    key: "notification",
    name: "Notification",
    path: "/notifications",
    icon: <IoMdNotificationsOutline />,
  },
];
export const ADMIN_DASHBOARD_LINKS = [
  {
    key: "news",
    name: "News",
    path: "/news",
    icon: "newspaper",
  },
  {
    key: "internship requests",
    name: "Internship Requests",
    path: "/internshipRequests",
    icon: "internshipRequests",
  },
  {
    key: "internships",
    name: "internships",
    path: "/internships",
    icon: "internships",
  },
  {
    key: "Students",
    name: "Students",
    path: "/students",
    icon: "students",
  },
];
export const TEACHER_DASHBOARD_LINKS = [
  {
    key: "news",
    name: "News",
    path: "/news",
    icon: "newspaper",
  },
  {
    key: "internships",
    name: "Internships",
    path: "/internships",
    icon: "internships",
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    name: "Settings",
    path: "/settings",
    icon: <MdOutlineSettings />,
  },
  {
    key: "support",
    name: "Help & Support",
    path: "/support",
    icon: <BiHelpCircle />,
  },
  {
    key: "logout",
    name: "Logout",
    path: "/login",
    icon: <HiOutlineLogout />,
  },
];
