"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setCollapse } from "@/features/SideBar/SideBar";
import gsap from "gsap";
import { LuClipboardList } from "react-icons/lu";
import { CiCalendar, CiMap, CiStar } from "react-icons/ci";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { selectThemeProperties } from "@/features/theme/theme";

const Sidebar = () => {
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );
    const themeProperties = useSelector((state: RootState) =>
      selectThemeProperties(state)
    );
  
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("All Tasks");

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(setCollapse(localStorage.getItem("isCollapsed") === "true"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (isCollapsed) {
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: -sidebarRef.current.offsetWidth - 20,
          duration: 0.3,
          ease: "power3.inOut",
        });
      }
    }
  }, [isCollapsed]);

  const sections = [
    { name: "All Tasks",  link: "all-tasks", icon: <LuClipboardList className="mr-3" size={23} /> },
    { name: "Today", link: "today-tasks",   icon: <CiCalendar className="mr-3" size={23} /> },
    { name: "Important", link: "important-tasks", icon: <CiStar className="mr-3" size={23} /> },
    { name: "Planned", link: "all-tasks", icon: <CiMap className="mr-3" size={23} /> },
    {
      name: "Assigned to me", link: "all-tasks",
      icon: <MdOutlineAssignmentInd className="mr-3" size={23} />,
    },
  ];

  return (
    <div className="flex h-full">
      <div
        ref={sidebarRef}
        className=" sticky inset-y-0 left-0 bg-[#EEF6EF] text-gray-800 w-64 shadow-lg transform transition-transform duration-300 ease-in-out h-full p-2"
      >
        <div className="flex flex-col items-center py-2">
          <img
            src={
              !user
                ? "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                : "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
            }
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          <h2 className="mt-4 text-lg font-semibold">
            {user ? "user" : "Login"}
          </h2>
        </div>
        <nav className="mt-2 p-4 bg-white">
          {sections.map((section) => (
            <Link
              key={section.name}
              href= {`/${section.link}`}
              className={`flex items-center py-2 px-4 rounded-lg text-sm hover:bg-gray-200 ${
                activeSection === section.name
                  ? "bg-[#EEF6EF] text-[#357937]"
                  : ""
              }`}
              onClick={() => setActiveSection(section.name)}
            >
              {section.icon} {section.name}
            </Link>
          ))}
        </nav>
        <div className="mt-2 px-4 bg-white hover:bg-gray-200">
          <a
            href="#"
            className="flex items-center py-3 px-4 rounded-lg "
          >
            <IoAdd className="mr-3 text-gray-500" /> Add List
          </a>
        </div>
        <div className=" w-full  mt-2">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="">
              <h3 className="font-semibold text-sm">Today Tasks</h3>
              <div className=" text-lg"> 4 </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="4"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="4"
                    strokeDasharray="75, 100"
                    strokeDashoffset="25"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center mt-2 text-sm flex gap-4">
              <div className="text-green-500"> 
               <span> ● </span>
               Done</div> 
              <div className="text-gray-500">
               <span className=""> ● </span>
               Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
