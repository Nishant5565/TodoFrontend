"use client";

import React, { useEffect, useState } from "react";
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
import { fetchDeliveryPerson, fetchDeliveryPersons, createDeliveryPerson, deleteDeliveryPerson, updateDeliveryPerson } from "@/features/delivery/delivery";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { RootState } from "@/app/store";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { fetchPantryStaff } from "@/features/pantry/pantry";

const AddDelivery = () => {
  const { loading, deliveryPersonnel } = useSelector((state: RootState) => state.delivery);
  const { pantryStaffs } = useSelector((state: RootState) => state.pantry);
  const dispatch = useDispatch<AppDispatch>();

  console.log(pantryStaffs);
  useEffect(() => {
    dispatch(fetchPantryStaff());
    dispatch(fetchDeliveryPersons());
  }, [dispatch]);

  const handleDeleteDelivery = (id: number) => {
    dispatch(deleteDeliveryPerson(id))
      .unwrap()
      .then(() => {
        toast.success("Delivery personnel deleted successfully");
      })
      .catch((error: any) => {
        toast.error("Failed to delete delivery personnel", {
          description: error.response?.data?.message || "Failed to delete delivery personnel",
        });
      });
  };

  const handleUpdateDelivery = (id: number) => {
     const deliveryPersonData = {
       name: "",
       contactInfo: "",
       additionalDetails: "",
       pantryId: "",
     };

     dispatch(updateDeliveryPerson({id, deliveryPersonData}))
       .unwrap()
       .then(() => {
          toast.success("Delivery personnel updated successfully");
       })
       .catch((error: any) => {
          toast.error("Failed to update delivery personnel", {
            description: error.response?.data?.message || "Failed to update delivery personnel",
          });
       });
       }


  return (
    <div>
     <div>
       {deliveryPersonnel.length === 0 ? (
         <p className="text-gray-600 mt-4">No delivery personnel found</p>
       ) : (
         deliveryPersonnel.map((person) => (
           <div
             key={person.id}
             className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mt-4"
           >
             <div className="flex flex-col">
               <p className=" font-semibold">{person.name}</p>
               <p className="text-sm text-gray-500">{person.contactInfo}</p>
               <p className="text-sm text-gray-500">{person.additionalDetails}</p>
               <p className="text-sm text-gray-500">{
                     pantryStaffs?.find((staff) => staff.id === person.pantryId)?.staffName
                    }</p>
             </div>
             <div className="flex gap-2">
               {/* <Button
                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                 onClick={() => handleUpdateDelivery(person.id)}
               >
                 Update
               </Button> */}
               <Button
                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                 onClick={() => handleDeleteDelivery(person.id)}
               >
                 Delete
               </Button>
             </div>
           </div>
         ))
       )}
     </div>

      <div>
        <Sheet>
          <SheetTrigger className="mt-6 bg-black text-white px-4 py-2 rounded-lg font-normal text-sm">
            Add New Delivery Personnel
          </SheetTrigger>
          <SheetContent className="bg-white p-6 rounded-sm">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Add A New Delivery Personnel</SheetTitle>
              <SheetDescription className="text-gray-600">
                Please fill out the form below to add a new delivery personnel.
              </SheetDescription>
            </SheetHeader>
            <Formik
              initialValues={{
                name: "",
                contactInfo: "",
                additionalDetails: "",
                pantryId: "",
              }}
              onSubmit={(values) => {
                dispatch(createDeliveryPerson(values))
                  .unwrap()
                  .then(() => {
                    toast.success("Delivery personnel added successfully");
                    // * reset form
                    values.name = "";
                    values.contactInfo = "";
                    values.additionalDetails = "";
                    values.pantryId = "";
                  })
                  .catch((error: any) => {
                    toast.error("Failed to add delivery personnel", {
                      description: error.response?.data?.message || "Failed to add delivery personnel",
                    });
                  });
              }}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col gap-5 mt-10">
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-normal">Name</label>
                      <Field name="name" as={Input} className="border rounded p-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-normal">Contact Information</label>
                      <Field name="contactInfo" as={Input} className="border rounded p-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-normal">Additional Details</label>
                      <Field name="additionalDetails" as={Input} className="border rounded p-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-normal">Pantry Staff</label>
                      <Field name="pantryId">
                        {({ field }: { field: any }) => (
                          <Select
                            onValueChange={(value) => setFieldValue("pantryId", value)}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Pantry Staff" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Pantry Staff</SelectLabel>
                                {pantryStaffs?.map((staff: { id: number; staffName: string }) => (
                                  <SelectItem key={staff.id} value={staff.id.toString()}>
                                    {staff.staffName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="mt-4 w-fit bg-black text-white px-8 py-2 rounded-lg">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AddDelivery;