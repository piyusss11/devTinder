import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user structure based on your Iuser interface
export interface Iuser {
  _id: string;
  firstName: string;
  lastName?: string;
  userName: string;
  age?: number;
  emailId: string;
  password: string;
  gender?: string;
  photoUrl: string;
  about?: string;
  skills: string[];
}

// Define the slice with correct initialState structure
const initialState: Iuser = {
  _id: "",
  firstName: "",
  lastName: "",
  userName: "",
  age: undefined,
  emailId: "",
  password: "",
  gender: undefined,
  photoUrl: "",
  about: "",
  skills: [],
};

const userSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {
    addUser: (state, action: PayloadAction<Iuser>) => {
      // Replace the state with the user data from action.payload
      return { ...action.payload };
    },
    removeUser: () => {
      
      return initialState;
    },
  },
});


export const { addUser, removeUser } = userSlice.actions;


export default userSlice.reducer;
