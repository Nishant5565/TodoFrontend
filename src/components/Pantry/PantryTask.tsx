import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchPantryTasks,
  createPantryTask,
  updatePantryTask,
  deletePantryTask
} from '@/features/pantry/pantryTask';

import { fetchDietCharts } from "@/features/dietChart/dietChart";
import { Button } from "@/components/ui/button";
import AddPantry from "./AddPantry";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PantryTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pantryTasks, loading, error } = useSelector(
    (state: RootState) => state.pantryTask
  );
  const { pantryStaffs } = useSelector((state: RootState) => state.pantry);

  const { dietCharts } = useSelector((state: RootState) => state.diet);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPantryTask, setSelectedPantryTask] = useState<any>(null);
  const [selectedDietChart, setSelectedDietChart] = useState<any>(null);
  const [selectedPantryStaff, setSelectedPantryStaff] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPantryTasks());
    dispatch(fetchDietCharts()).then(() => {
    });
  }, [dispatch]);

  console.log(dietCharts);

  const handleAssign = ({ dietChartId, deliverNotes, pantryId }: any) => {
     dispatch(createPantryTask({ pantryTaskData: { dietChartId, deliverNotes , pantryId } })).then(() => {
       dispatch(fetchPantryTasks());
     });
  };

  const handleUpdate = ({ id,  dietChartId, deliverNotes, pantryId }: any) => {
    dispatch(updatePantryTask({ id , pantryTaskData: { dietChartId, deliverNotes, pantryId } })).then(() => {
      dispatch(fetchPantryTasks());
    });
  };
  if (loading) return <div>
    Loading
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full rounded-lg flex justify-normal gap-20 md:flex-row flex-col">
      <div className=" w-full md:pr-2 pr-0 ">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dietCharts && dietCharts.length > 0 ? (
            dietCharts.map((dietChart: any) => (
              <li key={dietChart?.id} className="bg-white rounded shadow-md p-4">
                <div className="flex justify-between items-center pb-2">
                  <p className="capitalize font-semibold text-lg">
                    {dietChart?.name}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {dietChart?.mealType}
                  </p>
                </div>
                <div className="space-x-2 text-end flex">
                  <Select onValueChange={setSelectedPantryStaff}>
                    <SelectTrigger>
                      <SelectValue placeholder= {
                         pantryTasks.filter(task => task.dietChartId === dietChart.id).length > 0
                           ? pantryStaffs.find(staff => staff.id === pantryTasks.find(task => task.dietChartId === dietChart.id)?.pantryId)?.staffName
                               : "Select Pantry Staff"
                         } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pantry Staffs</SelectLabel>
                        {pantryStaffs.map((staff: any) => (
                          <SelectItem key={staff.id} value={staff.id}>
                            {staff?.staffName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>


                    {pantryTasks.filter(task => task.dietChartId === dietChart.id).length > 0 ? 
                    
                    <Button
                      className="px-4 py-2 text-white rounded h text-sm"
                      onClick={() => handleUpdate({
                        id: pantryTasks.find(task => task.dietChartId === dietChart.id)?.id,
                        dietChartId: dietChart.id,
                        deliverNotes: "Updated Delivery Notes",
                        pantryId: selectedPantryStaff
                      })}
                    >
                      Update
                    </Button>
                    : 
                    <Button
                      className="px-4 py-2 text-white rounded h text-sm"
                      onClick={() => handleAssign({
                        dietChartId: dietChart.id,
                        deliverNotes: "Delivery Notes",
                        pantryId: selectedPantryStaff
                      })}
                    >
                      Assign
                    </Button>
                    }
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PantryTask;