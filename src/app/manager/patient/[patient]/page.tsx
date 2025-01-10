"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchPatient,
  updatePatient,
  deletePatient,
} from "@/features/patient/patient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DietChart from "@/components/DietChart/DietChart";

interface Params {
  patient: number;
}

const PatientDetails = ({ params }: { params: any }) => {
  const [id, setId] = useState<number>(0);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.patient.patient);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((data: Params) => {
      setId(data.patient);
      setLoading(false);
    });
  }, [params]);

  useEffect(() => {
    if (id !== 0) {
      dispatch(fetchPatient(id)).then((response) => {
        setFormData(response.payload);
      });
    }
  }, [id, dispatch]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    const patientData = {
      ...formData,
      allergies:
        typeof formData.allergies === "string"
          ? formData.allergies
              .split(",")
              .map((allergy: string) => allergy.trim())
          : formData.allergies,
      diseases:
        typeof formData.diseases === "string"
          ? formData.diseases
              .split(",")
              .map((disease: string) => disease.trim())
          : formData.diseases,
    };
    dispatch(updatePatient({ id, patientData }))
      .then(() => {
        setEditable(false);
        toast.success("Patient details updated successfully.");
      })
      .catch(() => {
        toast.error("Failed to update patient details.");
      });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this patient?")) {
      dispatch(deletePatient(id))
        .then(() => {
          toast.success("Patient deleted successfully.");
        })
        .catch(() => {
          toast.error("Failed to delete patient.");
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 w-full rounded-lg flex justify-normal gap-20 md:flex-row flex-col">
      <div className="md:w-2/3 border-r pr-6">
      <h1 className="text-2xl font-semibold mb-6">Patient Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Age</label>
          <Input
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="number"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Gender</label>
          <Input
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Room Number</label>
          <Input
            name="roomNumber"
            value={formData.roomNumber || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bed Number</label>
          <Input
            name="bedNumber"
            value={formData.bedNumber || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Floor Number</label>
          <Input
            name="floorNumber"
            value={formData.floorNumber || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
            type="number"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Diseases</label>
          <Input
            name="diseases"
            value={formData.diseases || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Allergies</label>
          <Input
            name="allergies"
            value={formData.allergies || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Contact Info</label>
          <Input
            name="contactInfo"
            value={formData.contactInfo || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Emergency Contact</label>
          <Input
            name="emergencyContact"
            value={formData.emergencyContact || ""}
            onChange={handleChange}
            disabled={!editable}
            className="mt-1"
          />
        </div>
      </div>
      

      <div className=" flex justify-between items-center">
        <div className="flex gap-4 mt-6">
          {!editable ? (
            <Button onClick={handleEdit} className="bg-blue-500 text-white">
              Edit
            </Button>
          ) : (
            <Button onClick={handleSave} className="bg-green-500 text-white">
              Save
            </Button>
          )}
          {editable && (
            <Button
              onClick={() => setEditable(false)}
              className="bg-red-500 text-white"
            >
              Cancel
            </Button>
          )}

          {!editable && (
            <Button onClick={handleDelete} className="bg-red-500 text-white">
              Delete
            </Button>
          )}
        </div>
      </div>
      </div>
      <div className="md:w-1/3">
        {!loading && !editable && <DietChart id={id} />}</div>
    </div>
  );
};

export default PatientDetails;
