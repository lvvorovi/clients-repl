import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchPopup {
  isOpen: boolean;
  query: string;
  results: any[];
  loading: boolean;
}

interface UiState {
  sidebarOpen: boolean;
  searchPopup: SearchPopup;
  notifications: string[];
}

const initialState: UiState = {
  sidebarOpen: true,
  searchPopup: {
    isOpen: false,
    query: "",
    results: [],
    loading: false,
  },
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSearchPopup: (state, action: PayloadAction<Partial<SearchPopup>>) => {
      state.searchPopup = { ...state.searchPopup, ...action.payload };
    },
    closeSearchPopup: (state) => {
      state.searchPopup.isOpen = false;
      state.searchPopup.query = "";
      state.searchPopup.results = [];
    },
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSearchPopup,
  closeSearchPopup,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
