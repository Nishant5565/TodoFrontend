"use client";

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import BG1 from "../../public/BG2.png";
import { login, authUser } from "@/features/auth/auth";
import { RootState, AppDispatch } from "./store";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(authUser()).then((response) => {
        console.log(response.payload);
        const payload = response.payload as { user: { name: string, role: string } };
        toast.info("Log in Successful !", {description: `Welcome back ${payload.user?.name}`});
        router.push(`${payload.user.role.toLowerCase()}/home`);
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values)).then((response) => {
        if (response.payload) {
          const payload = response.payload as { user: { name: string, role: string } };
          toast.success("Login Successful", {description: `Welcome back ${payload.user?.name}`});
          router.push(`${payload.user.role.toLowerCase()}/home`);
        }
      }
      );
    },
  });

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${BG1.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex rounded-[10px] overflow-hidden h-[90vh] w-[90vw] gap-40">
        <div className="flex-1 justify-center items-center flex">
          <div className="flex flex-col items-center">
            <h1
              className="text-[100px] font-bold text-clip"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: `url(${BG1.src})`,
                backgroundSize: "200%",
                backgroundPosition: "100% 10%",
              }}
            >
              Welcome
            </h1>
            <p className="mt-4 text-[20px] text-center"></p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[40vw] bg-[#ffffff48] backdrop-blur-lg p-10 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-semibold text-white text-center">
            Login{" "}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {/* email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full mt-2 p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 focus:border-transparent"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-2 p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 focus:border-transparent"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-gray-100 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <div className="text-center">
              <button
                type="submit"
                className="py-3 px-10 rounded-lg bg-white text-black font-semibold shadow-md hover:bg-gray-200 transition duration-200"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-1 text-center">
                {error}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center mt-6">
              <hr className="flex-1 border-gray-50" />
              <span className="mx-4 text-white text-sm">or</span>
              <hr className="flex-1 border-gray-50" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-100">
                Don't have an account?{" "}
                <a href="#" className="text-[#FFF] hover:underline">
                  Create one
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
