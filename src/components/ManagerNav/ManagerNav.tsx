"use client";

import React from "react";
import Link from "next/link";
import { logout } from "@/features/auth/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ManagerNavProps {
  user: { name: string; role: string };
}

const ManagerNav = ({ user }: ManagerNavProps) => {
  return (
    <nav className="bg-gray-900 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          {/* Left Section: Navigation Links */}
          {user.role === "Manager" && (
            <ul className="flex space-x-6 flex-wrap">
              <li>
                <Link href="/manager/home">
                  <div className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200">
                    Patients
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/manager/pantry">
                  <div className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200">
                    Pantry
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/manager/meals">
                  <div className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200">
                    Track Meal
                  </div>
                </Link>
              </li>
            </ul>
          )}

          {(user.role === "Pantry" || user.role === "Delivery") && (
            <ul className="flex space-x-6 flex-wrap">
              {/* Add links for Pantry or Delivery roles here */}
            </ul>
          )}

          {/* Right Section: User Info */}
          <div className="relative"> 
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0 cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="  absolute -right-4 md:min-w-80 w-40">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-800">{user.role}</p>
              </div>

              <div className="text-right w-full">
                <Link
                className=" flex justify-end pt-4"
                  href="/"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    logout();
                  }}
                >
                  <div className="bg-red-500 text-white w-fit px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg">
                    Logout
                  </div>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNav;
