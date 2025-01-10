import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  fetchDietChart,
  createDietChart,
  updateDietChart,
  deleteDietChart,
} from "@/features/dietChart/dietChart";
import { AppDispatch } from "@/app/store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface DietChartProps {
  id: number;
}

const DietChart = ({ id }: DietChartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dietChart, loading, error } = useSelector(
    (state: RootState) => state.diet
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateid, setUpdateid] = useState(0);

  const [newDietChart, setNewDietChart] = useState({
    name: "",
    mealType: "morning",
    ingredients: [] as string[],
    instructions: "",
  });

  useEffect(() => {
    dispatch(fetchDietChart(id)).then((response) => {
    });
  }, [dispatch, id]);

  const handleCreate = () => {
    console.log(newDietChart);
    dispatch(createDietChart({ id, dietChartData: newDietChart })).then(() => {
      setNewDietChart({
        name: "",
        mealType: "morning",
        ingredients: [] as string[],
        instructions: "",
      });
      dispatch(fetchDietChart(id));
      setIsDialogOpen(false);
    });
  };

  const handleUpdate = (id: number, dietChartData: any) => {
    setUpdateid(id);
    setNewDietChart(dietChartData);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateSubmit = () => {


    dispatch(updateDietChart({ id: updateid, dietChartData: newDietChart })).then(() => {
      setNewDietChart({
        name: "",
        mealType: "morning",
        ingredients: [] as string[],
        instructions: "",
      });
      dispatch(fetchDietChart(id));
      setIsDialogOpen(false);
      setIsEditMode(false);
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteDietChart(id)).then(() => {
      dispatch(fetchDietChart(id));
    }
    );
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...newDietChart.ingredients];
    newIngredients[index] = value;
    setNewDietChart({ ...newDietChart, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setNewDietChart({ ...newDietChart, ingredients: [...newDietChart.ingredients, ""] });
  };

  if (loading) return <div>Loading Diet Charts </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Diet Charts</h1>
        <ul className="space-y-4">
          {dietChart && dietChart.length > 0 ? (
            dietChart.map((dietChart: any) => (
              <li key={dietChart?.id} className="p-4 bg-white rounded shadow-md">

                <div className="flex justify-between">
                <p className="capitalize font-semibold text-lg">
                {dietChart?.mealType}

                </p>
                <p className="text-sm text-gray-500 capitalize">
                    {dietChart?.name || "Untitled"}

                </p>
                </div>

                <p className="text-gray-600 mt-2 text-sm">
                  <span className=" text-black">Ingredients: </span>
                  {dietChart?.ingredients.join(", ")}
                </p>

                <p className="text-gray-600 mt-2 text-sm">
                  {dietChart?.instructions}
                </p>

                <div className="space-x-2 text-end mt-4">
                  <Button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    onClick={() => handleUpdate(dietChart?.id, dietChart)}
                  >
                    Update
                  </Button>
                  <Button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDelete(dietChart?.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p>No diet charts available.</p>
          )}
        </ul>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild className="mt-4">
          <Button onClick={() => { setIsEditMode(false); setIsDialogOpen(true); }}>Add Diet Chart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Update Diet Chart" : "Create Diet Chart"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the details for the diet chart." : "Enter the details for the new diet chart."}
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            value={newDietChart.name}
            onChange={(e) =>
              setNewDietChart({ ...newDietChart, name: e.target.value })
            }
            placeholder="Name"
          />
          <Select
            value={newDietChart.mealType}
            onValueChange={(value) =>
              setNewDietChart({ ...newDietChart, mealType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Meal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Meal Type</SelectLabel>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <label>Ingredients: </label>
            { newDietChart.ingredients.length > 0 ?  newDietChart.ingredients.map((ingredient, index) => (
              <div key={index} className="relative mt-1">
                <Input
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                />
                <span className="absolute right-2 top-2">
                  <button onClick={() => setNewDietChart({ ...newDietChart, ingredients: newDietChart.ingredients.filter((_, i) => i !== index) })}>
                    <X size={16} color="black" />
                  </button>
                </span>
              </div>
            )) : "No Ingredients"}
            <button onClick={addIngredient} className="mx-2 text-blue-600">Add Ingredient</button>
          </div>
          <Input
            type="text"
            value={newDietChart.instructions}
            onChange={(e) =>
              setNewDietChart({ ...newDietChart, instructions: e.target.value })
            }
            placeholder="Instructions"
          />
          <Button onClick={isEditMode ? handleUpdateSubmit : handleCreate}>
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DietChart;