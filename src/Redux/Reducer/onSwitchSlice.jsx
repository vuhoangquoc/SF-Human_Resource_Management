import { createSlice } from "@reduxjs/toolkit";

export const vacationMode2Slice = createSlice({
  name: "vacationMode2",
  initialState: JSON.parse(localStorage.getItem("vacationMode")) || {},
  reducers: {
    toggleVacationMode2: (state, action) => {
      const { id } = action.payload;
      state[id] = !state[id];
      console.log(state[id]);
      localStorage.setItem("vacationMode", JSON.stringify(state));
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      // Xóa user khỏi state và local storage
      delete state[userId];
      localStorage.removeItem(`vacationMode_${userId}`);
    },
  },
});

export const { toggleVacationMode2, deleteUser } = vacationMode2Slice.actions;

export default vacationMode2Slice.reducer;
