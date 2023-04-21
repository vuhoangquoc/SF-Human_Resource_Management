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
    // deleteUser: (state, action) => {
    //   function filterObjectById(object, idToDelete) {
    //     for (let key in object) {
    //       if (key === idToDelete && object[key] === true) {
    //         delete object[key];
    //       }
    //     }
    //     return object;
    //   }
    //   let getData = localStorage.getItem("vacationMode");
    //   // console.log("vũ ơi", getData);
    //   const { id } = action.payload;
    //   let data = filterObjectById(JSON.parse(getData), id);
    //   localStorage.setItem("vacationMode", JSON.stringify(data));
    // },
    // deleteUser: (state, action) => {
    //   const userId = action.payload;
    //   // Xóa user khỏi state và local storage
    //   delete state[userId];
    //   localStorage.removeItem(`vacationMode_${userId}`);
    // },
  },
});

export const { toggleVacationMode2, deleteUser } = vacationMode2Slice.actions;

export default vacationMode2Slice.reducer;
