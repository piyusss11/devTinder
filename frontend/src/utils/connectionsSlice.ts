import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "./userSlice";

// Initial state as an array of users (connections)
const initialState: Iuser[] = [];

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnection: (state, action: PayloadAction<Iuser>) => {
      state.push(action.payload);
    },
    setConnections: (_state, action: PayloadAction<Iuser[]>) => {
      return action.payload; // Replace entire connections with new array
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      // Remove connection by ID
      return state.filter((user) => user._id !== action.payload);
    },
    resetConnections: () => {
      return initialState; // Reset to the initial state
    },
  },
});

// Export actions
export const { addConnection, setConnections, removeConnection, resetConnections } =
  connectionsSlice.actions;

// Export reducer
export default connectionsSlice.reducer;
