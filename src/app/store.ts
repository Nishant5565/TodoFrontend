

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import patientReducer from '../features/patient/patient';
import dietReducer from '../features/dietChart/dietChart';
import pantryReducer from '../features/pantry/pantry';
import pantryTaskReducer from '../features/pantry/pantryTask';
import deliverReducer from '../features/delivery/delivery';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    diet: dietReducer,
    pantry: pantryReducer,
    pantryTask: pantryTaskReducer,
    delivery: deliverReducer,

  },
});

//*  Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
