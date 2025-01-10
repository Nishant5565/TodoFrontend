"use client";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/apiUrl';
import { toast } from 'sonner';

interface DietChartState {
  dietCharts: any[];
  dietChart: any;
  loading: boolean;
  error: string | null;

}

const initialState: DietChartState = {
  dietCharts: [],
  dietChart: null,
  loading: false,
  error: null,
};


//* Fetch all diet charts

export const fetchDietCharts = createAsyncThunk(
  'dietChart/fetchDietCharts',
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/diet-charts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch diet charts', { description: error.response?.data?.message || 'Failed to fetch diet charts' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch diet charts');
    }
  }
);


//* Fetch specific user's diet chart
export const fetchDietChart = createAsyncThunk(
  'dietChart/fetchDietChart',
  async (id: number, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/diet-charts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch diet chart', { description: error.response?.data?.message || 'Failed to fetch diet chart' });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch diet chart');
    }
  }
);

//* Create a new diet chart
export const createDietChart = createAsyncThunk(
  'dietChart/createDietChart',
  async ({id, dietChartData}: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`${API_URL}/diet-charts/${id}`, dietChartData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Diet chart created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Failed to create diet chart', { description: error.response?.data?.message || 'Failed to create diet chart' });
      return rejectWithValue(error.response?.data?.message || 'Failed to create diet chart');
    }
  }
);

//* Update a diet chart
export const updateDietChart = createAsyncThunk(
  'dietChart/updateDietChart',
  async ({ id, dietChartData }: { id: number; dietChartData: any }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`${API_URL}/diet-charts/${id}`, dietChartData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error('Failed to update diet chart', { description: error.response?.data?.message || 'Failed to update diet chart' });
      return rejectWithValue(error.response?.data?.message || 'Failed to update diet chart');
    }
  }
);

//* Delete a diet chart
export const deleteDietChart = createAsyncThunk(
  'dietChart/deleteDietChart',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_URL}/diet-charts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      toast.error('Failed to delete diet chart', { description: error.response?.data?.message || 'Failed to delete diet chart' });
      return rejectWithValue(error.response?.data?.message || 'Failed to delete diet chart');
    }
  }
);

const dietChartSlice = createSlice({
  name: 'dietChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchDietCharts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDietCharts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dietCharts = action.payload;
      })
      .addCase(fetchDietCharts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDietChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDietChart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dietChart = action.payload;
      })
      .addCase(fetchDietChart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDietChart.pending, (state) => {
        state.error = null;
      })
      .addCase(createDietChart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dietCharts.push(action.payload);
      })
      .addCase(createDietChart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDietChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDietChart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(updateDietChart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDietChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDietChart.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        
      })
      .addCase(deleteDietChart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dietChartSlice.reducer;