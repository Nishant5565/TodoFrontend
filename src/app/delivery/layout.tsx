"use client";
import React, { ReactNode } from "react";
import useAuth from "@/utils/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Loader from "@/components/Loader/Loader";
import ManagerNav from "@/components/ManagerNav/ManagerNav";

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const { loading } = useSelector((state: RootState) => state.auth);
  const user = useSelector(
    (state: RootState) =>
      state.auth.user?.user as unknown as { name: string; role: string }
  );

  if (token) {
    useAuth();
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-sm ">

          Checking your credentials
          <Loader />
      </div>
    );
  }

  if (!token || user?.role !== "Delivery") {
    return (
      <div className="h-screen flex flex-col gap-5 items-center justify-center text-3xl ">
        <p className="text-center text-3xl ">
          You are not authorized to view this page. Please login as a Delivery Staff.
        </p>
        <Button
          className="mt-6 text-white px-10 py-4 rounded-lg"
          onClick={() => {
            {
              sessionStorage.removeItem("token");
            }
          }}
        >
          <Link href=" /">Login</Link>
        </Button>
      </div>
    );
  }

  return <div>
    <ManagerNav user={user} /> 
    {children}
    </div>;
};

export default layout;
