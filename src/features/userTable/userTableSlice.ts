import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type UserType = {
  key: React.Key;
  name: string;
  age: number;
  dateOfBirth: string;
  bio: string;
};

export type UserTableState = UserType[];

const initialState: UserTableState = [];

for (let i = 0; i < 100; i++) {
  initialState.push({
    key: "user" + i.toString(),
    name: `John Doe ${i + 2}`,
    age: 32,
    dateOfBirth: `01/${(i % 12) + 1}/1989`,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  });
}

export const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<React.Key>) => {
      return state.filter((user) => user.key !== action.payload);
    },
    editUser: (state, action: PayloadAction<UserType>) => {
      const index = state.findIndex((user) => user.key === action.payload.key);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteSelectedUsers: (state, action: PayloadAction<React.Key[]>) => {
      return state.filter((user) => !action.payload.includes(user.key));
    },
  },
});

export const { addUser, deleteUser, deleteSelectedUsers, editUser } =
  userTableSlice.actions;

export const selectAllUsers = (state: RootState) => state.userTable;

export default userTableSlice.reducer;
