"use client";

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/apiUrl';
import { toast } from 'sonner';

interface PantryTaskState {
  pantryTasks: any[];
  pantryTask: any;
  loading: boolean;
  error: string | null;
}

const initialState: PantryTaskState = {
  pantryTasks: [],
  pantryTask: null,
  loading: false,
  error: null,
};

//* Fetch all pantry tasks
export const fetchPantryTasks = createAsyncThunk(
  'pantryTask/fetchPantryTasks',
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/pantry-tasks`, {
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
export const createPantryTask = createAsyncThunk(
  'pantryTask/createPantryTask',
  async (pantryTaskData: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`${API_URL}/pantry-tasks`, pantryTaskData, {
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
export const updatePantryTask = createAsyncThunk(
  'pantryTask/updatePantryTask',
  async ({ id, pantryTaskData }: { id: number; pantryTaskData: any }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`${API_URL}/pantry-tasks/${id}`, pantryTaskData, {
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
export const deletePantryTask = createAsyncThunk(
  'pantryTask/deletePantryTask',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_URL}/pantry-tasks/${id}`, {
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

const pantryTaskSlice = createSlice({
  name: 'pantryTask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantryTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPantryTasks.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pantryTasks = action.payload;
      })
      .addCase(fetchPantryTasks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPantryTask.pending, (state) => {
        state.error = null;
      })
      .addCase(createPantryTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pantryTasks.push(action.payload);
      })
      .addCase(createPantryTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePantryTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePantryTask.fulfilled, (state, action: PayloadAction<any>) => {
        
        state.loading = false;
      })
      .addCase(updatePantryTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePantryTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePantryTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.pantryTasks = state.pantryTasks.filter(task => task.id !== action.payload);
      })
      .addCase(deletePantryTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pantryTaskSlice.reducer;