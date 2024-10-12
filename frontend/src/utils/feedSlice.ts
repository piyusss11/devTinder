import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "./userSlice";
const initialState: Iuser[] = [];
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed(state, action: PayloadAction<Iuser[]>) {
      return action.payload;
    },
    removeFeed() {
      return initialState;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
