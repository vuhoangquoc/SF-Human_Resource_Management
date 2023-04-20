import { createSlice } from "@reduxjs/toolkit";

const onLeaveSlice = createSlice({
  name: "onLeave",
  initialState: {
    onLeaveState: false,
  },
  reducers: {},
});

export const {} = onLeaveSlice.actions;
export default onLeaveSlice.reducer;
