import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createPantryStaff, updatePantryStaff, fetchPantryStaff } from "@/features/pantry/pantry";
import { Dialog, DialogTrigger, DialogDescription, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddPantryProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  pantryTaskData?: any;
}

const AddPantry: React.FC<AddPantryProps> = ({ isOpen, onClose, isEditMode, pantryTaskData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [pantryTask, setPantryTask] = useState({
    staffName: "",
    contactInfo: "",
    location: "",
  });

  useEffect(() => {
    if (pantryTaskData) {
      setPantryTask({
        staffName: pantryTaskData.staffName || "",
        contactInfo: pantryTaskData.contactInfo || "",
        location: pantryTaskData.location || "",
      });
    }
  }, [pantryTaskData]);

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updatePantryStaff({ id: pantryTaskData.id, pantryTaskData: pantryTask })).then(() => {
          dispatch(fetchPantryStaff());
        onClose();
        setPantryTask({ staffName: "", contactInfo: "", location: "" });
      });
    } else {
      dispatch(createPantryStaff(pantryTask)).then(() => {
        onClose();
        setPantryTask({ staffName: "", contactInfo: "", location: "" });
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogDescription></DialogDescription>
        <DialogTitle>
          {isEditMode ? "Update Pantry Task" : "Add Pantry Task"}
        </DialogTitle>

        <DialogHeader>
          <h2 className="">
            {isEditMode ? "Update the information of the pantry task" : "Add a new pantry task"}
          </h2>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            value={pantryTask.staffName}
            onChange={(e) => setPantryTask({ ...pantryTask, staffName: e.target.value })}
            placeholder="Staff Name"
          />
          <Input
            type="text"
            value={pantryTask.contactInfo}
            onChange={(e) => setPantryTask({ ...pantryTask, contactInfo: e.target.value })}
            placeholder="Contact Info"
          />
          <Input
            type="text"
            value={pantryTask.location}
            onChange={(e) => setPantryTask({ ...pantryTask, location: e.target.value })}
            placeholder="Location"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {isEditMode ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPantry;