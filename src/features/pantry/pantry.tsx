"use client";

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/apiUrl';
import { toast } from 'sonner';

interface PantryState {
  pantryStaffs: any[];
  pantryStaff: any;
  loading: boolean;
  error: string | null;
}

const initialState: PantryState = {
  pantryStaffs: [],
  pantryStaff: null,
  loading: false,
  error: null,
};

//* Fetch all pantry tasks
export const fetchPantryStaff = createAsyncThunk(
  'pantry/fetchPantryStaff',
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/pantry`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch pantry tasks', { description: error.response?.data?.message || 'Failed to fetch pantry tasks' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pantry tasks');
    }
  }
);

//* Create a new pantry task
export const createPantryStaff = createAsyncThunk(
  'pantry/createPantryStaff',
  async (pantryTaskData: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`${API_URL}/pantry`, pantryTaskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Pantry task created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Failed to create pantry task', { description: error.response?.data?.message || 'Failed to create pantry task' });
      return rejectWithValue(error.response?.data?.message || 'Failed to create pantry task');
    }
  }
);

//* Update a pantry task
export const updatePantryStaff = createAsyncThunk(
  'pantry/updatePantryStaff',
  async ({ id, pantryTaskData }: { id: number; pantryTaskData: any }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`${API_URL}/pantry/${id}`, pantryTaskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to update pantry task', { description: error.response?.data?.message || 'Failed to update pantry task' });
      return rejectWithValue(error.response?.data?.message || 'Failed to update pantry task');
    }
  }
);

//* Delete a pantry task
export const deletePantryStaff = createAsyncThunk(
  'pantry/deletePantryStaff',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_URL}/pantry/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      toast.error('Failed to delete pantry task', { description: error.response?.data?.message || 'Failed to delete pantry task' });
      return rejectWithValue(error.response?.data?.message || 'Failed to delete pantry task');
    }
  }
);

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantryStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPantryStaff.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pantryStaffs = action.payload;
      })
      .addCase(fetchPantryStaff.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPantryStaff.pending, (state) => {
        state.error = null;
      })
      .addCase(createPantryStaff.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pantryStaffs.push(action.payload);
      })
      .addCase(createPantryStaff.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePantryStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePantryStaff.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(updatePantryStaff.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePantryStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePantryStaff.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
      })
      .addCase(deletePantryStaff.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pantrySlice.reducer;