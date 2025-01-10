"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchPantryStaff,
  deletePantryStaff,
  updatePantryStaff,
  createPantryStaff,
} from "@/features/pantry/pantry";
import { Button } from "@/components/ui/button";
import AddPantry from "@/components/Pantry/AddPantry";
import { Select } from "@/components/ui/select";
import PantryTask from "@/components/Pantry/PantryTask";
const PantryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pantryStaffs, loading, error } = useSelector(
    (state: RootState) => state.pantry
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPantryTask, setSelectedPantryTask] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchPantryStaff());
  }, [dispatch]);

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedPantryTask(null);
    setIsDialogOpen(true);
  };

  const handleUpdate = (staff: any) => {
    setSelectedPantryTask(staff);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deletePantryStaff(id)).then(() => {
      dispatch(fetchPantryStaff());
    });
  };

  if (loading) return <div>Loading Pantry Tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 w-full rounded-lg flex justify-normal gap-20 md:flex-row flex-col-reverse relative">
      <div className="md:w-2/3 w-full border-r-2 ">
        <h1 className="text-2xl font-semibold mb-6">Pantry Tasks</h1>

        <PantryTask />
      </div>



      <div className="md:w-1/3 w-full ">
        <h1 className="text-2xl font-semibold mb-6">Pantry Staff</h1>
        <ul className="space-y-4">
          {pantryStaffs && pantryStaffs.length > 0 ? (
            pantryStaffs.map((staff: any) => (
              <li key={staff.id} className="p-4 bg-white rounded shadow-md">
                <div className="flex justify-between">
                  <p className="capitalize font-semibold text-lg">
                    {staff.staffName}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {staff.location}
                  </p>
                </div>
               <div className=" flex items-center justify-between">
               <p className="text-gray-600 mt-2 text-sm">
                  {staff.contactInfo}
                </p>
                <div className="space-x-2 text-end mt-4">
                  <Button
                    className="px-4 py-2 text-white rounded h text-sm"
                    onClick={() => handleUpdate(staff)}
                  >
                    Update
                  </Button>
                  <Button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDelete(staff.id)}
                  >
                    Delete
                  </Button>
                </div>
               </div>
              </li>
            ))
          ) : (
            <p>No pantry Staff.</p>
          )}
        </ul>
        <Button onClick={handleCreate} className="mt-4">
          Add Pantry Task
        </Button>
      </div>

      <AddPantry
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isEditMode={isEditMode}
        pantryTaskData={selectedPantryTask}
      />
    </div>
  );
};

export default PantryPage;
