import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isCollapsed: localStorage.getItem('isCollapsed') === 'true',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
      localStorage.setItem('isCollapsed', state.isCollapsed.toString());
    },
    setCollapse(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
      localStorage.setItem('isCollapsed', state.isCollapsed.toString());
    },
  },
});

export const { toggleCollapse, setCollapse } = sidebarSlice.actions;
export default sidebarSlice.reducer;