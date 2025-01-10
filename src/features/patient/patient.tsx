import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/apiUrl';
import { toast } from 'sonner';

interface PatientState {
  patients: any[];
  patient: any ;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  patient: null,
  loading: false,
  error: null,
};


//* Fetch all patients
export const fetchPatients = createAsyncThunk(
  
  'patient/fetchPatients',
  async (_, { rejectWithValue }) => {

const token = sessionStorage.getItem('token');

    try {
     const response = await axios.get(`${API_URL}/patients`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch patients', { description: error.response?.data?.message || 'Failed to fetch patients' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

//* Fetch specific patient
export const fetchPatient = createAsyncThunk(
  'patient/fetchPatient',
  async (id: number, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });        
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch patient', { description: error.response?.data?.message || 'Failed to fetch patient' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patient');
    }
  }
);

//* Create a new patient
export const createPatient = createAsyncThunk(
  'patient/createPatient',
  async (patientData: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`${API_URL}/patients`, patientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Patient created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Failed to create patient', { description: error.response?.data?.message || 'Failed to create patient' });
      return rejectWithValue(error.response?.data?.message || 'Failed to create patient');
    }
  }
);

//* Update a patient
export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async ({ id, patientData }: { id: number; patientData: any }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log(patientData, id);
      const response = await axios.put(`${API_URL}/patients/${id}`, patientData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });        
      return response.data;
    } catch (error: any) {
      toast.error('Failed to update patient', { description: error.response?.data?.message || 'Failed to update patient' });
      return rejectWithValue(error.response?.data?.message || 'Failed to update patient');
    }
  }
);

//* Delete a patient
export const deletePatient = createAsyncThunk(
  'patient/deletePatient',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_URL}/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });        
      return id;
    } catch (error: any) {
      toast.error('Failed to delete patient', { description: error.response?.data?.message || 'Failed to delete patient' });
      return rejectWithValue(error.response?.data?.message || 'Failed to delete patient');
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatient.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.patients.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.patients.findIndex(patient => patient.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.patients = state.patients.filter(patient => patient.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default patientSlice.reducer;