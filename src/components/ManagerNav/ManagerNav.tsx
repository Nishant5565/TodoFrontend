import React from "react";
import Link from "next/link";

interface ManagerNavProps {
  user: { name: string; role: string };
}

const ManagerNav = ({ user }: ManagerNavProps) => {
  return (
    <nav className="bg-gray-900 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Section: Navigation Links */}
          <ul className="flex space-x-6">
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
              <Link href="/track-meal">
                <div className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200">
                  Track Meal
                </div>
              </Link>
            </li>
          </ul>

          {/* Right Section: User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNav;
