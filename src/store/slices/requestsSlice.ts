import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatus = "pending" | "in-progress" | "completed" | "cancelled";
export type Priority = "low" | "medium" | "high";

export interface RequestItem {
  id: string;
  partNumber: string;
  brand: string;
  quantity: number;
  description?: string;
}

export interface Request {
  id: string;
  clientId: string;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  items: RequestItem[];
  notes?: string;
}

interface RequestsState {
  requests: Request[];
  currentRequest: Request | null;
  statusFilter: RequestStatus | "all";
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: [
    {
      id: "REQ-001",
      clientId: "1",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      items: [
        {
          id: "1",
          partNumber: "ABC123",
          brand: "Brand A",
          quantity: 2,
          description: "Sample part description",
        },
      ],
      notes: "Urgent request for production line",
    },
    {
      id: "REQ-002",
      clientId: "1",
      status: "in-progress",
      priority: "medium",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
      items: [
        {
          id: "2",
          partNumber: "XYZ789",
          brand: "Brand B",
          quantity: 1,
          description: "Another sample part",
        },
      ],
    },
  ],
  currentRequest: null,
  statusFilter: "all",
  loading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<Request>) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action: PayloadAction<Request>) => {
      const index = state.requests.findIndex((req) => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    setCurrentRequest: (state, action: PayloadAction<Request | null>) => {
      state.currentRequest = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<RequestStatus | "all">) => {
      state.statusFilter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRequests,
  addRequest,
  updateRequest,
  setCurrentRequest,
  setStatusFilter,
  setLoading,
  setError,
} = requestsSlice.actions;

export default requestsSlice.reducer;
