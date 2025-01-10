"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPatient } from "@/features/patient/patient";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { RootState } from "@/app/store";
import { toast } from "sonner";

const AddPatient = () => {
  const { loading } = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Sheet>
        <SheetTrigger className="mt-6 bg-black text-white px-4 py-2 rounded-lg font-normal text-sm">
          Add New Patient
        </SheetTrigger>
        <SheetContent className="bg-white p-6 rounded-sm">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">
              Add A New Patient
            </SheetTitle>
            <SheetDescription className="text-gray-600">
              Please fill out the form below to add a new patient.
            </SheetDescription>
          </SheetHeader>
          <Formik
            initialValues={{
              name: "",
              diseases: [],
              allergies: [],
              roomNumber: "",
              bedNumber: "",
              floorNumber: "",
              age: "",
              gender: "",
              contactInfo: "",
              emergencyContact: "",
            }}
            onSubmit={(values) => {
              dispatch(createPatient(values))
                .unwrap()
                .then(() => {
                  toast.success("Patient added successfully");
                  // * reset form

                  values.name = "";
                  values.diseases = [];
                  values.allergies = [];
                  values.roomNumber = "";
                  values.bedNumber = "";
                  values.floorNumber = "";
                  values.age = "";
                  values.gender = "";
                  values.contactInfo = "";
                  values.emergencyContact = "";
                  
                })
                .catch((error: any) => {
                  toast.error("Failed to add patient", {
                    description:
                      error.response?.data?.message || "Failed to add patient",
                  });
                });
            }}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-5 mt-10">
                <div className="flex items-center gap-10">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Patient Name
                    </label>
                    <Field
                      name="name"
                      as={Input}
                      className="border rounded p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">Diseases</label>
                    <Field
                      name="diseases"
                      as={Input}
                      className="border rounded p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("diseases", e.target.value.split(","))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Allergies
                    </label>
                    <Field
                      name="allergies"
                      as={Input}
                      className="border rounded p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("allergies", e.target.value.split(","))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Room Number
                    </label>
                    <Field
                      name="roomNumber"
                      as={Input}
                      className="border rounded p-2"
                      
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Bed Number
                    </label>
                    <Field
                      name="bedNumber"
                      as={Input}
                      className="border rounded p-2"
                     
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Floor Number
                    </label>
                    <Field
                      name="floorNumber"
                      as={Input}
                      className="border rounded p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setFieldValue("floorNumber", parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">Age</label>
                    <Field
                      name="age"
                      as={Input}
                      className="border rounded p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("age", parseInt(e.target.value, 10))
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">Gender</label>
                    <Select
                      onValueChange={(value) => setFieldValue("gender", value)}
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Contact Information
                    </label>
                    <Field
                      name="contactInfo"
                      as={Input}
                      className="border rounded p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-normal">
                      Emergency Contact
                    </label>
                    <Field
                      name="emergencyContact"
                      as={Input}
                      className="border rounded p-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 w-fit bg-black text-white px-8 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddPatient;
