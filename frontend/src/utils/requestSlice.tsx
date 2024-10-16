import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "./userSlice";

// Assuming requests are based on the fromUserId of Iuser
interface IRequest {
  _id: string;
  fromUserId: Iuser;
  status: string;
  createdAt: string;
}

const initialState: IRequest[] = [];

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    // Add multiple requests
    addRequests(state, action: PayloadAction<IRequest[]>) {
      return action.payload;
    },
    // Remove all requests
    removeRequests() {
      return initialState;
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
