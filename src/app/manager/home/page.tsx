"use client"

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { RootState } from "@/app/store";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddPatient from "@/components/AddPatient/AddPatient";
import { fetchPatients } from "@/features/patient/patient";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

const HomePage = () => {
  const { loading } = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector((state: RootState) => state.patient.patients);

  React.useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-700 text-sm flex-col">
        Loading patients...
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Patient Details
        </h1>
        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <TableHeader className="sticky top-0 bg-gray-100 z-10 shadow">
              <TableRow>
                {[
                  "Patient Name",
                  "Disease",
                  "Allergies",
                  "Room Number",
                  "Bed Number",
                  "Age",
                  "Contact Information",
                  "Action",
                ].map((header) => (
                  <TableCell
                    key={header}
                    className="py-3 px-4 font-semibold text-gray-700"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow
                  key={patient?.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                >
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.name}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.diseases}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.allergies}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.roomNumber}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.bedNumber}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.age}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    {patient?.contactInfo}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-600">
                    <Button>
                      <Link href={`/manager/patient/${patient?.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AddPatient />
      </div>
    </div>
  );
};

export default HomePage;
