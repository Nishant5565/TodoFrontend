"use client"

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/apiUrl';
import { toast } from 'sonner';

interface DeliveryPersonnelState {
  deliveryPersonnel: any[];
  deliveryPerson: any;
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryPersonnelState = {
  deliveryPersonnel: [],
  deliveryPerson: null,
  loading: false,
  error: null,
};

//* Fetch all delivery personnel
export const fetchDeliveryPersons= createAsyncThunk(
  'deliveryPersonnel/fetchDeliveryPersonnel',
  async (_, { rejectWithValue }) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    try {
      const response = await axios.get(`${API_URL}/delivery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch delivery personnel', { description: error.response?.data?.message || 'Failed to fetch delivery personnel' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch delivery personnel');
    }
  }
);

//* Fetch specific delivery person
export const fetchDeliveryPerson = createAsyncThunk(
  'deliveryPersonnel/fetchDeliveryPerson',
  async (id: number, { rejectWithValue }) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    try {
      const response = await axios.get(`${API_URL}/delivery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch delivery person', { description: error.response?.data?.message || 'Failed to fetch delivery person' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch delivery person');
    }
  }
);

//* Create a new delivery person
export const createDeliveryPerson = createAsyncThunk(
  'deliveryPersonnel/createDeliveryPerson',
  async (deliveryPersonData: any, { rejectWithValue }) => {
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
      const response = await axios.post(`${API_URL}/delivery`, deliveryPersonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Delivery person created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Failed to create delivery person', { description: error.response?.data?.message || 'Failed to create delivery person, Use a different name' });
      return rejectWithValue(error.response?.data?.message || 'Failed to create delivery person');
    }
  }
);

//* Update a delivery person
export const updateDeliveryPerson = createAsyncThunk(
  'deliveryPersonnel/updateDeliveryPerson',
  async ({ id, deliveryPersonData }: { id: number; deliveryPersonData: any }, { rejectWithValue }) => {
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
      const response = await axios.put(`${API_URL}/delivery/${id}`, deliveryPersonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to update delivery person', { description: error.response?.data?.message || 'Failed to update delivery person' });
      return rejectWithValue(error.response?.data?.message || 'Failed to update delivery person');
    }
  }
);

//* Delete a delivery person
export const deleteDeliveryPerson = createAsyncThunk(
  'deliveryPersonnel/deleteDeliveryPerson',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
      await axios.delete(`${API_URL}/deliveryPersonnel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      toast.error('Failed to delete delivery person', { description: error.response?.data?.message || 'Failed to delete delivery person' });
      return rejectWithValue(error.response?.data?.message || 'Failed to delete delivery person');
    }
  }
);

const deliveryPersonnelSlice = createSlice({
  name: 'deliveryPersonnel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPersons.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.deliveryPersonnel = action.payload;
      })
      .addCase(fetchDeliveryPersons.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDeliveryPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPerson.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.deliveryPerson = action.payload;
      })
      .addCase(fetchDeliveryPerson.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDeliveryPerson.pending, (state) => {
        state.error = null;
      })
      .addCase(createDeliveryPerson.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.deliveryPersonnel.push(action.payload);
      })
      .addCase(createDeliveryPerson.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDeliveryPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryPerson.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.deliveryPersonnel.findIndex(person => person.id === action.payload.id);
        if (index !== -1) {
          state.deliveryPersonnel[index] = action.payload;
        }
      })
      .addCase(updateDeliveryPerson.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDeliveryPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryPerson.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.deliveryPersonnel = state.deliveryPersonnel.filter(person => person.id !== action.payload);
      })
      .addCase(deleteDeliveryPerson.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deliveryPersonnelSlice.reducer;